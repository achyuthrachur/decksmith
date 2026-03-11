export const keyboardNavUri = 'crowe://templates/keyboard-nav';
export function getKeyboardNavContent() {
    return `// src/hooks/useKeyboardNav.ts
import { useState, useEffect } from 'react'

export function useKeyboardNav(total: number) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown')
        setCurrent(c => Math.min(c + 1, total - 1))
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp')
        setCurrent(c => Math.max(c - 1, 0))
      if (e.key === 'f')
        document.fullscreenElement
          ? document.exitFullscreen()
          : document.documentElement.requestFullscreen()
      if (e.key === 't')
        document.documentElement.dataset['theme'] =
          document.documentElement.dataset['theme'] === 'light' ? '' : 'light'
    }
    window.addEventListener('keydown', handler)

    // Listen for PDF navigation events
    const pdfHandler = (e: Event) => {
      const detail = (e as CustomEvent<{ index: number }>).detail
      if (typeof detail?.index === 'number') {
        setCurrent(detail.index)
      }
    }
    window.addEventListener('pdf-navigate', pdfHandler)

    return () => {
      window.removeEventListener('keydown', handler)
      window.removeEventListener('pdf-navigate', pdfHandler)
    }
  }, [total])

  return { current, setCurrent, total }
}
`;
}
//# sourceMappingURL=keyboard-nav.js.map