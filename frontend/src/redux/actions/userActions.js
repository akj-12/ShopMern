import axios from 'axios';
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // send email password to server and authenticate user and get the response
    const { data } = await axios.post(
      `/api/users/login`,
      { email, password },
      config
    );
    // if success, return data as payload to reducers
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    // store in local storage
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // send details to server and create acc if success
    const { data } = await axios.post(
      `/api/users`,
      { name, email, password },
      config
    );

    // if success, return data as payload to reducers
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    // if success, login user
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    // store in local storage
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    console.log(getState());

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getState().userLogin.userInfo.token,
      },
    };

    // send details to server and get user by id
    const { data } = await axios.get(`/api/users/${id}`, config);

    // if success, return data as payload to reducers
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};
