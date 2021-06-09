import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './screens/HomePage';
import ProductScreens from './screens/ProductScreens';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="mx-2">
        <Container fluid>
          <Route path="/" component={HomePage} exact />
          <Route path="/products/:id" component={ProductScreens} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
