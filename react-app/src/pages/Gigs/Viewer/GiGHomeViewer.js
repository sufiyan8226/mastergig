import React from "react";
import { Breadcrumb,Card, Button } from '@themesberg/react-bootstrap';



const GigHomeViewers = () => {
    return (
      <>
    <Breadcrumb listProps={{ className: "breadcrumb-primary breadcrumb-text-light text-white" }}>
        <Breadcrumb.Item href="/user/profile">Profile</Breadcrumb.Item>
        <Breadcrumb.Item active>View my gig plans</Breadcrumb.Item>
    </Breadcrumb>
    <Card>
       <Card.Header>Breakdancing</Card.Header>
       <Card.Body>
       <Card.Title>Special title treatment</Card.Title>
       <Card.Text>
      With supporting text below as a natural lead-in to additional content.
       </Card.Text>
       <Button variant="primary">Go somewhere</Button>
     </Card.Body>
    </Card>
<Card>
  <Card.Header>Featured</Card.Header>
  <Card.Body>
    <Card.Title>Special title treatment</Card.Title>
    <Card.Text>
      With supporting text below as a natural lead-in to additional content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>

   </>
  );
};

export default GigHomeViewers;