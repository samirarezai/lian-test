export function readStorage<T>(key: string, fallback: T, parse: (value: unknown) => T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return parse(JSON.parse(raw))
  } catch {
    return fallback
  }
}

export function writeStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // The in-memory list still works when the browser refuses to persist.
  }
}
