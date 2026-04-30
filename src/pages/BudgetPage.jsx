import { useState } from 'react'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import TripForm from '../components/TripForm'
import BudgetSummary from '../components/BudgetSummary'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
const categories = ['Transportation', 'Lodging', 'Food', 'Activities', 'Other']

function BudgetPage() {
  const username = localStorage.getItem('username')
  const budgetKey = username ? `budget-${username}` : 'budget-guest'

  const [items, setItems] = useState(() => {
    const savedBudget = localStorage.getItem(budgetKey)
    return savedBudget ? JSON.parse(savedBudget) : []
  })

  const [item, setItem] = useState({
    category: '',
    name: '',
    amount: '',
  })

  const budgetFields = [
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: categories,
      required: true,
      errorMessage: 'Please select a category.',
    },
    {
      name: 'name',
      label: 'Description',
      required: true,
      errorMessage: 'Please enter a description.',
    },
    {
      name: 'amount',
      label: 'Price',
      required: true,
      errorMessage: 'Please enter a price.',
    },
  ]



  function handleSubmit() {
    const updatedItems = [
      ...items,
      {
        ...item,
        id: Date.now(),
        amount: Number(item.amount),
      },
    ]

    setItems(updatedItems)
    localStorage.setItem(budgetKey, JSON.stringify(updatedItems))

    setItem({
      category: '',
      name: '',
      amount: '',
    })
  }

  function removeItem(id) {
    const updatedItems = items.filter((budgetItem) => budgetItem.id !== id)
    setItems(updatedItems)
    localStorage.setItem(budgetKey, JSON.stringify(updatedItems))
  }

  return (
    <>
      <PageHeader
        title="Budget Planner"
        subtitle="Estimate trip costs by category and keep a running total."
      />

      <Row className="g-4 text-start">
        <Col lg={4}>
          <TripForm
            title="Add Budget Item"
            fields={budgetFields}
            values={item}
            onChange={setItem}
            onSubmit={handleSubmit}
            submitLabel="Add Cost"
          />
        </Col>

        <Col lg={8}>
          {items.length === 0 ? (
          <EmptyState message="No budget yet. Add one to get started." />
          ) : (
            <Card className="shadow-sm">
              <Card.Body>
                <BudgetSummary items={items} />

                <ListGroup variant="flush">
                  {items.map((budgetItem) => (
                    <ListGroup.Item
                      className="d-flex justify-content-between align-items-center"
                      key={budgetItem.id}
                    >
                      <div>
                        <strong>{budgetItem.name}</strong>
                        <div className="text-muted small">
                          {budgetItem.category}
                        </div>
                      </div>

                      <div>
                        <span className="me-3">
                          ${Number(budgetItem.amount).toFixed(2)}
                        </span>
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
          )}
        </Col>
      </Row>
    </>
  )
}

export default BudgetPage