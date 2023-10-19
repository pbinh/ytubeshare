import { createAction, createSlice } from '@reduxjs/toolkit';
import { UserData } from '../types/UserData'
import { useInjectReducer } from 'redux-injectors';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ServiceProvider } from '../services/DataService'

const initialState: UserData = {
  auth_token: undefined,
  email: undefined,
  id: undefined,
  isLoading: false,
  isSuccessLogin: false,
  isFailedLogin: false
};

const getToken = async ({username, password}) => {
  console.log("Inside getToken function")
  return await ServiceProvider
                .AuthenService
                .login(username, password)
                .then(resp => resp.data)
};

// export const getTokenAction = createAction('getToken');

function* callToGetToken(action) {
  console.log("Inside call to get token", action)
  try{
    const payload = action.payload;
    const resp = yield call(getToken, payload);
    console.log("Success get token", resp.auth_token)
    yield put(onLoginSuccess({ ...payload, auth_token: resp.auth_token }));
  }
  catch(e) {
    console.log("Failed get token")
    console.log(e)
    yield put(onLoginFailed({ ...action.payload }));
  }
  
}

export function* getTokenSaga() {
  console.log("Inside getTokenSaga")
  yield takeLatest(onRequestLogin, callToGetToken);
}

const userData = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    onRequestLogin: (state, action) => {
      return { ...state, email: action.payload.username, password: action.payload.password, isSuccessLogin: false, isFailedLogin: false }
    },
    onLoginSuccess: (state, action) => {
      // console.log("Inside Success Login Reducer ==>")
      return { ...state, email: action.payload.username, isLoading: false, auth_token: action.payload.auth_token, isSuccessLogin: true, isFailedLogin: false }
    },
    onLoginFailed: (state, action) => {
      return { ...state, isLoading: false, auth_token: undefined, isLogined: false, isFailedLogin: true, isSuccessLogin: false }
    },
    onRequestRegister: (state, action) => {
      return { ...state, userData: action.payload, isLoading: false };
    },
    onRegisterSuccess: (state, action) => {
      return { ...state, userData: action.payload, isLoading: false };
    },
    onRegisterFailed: (state, action) => {
      return { ...state, userData: action.payload, isLoading: false };
    },
    userLogout: (state, action) => {},
  },
});

export const { onRequestLogin, userLogout, onLoginSuccess, onLoginFailed, onRequestRegister, onRegisterSuccess, onRegisterFailed } =
  userData.actions;

export default userData.reducer;
