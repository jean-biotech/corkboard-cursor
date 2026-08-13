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
    function update() {
      setLayout(computeBoardLayout(window.innerWidth, window.innerHeight))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return layout
}
