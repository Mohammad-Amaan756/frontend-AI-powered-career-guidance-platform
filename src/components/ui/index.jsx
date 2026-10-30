export { Button } from './Button'
export { Field } from './Input'
export { Chip, Chips } from './Badge'
export { Card, EmptyCard } from './Card'
export { Modal } from './Modal'
export { Spinner } from './Spinner'
export { ProgressBar } from './ProgressBar'

export function Notice({ type = 'success', children }) {
  return <div role={type === 'error' ? 'alert' : 'status'} className={`notice ${type}`}>{children}</div>
}

export function ResultSection({ title, children }) {
  return <div className="result-section"><h4>{title}</h4>{children}</div>
}

export function Bullets({ items }) {
  return Array.isArray(items) && items.length ? <ul className="clean-list">{items.map((item, index) => <li key={index}>{item}</li>)}</ul> : <span className="empty-inline">Not specified in this job description</span>
}
