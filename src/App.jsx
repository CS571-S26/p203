import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import HomePage from './pages/HomePage'
import PlannerPage from './pages/PlannerPage'
import NotesPage from './pages/NotesPage'
import BudgetPage from './pages/BudgetPage'
import './App.css'

function App() {
  return (
    <>
      <NavigationBar />

      <main className="app-main">
        <Container className="py-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/planner" element={<PlannerPage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/budget" element={<BudgetPage />} />
          </Routes>
        </Container>
      </main>
    </>
  )
}

export default App
