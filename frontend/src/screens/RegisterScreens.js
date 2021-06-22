import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../redux/actions/userActions';

const RegisterScreen = ({ location, history }) => {
  // initial values
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  };

  const [values, setValues] = useState(initialValues);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [serverError, setServerError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const dispatch = useDispatch();

  const validate = () => {
    let emailError = '';
    let passwordError = '';
    let nameError = '';
    let confirmPasswordError = '';

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
    if (!values.name) {
      nameError = 'password is required';
    }
    if (!values.confirmPassword) {
      confirmPasswordError = 'confirm password is required';
    }

    if (values.confirmPassword !== values.password) {
      confirmPasswordError = 'confirm password not matched';
    }

    if (emailError || passwordError || nameError || confirmPasswordError) {
      setEmailError(emailError);
      setPasswordError(passwordError);
      setNameError(nameError);
      setConfirmPasswordError(confirmPasswordError);
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
    setServerError(error);
  }, [history, error, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (serverError) {
      setServerError('');
    }

    if (validate()) {
      setEmailError('');
      setPasswordError('');
      setNameError('');
      setConfirmPasswordError('');
      setShowAlert(
        true,
        setTimeout(() => {
          setShowAlert(false);
        }, 10000)
      );

      dispatch(register(values.name, values.email, values.password));
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
          <div className=" background_color  p-3 p-lg-5">
            <h1 className="text-center">Sign Up</h1>
            {serverError && (
              <Message variant="danger" show={showAlert}>
                {serverError}
              </Message>
            )}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} className=" d-grid gap-3">
              <Form.Group controlId="email">
                <Form.Label>Name : </Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={values.name}
                  name="name"
                  onChange={onChangeHandler}
                ></Form.Control>
                <span className="text-danger">{nameError}</span>
              </Form.Group>

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
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={values.confirmPassword}
                  name="confirmPassword"
                  onChange={onChangeHandler}
                ></Form.Control>
                <span className="text-danger">{confirmPasswordError}</span>
              </Form.Group>

              <Button
                type="submit"
                className="my-4 p-2 text-uppercase fw-bold"
                variant="primary"
              >
                Sign Up
              </Button>
            </Form>

            <Row className="py-3">
              <Col>
                Have an account ?
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                  &nbsp;Login
                </Link>
              </Col>
            </Row>
          </div>
        </FormContainer>
      </Col>
    </Row>
  );
};

export default RegisterScreen;
