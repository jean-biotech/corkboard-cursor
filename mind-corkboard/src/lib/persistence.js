const STORAGE_KEY = 'mind-corkboard-v1'
const VERSION = 1

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || parsed.version !== VERSION || !Array.isArray(parsed.boards)) {
      return null
    }
    return parsed
  } catch {
    return null
  }
}

export function saveState(state) {
  try {
    const payload = {
      version: VERSION,
      savedAt: Date.now(),
      activeBoardId: state.activeBoardId,
      soundEnabled: state.soundEnabled,
      boards: state.boards,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch (err) {
    console.warn('Could not save board state', err)
  }
}

export function clearState() {
  localStorage.removeItem(STORAGE_KEY)
}
