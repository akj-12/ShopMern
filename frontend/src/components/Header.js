import React, { useState, useRef, useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

const Header = () => {
  const wrapperRef = useRef(null);
  const [isToggle, setIsToggle] = useState(false);

  /**
   * Hook that alerts clicks outside of the passed ref
   */
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          //   alert('You clicked outside of me!');
        }
      }

      // Bind the event listener
      document.addEventListener('click', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('click', handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(wrapperRef);

  return (
    <header ref={wrapperRef}>
      <Navbar
        bg="light-dark"
        className="shadow mb-3"
        variant="dark"
        expand="lg"
        fixed="top"
        collapseOnSelect
      >
        <Container>
          <Navbar.Brand href="/" className="text-uppercase fw-bold">
            ShopMern
          </Navbar.Brand>
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
              <Nav.Link
                href="/cart"
                className={` fw-bold text-uppercase  d-block .nav-link-item-hover`}
              >
                <button
                  type="button"
                  className="btn btn-outline-primary text-white nav-link-item-hover text-uppercase"
                >
                  <i className="fa fa-shopping-cart mx-2"></i> Cart{' '}
                  <span className="badge badge-danger bg-danger mx-2 fw-bold">
                    9
                  </span>
                  <span className="sr-only">unread messages</span>
                </button>
              </Nav.Link>
              <Nav.Link
                href="/login"
                className=" fw-bold d-block text-uppercase fw-bold"
              >
                <button
                  type="button"
                  className="btn btn-outline-primary text-white nav-link-item-hover text-uppercase fw-bold"
                >
                  <i className="fa fa-user mx-2"></i> Login
                </button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
