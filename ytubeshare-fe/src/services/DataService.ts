import React from 'react';
import axios from 'axios';

const root = 'http://35.185.181.21:3000';
const API_LIST = {
  VIDEOS: `${root}/api/videos`,
  LOGIN: `${root}/api/login`,
  REGISTER: `${root}/api/register`,
};

const LOCAL_STORAGE_KEY_USERDATA = 'LOCAL_STORAGE_KEY_USERDATA'

export const ServiceProvider = {
  LocalStorageService: {
    persistUserData: (userData) => {
      localStorage.setItem(LOCAL_STORAGE_KEY_USERDATA, JSON.stringify(userData))
    },
    loadUserData: () => {
      const json = localStorage.getItem(LOCAL_STORAGE_KEY_USERDATA)
      console.log("Json => ", json)
      try{
        return (json && json !== '') ? JSON.parse(json) : null
      }
      catch(e){
        return null
      }
    },
    clearUserData: () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY_USERDATA)
    }
  },
  AuthenService: {
    login: async (username, password) => {
      return await axios.post(
        API_LIST.LOGIN,
        {
          email: username,
          password: password
        }
      )
      .then(resp => {
        const authToken = resp.data.auth_token

        return resp
      })
    },
    register: async (username, password) => {
      return await axios.post(
        API_LIST.REGISTER,
        {
          email: username,
          password: password
        }
      )
    },
    addInterceptor: (authToken) => {
      axios.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `${authToken}`;
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    }
  },
  VideoService: {
    getVideos: async () => {
      let result = await axios.get(
        API_LIST.VIDEOS
      );

      return result;
    },
    addVideo: async (video) => {
      return await axios.post(
        API_LIST.VIDEOS,
        video
      )
    },
    getYoutubeVideoDescription: async (youtubeId) => {
      return await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDQvCbxINcLBbZlwYiE9guxTFvqILkExBQ&part=snippet&id=${youtubeId}`
      )
    }
  },
};
