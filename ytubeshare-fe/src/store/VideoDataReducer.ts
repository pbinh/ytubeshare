import { createAction, createSlice } from '@reduxjs/toolkit';
import { UserData } from '../types/UserData'
import { useInjectReducer } from 'redux-injectors';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ServiceProvider } from '../services/DataService'
import { VideoManager, YoutubeVideo } from 'types/YoutubeVideo';

const initialState: VideoManager = {
  videos: [],
  isFetching: true
};

const callApiToFetchVideos = (payload) => {
    return ServiceProvider
            .VideoService
            .getVideos()
            .then(resp => resp.data)
}

export function* fetchVideos(action) {
  console.log("Inside fetchVideos")
  try{
    const payload = action.payload;
    const data = yield call(callApiToFetchVideos, payload);
    console.log("Success get videos", data.videos)
    yield put(onFetchVideosSuccess({ videos: data.videos }));
  }
  catch(e) {
    console.log("Failed get token")
    console.log(e)
    yield put(onFetchVideosFailed({ videos: [] }));
  }
}

export function* fetchVideosSaga() {
  console.log("Inside getTokenSaga")
  yield takeLatest(onFetchVideos, fetchVideos);
}

const videos = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    onFetchVideos: (state, action) => {
      return { ...state, isFetching: true }
    },
    onFetchVideosSuccess: (state, action) => {
      return {...action.payload, isFetching: false}
    },
    onFetchVideosFailed: (state, action) => {
      return { ...state, isFetching: false}
    },
  },
});

export const { onFetchVideos, onFetchVideosSuccess, onFetchVideosFailed } =
  videos.actions;

export default videos.reducer;
