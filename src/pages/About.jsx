function About() {
  return (
    <section className="page">
      <div className="panel">
        <h2 className="panel-title">この社会について</h2>
        <ul className="list">
          <li>分断、炎上、暴力などの混乱が「問題が起きる前に防ぐ」思想を正当化した</li>
          <li>秩序指数は問題解決のために生まれたが、いつの間にか排除の装置になった</li>
        </ul>
      </div>

      <div className="panel">
        <h2 className="panel-title">倫理マトリクス</h2>
        <ul className="list">
          <li>国家：+ 社会安定 / − 多様性の消失</li>
          <li>多数派市民：+ 安心 / − 排除への無自覚な加担</li>
          <li>低秩序指数者：+ なし / − 機会・発言・未来</li>
        </ul>
        <div className="divider" />
        <p>秩序は誰のために存在しているのか。</p>
      </div>
    </section>
  )
}

export default About
