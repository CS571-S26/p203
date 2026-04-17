import { Card, ListGroup } from "react-bootstrap";

export default function TripTips() {
  return (
    <Card className="shadow-sm mt-4">
      <Card.Body>
        <Card.Title>Travel Tips</Card.Title>
        <Card.Text>
          Here are a few simple ideas travelers can keep in mind while planning.
        </Card.Text>

        <ListGroup variant="flush">
          <ListGroup.Item>Set a rough budget before choosing activities</ListGroup.Item>
          <ListGroup.Item>Keep important trip details in one place</ListGroup.Item>
          <ListGroup.Item>Plan a mix of sightseeing, food, and free time</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}