import { CREATE_GROUP, CREATE_GROUP_SUCCESS, CREATE_GROUP_FAIL } from '../actions/types';

const initialState = {
  groupInformation: {
    id: '',
    name: '',
    category: '',
    adminID: '',
    member: [],
    avatar: '',
  },
  loadingGroup: false,
  error: null,
};

export default (groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_GROUP:
      return {
        ...state,
        loadingGroup: true,
        groupInformation: {
          id: '',
          name: '',
          category: '',
          adminID: '',
          member: [],
          avatar: '',
        },
      };
    case CREATE_GROUP_SUCCESS:
      return {
        ...state,
        loadingGroup: false,
        groupInformation: action.groupInformation,
      };
    case CREATE_GROUP_FAIL:
      return {
        ...state,
        loadingGroup: false,
        error: action.error,
        groupInformation: {
          id: '',
          name: '',
          category: '',
          adminID: '',
          member: [],
          avatar: '',
        },
      };
    default:
      return state;
  }
});
