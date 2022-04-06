import {
  GET_LIST,
  GET_LIST_SUCCESS,
  GET_LIST_FAILURE,
} from 'actions/Auth/actionTypes';

const initialState = {
  getListLoading: false,
  posts: [],
};

const getList = (state, action) => ({
  ...state,
  getListLoading: true,
});

const getListSuccess = (state, action) => {
  console.log('check the data in reducer', action);
  return {
    ...state,
    getListLoading: false,
    posts: action.payload,
  };
};

const getListFailed = (state, action) => ({
  ...state,
  getListLoading: false,
  posts: [],
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST:
      return getList(state, action);
    case GET_LIST_SUCCESS:
      return getListSuccess(state, action);
    case GET_LIST_FAILURE:
      return getListFailed(state, action);
    default:
      return state;
  }
};

export default authReducer;
