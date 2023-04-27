import api from '../../utils/api';
import {
  API_ORGANIZATION,
  API_AUTH_ORGANIZATION,
  CREATE_ORGANIZATIONS_FAIL,
  CREATE_ORGANIZATIONS_SUCCESS,
  GET_ORGANIZATIONS_FAIL,
  GET_ORGANIZATIONS_SUCCESS,
} from '../constants';
import { setAlert } from './alert';

const token = localStorage.getItem('_auth');

const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
};

export const getOrganizations = () => async dispatch => {
  try {
    const res = await api().get(API_ORGANIZATION, config);
    dispatch({
      type: GET_ORGANIZATIONS_SUCCESS,
      payload: res.data.data,
    });
    dispatch(setAlert('Organizations loaded', 'success'));
  } catch (err) {
    dispatch({
      type: GET_ORGANIZATIONS_FAIL,
      payload: err.response.data.message,
    });
    dispatch(setAlert(err.response.data.message, 'error'));
  }
};

// Create or update NEWS
export const createOrganization = data => async dispatch => {
  try {
    const res = await api().post(API_AUTH_ORGANIZATION + '/add', data, config);
    dispatch({
      type: CREATE_ORGANIZATIONS_SUCCESS,
      payload: res.data.data,
    });
    dispatch(setAlert(res.data.message, 'success'));
  } catch (err) {
    dispatch({
      type: CREATE_ORGANIZATIONS_FAIL,
      payload: err.response.data.message,
    });
    dispatch(setAlert(err.response.data.message, 'error'));
  }
};
