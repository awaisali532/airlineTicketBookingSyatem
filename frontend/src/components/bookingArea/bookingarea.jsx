import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Dropdown } from "react-bootstrap";
import { FaExchangeAlt, FaPlaneDeparture } from "react-icons/fa";

const FlightBooking = () => {
    const [tripType, setTripType] = useState("Tour type");
    const [passengers, setPassengers] = useState("1 Passenger, Economy");

    return (
        <Container className="p-4 bg-light rounded shadow">
            {/* Tabs */}
            <Row className="bg-primary text-white p-2 rounded-top">
                <Col className="text-center fw-bold">✈ AIR BOOKING</Col>
                <Col className="text-center fw-bold">📑 MY TRIPS</Col>
                <Col className="text-center fw-bold">✔ CHECK-IN</Col>
                <Col className="text-center fw-bold">📍 FLIGHT STATUS</Col>
            </Row>

            {/* Flight Selection */}
            <Row className="bg-white p-3 rounded-bottom">
                <Col md={2} className="d-flex align-items-center bg-light p-2">
                    <Form.Group className="w-100">
                        <Form.Label>From</Form.Label>
                        <Form.Control type="text" placeholder="Enter city" />
                    </Form.Group>
                    <FaExchangeAlt className="mx-2 text-primary fs-4" />
                    <Form.Group className="w-100">
                        <Form.Label>To</Form.Label>
                        <Form.Control type="text" placeholder="Enter city" />
                    </Form.Group>
                </Col>

                <Col md={2} className="d-flex align-items-center bg-light p-2">
                    <Form.Label className="w-100">Trip</Form.Label>
                    <Dropdown className="w-100">
                        <Dropdown.Toggle variant="light" className="w-100">
                            {tripType}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setTripType("One Way")}>One Way</Dropdown.Item>
                            <Dropdown.Item onClick={() => setTripType("Round Trip")}>Round Trip</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>

                <Col md={3} className="d-flex align-items-center bg-light p-2">
                    <Form.Group className="w-50">
                        <Form.Label>Depart</Form.Label>
                        <Form.Control type="date" />
                    </Form.Group>
                    <span className="mx-2">-</span>
                    <Form.Group className="w-50">
                        <Form.Label>Return</Form.Label>
                        <Form.Control type="date" />
                    </Form.Group>
                </Col>

                <Col md={3} className="d-flex align-items-center bg-light p-2">
                    <Form.Label className="w-100">Passenger / Class</Form.Label>
                    <Dropdown className="w-100">
                        <Dropdown.Toggle variant="light" className="w-100">
                            {passengers}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setPassengers("1 Passenger, Economy")}>
                                1 Passenger, Economy
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setPassengers("2 Passengers, Business")}>
                                2 Passengers, Business
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>

                <Col md={2} className="d-flex align-items-center">
                    <Button variant="warning" className="w-100 fw-bold">
                        Show Flights <FaPlaneDeparture />
                    </Button>
                </Col>
            </Row>

            {/* Add Promo Code */}
            <Row className="mt-2">
                <Col className="text-center text-primary">+ Add Promo Code</Col>
            </Row>
        </Container>
    );
};

export default FlightBooking;
