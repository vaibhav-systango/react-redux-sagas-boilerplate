import { all, call, put, takeLatest } from 'redux-saga/effects';
import { GET_LIST } from 'actions/Auth/actionTypes';
import { getListSuccess, getListFailure } from 'actions/Auth';
import { getRequest } from './request';
import { pushNotification } from 'utils/notifications';
import URls from 'constants/urls';

function* getJsonData(action) {
  try {
    const response = yield call(getRequest, URls.GET_LIST);
    if (response.data) {
      pushNotification('Get data success', 'success', 'TOP_CENTER', 1000);
      yield put(getListSuccess(response.data));
    }
  } catch (error) {
    pushNotification('Get data failure', 'error', 'TOP_CENTER', 1000);
    yield put(getListFailure());
  }
}

function* watchGetRequest() {
  yield takeLatest(GET_LIST, getJsonData);
}

export default function* sagas() {
  yield all([watchGetRequest()]);
}
