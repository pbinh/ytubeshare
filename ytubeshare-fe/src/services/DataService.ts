import React from 'react';
import axios from 'axios';

const root = 'http://localhost:3000';
const API_LIST = {
  VIDEOS: `${root}/api/videos`,
  LOGIN: `${root}/api/login`,
  REGISTER: `${root}/api/register`,
};

export const ServiceProvider = {
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
        axios.interceptors.request.use(
          (config) => {
            config.headers.Authorization = `${authToken}`;
            return config;
          },
          (error) => {
            return Promise.reject(error);
          }
        );

        return resp
      })
    },
    register: async (username, password) => {
      return await axios.post(
        API_LIST.REGISTER,
        {
          username: username,
          password: password
        }
      )
    },
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
    }
  },
};
