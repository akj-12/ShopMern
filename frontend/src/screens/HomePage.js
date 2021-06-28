// import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Products from '../components/Products';
import Sidebar from '../components/Sidebar';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { listProduct } from '../redux/actions/productActions';

// import products from '../products';

const HomePage = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  // fetch products from redux store
  const dispatch = useDispatch();

  // extract values from reducers
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProduct(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ''}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default HomePage;
