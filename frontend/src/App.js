import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import CartScreen from './screens/CartScreen';
import HomePage from './screens/HomePage';
import LoginScreen from './screens/LoginScreen';
import ProductScreens from './screens/ProductScreens';
import RegisterScreens from './screens/RegisterScreens';
import ProfileScreens from './screens/ProfileScreens';
import ShippingScreens from './screens/ShippingScreens';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container fluid>
          <Route path="/login" component={LoginScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/shipping" component={ShippingScreens} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/register" component={RegisterScreens} />
          <Route path="/profile" component={ProfileScreens} />
          <Route path="/" component={HomePage} exact />
          <Route path="/products/:id" component={ProductScreens} />
          <Route path="/cart/:id?" component={CartScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
