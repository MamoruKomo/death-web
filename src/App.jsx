import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Top from './pages/Top'
import IndexCheck from './pages/IndexCheck'
import Log from './pages/Log'
import Suggestion from './pages/Suggestion'
import About from './pages/About'
import Restricted from './pages/Restricted'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Top />} />
          <Route path="index-check" element={<IndexCheck />} />
          <Route path="log" element={<Log />} />
          <Route path="suggestion" element={<Suggestion />} />
          <Route path="about" element={<About />} />
          <Route path="restricted" element={<Restricted />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
