

import React from "react";
import { Card, Table, Button, ButtonGroup, Row, Col, InputGroup, Form, Dropdown, Container } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCog, faCheck, faSearch, faSlidersH } from '@fortawesome/free-solid-svg-icons';

export default () => (

  <Container className="px-0">
    <div className="d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
      <div className="mb-4 mb-lg-0">

        <h1>Reports List</h1>

      </div>
      
    </div>
    <div className="table-settings mb-4">
      <Row className="justify-content-between align-items-center">
        <Col xs={9} lg={4} className="d-flex">
          <InputGroup className="me-2 me-lg-3">
            <InputGroup.Text>
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <Form.Control type="text" placeholder="Search" />
          </InputGroup>
          <Form.Select className="w-50">
            <option defaultChecked>All</option>
            <option value="1">Read</option>
            <option value="2">Unread</option>
          </Form.Select>
        </Col>
        <Col xs={3} lg={8} className="text-end">
          <Dropdown as={ButtonGroup} className="me-2">
            <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm icon-gray">
                <FontAwesomeIcon icon={faSlidersH} />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-right">
              <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
              <Dropdown.Item className="d-flex fw-bold">
                10 <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
              </Dropdown.Item>
              <Dropdown.Item className="fw-bold">20</Dropdown.Item>
              <Dropdown.Item className="fw-bold">30</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm icon-gray">
                <FontAwesomeIcon icon={faCog} />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-right">
              <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
              <Dropdown.Item className="d-flex fw-bold">
                10 <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
              </Dropdown.Item>
              <Dropdown.Item className="fw-bold">20</Dropdown.Item>
              <Dropdown.Item className="fw-bold">30</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </div>
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body>
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">Report title</th>
              <th className="border-bottom">Status</th>
              <th className="border-bottom">Date</th>

            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Card.Link className="d-flex align-items-center">
                  
                  <div className="d-block">
                    <span className="fw-bold">Hello, placeholder data</span>
                  </div>
                </Card.Link>
              </td>
              <td>Unread</td>
              <td>January 20, 2021</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>


  </Container>

);
