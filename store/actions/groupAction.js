import { CREATE_GROUP, CREATE_GROUP_SUCCESS, CREATE_GROUP_FAIL } from './types';
import axios from 'axios';
import { API_URL } from '../../constants/services';
import { Alert } from 'react-native';

export const createGroup = (groupInformation) => {
  return (dispatch, getState) => {
    dispatch(createGroupStarted());
    axios({
      method: 'post',
      url: `${API_URL}/group/createGroup`,
      data: groupInformation,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then((res) => {
        let data = res.data;
        console.log(data);
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
