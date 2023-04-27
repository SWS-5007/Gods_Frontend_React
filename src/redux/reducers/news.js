import {
  DELETE_NEWS_FAIL,
  DELETE_NEWS_SUCCESS,
  GET_NEWS_DETAILS_SUCCESS,
  GET_NEWS_FAIL,
  GET_NEWS_SUCCESS,
  POST_NEWS_FAIL,
  POST_NEWS_SUCCESS,
  UPDATE_NEWS_FAIL,
  UPDATE_NEWS_SUCCESS,
} from '../constants';

const initialState = {
  loading: true,
  error: '',
  newsList: [],
  news: '',
};

export default function news(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_NEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        newsList: payload,
      };
    case GET_NEWS_DETAILS_SUCCESS:
      return {
        ...state,
        news: payload,
      };
    case POST_NEWS_SUCCESS:
    case UPDATE_NEWS_SUCCESS:
    case DELETE_NEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        news: payload,
      };
    case GET_NEWS_FAIL:
    case POST_NEWS_FAIL:
    case UPDATE_NEWS_FAIL:
    case DELETE_NEWS_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
