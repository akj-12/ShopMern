import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
import ProtectedRoute from './components/ProtectedRoute';
import UserListScreens from './screens/UserListScreens';
import UserEditScreens from './screens/UserEditScreens';

import NotFoundScreen from './screens/NotFoundScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container fluid>
          <Switch>
            <Route path="/login" exact={true} component={LoginScreen} />
            <Route path="/order/:id" exact={true} component={OrderScreen} />
            <ProtectedRoute
              path="/shipping"
              exact={true}
              component={ShippingScreens}
            />
            <ProtectedRoute
              path="/payment"
              exact={true}
              component={PaymentScreen}
            />
            <ProtectedRoute
              path="/placeorder"
              exact={true}
              component={PlaceOrderScreen}
            />
            <Route path="/register" exact={true} component={RegisterScreens} />
            <ProtectedRoute
              path="/profile"
              exact={true}
              component={ProfileScreens}
            />
            <Route path="/" exact={true} component={HomePage} />
            <Route
              path="/products/:id"
              exact={true}
              component={ProductScreens}
            />
            <Route path="/cart/:id?" exact={true} component={CartScreen} />
            <Route path="/admin/userlist" component={UserListScreens} />
            <Route path="/admin/user/:id/edit" component={UserEditScreens} />
            <Route
              path="/admin/product/:id/edit"
              component={ProductEditScreen}
            />
            <Route path="/admin/productlist" component={ProductListScreen} />
            <Route component={NotFoundScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
