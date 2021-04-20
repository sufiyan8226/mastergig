import React from "react";
import { Breadcrumb,Card, Button,Alert, Badge } from '@themesberg/react-bootstrap';
import {Link} from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import UpdateGigPlan from "./GigPlanUpdateFormCC";
import GigAllPending from "./GigAllPending";



const GigHome = () => {

  const submitHandler = (e) => {
    e.preventDefault();

    confirmAlert({
      title: "Confirm",
      message:
        "Are you sure you want to delete this gig plan ?" ,
        
      buttons: [
        {
          label: "Yes",
          onClick: () => alert("done")
          // onClick: () => this.deleteCem()
        },
        {
          label: "No",
          onClick: () => alert("done")
          //onClick: () => this.props.history.push("/cemeteries")
        }
      ]
    });
  };

  return (
    <>
    <Breadcrumb listProps={{ className: "breadcrumb-primary breadcrumb-text-light text-white" }}>
        <Breadcrumb.Item href="/user/profile">Profile</Breadcrumb.Item>
        <Breadcrumb.Item active>View my gig plans</Breadcrumb.Item>
    </Breadcrumb>
    <Card>
       <Card.Header>Breakdancing</Card.Header>
       <Card.Body>
       <Card.Title > <Alert variant="primary"> Masterclass to breakdancing</Alert></Card.Title>
       <Badge bg="success" className="me-1">$500</Badge>
      
       <Card.Text>
       Learn all the major components of Breakdancing (footwork, ground, freezes moves): Footwork moves. Learn cool footwork moves that you can do vertically.
       10 sessions
       </Card.Text>
       <Link to="/gigs/gigId/update" components={UpdateGigPlan}> <Button variant="primary" >Update Gig Plan </Button></Link> &nbsp;&nbsp;&nbsp;
      <Link to="/gigs/gigId/delete"> <Button variant="dark" onClick={submitHandler}>Delete Gig Plan</Button></Link>&nbsp;&nbsp;&nbsp;
      <Link to="/gigs/gigId/view-all-request" components={GigAllPending}><Button variant="dark"  >View All Request </Button></Link>
     </Card.Body>
    </Card>
    <br/>
    <br/>
  <Card>
  <Card.Header>Cosplay for your special event</Card.Header>
  <Card.Body>
    <Card.Title><Alert variant="primary">I offer singing ,dancing and cosplay services for your special event</Alert></Card.Title>
    <Badge bg="success" className="me-1">$200</Badge>
    <Card.Text>
      One time fee for a 3 hour session. Contact me for more details
    </Card.Text>
    <Link to="/gigs/gigId/update"> <Button variant="primary">Update Gig Plan </Button></Link> &nbsp;&nbsp;&nbsp;
    <Link to="/gigs/gigId/delete"> <Button variant="dark" onClick={submitHandler}>Delete Gig Plan</Button></Link>&nbsp;&nbsp;&nbsp;
    <Link to="/gigs/gigId/view-all-request"><Button variant="dark">View All Request </Button></Link>
  </Card.Body>
  </Card>
 </>
  );
};

export default GigHome;