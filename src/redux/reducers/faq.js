import {
  DELETE_FAQ_FAIL,
  DELETE_FAQ_SUCCESS,
  GET_FAQ_FAIL,
  GET_FAQ_SUCCESS,
  POST_FAQ_FAIL,
  POST_FAQ_SUCCESS,
  UPDATE_FAQ_FAIL,
  UPDATE_FAQ_SUCCESS,
} from '../constants';

const initialState = {
  loading: true,
  error: '',
  faqs: [],
  faq: '',
};

export default function faq(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FAQ_SUCCESS:
      return {
        ...state,
        loading: false,
        faqs: payload,
      };
    case POST_FAQ_SUCCESS:
    case UPDATE_FAQ_SUCCESS:
    case DELETE_FAQ_SUCCESS:
      return {
        ...state,
        loading: false,
        faq: payload,
      };
    case GET_FAQ_FAIL:
    case POST_FAQ_FAIL:
    case UPDATE_FAQ_FAIL:
    case DELETE_FAQ_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
