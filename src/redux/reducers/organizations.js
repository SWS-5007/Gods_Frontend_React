import {
  GET_ORGANIZATIONS_SUCCESS,
  GET_ORGANIZATIONS_FAIL,
  CREATE_ORGANIZATIONS_SUCCESS,
  UPDATE_ORGANIZATIONS_SUCCESS,
  DELETE_ORGANIZATIONS_SUCCESS,
  CREATE_ORGANIZATIONS_FAIL,
  UPDATE_ORGANIZATIONS_FAIL,
  DELETE_ORGANIZATIONS_FAIL,
} from '../constants';

const initialState = {
  loading: true,
  error: '',
  organizationsList: [],
  organization: '',
};

export default function organizations(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ORGANIZATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        organizationsList: payload,
      };
    case CREATE_ORGANIZATIONS_SUCCESS:
    case UPDATE_ORGANIZATIONS_SUCCESS:
    case DELETE_ORGANIZATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        organization: payload,
      };
    case GET_ORGANIZATIONS_FAIL:
    case CREATE_ORGANIZATIONS_FAIL:
    case UPDATE_ORGANIZATIONS_FAIL:
    case DELETE_ORGANIZATIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
