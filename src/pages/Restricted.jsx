import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Restricted() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/')
    }, 3500)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <section className="page">
      <div className="panel">
        <h2 className="panel-title">アクセス制限通知</h2>
        <p>
          優しさ・合理性・安全を確保するため、現在の秩序指数により対象の機能はご利用いただけません。アクセスは制限されています。協力ありがとうございます。
        </p>
        <p className="muted">この画面は数秒後に自動的に終了し、トップへ戻ります。</p>
      </div>
    </section>
  )
}

export default Restricted
