import { useState } from 'react'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import BudgetSummary from '../components/BudgetSummary'
import StatusBadge from '../components/StatusBadge'
import TripForm from '../components/TripForm'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
function PlannerPage() {
  const navigate = useNavigate()

  const username = localStorage.getItem('username')
  const tripKey = username ? `trip-${username}` : 'trip-guest'
  const notesKey = username ? `notes-${username}` : 'notes-guest'
  const budgetKey = username ? `budget-${username}` : 'budget-guest'

  const [trip, setTrip] = useState(() => {
    const savedTrip = localStorage.getItem(tripKey)
    return savedTrip ? JSON.parse(savedTrip) : null
  })

  const [notes] = useState(() => {
    const savedNotes = localStorage.getItem(notesKey)
    return savedNotes ? JSON.parse(savedNotes) : []
  })

  const [budgetItems] = useState(() => {
    const savedBudget = localStorage.getItem(budgetKey)
    return savedBudget ? JSON.parse(savedBudget) : []
  })

  const [newTrip, setNewTrip] = useState(
    trip || {
      name: '',
      destination: '',
      dates: '',
      status: '',
    }
  )

  const tripFields = [
    {
      name: 'name',
      label: 'Trip Name',
      required: true,
      errorMessage: 'Please fill out the Trip name.',
    },
    {
      name: 'destination',
      label: 'Destination',
      required: false,
    },
    {
      name: 'dates',
      label: 'Dates',
      required: false,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: ['Draft', 'Planning', 'Booked'],
      required: true,
      errorMessage: 'Please select a valid status.',
    },
  ]

  function saveTrip(updatedTrip) {
    setTrip(updatedTrip)
    localStorage.setItem(tripKey, JSON.stringify(updatedTrip))
  }

  function handleSubmit() {
    saveTrip({
      ...newTrip,
      id: trip ? trip.id : Date.now(),
    })
  }

  function removeTrip() {
    setTrip(null)
    localStorage.removeItem(tripKey)
    setNewTrip({
      name: '',
      destination: '',
      dates: '',
      status: '',
    })
  }

  return (
    <>
      <PageHeader
        title="Trip Dashboard"
        subtitle="Create and edit your trip details."
      />

      <Row className="g-4 text-start">
        <Col lg={5}>
          <TripForm
            title={trip ? 'Edit Trip' : 'Add a Trip'}
            fields={tripFields}
            values={newTrip}
            onChange={setNewTrip}
            onSubmit={handleSubmit}
            submitLabel={trip ? 'Save Trip' : 'Add Trip'}
          />
        </Col>

        <Col lg={7}>
          {!trip ? (
            <EmptyState message="No trip yet. Add one to get started." />
          ) : (
            <Card className="shadow-sm h-100">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Card.Title className="mb-0">{trip.name}</Card.Title>
                  <StatusBadge status={trip.status} />
                </div>

                <Card.Text className="mb-1">
                  <strong>Destination:</strong> {trip.destination || 'Not set'}
                </Card.Text>

                <Card.Text className="mb-1">
                  <strong>Dates:</strong> {trip.dates || 'Not set'}
                </Card.Text>

                <hr />

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Card.Title className="h5 mb-0">Notes</Card.Title>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => navigate('/notes')}
                  >
                    Edit
                  </Button>
                </div>

                {notes.length > 0 && (
                  <ListGroup variant="flush" className="mb-4">
                    {notes.map((note, index) => (
                      <ListGroup.Item key={`${note}-${index}`}>
                        {note}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}

                <div className="d-flex justify-content-between align-items-center mt-3 mb-2">
                  <Card.Title className="h5 mb-0">Budget</Card.Title>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => navigate('/budget')}
                  >
                    Edit
                  </Button>
                </div>

                {budgetItems.length > 0 && (
                  <>
                    <BudgetSummary items={budgetItems} />

                    <ListGroup variant="flush" className="mb-3">
                      {budgetItems.map((item) => (
                        <ListGroup.Item
                          className="d-flex justify-content-between align-items-center"
                          key={item.id}
                        >
                          <div>
                            <strong>{item.name}</strong>
                            <div className="text-muted small">
                              {item.category}
                            </div>
                          </div>
                          <span>${Number(item.amount).toFixed(2)}</span>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </>
                )}

                <Button
                  className="mt-3"
                  variant="outline-danger"
                  size="sm"
                  onClick={removeTrip}
                >
                  Remove Trip
                </Button>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </>
  )
}

export default PlannerPage