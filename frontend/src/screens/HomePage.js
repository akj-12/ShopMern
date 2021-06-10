// import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Products from '../components/Products';
import Sidebar from '../components/Sidebar';
import { listProduct } from '../redux/actions/productActions';

// import products from '../products';

const HomePage = () => {
  /*
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data.data.products);
    };
    fetchProducts();
  }, []);
  */

  // fetch products from redux store
  const dispatch = useDispatch();

  // extract values from reducers
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);

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
