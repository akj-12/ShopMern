import React from 'react';
import products from '../products';
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Ratings from '../components/Ratings';

const ProductScreens = ({ match }) => {
  const product = products.find((product) => product._id === match.params.id);
  return (
    <>
      <Container>
        <Link to="/" className="btn btn-dark my-3 text-uppercase">
          Go Back
        </Link>
        <Row className="my-3">
          <Col md={6} classname="my-2">
            <Image src={product.image} fluid className="shadow" />
          </Col>
          <Col md={3}>
            <ListGroup className=" my-3" varient="flush">
              <ListGroup.Item>
                <h3 className="text-center">{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item className="text-center">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item className="text-center">
                Price : ${product.price}
              </ListGroup.Item>
              <ListGroup.Item>
                Description : {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3} className="my-3 text-uppercase">
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col className="text-uppercase">price :</Col>
                    <Col>
                      <strong>{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col className="text-uppercase">Status :</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid gap-1">
                    <Button
                      variant="dark"
                      className="text-uppercase fw-bold"
                      disabled={product.countInStock > 0 ? false : true}
                    >
                      {product.countInStock > 0
                        ? 'Add to cart'
                        : 'Out of stock'}
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductScreens;
