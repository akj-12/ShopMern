import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/userActions';
import SearchBox from './SearchBox';

const Header = () => {
  const [isToggle, setIsToggle] = useState(false);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHanlder = () => {
    dispatch(logout());
  };

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
        <Container className="d-flex justify-space-between">
          <LinkContainer to="/">
            <Navbar.Brand className="text-uppercase fw-bold">
              ShopMern
            </Navbar.Brand>
          </LinkContainer>

          <LinkContainer to="/cart">
            <Nav.Link
              href="/cart"
              className={` fw-bold text-uppercase  d-block d-sm-none nav-link-item-hover`}
            >
              <button
                type="button"
                className="btn btn-outline-primary text-white nav-link-item-hover text-uppercase"
              >
                <i className="fa fa-shopping-cart mx-2"></i>
                <span className="badge badge-danger bg-danger mx-2 fw-bold">
                  {cartItems.length}
                </span>
                <span className="sr-only">unread messages</span>
              </button>
            </Nav.Link>
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
            <div className="mx-auto ">
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
            </div>
            <Nav
              className="mr-auto text-center"
              onClick={() => setIsToggle(false)}
            >
              <LinkContainer to="/cart" className="d-none d-lg-block">
                <Nav.Link
                  href="/cart"
                  className={` fw-bold text-uppercase  d-block nav-link-item-hover`}
                >
                  <button
                    type="button"
                    className="btn  text-white nav-link-item-hover text-uppercase"
                  >
                    <i className="fa fa-shopping-cart mx-2"></i> Cart
                    <span className="badge badge-danger bg-danger mx-2 fw-bold">
                      {cartItems.length}
                    </span>
                  </button>
                </Nav.Link>
              </LinkContainer>

              {/* toggle logged in user */}
              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id="username"
                  className="fw-bold d-block text-uppercase nav-link-item-hover fw-bold my-auto"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHanlder}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className=" fw-bold d-block text-uppercase nav-link-item-hover fw-bold">
                    <button
                      type="button"
                      className="btn  text-white nav-link-item-hover text-uppercase fw-bold"
                    >
                      <i className="fa fa-user mx-2"></i> Login
                    </button>
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title="Admin"
                  id="adminmenu"
                  className="fw-bold d-block text-uppercase nav-link-item-hover fw-bold my-auto"
                >
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
