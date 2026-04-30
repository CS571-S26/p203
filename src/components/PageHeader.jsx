import { Container } from 'react-bootstrap'

function PageHeader({ title, subtitle }) {
  return (
    <Container className="px-0">
      <h1 className="mb-3">{title}</h1>
      {subtitle && <p className="lead mb-4">{subtitle}</p>}
    </Container>
  )
}

export default PageHeader