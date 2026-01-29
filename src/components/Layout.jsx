import { Outlet, Link } from 'react-router-dom'

function Layout() {
  return (
    <div className="layout">
      <header className="header">
        <div className="header-inner">
          <h1 className="title">秩序管理庁 公式市民ポータル</h1>
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
        <Outlet />
      </main>
      <footer className="footer">
        <div className="footer-inner">※ 秩序指数は行動履歴・発言傾向・社会的影響度から算出されます</div>
      </footer>
    </div>
  )
}

export default Layout
