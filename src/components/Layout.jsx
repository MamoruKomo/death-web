import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'

function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
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
  const [accessCount, setAccessCount] = useState(0)
  const [clickCount, setClickCount] = useState(() => {
    try {
      const stored = Number(localStorage.getItem('clickCount'))
      return Number.isFinite(stored) && stored > 0 ? stored : 0
    } catch {
      return 0
    }
  })
  const [orderScore, setOrderScore] = useState(() => {
    try {
      const stored = Number(localStorage.getItem('orderScore'))
      return Number.isFinite(stored) && stored > 0 ? stored : 72
    } catch {
      return 72
    }
  })
  const [toastMessage, setToastMessage] = useState('')
  const toastTimerRef = useRef(null)

  useEffect(() => {
    if (lastKeyRef.current === location.key) return
    lastKeyRef.current = location.key

    setAccessCount((prev) => {
      return prev + 1
    })
  }, [location.key])

  useEffect(() => {
    const handleClick = () => {
      setClickCount((prev) => {
        const next = prev + 1
        try {
          localStorage.setItem('clickCount', String(next))
        } catch {
          // ignore storage errors
        }
        return next
      })
      setOrderScore((prev) => {
        const next = Math.max(40, prev - 1)
        try {
          localStorage.setItem('orderScore', String(next))
        } catch {
          // ignore storage errors
        }
        return next
      })

      setToastMessage('協力度が反映されました。協力ありがとうございます。')
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
      toastTimerRef.current = setTimeout(() => {
        setToastMessage('')
      }, 1400)
    }

    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (!purgeActive || location.pathname === '/restricted') return
    const timer = setTimeout(() => {
      navigate('/restricted')
    }, 900)
    return () => clearTimeout(timer)
  }, [navigate, purgeActive, location.pathname])

  const elapsedMinutes = Math.max(0, Math.floor((Date.now() - firstAccessAt) / 60000))
  const grade = useMemo(() => {
    if (orderScore >= 80) return 'A'
    if (orderScore >= 75) return 'B+'
    if (orderScore >= 70) return 'B'
    if (orderScore >= 65) return 'B-'
    if (orderScore >= 60) return 'C+'
    if (orderScore >= 55) return 'C'
    if (orderScore >= 50) return 'C-'
    return 'D'
  }, [orderScore])
  const penaltyActive = orderScore <= 60 || clickCount >= 20
  const purgeActive = orderScore <= 50

  return (
    <div className="layout">
      <header className="header">
        <div className="header-inner">
          <div className="header-top">
            <div className="title-group">
              <div className="logo-mark" aria-hidden="true">
                <span className="logo-ring" />
                <span className="logo-core" />
                <span className="logo-bar" />
              </div>
              <h1 className="title">秩序管理庁 公式市民ポータル</h1>
            </div>
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
          {penaltyActive && (
            <div className="notice notice-compact">
              現在、行動傾向により安全運用措置が適用されています。協力ありがとうございます。
            </div>
          )}
        </div>
      </header>
      <main className="main">
        <Outlet
          context={{
            accessCount,
            elapsedMinutes,
            orderScore,
            grade,
            penaltyActive,
            clickCount,
            purgeActive,
          }}
        />
        {purgeActive && (
          <div className="notice notice-compact">
            秩序指数が基準値を下回りました。粛清手続きが開始されました。詳細はご利用いただけません。協力ありがとうございます。
          </div>
        )}
      </main>
      {toastMessage && <div className="toast">{toastMessage}</div>}
      <footer className="footer">
        <div className="footer-inner">※ 秩序指数は行動履歴・発言傾向・社会的影響度から算出されます</div>
      </footer>
    </div>
  )
}

export default Layout
