import { useEffect, useState } from 'react'
import { computeBoardLayout } from './boardCoords'

export function useBoardLayout() {
  const [layout, setLayout] = useState(() =>
    computeBoardLayout(
      typeof window !== 'undefined' ? window.innerWidth : 1024,
      typeof window !== 'undefined' ? window.innerHeight : 768,
    ),
  )

  useEffect(() => {
    function viewportSize() {
      const vv = window.visualViewport
      return {
        width: vv?.width || window.innerWidth,
        height: vv?.height || window.innerHeight,
      }
    }

    function update() {
      const { width, height } = viewportSize()
      setLayout(computeBoardLayout(width, height))
    }

    update()
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    window.visualViewport?.addEventListener('resize', update)
    window.visualViewport?.addEventListener('scroll', update)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
      window.visualViewport?.removeEventListener('resize', update)
      window.visualViewport?.removeEventListener('scroll', update)
    }
  }, [])

  return layout
}
