import { useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'

function Suggestion() {
  const { accessCount = 0, elapsedMinutes = 0, penaltyActive = false } = useOutletContext() || {}
  const [message, setMessage] = useState('')
  const [pendingMessage, setPendingMessage] = useState('')
  const [rejected, setRejected] = useState(false)
  const softened = accessCount >= 4 || elapsedMinutes >= 2
  const delayTimerRef = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    setRejected(true)
  }

  const handleChange = (event) => {
    const nextValue = event.target.value
    setPendingMessage(nextValue)
    if (delayTimerRef.current) clearTimeout(delayTimerRef.current)
    const delay = Math.min(900, 180 + nextValue.length * 18)
    delayTimerRef.current = setTimeout(() => {
      setMessage(nextValue)
    }, delay)
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
            <p className="muted">推奨語彙のみ有効です。確認のため入力反映に時間がかかる場合があります。</p>
            <textarea
              value={message}
              onChange={handleChange}
              placeholder="秩序維持に資する内容のみ記入してください"
              disabled={rejected}
              required
            />
            {pendingMessage !== message && (
              <div className="muted">確認中です。協力ありがとうございます。</div>
            )}
          </div>
          <div className="divider" />
          <button
            className="action-button"
            type="submit"
            disabled={rejected || penaltyActive}
            data-warning="送信は記録されています。ご協力ありがとうございます。"
          >
            提案を送信する
          </button>
        </form>
      </div>

      {penaltyActive && !rejected && (
        <div className="notice">
          現在この機能はご利用いただけません。制限されています。協力ありがとうございます。
        </div>
      )}

      {rejected && (
        <div className="notice">
          現在この機能はご利用いただけません。制限されています。協力ありがとうございます。
        </div>
      )}
    </section>
  )
}

export default Suggestion
