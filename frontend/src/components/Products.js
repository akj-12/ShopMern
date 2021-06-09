import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import Rating from './Ratings';

const Products = ({ product }) => {
  return (
    <>
      <Card className="p-2 m-3">
        <Link to={`/products/${product._id}`}>
          <Card.Img src={`${product.image}`} varient="top" />
        </Link>
        <Card.Body>
          <Link to={`/products/${product._id}`}>
            <Card.Title as="div" className="text-center">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>

          <div className="d-flex justify-content-between align-items-center">
            <Card.Text as="div">
              <div className="my-2 text-center  ">
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </div>
            </Card.Text>
            <Card.Text as="h3">${product.price}</Card.Text>
          </div>
          <hr />
          <div className="d-grid gap-1">
            <Button
              variant="dark"
              className="text-uppercase fw-bold"
              disabled={product.countInStock > 0 ? false : true}
            >
              {product.countInStock > 0 ? 'Add to cart' : 'Out of stock'}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default Products;
