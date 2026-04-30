import { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import AddNote from '../components/AddNote'
import EmptyState from '../components/EmptyState'

function NotesPage() {
  const username = localStorage.getItem('username')
  const notesKey = username ? `notes-${username}` : 'notes-guest'

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem(notesKey)
    return savedNotes ? JSON.parse(savedNotes) : []
  })

  function removeNote(indexToRemove) {
    const updatedNotes = notes.filter((_, index) => index !== indexToRemove)
    setNotes(updatedNotes)
    localStorage.setItem(notesKey, JSON.stringify(updatedNotes))
  }

  return (
    <>
      <h1 className="mb-3">Quick Notes</h1>
      <p className="lead mb-4">
        Save unorganized trip thoughts quickly without needing to sort them first.
      </p>

      <Row className="g-4 text-start">
        <Col lg={5}>
          <AddNote
            notesKey={notesKey}
            notes={notes}
            setNotes={setNotes}
          />
        </Col>

        <Col lg={7}>
          {notes.length === 0 ? (
            <EmptyState message="No notes yet. Add one to get started." />
          ) : (
            <Row className="g-3">
              {notes.map((savedNote, index) => (
                <Col md={6} key={`${savedNote}-${index}`}>
                  <Card className="shadow-sm h-100">
                    <Card.Body className="d-flex flex-column">
                      <Card.Text className="flex-grow-1">
                        {savedNote}
                      </Card.Text>

                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeNote(index)}
                      >
                        Remove
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </>
  )
}

export default NotesPage