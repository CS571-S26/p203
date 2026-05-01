import { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'

function AddNote({ notesKey, notes, setNotes }) {
  const [note, setNote] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!note.trim()) return

    const updatedNotes = [note, ...notes]
    setNotes(updatedNotes)
    localStorage.setItem(notesKey, JSON.stringify(updatedNotes))
    setNote('')
  }

  return (
    <Card className="shadow-sm h-100">
      <Card.Body>
        <Card.Title>Add a Note</Card.Title>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="noteTextarea">
            <Form.Label>Note</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="success">
            Add Note
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default AddNote