import { Card } from 'react-bootstrap'

function BudgetSummary({ items }) {
  const total = items.reduce((sum, item) => sum + Number(item.amount), 0)

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title className="h6">Total Budget</Card.Title>
        <h1>${total.toFixed(2)}</h1>
      </Card.Body>
    </Card>
  )
}

export default BudgetSummary