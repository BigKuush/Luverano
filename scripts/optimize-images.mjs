import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const SRC_DIR = path.join(ROOT, 'public', 'images')
const MAX_WIDTH = parseInt(process.env.IMG_MAX_WIDTH || '1920', 10)
const QUALITY = parseInt(process.env.IMG_QUALITY || '82', 10)
const FORMATS = (process.env.IMG_FORMATS || 'webp,avif').split(',')
const CLEANUP_DUPLICATES = String(process.env.IMG_CLEANUP || 'true') === 'true'

let totalBefore = 0
let totalAfter = 0
let converted = 0

async function* walk(dir) {
  for await (const d of await fs.opendir(dir)) {
    const entry = path.join(dir, d.name)
    if (d.isDirectory()) yield* walk(entry)
    else yield entry
  }
}

const isImage = (p) => /\.(jpe?g|png|webp|avif)$/i.test(p)

function buildOutName(basePath, ext) {
  // Не создаём странные дубликаты вида .avif.webp
  return basePath.replace(/\.(webp|avif)$/i, '') + '.' + ext
}

async function optimizeFile(file) {
  const buf = await fs.readFile(file)
  const before = buf.length
  totalBefore += before

  const img = sharp(buf)
  const meta = await img.metadata()
  const width = meta.width || MAX_WIDTH
  const resized = img.resize({ width: Math.min(width, MAX_WIDTH) })

  // Базовое имя (без повторных суффиксов форматов)
  const baseNoExt = file.replace(/\.(jpe?g|png|webp|avif)$/i, '')

  // Главный таргет — webp
  const webpOut = buildOutName(baseNoExt, 'webp')
  const webpBuf = await resized.webp({ quality: QUALITY }).toBuffer()
  await fs.writeFile(webpOut, webpBuf)

  // Доп. формат avif (если нужен)
  if (FORMATS.includes('avif')) {
    const avifOut = buildOutName(baseNoExt, 'avif')
    const avifBuf = await resized.avif({ quality: Math.max(50, Math.round(QUALITY * 0.7)) }).toBuffer()
    await fs.writeFile(avifOut, avifBuf)
  }

  // Оставим исходный файл, но пересожмём его «на месте», чтобы ссылки на .jpg не ломать
  let originalOut = file
  let outBuf
  if (/\.jpe?g$/i.test(file)) {
    outBuf = await resized.jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer()
  } else if (/\.png$/i.test(file)) {
    outBuf = await resized.png({ compressionLevel: 9 }).toBuffer()
  } else if (/\.webp$/i.test(file)) {
    outBuf = await resized.webp({ quality: QUALITY }).toBuffer()
  } else if (/\.avif$/i.test(file)) {
    outBuf = await resized.avif({ quality: Math.max(50, Math.round(QUALITY * 0.7)) }).toBuffer()
  }
  if (outBuf) await fs.writeFile(originalOut, outBuf)

  const after = (await fs.stat(originalOut)).size
  totalAfter += after
  converted += 1
}

async function main() {
  const targets = []
  for await (const f of walk(SRC_DIR)) {
    if (isImage(f)) targets.push(f)
  }
  if (!targets.length) {
    console.log('No images found in', SRC_DIR)
    return
  }
  // Очистка дубликатов (если ранее были созданы .avif.webp / .webp.avif)
  if (CLEANUP_DUPLICATES) {
    const toDelete = []
    for (const f of targets) {
      if (/\.(avif\.webp|webp\.avif)$/i.test(f)) toDelete.push(f)
    }
    for (const f of toDelete) {
      try { await fs.unlink(f); console.log('Removed duplicate:', f) } catch {}
    }
  }
  for (const f of targets) {
    try {
      await optimizeFile(f)
      process.stdout.write('.')
    } catch (e) {
      console.error('\nFailed:', f, e.message)
    }
  }
  console.log(`\nDone. files=${converted} before=${(totalBefore/1024/1024).toFixed(2)}MB after=${(totalAfter/1024/1024).toFixed(2)}MB`) 
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
