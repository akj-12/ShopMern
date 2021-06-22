import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getUserDetails,
  updateUserProfile,
} from '../redux/actions/userActions';

const ProfileScreen = ({ location, history, getState }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const validate = () => {
    let emailError = '';
    let passwordError = '';
    let nameError = '';
    let confirmPasswordError = '';

    // email validation
    const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g;
    if (!email) {
      emailError = 'Email is required';
    } else if (!pattern.test(email)) {
      emailError = 'Enter valid email address';
    }

    if (!password) {
      passwordError = 'password is required';
    }
    if (!name) {
      nameError = 'password is required';
    }
    if (!confirmPassword) {
      confirmPasswordError = 'confirm password is required';
    }

    if (confirmPassword !== password) {
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

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (validate()) {
      setEmailError('');
      setPasswordError('');
      setNameError('');
      setConfirmPasswordError('');

      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row className="m-2 m-lg-5 ">
      {loading && <Loader />}
      <Col md={3} className="background_color p-lg-5 p-3 my-2  custom-shadow">
        <h2 className="text-center">User Profile</h2>
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}

        <Form onSubmit={submitHandler} className="d-grid gap-3">
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
            <span className="text-danger">{nameError}</span>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
            <span className="text-danger">{emailError}</span>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password Address</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
            <span className="text-danger">{passwordError}</span>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
            <span className="text-danger">{confirmPasswordError}</span>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="text-uppercase fw-bold"
          >
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2 className="text-center">My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
