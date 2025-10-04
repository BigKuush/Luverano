// Безопасная обёртка над Яндекс.Метрикой
export const reachGoal = (name: string, params?: Record<string, any>) => {
  try {
    // TODO: заменить /* METRIKA_ID */ на реальный ID при подключении
    // (window as any).ym?.(/* METRIKA_ID */, 'reachGoal', name, params);
    (window as any).ym?.(/* METRIKA_ID */ undefined, 'reachGoal', name, params);
  } catch {}
};


