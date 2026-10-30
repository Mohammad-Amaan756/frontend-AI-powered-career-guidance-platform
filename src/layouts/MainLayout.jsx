export function MainLayout({ title, description, action, onLogout, children }) {
  return <div className="page-content">
    <div className="page-heading">
      <div>
        <div className="eyebrow">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
    {children}
    <footer className="footer">Made for the path you’re building <span>✳</span><button onClick={onLogout}>Sign out</button></footer>
  </div>
}
