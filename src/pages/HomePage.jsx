import { useState } from 'react'
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import TripTips from '../components/TripTips'

export default function HomePage() {
  const navigate = useNavigate()
  const [login, setLogin] = useState({ email: '', password: '' })
  const [loggedIn, setLoggedIn] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setLogin({ ...login, [name]: value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    setLoggedIn(true)
  }

  return (
    <>
      <section className="hero-section text-center py-5">
        <h1>Plan Your Next Trip with Ease</h1>
        <p className="lead">
          Trip Planner helps users organize upcoming trips, quick notes, and
          travel budgets in one simple place.
        </p>
      </section>

      <Row className="g-4 align-items-stretch text-start">
        <Col lg={6}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>Log In</Card.Title>
              <Card.Text className="text-muted">
                Sign in to start managing your trip dashboard.
              </Card.Text>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="loginEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={login.email}
                    onChange={handleChange}
                    placeholder="traveler@example.com"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="loginPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={login.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                  />
                </Form.Group>

                <Button type="submit" variant="success">
                  Log In
                </Button>
              </Form>

              {loggedIn && (
                <Alert variant="success" className="mt-3 mb-0">
                  Logged in as {login.email}. You can now open the trip dashboard.
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Trip Dashboard</Card.Title>
              <Card.Text className="flex-grow-1">
                View multiple trips, track planning status, save loose thoughts,
                and estimate trip costs from the navigation bar.
              </Card.Text>
              <Button variant="primary" onClick={() => navigate('/planner')}>
                Open Trips
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <TripTips />
    </>
  )
}
