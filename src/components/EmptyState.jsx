import { Button } from 'react-bootstrap'

function EmptyState({ message, actionLabel, onAction }) {
  return (
    <div className="text-center py-4">
      <p className="text-muted mb-3">{message}</p>
    </div>
  )
}

export default EmptyState