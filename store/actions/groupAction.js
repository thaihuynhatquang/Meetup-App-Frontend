import {
  CREATE_GROUP,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_FAIL,
  GET_LIST_GROUP,
  GET_LIST_GROUP_SUCCESS,
  GET_LIST_GROUP_FAIL,
} from './types';
import axios from 'axios';
import { API_URL } from '../../constants/services';
import { Alert } from 'react-native';

export const createGroup = (groupInformation) => {
  return (dispatch, getState) => {
    dispatch(createGroupStarted());
    axios({
      method: 'post',
      url: `${API_URL}/group/`,
      data: groupInformation,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then((res) => {
        let data = res.data;
        dispatch(createGroupSuccess(data));
      })
      .catch((err) => {
        Alert.alert('Timeout of 0ms Exceeded. Server Error');
        dispatch(createGroupFailure(err.message));
      });
  };
};

const createGroupStarted = () => ({
  type: CREATE_GROUP,
});

const createGroupSuccess = (groupInformation) => ({
  type: CREATE_GROUP_SUCCESS,
  groupInformation,
});

const createGroupFailure = (error) => ({
  type: CREATE_GROUP_FAIL,
  error,
});

export const listGroup = () => {
  return (dispatch, getState) => {
    dispatch(getlistGroup());
    axios
      .get(`${API_URL}/group/`)
      .then((res) => {
        let data = res.data;
        dispatch(getlistGroupSuccess(data));
      })
      .catch((err) => {
        Alert.alert('Timeout of 0ms Exceeded. Server Error');
        dispatch(getlistGroupFailure(err.message));
      });
  };
};

const getlistGroup = () => ({
  type: GET_LIST_GROUP,
});

const getlistGroupSuccess = (listGroup) => ({
  type: GET_LIST_GROUP_SUCCESS,
  listGroup,
});

const getlistGroupFailure = (error) => ({
  type: GET_LIST_GROUP_FAIL,
  error,
});
