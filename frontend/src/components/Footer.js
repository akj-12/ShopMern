import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container fluid>
        <Row>
          <Col className="bg-light-dark text-white fw-bold text-center p-4 mt-2">
            Copyright &copy; 2020 MernShop <br />
            Code on :
            <a
              href="http://www.github.com/akj-12/shopmern"
              target="_blank"
              rel="noreferrer"
            >
              &nbsp; Github
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
