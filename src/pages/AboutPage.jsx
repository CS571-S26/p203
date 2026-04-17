import { Card, ListGroup } from "react-bootstrap";

export default function AboutPage() {
  return (
    <>
      <h1 className="mb-4">About Trip Planner</h1>

      <Card className="shadow-sm">
        <Card.Body>
          <Card.Text>
            Trip Planner is a simple travel website concept that is designed to
            help users organize ideas for upcoming trips in one place.
          </Card.Text>

          <Card.Text>
            The current version is a basic prototype, but the finished website
            will have features that make planning easier and more convenient for
            real users.
          </Card.Text>

          <ListGroup variant="flush">
            <ListGroup.Item>
              A way to browse and compare possible destinations
            </ListGroup.Item>
            <ListGroup.Item>
              Trip pages with travel notes, schedules, and activity ideas
            </ListGroup.Item>
            <ListGroup.Item>
              Budget planning for transportation, food, and lodging
            </ListGroup.Item>
            <ListGroup.Item>
              Personalized recommendations based on user interests
            </ListGroup.Item>
            <ListGroup.Item>
              A cleaner dashboard for managing multiple trips
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
}