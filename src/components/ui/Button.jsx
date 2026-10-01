export function Button({ children, busy, variant = 'primary', ...props }) {
  return <button className={`button ${variant}`} disabled={busy || props.disabled} {...props}>{busy ? 'Working…' : children}</button>
}
