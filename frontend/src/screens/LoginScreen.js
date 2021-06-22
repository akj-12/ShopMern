import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../redux/actions/userActions';

const LoginScreen = ({ location, history }) => {
  // initial values
  const initialValues = {
    email: '',
    password: '',
  };

  const [values, setValues] = useState(initialValues);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();

  const validate = () => {
    let emailError = '';
    let passwordError = '';

    // email validation
    const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g;
    if (!values.email) {
      emailError = 'Email is required';
    } else if (!pattern.test(values.email)) {
      emailError = 'Enter valid email address';
    }

    if (!values.password) {
      passwordError = 'password is required';
    }

    if (emailError || passwordError) {
      setEmailError(emailError);
      setPasswordError(passwordError);
      return false;
    }

    return true;
  };

  // extract values from store
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    //   if user exists
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, error, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (validate()) {
      setEmailError('');
      setPasswordError('');
      dispatch(login(values.email, values.password));
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <Row>
      <Col className="vertical-center">
        <FormContainer>
          <div className=" background_color  p-lg-5 p-3">
            <h1 className="text-center">Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} className=" d-grid gap-3">
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={values.email}
                  name="email"
                  onChange={onChangeHandler}
                ></Form.Control>
                <span className="text-danger">{emailError}</span>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={values.password}
                  name="password"
                  onChange={onChangeHandler}
                ></Form.Control>
                <span className="text-danger">{passwordError}</span>
              </Form.Group>

              <Button
                type="submit"
                className="my-4 p-2 text-uppercase shadow fw-bold"
                variant="primary"
              >
                Sign In
              </Button>
            </Form>

            <Row className="py-3">
              <Col>
                New Customer?{' '}
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : '/register'}
                >
                  Register
                </Link>
              </Col>
            </Row>
          </div>
        </FormContainer>
      </Col>
    </Row>
  );
};

export default LoginScreen;
