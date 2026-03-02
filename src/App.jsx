import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Tracking from './pages/Tracking'
import './index.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tracking" element={<Tracking />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
