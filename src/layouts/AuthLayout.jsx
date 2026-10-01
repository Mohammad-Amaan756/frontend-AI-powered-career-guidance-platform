import { Link } from 'react-router-dom'

export function AuthLayout({ children }) {
  return <main className="auth-page">
    <div className="auth-art">
      <Link className="brand brand-light" to="/"><span className="brand-mark">✳</span> pathfinder</Link>
      <div className="auth-pitch">
        <span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
        <h1>Make your<br/>potential <em>visible.</em></h1>
        <p>A clearer path from where you are to where you want to be.</p>
        <div className="art-orbit"><div className="orbit-core">✳</div><span className="orbit-tag tag-one">Skills ↗</span><span className="orbit-tag tag-two">Your future</span><span className="orbit-tag tag-three">Growth ✦</span></div>
      </div>
      <span className="art-foot">A little progress, every day.</span>
    </div>
    <section className="auth-form-wrap"><div className="auth-form">{children}</div></section>
  </main>
}
