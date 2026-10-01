import { list } from '../../lib/apiClient'

export function Chip({ children, tone = '' }) {
  return <span className={`chip ${tone}`}>{children}</span>
}

export function Chips({ items, tone = '' }) {
  return list(items).length ? <div className="chips">{items.map((item, index) => <Chip key={`${item}-${index}`} tone={tone}>{item}</Chip>)}</div> : <EmptyInline>No items yet</EmptyInline>
}

function EmptyInline({ children }) {
  return <span className="empty-inline">{children}</span>
}
