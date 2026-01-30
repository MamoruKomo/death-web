import { useEffect, useState } from 'react'

function Purge() {
  const [remaining, setRemaining] = useState(5)

  useEffect(() => {
    const releaseTimer = setTimeout(() => {
      try {
        localStorage.setItem('orderScore', '72')
        localStorage.setItem('clickCount', '0')
        localStorage.setItem('resetSession', '1')
      } catch {
        // ignore storage errors
      }
      window.location.href = import.meta.env.BASE_URL
    }, 5000)

    const countdownTimer = setInterval(() => {
      setRemaining((prev) => Math.max(0, prev - 1))
    }, 1000)

    return () => {
      clearTimeout(releaseTimer)
      clearInterval(countdownTimer)
    }
  }, [])

  return (
    <section className="page">
      <div className="panel">
        <h2 className="panel-title">粛清手続き通知</h2>
        <p>
          秩序指数が基準値を下回りました。粛清手続きが開始されています。詳細はご利用いただけません。協力ありがとうございます。
        </p>
        <div className="notice" style={{ marginTop: '12px' }}>
          本通知は安全運用の一環として自動表示されています。記録は継続されます。
        </div>
        <p className="muted" style={{ marginTop: '12px' }}>
          解放まで残り {remaining} 秒
        </p>
        <p className="muted" style={{ marginTop: '12px' }}>
          この手続きは個別の判断ではなく、統計的基準に基づいて実行されます。
        </p>
      </div>
    </section>
  )
}

export default Purge
