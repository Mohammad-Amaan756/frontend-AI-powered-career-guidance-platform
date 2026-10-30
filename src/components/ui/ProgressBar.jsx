export function ProgressBar({ value = 0, label = 'Progress' }) {
  const boundedValue = Math.min(100, Math.max(0, Number(value) || 0))
  return <div className="progress-bar" role="progressbar" aria-label={label} aria-valuemin="0" aria-valuemax="100" aria-valuenow={boundedValue}><span style={{ width: `${boundedValue}%` }}/></div>
}
