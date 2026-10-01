import { useEffect } from 'react'

export function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return undefined
    const closeOnEscape = event => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [open, onClose])

  if (!open) return null
  return <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}><section className="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-title"><header><h2 id="modal-title">{title}</h2><button type="button" onClick={onClose} aria-label="Close dialog">×</button></header>{children}</section></div>
}
