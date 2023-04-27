import api from '../../utils/api';
import {
  API_AUTH_FAQ,
  API_FAQ,
  DELETE_FAQ_FAIL,
  DELETE_FAQ_SUCCESS,
  GET_FAQ_FAIL,
  GET_FAQ_SUCCESS,
  POST_FAQ_FAIL,
  POST_FAQ_SUCCESS,
  UPDATE_FAQ_FAIL,
  UPDATE_FAQ_SUCCESS,
} from '../constants';
import { setAlert } from './alert';

const token = localStorage.getItem('_auth');

const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
};

// Fetch FAQs
export const getFaqs = () => async dispatch => {
  try {
    const res = await api().get(API_FAQ, config);
    dispatch({
      type: GET_FAQ_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: GET_FAQ_FAIL,
      payload: err.response.data.message,
    });
    dispatch(setAlert(err.response.data.message, 'error'));
  }
};

// Create or update FAQ
export const createOrUpdateFaq = (data, method) => async dispatch => {
  try {
    const res = await api().post(
      method === 'ADD' ? API_AUTH_FAQ + '/add' : API_AUTH_FAQ + '/' + data?.id,
      data,
      config
    );
    dispatch({
      type: method === 'ADD' ? POST_FAQ_SUCCESS : UPDATE_FAQ_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert(res.data.message, 'success'));
  } catch (err) {
    dispatch({
      type: method === 'ADD' ? POST_FAQ_FAIL : UPDATE_FAQ_FAIL,
      payload: err.response.data.message,
    });
    dispatch(setAlert(err.response.data.message, 'error'));
  }
};

// Delete FAQ
export const deleteFaq = faqId => async dispatch => {
  try {
    const res = await api().delete(API_AUTH_FAQ + '/' + faqId, config);
    dispatch({
      type: DELETE_FAQ_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert(res.data.message, 'success'));
  } catch (err) {
    dispatch({
      type: DELETE_FAQ_FAIL,
      payload: err.response.data.message,
    });
    dispatch(setAlert(err.response.data.message, 'error'));
  }
};
