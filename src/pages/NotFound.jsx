import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="page">
      <div className="panel">
        <h2 className="panel-title">ページが見つかりません</h2>
        <p className="muted">指定されたアクセスは記録されました。</p>
        <div className="actions" style={{ marginTop: '16px' }}>
          <Link className="action-button" to="/">ポータルへ戻る</Link>
        </div>
      </div>
    </section>
  )
}

export default NotFound
