import { createAction, createSlice } from '@reduxjs/toolkit';
import { UserData } from '../types/UserData'
import { useInjectReducer } from 'redux-injectors';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ServiceProvider } from '../services/DataService'
import { VideoManager, YoutubeVideo } from 'types/YoutubeVideo';

const initialState: VideoManager = {
  videos: [],
  isFetching: true,
  isSuccessAddedVideo: false,
  isFailedAddedVideo: false
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

const callApiToAddVideo = (url:string) => {
  const youtubeId = url.substring(url.indexOf("?v=") + 3, url.length)

  return ServiceProvider
          .VideoService
          .getYoutubeVideoDescription(youtubeId)
          .then(resp => {
            const youtubeData = resp.data.items[0].snippet

            const {title, description} = youtubeData
            
            return ServiceProvider
                    .VideoService.addVideo({
                      title: title,
                      description: description,
                      url: url
                    })
                    .then(resp2 => resp2.data)
          })
}

function* addVideo(action) {
  try{
    const url = action.payload;
    const data = yield call(callApiToAddVideo, url);
    console.log("Success get videos", data.videos)
    yield put(onAddVideoSuccess({}));
  }
  catch(e) {
    console.log("Failed get token")
    console.log(e)
    yield put(onAddVideoFailed({}));
  }
} 

export function* addVideoSaga() {
  console.log("Inside getTokenSaga")
  yield takeLatest(onAddVideo, addVideo);
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
    onAddVideo: (state, action) => {
      return { ...state, isFetching: true, isSuccessAddedVideo: false, isFailedAddedVideo: false }
    },
    onAddVideoSuccess: (state, action) => {
      return { ...state, isFetching: false, isSuccessAddedVideo: true }
    },
    onAddVideoFailed: (state, action) => {
      return { ...state, isFetching: false, isFailedAddedVideo: true }
    },
    onReceiveNewVideo: (state, action) => {
      const newVideos = [action.payload, ...state.videos]
      return {...state, videos: newVideos}
    }
  },
});

export const { onFetchVideos, onFetchVideosSuccess, onFetchVideosFailed, onAddVideo, onAddVideoSuccess, onAddVideoFailed, onReceiveNewVideo } =
  videos.actions;

export default videos.reducer;
