import api from '../../utils/api';
import {
  API_NEWS,
  API_AUTH_NEWS,
  DELETE_NEWS_FAIL,
  DELETE_NEWS_SUCCESS,
  GET_NEWS_DETAILS_FAIL,
  GET_NEWS_DETAILS_SUCCESS,
  GET_NEWS_FAIL,
  GET_NEWS_SUCCESS,
  POST_NEWS_FAIL,
  POST_NEWS_SUCCESS,
  UPDATE_NEWS_FAIL,
  UPDATE_NEWS_SUCCESS,
} from '../constants';
import { setAlert } from './alert';

const token = localStorage.getItem('_auth');

const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
};

const configFile = {
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}`,
  },
};

// Fetch single NEWS
export const getNews = newsId => async dispatch => {
  try {
    const res = await api().get(API_NEWS + newsId, config);
    dispatch({
      type: GET_NEWS_DETAILS_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: GET_NEWS_DETAILS_FAIL,
      payload: err.response.data.message,
    });
  }
};

// Fetch all NEWS
export const getAllNews = () => async dispatch => {
  try {
    const res = await api().get(API_NEWS, config);
    dispatch({
      type: GET_NEWS_SUCCESS,
      payload: res.data.insight.data,
    });
  } catch (err) {
    dispatch({
      type: GET_NEWS_FAIL,
      payload: err.response.data.message,
    });
    dispatch(setAlert(err.response.data.message, 'error'));
  }
};

// Create or update NEWS
export const createOrUpdateNews = (data, method) => async dispatch => {
  try {
    const res = await api().post(
      method === 'ADD'
        ? API_AUTH_NEWS + '/add'
        : API_AUTH_NEWS + '/' + (data.id ? data.id : data.get('id')),
      data,
      configFile
    );
    dispatch({
      type: method === 'ADD' ? POST_NEWS_SUCCESS : UPDATE_NEWS_SUCCESS,
      payload: res.data.message,
    });
    dispatch(setAlert(res.data.message, 'success'));
  } catch (err) {
    dispatch({
      type: method === 'ADD' ? POST_NEWS_FAIL : UPDATE_NEWS_FAIL,
      payload: err.response.data.message,
    });
    dispatch(setAlert(err.response.data.message, 'error'));
  }
};

// Delete NEWS
export const deleteNews = newsId => async dispatch => {
  try {
    const res = await api().delete(API_AUTH_NEWS + '/' + newsId, config);
    dispatch({
      type: DELETE_NEWS_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert(res.data.message, 'success'));
  } catch (err) {
    dispatch({
      type: DELETE_NEWS_FAIL,
      payload: err.response.data.message,
    });
    dispatch(setAlert(err.response.data.message, 'error'));
  }
};
