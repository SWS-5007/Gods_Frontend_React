import {
  GET_DONORSCOMMENT_FAIL,
  GET_DONORSCOMMENT_SUCCESS,
  POST_DONORSCOMMENT_FAIL,
  POST_DONORSCOMMENT_SUCCESS,
} from "../constants";

const initialState = {
  loading: true,
  error: "",
  donorsComments: [],
  donorComment: "",
};

export default function DonorsComments(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DONORSCOMMENT_SUCCESS:
      return {
        loading: false,
        error: state.error,
        donorsComments: payload,
        donorComment: state.donorComment,
      };
    case POST_DONORSCOMMENT_SUCCESS:
      const previous = state.donorsComments;
      return {
        loading: false,
        error: state.error,
        donorsComments: [...previous, payload],
        donorComment: payload,
      };
    case GET_DONORSCOMMENT_FAIL:
    case POST_DONORSCOMMENT_FAIL:
      return {
        loading: false,
        error: payload,
        donorsComments: [...state.donorsComments],
        donorComment: state.donorComment,
      };
    default:
      return state;
  }
}
