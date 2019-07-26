import { GET_USER, GET_USER_SUCCESS, GET_USER_FAIL, REMOVE_USER } from './types';
import axios from 'axios';
import { API_URL } from '../../constants/services';
import { Alert } from 'react-native';

export const loginUser = (userInfo) => {
  return (dispatch, getState) => {
    dispatch(loginUserStarted());
    axios
      .post(`${API_URL}/user/loginWithGoogle`, userInfo)
      .then((res) => {
        let data = res.data;
        axios.defaults.headers.common['authorization'] = data.token;
        dispatch(loginUserSuccess(data.userInformation));
      })
      .catch((err) => {
        Alert.alert('Timeout of 0ms Exceeded. Server Error');
        dispatch(loginUserFailure(err.message));
      });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: REMOVE_USER });
  };
};

const loginUserStarted = () => ({
  type: GET_USER,
});

const loginUserSuccess = (userInformation) => ({
  type: GET_USER_SUCCESS,
  userInformation,
});

const loginUserFailure = (error) => ({
  type: GET_USER_FAIL,
  error,
});
