import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import FeatureCard from "../components/FeatureCard";
import TripTips from "../components/TripTips";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <section className="hero-section text-center py-5">
        <h1>Plan Your Next Trip with Ease</h1>
        <p className="lead">
          Trip Planner helps users organize destination ideas, trip details, and
          travel plans in one simple place.
        </p>
        <Button variant="success" onClick={() => navigate("/about")}>
          Learn More
        </Button>
      </section>

      <section>
        <h2 className="mb-4">What You Can Do</h2>
        <Row className="g-4">
          <Col md={4}>
            <FeatureCard
              title="Destination Ideas"
              text="Browse simple travel inspiration and explore possible places to visit."
              buttonText="Explore"
            />
          </Col>
          <Col md={4}>
            <FeatureCard
              title="Trip Planning"
              text="Keep travel notes, schedules, and activity ideas organized in one place."
              buttonText="Plan"
            />
          </Col>
          <Col md={4}>
            <FeatureCard
              title="Budget Tracking"
              text="Estimate costs for transportation, lodging, food, and activities."
              buttonText="View"
            />
          </Col>
        </Row>
      </section>

      <TripTips />
    </>
  );
}