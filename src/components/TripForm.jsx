import { useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'

function TripForm({
  title,
  fields,
  values,
  onChange,
  onSubmit,
  submitLabel = 'Submit',
}) {
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    onChange({
      ...values,
      [name]: value,
    })

    if (error) setError('')
  }

  function handleSubmit(event) {
    event.preventDefault()

    for (let field of fields) {
      if (field.required && !values[field.name]?.trim()) {
        setError(field.errorMessage || `Please fill out ${field.label}.`)
        return
      }
    }

    setError('')
    onSubmit()
  }

  return (
    <Card className="shadow-sm h-100">
      <Card.Body>
        <Card.Title>{title}</Card.Title>

        {error && (
          <Alert variant="danger" className="py-2">
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <Form.Group className="mb-3" key={field.name} controlId={`tripForm${field.name}`}>
              <Form.Label>{field.label}</Form.Label>

              {field.type === 'select' ? (
                <Form.Select
                  name={field.name}
                  value={values[field.name]}
                  onChange={handleChange}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </Form.Select>
              ) : (
                <Form.Control
                  type={field.type || 'text'}
                  name={field.name}
                  value={values[field.name]}
                  onChange={handleChange}
                />
              )}
            </Form.Group>
          ))}

          <Button type="submit" variant="success">
            {submitLabel}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default TripForm