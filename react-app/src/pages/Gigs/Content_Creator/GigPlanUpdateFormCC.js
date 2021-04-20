
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';


const UpdateGigPlan= () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [title,setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  //const gigId  load from store to retrieve id

  const updateStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const updateEndDate= (e) => {
    setEndDate(e.target.value);
  };

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const updateCost = (e) => {
    setCost(e.target.value);
  };







  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Update a gig plan</h5>
        <Form>
       
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Gig Title</Form.Label>
                <Form.Control required type="text" placeholder="Enter gig title" value = {title} onChange ={updateTitle} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Gig Description</Form.Label>
                <Form.Control required type="text" as="textarea" rows={3} placeholder="Write a short description about the gig service you are offering"  value = {description} onChange ={updateDescription} />
              </Form.Group>
            </Col>
         
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="startDate">
                <Form.Label>Start Date availability</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setStartDate}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={startDate ? moment(startDate).format("MM/DD/YYYY") : ""}
                        placeholder="mm/dd/yyyy"
                        onFocus={openCalendar}
                        onChange={updateStartDate} />
                    </InputGroup>
                  )} />
              </Form.Group>
              <Form.Group id="startDate">
                <Form.Label>End Date availability</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setEndDate}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={endDate ? moment(endDate).format("MM/DD/YYYY") : ""}
                        placeholder="mm/dd/yyyy"
                        onFocus={openCalendar}
                        onChange={updateEndDate} />
                    </InputGroup>
                  )} />
              </Form.Group>
            </Col>
           
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Cost</Form.Label>
                <Form.Control required type="number" placeholder="Enter cost here" value = {cost} onChange= {updateCost} />
              </Form.Group>
            </Col>
     
          </Row>

        
        
          <div className="mt-3">
            <Button variant="primary" type="submit">Update Gig Plan</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
export default UpdateGigPlan;
