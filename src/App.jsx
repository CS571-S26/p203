import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import './App.css'

function App() {
  return (
    <>
      <NavigationBar />

      <main className="app-main">
        <Container className="py-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Container>
      </main>

    </>
  )
}

export default App
