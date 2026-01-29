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
          あなたの秩序指数が基準値を下回りました。これ以上のアクセスは記録されます。ご協力ありがとうございました。
        </p>
        <p className="muted">この画面は数秒後に自動的に終了し、トップへ戻ります。</p>
      </div>
    </section>
  )
}

export default Restricted
