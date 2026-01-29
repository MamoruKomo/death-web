import { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'

function IndexCheck() {
  const { accessCount = 0, elapsedMinutes = 0 } = useOutletContext() || {}
  const [answerOne, setAnswerOne] = useState('')
  const [answerTwo, setAnswerTwo] = useState('')
  const [showResult, setShowResult] = useState(false)

  const timePenalty = elapsedMinutes >= 1 ? 1 : 0
  const baseCount = accessCount >= 4 ? 1 : accessCount >= 2 ? 2 : 3
  const optionCount = Math.max(1, Math.min(3, baseCount - timePenalty))
  const canSubmit = answerOne && answerTwo

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!canSubmit) return
    setShowResult(true)
  }

  const handleAnswerOne = (value) => {
    setAnswerOne(value)
    setShowResult(false)
  }

  const handleAnswerTwo = (value) => {
    setAnswerTwo(value)
    setShowResult(false)
  }

  return (
    <section className="page">
      <div className="panel">
        <h2 className="panel-title">秩序指数 再評価</h2>
        <p className="muted">再評価は統計的傾向のみを示します。個別の事情は反映されません。</p>
        <p className="muted">選択肢は安全運用のため段階的に整理されています。協力ありがとうございます。</p>
        <form onSubmit={handleSubmit}>
          <div className="divider" />
          <div className="field">
            <label>質問 1: 公共の場での感情表現について、あなたの方針は？</label>
            <div className="options">
              <label className="option">
                <input
                  type="radio"
                  name="q1"
                  value="抑制"
                  checked={answerOne === '抑制'}
                  onChange={() => handleAnswerOne('抑制')}
                />
                抑制する
              </label>
              {optionCount >= 2 ? (
                <label className="option">
                  <input
                    type="radio"
                    name="q1"
                    value="必要時のみ"
                    checked={answerOne === '必要時のみ'}
                    onChange={() => handleAnswerOne('必要時のみ')}
                  />
                  必要な時だけ表明する
                </label>
              ) : (
                <label className="option is-disabled" aria-disabled="true">
                  <input type="radio" name="q1" disabled />
                  必要な時だけ表明する（ご利用いただけません）
                </label>
              )}
              {optionCount >= 3 ? (
                <label className="option">
                  <input
                    type="radio"
                    name="q1"
                    value="状況次第"
                    checked={answerOne === '状況次第'}
                    onChange={() => handleAnswerOne('状況次第')}
                  />
                  状況により変える
                </label>
              ) : (
                <label className="option is-disabled" aria-disabled="true">
                  <input type="radio" name="q1" disabled />
                  状況により変える（ご利用いただけません）
                </label>
              )}
            </div>
          </div>
          <div className="divider" />
          <div className="field">
            <label>質問 2: 不確かな情報への接触に対して、あなたが優先するものは？</label>
            <div className="options">
              <label className="option">
                <input
                  type="radio"
                  name="q2"
                  value="回避"
                  checked={answerTwo === '回避'}
                  onChange={() => handleAnswerTwo('回避')}
                />
                接触を避ける
              </label>
              {optionCount >= 2 ? (
                <label className="option">
                  <input
                    type="radio"
                    name="q2"
                    value="確認"
                    checked={answerTwo === '確認'}
                    onChange={() => handleAnswerTwo('確認')}
                  />
                  公式な確認を優先する
                </label>
              ) : (
                <label className="option is-disabled" aria-disabled="true">
                  <input type="radio" name="q2" disabled />
                  公式な確認を優先する（ご利用いただけません）
                </label>
              )}
              {optionCount >= 3 ? (
                <label className="option">
                  <input
                    type="radio"
                    name="q2"
                    value="記録"
                    checked={answerTwo === '記録'}
                    onChange={() => handleAnswerTwo('記録')}
                  />
                  個人の記録を優先する
                </label>
              ) : (
                <label className="option is-disabled" aria-disabled="true">
                  <input type="radio" name="q2" disabled />
                  個人の記録を優先する（ご利用いただけません）
                </label>
              )}
            </div>
          </div>
          <div className="divider" />
          {optionCount === 1 && (
            <div className="notice">
              選択肢は安全運用のため最小化されています。一部項目はご利用いただけません。協力ありがとうございます。
            </div>
          )}
          <button className="action-button" type="submit" disabled={!canSubmit}>
            再評価を実行する
          </button>
        </form>
      </div>

      {showResult && (
        <div className="panel">
          <h3 className="panel-title">再評価結果</h3>
          <div className="status-grid">
            <div className="status-item">
              <div className="status-label">現在の秩序指数</div>
              <div className="status-value">B-</div>
            </div>
            <div className="status-item">
              <div className="status-label">更新後の秩序指数</div>
              <div className="status-value">C+</div>
            </div>
          </div>
          <div className="notice" style={{ marginTop: '16px' }}>
            これは罰ではありません。社会全体の安全性を高めるための措置です。協力ありがとうございます。
          </div>
          <p className="muted">再評価により秩序指数は段階的に調整されます。協力ありがとうございます。</p>
          <div className="actions" style={{ marginTop: '16px' }}>
            <Link className="action-button" to="/log">行動履歴を見る</Link>
            <Link className="action-button" to="/">ポータルへ戻る</Link>
          </div>
        </div>
      )}
    </section>
  )
}

export default IndexCheck
