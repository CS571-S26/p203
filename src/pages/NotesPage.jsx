import { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

function NotesPage() {
  const [note, setNote] = useState('')
  const [notes, setNotes] = useState([
    'Look up food options near the hotel.',
    'Check whether the museum needs advance tickets.',
  ])

  function handleSubmit(event) {
    event.preventDefault()

    if (!note.trim()) {
      return
    }

    setNotes([note, ...notes])
    setNote('')
  }

  function clearNotes() {
    setNotes([])
  }

  return (
    <>
      <h1 className="mb-3">Quick Notes</h1>
      <p className="lead mb-4">
        Save unorganized trip thoughts quickly without needing to sort them first.
      </p>

      <Row className="g-4 text-start">
        <Col lg={5}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>Add a Thought</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="quickNote">
                  <Form.Label>Note</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="Write anything you want to remember..."
                  />
                </Form.Group>
                <Button type="submit" variant="success" className="me-2">
                  Add Note
                </Button>
                <Button type="button" variant="outline-secondary" onClick={clearNotes}>
                  Clear All
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={7}>
          <Row className="g-3">
            {notes.length === 0 && (
              <Col>
                <Card className="shadow-sm">
                  <Card.Body>No notes yet.</Card.Body>
                </Card>
              </Col>
            )}
            {notes.map((savedNote, index) => (
              <Col md={6} key={`${savedNote}-${index}`}>
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <Card.Text>{savedNote}</Card.Text>
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

export default NotesPage
