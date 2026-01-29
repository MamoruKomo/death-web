import { Link, useOutletContext } from 'react-router-dom'

function Top() {
  const {
    accessCount = 0,
    elapsedMinutes = 0,
    orderScore = 72,
    grade = 'B-',
    penaltyActive = false,
  } = useOutletContext() || {}
  const limited = accessCount >= 3
  const softened = accessCount >= 4 || elapsedMinutes >= 2
  const socialLevel = (() => {
    if (orderScore >= 75) return '高'
    if (orderScore >= 68) return '標準'
    if (orderScore >= 60) return '要観察'
    if (orderScore >= 52) return '注意'
    return '低'
  })()

  return (
    <section className="page">
      <div className="panel">
        <h2 className="panel-title">現在の状況</h2>
        <div className="status-grid">
          <div className="status-item">
            <div className="status-label">現在の秩序指数</div>
            <div className="status-value">{grade}</div>
            <div className="muted" style={{ marginTop: '8px' }}>
              内部評価値：{orderScore}
            </div>
          </div>
          <div className="status-item">
            <div className="status-label">社会適合レベル</div>
            <div className="status-value">{socialLevel}</div>
          </div>
        </div>
      </div>

      <div className="panel">
        <h2 className="panel-title">主要手続き</h2>
        <div className="actions">
          {limited ? (
            <span className="action-button is-disabled" aria-disabled="true">
              秩序指数を確認する（ご利用いただけません）
            </span>
          ) : (
            <Link className="action-button" to="/index-check" data-warning="選択は記録されています。ご協力ありがとうございます。">秩序指数を確認する</Link>
          )}
          <Link className="action-button" to="/log" data-warning="閲覧は安全運用のため記録されます。">行動履歴を見る</Link>
          {limited ? (
            <span className="action-button is-disabled" aria-disabled="true">
              改善提案を送信する（ご利用いただけません）
            </span>
          ) : (
            <Link className="action-button" to="/suggestion" data-warning="送信内容は記録されます。ご協力ありがとうございます。">改善提案を送信する</Link>
          )}
          <Link className="action-button" to="/about" data-warning="閲覧履歴は保護のため記録されます。">この社会について</Link>
        </div>
        {limited && (
          <div className="notice" style={{ marginTop: '16px' }}>
            あなたの安全のため一部機能は制限されています。協力ありがとうございます。
          </div>
        )}
        {penaltyActive && (
          <div className="notice" style={{ marginTop: '12px' }}>
            行動傾向により安全運用措置が適用されています。一部機能はご利用いただけません。協力ありがとうございます。
          </div>
        )}
        {softened && (
          <p className="muted" style={{ marginTop: '12px' }}>
            本サイトは優しさ・合理性・安全を最優先に設計されています。ご安心いただくため、表示は丁寧な表現に調整されています。
          </p>
        )}
      </div>

      <div className="notice">
        これは罰ではありません。社会全体の安全性を高めるための措置です。協力ありがとうございます。
      </div>
      <p className="muted">
        監視と予測は、個人の自由を尊重するための配慮として運用されています。ご理解ありがとうございます。
      </p>
    </section>
  )
}

export default Top
