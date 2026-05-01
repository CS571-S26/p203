import { useMemo, useState } from 'react'
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import TripTips from '../components/TripTips'

export default function HomePage() {
  const navigate = useNavigate()
  const [login, setLogin] = useState({ username: '', pin: '' })
  const [register, setRegister] = useState({ username: '', pin: '', confirmPin: '' })
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true')
  const [isRegistering, setIsRegistering] = useState(false)
  const [message, setMessage] = useState('')

  const registerValidationMessage = useMemo(() => {
    if (!register.pin || !register.confirmPin) {
      return 'Please enter a pin.'
    }
    if (!/^\d{7}$/.test(register.pin)) {
      return 'A pin must be 7 digits.'
    }
    if (register.pin !== register.confirmPin) {
      return 'Pins do not match.'
    }
    return ''
  }, [register.pin, register.confirmPin])

  const isRegisterValid =
    register.username.trim().length > 0 && registerValidationMessage === ''

  function handleLoginChange(event) {
    const { name, value } = event.target
    setLogin({ ...login, [name]: value })
  }

  function handleRegisterChange(event) {
    const { name, value } = event.target
    setRegister({ ...register, [name]: value })
  }

  function handleLogout() {
    localStorage.removeItem('loggedIn')
    setLoggedIn(false)
    setLogin({ username: '', pin: '' })
    setMessage('')
  }

  function handleLogin(event) {
    event.preventDefault()

    const savedUsername = localStorage.getItem('username')
    const savedPin = localStorage.getItem('pin')

    if (login.username === savedUsername && login.pin === savedPin) {
      localStorage.setItem('loggedIn', 'true')
      setLoggedIn(true)
      setMessage('')
    } else {
      setMessage('Incorrect login, please try again.')
    }
  }

  function handleSignup(event) {
    event.preventDefault()

    if (!isRegisterValid) return

    localStorage.setItem('username', register.username)
    localStorage.setItem('pin', register.pin)
    localStorage.setItem('loggedIn', 'true')

    setLogin({ username: register.username, pin: register.pin })
    setLoggedIn(true)
    setMessage('')
  }

  return (
    <>
      <section className="hero-section text-center py-5">
        <h1>Plan Your Next Trip with Ease</h1>
        <p className="lead">
          Trip Planner helps users organize their upcoming trip, quick notes, and
          travel budgets in one simple place.
        </p>
      </section>

      <Row className="g-4 align-items-stretch text-start">
        <Col lg={6}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>
                {loggedIn ? 'Account' : isRegistering ? 'Sign Up' : 'Log In'}
              </Card.Title>

              <Card.Text className="text-muted">
                Sign in to start managing your trip dashboard. Note that you can
                still use this app without an account, but your data will not be
                saved.
              </Card.Text>

              {!loggedIn ? (
                !isRegistering ? (
                  <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="loginUsername">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        value={login.username}
                        onChange={handleLoginChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="loginPin">
                      <Form.Label>PIN</Form.Label>
                      <Form.Control
                        type="password"
                        name="pin"
                        value={login.pin}
                        onChange={handleLoginChange}
                        maxLength={7}
                        required
                      />
                    </Form.Group>

                    <Button type="submit" variant="success">
                      Log In
                    </Button>{' '}
                    <Button
                      variant="secondary"
                      onClick={() => setIsRegistering(true)}
                    >
                      Sign Up
                    </Button>
                  </Form>
                ) : (
                  <Form onSubmit={handleSignup}>
                    <Form.Group className="mb-3" controlId="registerUsername">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        value={register.username}
                        onChange={handleRegisterChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="registerPin">
                      <Form.Label>PIN</Form.Label>
                      <Form.Control
                        type="password"
                        name="pin"
                        value={register.pin}
                        onChange={handleRegisterChange}
                        maxLength={7}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="registerConfirmPin">
                      <Form.Label>Confirm PIN</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPin"
                        value={register.confirmPin}
                        onChange={handleRegisterChange}
                        maxLength={7}
                        required
                      />
                    </Form.Group>

                    <p className="text-danger">{registerValidationMessage}</p>

                    <Button
                      type="submit"
                      variant="success"
                      disabled={!isRegisterValid}
                    >
                      Sign Up
                    </Button>{' '}
                    <Button
                      variant="secondary"
                      onClick={() => setIsRegistering(false)}
                    >
                      Nevermind!
                    </Button>
                  </Form>
                )
              ) : (
                <>
                  <Alert variant="success" className="mt-3 mb-3">
                    Logged in as {localStorage.getItem('username')}.
                  </Alert>
                  <Button variant="danger" onClick={handleLogout}>
                    Log Out
                  </Button>
                </>
              )}

              {message && (
                <Alert variant="danger" className="mt-3 mb-0">
                  {message}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <TripTips />
        </Col>

        <Col lg={6}>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Trip Dashboard</Card.Title>
              <Card.Text className="flex-grow-1">
                Click here to start planning your trip!
              </Card.Text>
              <Button variant="primary" onClick={() => navigate('/planner')}>
                Open Trip Overview
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}