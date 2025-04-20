import React from "react";
import SimpleHeader from "../../components/simpleHeader/SimpleHeader";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlaneDeparture, FaGlobe, FaHeadset } from "react-icons/fa";
import "./About.css";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <div>
      <SimpleHeader />
      <Container className="py-5 text-center ">
        <Row>
          <Col>
            <h1 className="fw-bold text-secondary-custom">
              Welcome to FlyEase
            </h1>
            <p className="lead text-muted about-p">
              Your trusted airline ticket booking system, ensuring smooth and
              hassle-free travel experiences worldwide.
            </p>
          </Col>
        </Row>
        <Row className="mt-4 justify-content-center">
          <Col md={4} className="p-3 d-flex justify-content-center">
            <Card
              className=" border-0 p-4 text-center hover_effect"
              style={{ width: "18rem" }}
            >
              <div className="d-flex justify-content-center">
                <FaPlaneDeparture size={50} className="text-danger mb-3" />
              </div>
              <Card.Body>
                <Card.Title>Seamless Booking</Card.Title>
                <Card.Text className="text-muted">
                  Book flights effortlessly with our user-friendly platform,
                  offering the best deals from leading airlines.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="p-3 d-flex justify-content-center">
            <Card
              className=" border-0 p-4 text-center hover_effect"
              style={{ width: "18rem" }}
            >
              <div className="d-flex justify-content-center">
                <FaGlobe size={50} className="text-success mb-3" />
              </div>
              <Card.Body>
                <Card.Title>Global Reach</Card.Title>
                <Card.Text className="text-muted">
                  Access thousands of destinations with our wide network of
                  airline partners, making global travel easy.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="p-3 d-flex justify-content-center">
            <Card
              className=" border-0 p-4 text-center hover_effect"
              style={{ width: "18rem" }}
            >
              <div className="d-flex justify-content-center">
                <FaHeadset size={50} className="text-warning mb-3" />
              </div>
              <Card.Body>
                <Card.Title>24/7 Support</Card.Title>
                <Card.Text className="text-muted">
                  Our dedicated support team is available around the clock to
                  assist you with your travel needs.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Link
              to={"/flightdetails"}
              className="custom_btn hover-btn"
              size="lg"
            >
              Explore Flights
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
