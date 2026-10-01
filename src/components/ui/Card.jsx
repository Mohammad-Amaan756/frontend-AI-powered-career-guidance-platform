export function Card({ children, className = '', ...props }) {
  return <section className={`panel ${className}`.trim()} {...props}>{children}</section>
}

export function EmptyCard({ title, text }) {
  return <div className="empty-small"><span>✦</span><div><strong>{title}</strong><p>{text}</p></div></div>
}
