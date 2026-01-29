import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'

function Suggestion() {
  const { accessCount = 0, elapsedMinutes = 0 } = useOutletContext() || {}
  const [message, setMessage] = useState('')
  const [rejected, setRejected] = useState(false)
  const softened = accessCount >= 4 || elapsedMinutes >= 2

  const handleSubmit = (event) => {
    event.preventDefault()
    setRejected(true)
  }

  return (
    <section className="page">
      <div className="panel">
        <h2 className="panel-title">改善提案フォーム</h2>
        <p className="muted">提案は秩序維持のために記録されます。返信は行われません。</p>
        {softened && (
          <p className="muted">より丁寧なご案内を心がけています。安心してご記入ください。協力ありがとうございます。</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="divider" />
          <div className="field">
            <label>提案内容</label>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="秩序維持に資する内容のみ記入してください"
              disabled={rejected}
              required
            />
          </div>
          <div className="divider" />
          <button className="action-button" type="submit" disabled={rejected}>
            提案を送信する
          </button>
        </form>
      </div>

      {rejected && (
        <div className="notice">
          現在この機能はご利用いただけません。制限されています。協力ありがとうございます。
        </div>
      )}
    </section>
  )
}

export default Suggestion
