import { Card, ListGroup } from "react-bootstrap";

export default function TripTips() {
  return (
    <Card className="shadow-sm mt-4">
      <Card.Body>
        <Card.Title>Planner Tips</Card.Title>
        <Card.Text>
          Before you start planning, here are some tips to keep in mind:
        </Card.Text>

        <ListGroup variant="flush">
          <ListGroup.Item>Don't underestimate transportation and food costs!</ListGroup.Item>
          <ListGroup.Item>Plan one step at a time! It's easy to get overwhelmed when planning</ListGroup.Item>
          <ListGroup.Item>If travelling with others, make sure to be on the same page. (P.s. you can share this planner with them!)</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}