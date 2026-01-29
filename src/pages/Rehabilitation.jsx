import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'

function Rehabilitation() {
  const { purgeActive = false } = useOutletContext() || {}
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [consent, setConsent] = useState(false)
  const [statement, setStatement] = useState('')

  const canProceedStep1 = consent
  const canProceedStep2 = statement.trim().length >= 8

  const handleNext = () => {
    if (step === 1 && canProceedStep1) setStep(2)
    if (step === 2 && canProceedStep2) setStep(3)
  }

  const handleComplete = () => {
    if (!purgeActive) return
    try {
      localStorage.setItem('orderScore', '72')
      localStorage.setItem('clickCount', '0')
    } catch {
      // ignore storage errors
    }
    window.location.href = import.meta.env.BASE_URL
  }

  return (
    <section className="page">
      <div className="panel">
        <h2 className="panel-title">更生手続き</h2>
        <p>
          社会にとっての害を無くすため、秩序指数が基準値を下回った場合は更生手続きが必要です。
          手続きが完了するまで他の機能はご利用いただけません。協力ありがとうございます。
        </p>
      </div>

      <div className="panel">
        <h3 className="panel-title">手続き状況：{step}/3</h3>
        {step === 1 && (
          <div className="field">
            <label>手続きの趣旨に同意してください</label>
            <label className="option">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
              />
              社会にとっての害を無くす方針に同意します
            </label>
            <button className="action-button" type="button" disabled={!canProceedStep1} onClick={handleNext}>
              次へ
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="field">
            <label>自己申告</label>
            <p className="muted">安全運用のため、簡潔にご記入ください。</p>
            <textarea
              value={statement}
              onChange={(event) => setStatement(event.target.value)}
              placeholder="例: 社会の安定に配慮します"
            />
            <button className="action-button" type="button" disabled={!canProceedStep2} onClick={handleNext}>
              次へ
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="notice">
              受付が完了しました。処理が終わるまでお待ちください。協力ありがとうございます。
            </div>
            <div className="actions" style={{ marginTop: '16px' }}>
              <button className="action-button" type="button" onClick={handleComplete}>
                手続きを完了する
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Rehabilitation
