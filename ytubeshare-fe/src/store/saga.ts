import { all } from 'redux-saga/effects';
import { getTokenSaga, reloginSaga } from './UserDataReducer';
import { fetchVideosSaga } from './VideoDataReducer';

export default function* rootSaga() {
  yield all([getTokenSaga(), reloginSaga(), fetchVideosSaga()]);
}
