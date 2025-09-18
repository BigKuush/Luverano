export function toSlug(input: string): string {
    return String(input || '')
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
}

export function productToSlug(id: string | number, title: string): string {
    const slug = toSlug(title);
    return slug || String(id);
}

