import { useState } from 'react'
import { Badge, Button, Card, Col, Form, Row } from 'react-bootstrap'

const starterTrips = [
  {
    id: 1,
    name: 'Spring Break',
    destination: 'Chicago, IL',
    dates: 'March 16 - March 20',
    status: 'Planning',
  },
  {
    id: 2,
    name: 'Summer Weekend',
    destination: 'Milwaukee, WI',
    dates: 'July 10 - July 12',
    status: 'Draft',
  },
]

function PlannerPage() {
  const [trips, setTrips] = useState(starterTrips)
  const [newTrip, setNewTrip] = useState({
    name: '',
    destination: '',
    dates: '',
    status: 'Draft',
  })

  function handleChange(event) {
    const { name, value } = event.target
    setNewTrip({ ...newTrip, [name]: value })
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!newTrip.name || !newTrip.destination) {
      return
    }

    setTrips([
      ...trips,
      {
        ...newTrip,
        id: Date.now(),
      },
    ])
    setNewTrip({ name: '', destination: '', dates: '', status: 'Draft' })
  }

  function removeTrip(id) {
    setTrips(trips.filter((trip) => trip.id !== id))
  }

  return (
    <>
      <h1 className="mb-3">Trip Dashboard</h1>
      <p className="lead mb-4">
        Manage multiple trips from one cleaner dashboard.
      </p>

      <Row className="g-4 text-start">
        <Col lg={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>Add a Trip</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="tripName">
                  <Form.Label>Trip Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={newTrip.name}
                    onChange={handleChange}
                    placeholder="Fall getaway"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="tripDestination">
                  <Form.Label>Destination</Form.Label>
                  <Form.Control
                    name="destination"
                    value={newTrip.destination}
                    onChange={handleChange}
                    placeholder="Madison, WI"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="tripDates">
                  <Form.Label>Dates</Form.Label>
                  <Form.Control
                    name="dates"
                    value={newTrip.dates}
                    onChange={handleChange}
                    placeholder="May 10 - May 14"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="tripStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Select name="status" value={newTrip.status} onChange={handleChange}>
                    <option>Draft</option>
                    <option>Planning</option>
                    <option>Booked</option>
                  </Form.Select>
                </Form.Group>

                <Button type="submit" variant="success">
                  Add Trip
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Row className="g-3">
            {trips.map((trip) => (
              <Col md={6} key={trip.id}>
                <Card className="shadow-sm h-100 trip-card">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <Card.Title className="mb-0">{trip.name}</Card.Title>
                      <Badge bg={trip.status === 'Booked' ? 'success' : 'secondary'}>
                        {trip.status}
                      </Badge>
                    </div>
                    <Card.Text className="mb-1">
                      <strong>Destination:</strong> {trip.destination}
                    </Card.Text>
                    <Card.Text className="mb-3">
                      <strong>Dates:</strong> {trip.dates || 'Not set'}
                    </Card.Text>
                    <Button variant="outline-danger" size="sm" onClick={() => removeTrip(trip.id)}>
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default PlannerPage
