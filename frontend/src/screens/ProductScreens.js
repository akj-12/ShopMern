import React, { useEffect, useState } from 'react';

// import products from '../products';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Ratings from '../components/Ratings';
import { listProductDetails } from '../redux/actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreens = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [match, dispatch]);

  const productDetail = useSelector((state) => state.productDetail);
  const { product, error, loading } = productDetail;

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      <Container>
        <Link to="/" className="btn btn-dark my-3 text-uppercase">
          Go Back
        </Link>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row className="my-3">
            <Col md={6} className="my-2">
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
                  Price : ₹ {product.price}
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

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => {
                              setQty(e.target.value);
                            }}
                          >
                            {/* [3] --> [0,1,2] */}
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <div className="d-grid gap-1">
                      <Button
                        onClick={() => addToCartHandler()}
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
        )}
      </Container>
    </>
  );
};

export default ProductScreens;
