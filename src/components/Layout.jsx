import { Outlet, Link, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

function Layout() {
  const location = useLocation()
  const lastKeyRef = useRef('')
  const [firstAccessAt] = useState(() => {
    try {
      const stored = Number(localStorage.getItem('firstAccessAt'))
      if (Number.isFinite(stored) && stored > 0) return stored
      const now = Date.now()
      localStorage.setItem('firstAccessAt', String(now))
      return now
    } catch {
      return Date.now()
    }
  })
  const [accessCount, setAccessCount] = useState(() => {
    try {
      const stored = Number(localStorage.getItem('accessCount'))
      return Number.isFinite(stored) && stored > 0 ? stored : 0
    } catch {
      return 0
    }
  })

  useEffect(() => {
    if (lastKeyRef.current === location.key) return
    lastKeyRef.current = location.key

    setAccessCount((prev) => {
      const next = prev + 1
      try {
        localStorage.setItem('accessCount', String(next))
      } catch {
        // ignore storage errors
      }
      return next
    })
  }, [location.key])

  const elapsedMinutes = Math.max(0, Math.floor((Date.now() - firstAccessAt) / 60000))

  return (
    <div className="layout">
      <header className="header">
        <div className="header-inner">
          <div className="header-top">
            <h1 className="title">秩序管理庁 公式市民ポータル</h1>
            <div className="header-status">
              <div>アクセス記録：{accessCount}回</div>
              <div>最終確認日時：自動記録中</div>
            </div>
          </div>
          <p className="subtitle">社会の安定は、あなたの協力で成り立っています。</p>
          <nav className="top-nav">
            <Link to="/">ポータル</Link>
            <Link to="/index-check">秩序指数再評価</Link>
            <Link to="/log">行動履歴</Link>
            <Link to="/suggestion">改善提案</Link>
            <Link to="/about">この社会について</Link>
          </nav>
        </div>
      </header>
      <main className="main">
        <Outlet context={{ accessCount, elapsedMinutes }} />
      </main>
      <footer className="footer">
        <div className="footer-inner">※ 秩序指数は行動履歴・発言傾向・社会的影響度から算出されます</div>
      </footer>
    </div>
  )
}

export default Layout
