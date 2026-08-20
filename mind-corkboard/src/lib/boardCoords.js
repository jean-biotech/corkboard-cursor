export const BOARD_W = 1400
export const BOARD_H = 1000
export const FRAME_ASPECT = 1064 / 1464
export const REF_CORK_W = BOARD_W
export const REF_CORK_H = BOARD_H

/** Item footprint as % of cork width (container query units) */
export const ITEM_CQW = {
  note: 15,
  quote: 15,
  ticket: 15,
  book: 17,
  photo: 16,
  list: 16,
  letter: 20,
  postcard: 20,
}

const WELCOME_NOTE_SNIPPET = 'everything you love'

export function isWelcomeNote(item) {
  return (
    item?.type === 'note' &&
    (item.data?.isWelcome ||
      (typeof item.data?.text === 'string' && item.data.text.includes(WELCOME_NOTE_SNIPPET)))
  )
}

export function migrateItem(item) {
  if (item == null) return item
  if (typeof item.xPct === 'number' && typeof item.yPct === 'number') {
    const next = { ...item, xPct: clampPct(item.xPct), yPct: clampPct(item.yPct) }
    if (isWelcomeNote(next)) {
      const { xPct, yPct } = pxToPct(600, 410)
      return {
        ...next,
        xPct,
        yPct,
        rotation: -1.5,
        pinColor: 'red',
        data: { ...next.data, isWelcome: true },
      }
    }
    return next
  }
  const x = typeof item.x === 'number' ? item.x : 0
  const y = typeof item.y === 'number' ? item.y : 0
  const { xPct, yPct } = pxToPct(x, y)
  const next = { ...item, xPct, yPct }
  delete next.x
  delete next.y
  if (isWelcomeNote(next)) {
    const centered = pxToPct(600, 410)
    return {
      ...next,
      xPct: centered.xPct,
      yPct: centered.yPct,
      rotation: -1.5,
      pinColor: 'red',
      data: { ...next.data, isWelcome: true },
    }
  }
  return next
}

export function migrateBoard(board) {
  if (!board) return board
  return {
    ...board,
    items: (board.items || []).map(migrateItem),
  }
}

export function pxToPct(x, y, corkW = REF_CORK_W, corkH = REF_CORK_H) {
  return {
    xPct: clampPct((x / corkW) * 100),
    yPct: clampPct((y / corkH) * 100),
  }
}

export function clampPct(value, min = 1, max = 94) {
  if (!Number.isFinite(value)) return min
  return Math.max(min, Math.min(max, value))
}

export function pctDeltaFromDrag(offsetX, offsetY, corkW, corkH) {
  if (!corkW || !corkH) return { dxPct: 0, dyPct: 0 }
  return {
    dxPct: (offsetX / corkW) * 100,
    dyPct: (offsetY / corkH) * 100,
  }
}

export function getPagePad(viewportWidth) {
  if (viewportWidth >= 1400) return 24
  if (viewportWidth >= 1024) return 20
  if (viewportWidth >= 768) return 16
  return 12
}

export function getBoardWidthPct(viewportWidth) {
  if (viewportWidth >= 1400) return 0.92
  if (viewportWidth >= 1024) return 0.94
  if (viewportWidth >= 768) return 0.95
  return 0.96
}

/** Compute frame + cork dimensions that fit the viewport */
export function computeBoardLayout(viewportWidth, viewportHeight) {
  const pagePad = getPagePad(viewportWidth)
  const widthPct = getBoardWidthPct(viewportWidth)
  const frameInset = Math.min(32, Math.max(20, viewportWidth * 0.02))

  let frameWidth = Math.max(280, viewportWidth * widthPct)
  let frameHeight = frameWidth * FRAME_ASPECT

  const maxFrameHeight = Math.max(600, viewportHeight - 200)
  if (frameHeight > maxFrameHeight) {
    frameHeight = maxFrameHeight
    frameWidth = frameHeight / FRAME_ASPECT
  }

  const corkWidth = Math.max(200, frameWidth - frameInset * 2)
  const corkHeight = Math.max(160, frameHeight - frameInset * 2)
  const itemScale = corkWidth / REF_CORK_W
  const mobileItemBoost = viewportWidth < 768 ? 1.1 : 1

  return {
    pagePad,
    frameWidth,
    frameHeight,
    frameInset,
    corkWidth,
    corkHeight,
    itemScale: itemScale * mobileItemBoost,
  }
}
