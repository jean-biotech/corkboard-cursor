import { createContext, useContext, useEffect, useReducer, useCallback } from 'react'
import { loadState, saveState } from './persistence'

export const BOARD_W = 1400
export const BOARD_H = 1000
export const MAX_BOARDS = 6

export const PIN_COLORS = {
  red: '#C8322E',
  blue: '#2C4A6B',
  yellow: '#D4A82B',
  green: '#5C7A4F',
}

export const ITEM_TYPES = [
  { id: 'book', label: 'book', prompt: 'pin a book' },
  { id: 'quote', label: 'quote', prompt: 'pin a quote' },
  { id: 'photo', label: 'photo', prompt: 'pin a photo' },
  { id: 'note', label: 'note', prompt: 'pin a note' },
  { id: 'postcard', label: 'postcard', prompt: 'pin a memory' },
  { id: 'letter', label: 'letter', prompt: 'pin a letter' },
  { id: 'ticket', label: 'ticket', prompt: 'pin a ticket' },
  { id: 'list', label: 'list', prompt: 'pin a list' },
]

function uid(prefix = 'id') {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

function randomRotation() {
  return Math.round((Math.random() * 6 - 3) * 10) / 10
}

function randomPinColor() {
  const keys = Object.keys(PIN_COLORS)
  return keys[Math.floor(Math.random() * keys.length)]
}

function createWelcomeItem() {
  return {
    id: uid('item'),
    type: 'note',
    x: 980,
    y: 420,
    z: 1,
    rotation: -2.2,
    pinColor: 'red',
    createdAt: Date.now(),
    data: {
      text: 'everything you love\ngoes here.\n\npin your first thing',
      color: 'cream',
      fontStyle: 'reenie',
      showArrow: true,
      doodle: 'star',
    },
  }
}

function createDefaultBoard(name = 'Books & Reading') {
  return {
    id: uid('board'),
    name,
    titleCard: name,
    items: [createWelcomeItem()],
    nextZ: 2,
  }
}

function createInitialState() {
  const saved = loadState()
  if (saved?.boards?.length) {
    return {
      boards: saved.boards,
      activeBoardId: saved.activeBoardId || saved.boards[0].id,
      soundEnabled: saved.soundEnabled ?? true,
    }
  }

  const books = createDefaultBoard('Books & Reading')
  const life = {
    ...createDefaultBoard('Life Moments'),
    items: [],
    nextZ: 1,
  }
  const ideas = {
    ...createDefaultBoard('Ideas'),
    items: [],
    nextZ: 1,
  }

  return {
    boards: [books, life, ideas],
    activeBoardId: books.id,
    soundEnabled: true,
  }
}

function activeBoard(state) {
  return state.boards.find((b) => b.id === state.activeBoardId) || state.boards[0]
}

function updateActiveBoard(state, updater) {
  return {
    ...state,
    boards: state.boards.map((b) =>
      b.id === state.activeBoardId ? updater(b) : b,
    ),
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ACTIVE_BOARD':
      return { ...state, activeBoardId: action.id }

    case 'ADD_BOARD': {
      if (state.boards.length >= MAX_BOARDS) return state
      const board = createDefaultBoard(action.name || `Board ${state.boards.length + 1}`)
      board.items = []
      board.nextZ = 1
      return {
        ...state,
        boards: [...state.boards, board],
        activeBoardId: board.id,
      }
    }

    case 'RENAME_BOARD':
      return {
        ...state,
        boards: state.boards.map((b) =>
          b.id === action.id
            ? { ...b, name: action.name, titleCard: action.name }
            : b,
        ),
      }

    case 'DELETE_BOARD': {
      if (state.boards.length <= 1) return state
      const boards = state.boards.filter((b) => b.id !== action.id)
      const activeBoardId =
        state.activeBoardId === action.id ? boards[0].id : state.activeBoardId
      return { ...state, boards, activeBoardId }
    }

    case 'ADD_ITEM': {
      return updateActiveBoard(state, (board) => {
        const item = {
          id: uid('item'),
          type: action.itemType,
          x: action.x,
          y: action.y,
          z: board.nextZ,
          rotation: randomRotation(),
          pinColor: action.pinColor || randomPinColor(),
          createdAt: Date.now(),
          data: action.data,
        }
        return {
          ...board,
          items: [...board.items, item],
          nextZ: board.nextZ + 1,
        }
      })
    }

    case 'UPDATE_ITEM':
      return updateActiveBoard(state, (board) => ({
        ...board,
        items: board.items.map((item) =>
          item.id === action.id
            ? {
                ...item,
                data: { ...item.data, ...action.data },
                ...(action.pinColor ? { pinColor: action.pinColor } : {}),
              }
            : item,
        ),
      }))

    case 'MOVE_ITEM':
      return updateActiveBoard(state, (board) => ({
        ...board,
        items: board.items.map((item) =>
          item.id === action.id
            ? {
                ...item,
                x: Math.max(20, Math.min(BOARD_W - 80, action.x)),
                y: Math.max(20, Math.min(BOARD_H - 80, action.y)),
                z: board.nextZ,
              }
            : item,
        ),
        nextZ: board.nextZ + 1,
      }))

    case 'NUDGE_ITEMS':
      return updateActiveBoard(state, (board) => ({
        ...board,
        items: board.items.map((item) => {
          const nudge = action.nudges[item.id]
          if (!nudge) return item
          return {
            ...item,
            x: Math.max(20, Math.min(BOARD_W - 80, item.x + nudge.dx)),
            y: Math.max(20, Math.min(BOARD_H - 80, item.y + nudge.dy)),
          }
        }),
      }))

    case 'BRING_TO_FRONT':
      return updateActiveBoard(state, (board) => ({
        ...board,
        items: board.items.map((item) =>
          item.id === action.id ? { ...item, z: board.nextZ } : item,
        ),
        nextZ: board.nextZ + 1,
      }))

    case 'DUPLICATE_ITEM':
      return updateActiveBoard(state, (board) => {
        const source = board.items.find((i) => i.id === action.id)
        if (!source) return board
        const copy = {
          ...source,
          id: uid('item'),
          x: Math.min(BOARD_W - 100, source.x + 28),
          y: Math.min(BOARD_H - 100, source.y + 28),
          z: board.nextZ,
          rotation: randomRotation(),
          createdAt: Date.now(),
          data: structuredClone(source.data),
        }
        return {
          ...board,
          items: [...board.items, copy],
          nextZ: board.nextZ + 1,
        }
      })

    case 'DELETE_ITEM':
      return updateActiveBoard(state, (board) => ({
        ...board,
        items: board.items.filter((i) => i.id !== action.id),
      }))

    case 'SET_PIN_COLOR':
      return updateActiveBoard(state, (board) => ({
        ...board,
        items: board.items.map((item) =>
          item.id === action.id ? { ...item, pinColor: action.pinColor } : item,
        ),
      }))

    case 'TOGGLE_SOUND':
      return { ...state, soundEnabled: !state.soundEnabled }

    default:
      return state
  }
}

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, createInitialState)

  useEffect(() => {
    saveState(state)
  }, [state])

  const board = activeBoard(state)

  const value = {
    boards: state.boards,
    activeBoardId: state.activeBoardId,
    soundEnabled: state.soundEnabled,
    board,
    itemCount: board?.items?.length ?? 0,
    dispatch,
    addItem: useCallback(
      (itemType, x, y, data, pinColor) =>
        dispatch({ type: 'ADD_ITEM', itemType, x, y, data, pinColor }),
      [],
    ),
    updateItem: useCallback(
      (id, data, pinColor) => dispatch({ type: 'UPDATE_ITEM', id, data, pinColor }),
      [],
    ),
    moveItem: useCallback(
      (id, x, y) => dispatch({ type: 'MOVE_ITEM', id, x, y }),
      [],
    ),
    nudgeItems: useCallback(
      (nudges) => dispatch({ type: 'NUDGE_ITEMS', nudges }),
      [],
    ),
    bringToFront: useCallback(
      (id) => dispatch({ type: 'BRING_TO_FRONT', id }),
      [],
    ),
    duplicateItem: useCallback(
      (id) => dispatch({ type: 'DUPLICATE_ITEM', id }),
      [],
    ),
    deleteItem: useCallback(
      (id) => dispatch({ type: 'DELETE_ITEM', id }),
      [],
    ),
    setPinColor: useCallback(
      (id, pinColor) => dispatch({ type: 'SET_PIN_COLOR', id, pinColor }),
      [],
    ),
    setActiveBoard: useCallback(
      (id) => dispatch({ type: 'SET_ACTIVE_BOARD', id }),
      [],
    ),
    addBoard: useCallback(
      (name) => dispatch({ type: 'ADD_BOARD', name }),
      [],
    ),
    renameBoard: useCallback(
      (id, name) => dispatch({ type: 'RENAME_BOARD', id, name }),
      [],
    ),
    deleteBoard: useCallback(
      (id) => dispatch({ type: 'DELETE_BOARD', id }),
      [],
    ),
    toggleSound: useCallback(() => dispatch({ type: 'TOGGLE_SOUND' }), []),
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}

export function playPinChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    // soft cork "thud" + tiny chime overtone
    const thud = ctx.createOscillator()
    const thudGain = ctx.createGain()
    thud.type = 'sine'
    thud.frequency.setValueAtTime(90, ctx.currentTime)
    thud.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.12)
    thudGain.gain.setValueAtTime(0.0001, ctx.currentTime)
    thudGain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.01)
    thudGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22)
    thud.connect(thudGain)
    thudGain.connect(ctx.destination)
    thud.start()
    thud.stop(ctx.currentTime + 0.25)

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(660, ctx.currentTime + 0.04)
    gain.gain.setValueAtTime(0.0001, ctx.currentTime + 0.04)
    gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 0.06)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.32)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(ctx.currentTime + 0.04)
    osc.stop(ctx.currentTime + 0.35)
    osc.onended = () => ctx.close()
  } catch {
    // optional sound
  }
}
