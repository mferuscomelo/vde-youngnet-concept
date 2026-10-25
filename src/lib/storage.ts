// Browser storage is a convenience only: every access is guarded so the app
// keeps working in private mode or with storage blocked.
const PREFIX = 'ynhub:'

export function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(PREFIX + key)
    return raw == null ? fallback : (JSON.parse(raw) as T)
  } catch {
    return fallback
  }
}

export function saveJSON(key: string, value: unknown): boolean {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function removeKey(key: string): void {
  try {
    window.localStorage.removeItem(PREFIX + key)
  } catch {
    /* storage unavailable */
  }
}

export function storageAvailable(): boolean {
  try {
    const k = PREFIX + '__probe'
    window.localStorage.setItem(k, '1')
    window.localStorage.removeItem(k)
    return true
  } catch {
    return false
  }
}
