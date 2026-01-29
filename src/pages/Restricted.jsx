import { useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'

function Restricted() {
  const navigate = useNavigate()
  const { purgeActive = false } = useOutletContext() || {}

  useEffect(() => {
    if (purgeActive) return
    const timer = setTimeout(() => {
      navigate('/')
    }, 3500)

    return () => clearTimeout(timer)
  }, [navigate, purgeActive])

  return (
    <section className="page">
      <div className="panel">
        <h2 className="panel-title">アクセス制限通知</h2>
        <p>
          優しさ・合理性・安全を確保するため、現在の秩序指数により対象の機能はご利用いただけません。アクセスは制限されています。協力ありがとうございます。
        </p>
        <div className="notice" style={{ marginTop: '12px' }}>
          秩序指数が基準値を下回りました。粛清手続きが開始されました。詳細はご利用いただけません。協力ありがとうございます。
        </div>
        <p className="muted">この画面は数秒後に自動的に終了し、トップへ戻ります。</p>
      </div>
    </section>
  )
}

export default Restricted
