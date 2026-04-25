import { useState } from 'react'
import { Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap'

const categories = ['Transportation', 'Lodging', 'Food', 'Activities', 'Other']

function BudgetPage() {
  const [items, setItems] = useState([
    { id: 1, category: 'Transportation', name: 'Gas or train ticket', amount: 80 },
    { id: 2, category: 'Food', name: 'Meals', amount: 150 },
  ])
  const [item, setItem] = useState({ category: 'Transportation', name: '', amount: '' })

  const total = items.reduce((sum, budgetItem) => sum + Number(budgetItem.amount), 0)

  function handleChange(event) {
    const { name, value } = event.target
    setItem({ ...item, [name]: value })
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!item.name || !item.amount) {
      return
    }

    setItems([
      ...items,
      {
        ...item,
        id: Date.now(),
        amount: Number(item.amount),
      },
    ])
    setItem({ category: 'Transportation', name: '', amount: '' })
  }

  function removeItem(id) {
    setItems(items.filter((budgetItem) => budgetItem.id !== id))
  }

  return (
    <>
      <h1 className="mb-3">Budget Planner</h1>
      <p className="lead mb-4">
        Estimate trip costs by category and keep a running total.
      </p>

      <Row className="g-4 text-start">
        <Col lg={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>Add Budget Item</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="budgetCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Select name="category" value={item.category} onChange={handleChange}>
                    {categories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="budgetName">
                  <Form.Label>Item</Form.Label>
                  <Form.Control
                    name="name"
                    value={item.name}
                    onChange={handleChange}
                    placeholder="Hotel, dinner, tickets..."
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="budgetAmount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    name="amount"
                    value={item.amount}
                    onChange={handleChange}
                    placeholder="100"
                  />
                </Form.Group>

                <Button type="submit" variant="success">
                  Add Cost
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Card.Title className="mb-0">Estimated Total</Card.Title>
                <h2 className="mb-0">${total.toFixed(2)}</h2>
              </div>

              <ListGroup variant="flush">
                {items.map((budgetItem) => (
                  <ListGroup.Item
                    className="d-flex justify-content-between align-items-center"
                    key={budgetItem.id}
                  >
                    <div>
                      <strong>{budgetItem.name}</strong>
                      <div className="text-muted small">{budgetItem.category}</div>
                    </div>
                    <div>
                      <span className="me-3">${Number(budgetItem.amount).toFixed(2)}</span>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeItem(budgetItem.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default BudgetPage
