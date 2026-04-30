import { Badge } from 'react-bootstrap'

function StatusBadge({ status }) {
  let variant = 'secondary'

  if (status === 'Booked') variant = 'success'
  else if (status === 'Planning') variant = 'warning'
  else if (status === 'Draft') variant = 'secondary'

  return <Badge bg={variant}>{status}</Badge>
}

export default StatusBadge