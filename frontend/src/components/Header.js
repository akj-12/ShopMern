import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

const Header = () => {
  const [isToggle, setIsToggle] = useState(false);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <header>
      <Navbar
        bg="light-dark"
        className="shadow mb-3"
        variant="dark"
        expand="md"
        fixed="top"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="text-uppercase fw-bold">
              ShopMern
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav "
            className="border-0"
            onClick={() => setIsToggle(!isToggle)}
          >
            <i
              className={`${
                isToggle ? 'fa fa-times text-white' : 'fas fa-bars text-white'
              }`}
            ></i>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto text-center">
              <LinkContainer to="/cart">
                <Nav.Link
                  href="/cart"
                  className={` fw-bold text-uppercase  d-block .nav-link-item-hover`}
                >
                  <button
                    type="button"
                    className="btn btn-outline-primary text-white nav-link-item-hover text-uppercase"
                  >
                    <i className="fa fa-shopping-cart mx-2"></i> Cart
                    <span className="badge badge-danger bg-danger mx-2 fw-bold">
                      {cartItems.length}
                    </span>
                    <span className="sr-only">unread messages</span>
                  </button>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link className=" fw-bold d-block text-uppercase fw-bold">
                  <button
                    type="button"
                    className="btn btn-outline-primary text-white nav-link-item-hover text-uppercase fw-bold"
                  >
                    <i className="fa fa-user mx-2"></i> Login
                  </button>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
