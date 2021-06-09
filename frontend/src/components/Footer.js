import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container fluid>
        <Row>
          <Col className="bg-light-dark text-white fw-bold text-center p-4 mt-2">
            Copyright &copy; 2020 MernShop
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
