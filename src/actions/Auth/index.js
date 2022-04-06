import { GET_LIST, GET_LIST_SUCCESS, GET_LIST_FAILURE } from './actionTypes';

export const getList = () => ({
  type: GET_LIST,
});

export const getListSuccess = (data) => ({
  type: GET_LIST_SUCCESS,
  payload: data,
});

export const getListFailure = () => ({
  type: GET_LIST_FAILURE,
});
