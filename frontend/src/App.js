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

const App = () => {
  return (
    <Router>
      <Header />
      <main className="mx-2">
        <Container fluid>
          <Route path="/" component={HomePage} exact />
          <Route path="/products/:id" component={ProductScreens} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/login" component={LoginScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
