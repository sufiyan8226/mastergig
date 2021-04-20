
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup, Container } from '@themesberg/react-bootstrap';


export const BroadcastAllUsers = () => {
  const [dateTime, setDateTime] = useState("");
  
  var yesterday = moment().subtract(1, 'day');
  var valid = function (current) {
    return current.isAfter(yesterday);
  };

  return (
    <Container className="px-0">
      <h1 className="h1">Broadcast to all users</h1>
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Broadcast Information</h5>
          <Form>
            <Row>
              <Col className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>System Message</Form.Label>
                  <Form.Control required type="text" placeholder="Enter system message" />
                </Form.Group>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col md={6} className="mb-3">
                <Form.Group id="date">
                  <Form.Label>Date</Form.Label>
                  <Datetime
                    isValidDate={valid}
                    onChange={setDateTime}
                    renderInput={(props, openCalendar) => (
                      <InputGroup>
                        <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                        <Form.Control
                          required
                          type="text"
                          value={dateTime ? moment(dateTime).format("MM/DD/YYYY hh:mm A") : ""}
                          placeholder="mm/dd/yyyy hh:mm AM/PM"
                          onFocus={openCalendar}
                          onChange={() => { }} />
                      </InputGroup>
                    )} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={4} className="mb-3">
                <Form.Group className="mb-2">
                  <Form.Label>Select users</Form.Label>
                  <Form.Select id="state" defaultValue="0">
                    <option value="0">All Users</option>
                    
                  </Form.Select>
                </Form.Group>
              </Col>

            </Row>
            <div className="mt-3">
              <Button variant="primary" type="submit">Broadcast Message</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BroadcastAllUsers;
