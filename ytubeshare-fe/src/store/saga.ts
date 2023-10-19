import { all } from 'redux-saga/effects';
import { getTokenSaga } from './UserDataReducer';

export default function* rootSaga() {
  yield all([getTokenSaga()]);
}
