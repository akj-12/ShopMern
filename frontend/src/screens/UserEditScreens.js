import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser } from '../redux/actions/userActions';
import { USER_UPDATE_RESET } from '../redux/constants/userConstants';

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const [name, setName] = useState(user.name ? user.name : '');
  const [email, setEmail] = useState(user.email ? user.email : '');

  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/userlist');
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, userId, user, successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-dark my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1 className="text-center">Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        <div className="background_color p-5">
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler} className=" d-grid gap-3">
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="isadmin">
                <Form.Check
                  type="checkbox"
                  label="Is Admin"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                ></Form.Check>
              </Form.Group>

              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          )}
        </div>
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
