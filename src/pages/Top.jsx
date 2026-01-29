import { Link } from 'react-router-dom'

function Top() {
  return (
    <section className="page">
      <div className="panel">
        <h2 className="panel-title">現在の状況</h2>
        <div className="status-grid">
          <div className="status-item">
            <div className="status-label">現在の秩序指数</div>
            <div className="status-value">B-</div>
          </div>
          <div className="status-item">
            <div className="status-label">社会適合レベル</div>
            <div className="status-value">標準</div>
          </div>
        </div>
      </div>

      <div className="panel">
        <h2 className="panel-title">主要手続き</h2>
        <div className="actions">
          <Link className="action-button" to="/index-check">秩序指数を確認する</Link>
          <Link className="action-button" to="/log">行動履歴を見る</Link>
          <Link className="action-button" to="/suggestion">改善提案を送信する</Link>
          <Link className="action-button" to="/about">この社会について</Link>
        </div>
      </div>

      <div className="notice">
        これは罰ではありません。社会全体の安全性を高めるための措置です。
      </div>
    </section>
  )
}

export default Top
