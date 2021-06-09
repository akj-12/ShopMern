import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Products from '../components/Products';
import Sidebar from '../components/Sidebar';

// import products from '../products';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data.data.products);
    };
    fetchProducts();
  }, []);
  return (
    <>
      <Row>
        <Col lg={3} sm={12} md={12} className="">
          <h1 className="text-center my-4">Category</h1>
          <Sidebar />
        </Col>
        <Col lg={9} sm={12} md={12}>
          <h1 className="text-center my-3">Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Products product={product} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
