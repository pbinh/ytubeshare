import { all } from 'redux-saga/effects';
import { getTokenSaga, reloginSaga } from './UserDataReducer';

export default function* rootSaga() {
  yield all([getTokenSaga(), reloginSaga()]);
}
