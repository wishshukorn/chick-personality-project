import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './modules/common/components/LandingPage'
import TestPage from './modules/test/components/TestPage'
import ResultsPage from './modules/results/components/ResultsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/results/:shareToken" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
