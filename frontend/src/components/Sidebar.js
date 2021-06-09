import React from 'react';
import { Button, Card } from 'react-bootstrap';

const Sidebar = () => {
  return (
    <div className="sidebar my-3 sticky-lg-top">
      <Card style={{ maxHeight: '70%' }} className="mt-3 bg-white shadow">
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Sidebar;
