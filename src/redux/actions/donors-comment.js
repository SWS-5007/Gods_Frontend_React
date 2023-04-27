import axios from "../../api/axios";
import {
  submitDonorsComment,
  getDonorsComments,
} from "../../api/endpoints/donors-comments";
import { setAlert } from "./alert";
import {
  GET_DONORSCOMMENT_SUCCESS,
  GET_DONORSCOMMENT_FAIL,
  POST_DONORSCOMMENT_SUCCESS,
  POST_DONORSCOMMENT_FAIL,
} from "../constants";

// Fetch DonorsComments
export const getAllDonorsComments = () => async (dispatch) => {
  try {
    const res = await axios(getDonorsComments());
    console.log("Comments here too", res);
    dispatch({
      type: GET_DONORSCOMMENT_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    console.log("Comments failed here too", err);
    dispatch({
      type: GET_DONORSCOMMENT_FAIL,
      payload: err.response.data.message,
    });
    dispatch(setAlert(err.response.data.message, "error"));
  }
};

// Create or update DonorsComments
export const createDonorsComments = (data) => async (dispatch) => {
  try {
    const res = await axios(submitDonorsComment(data));
    dispatch({
      type: POST_DONORSCOMMENT_SUCCESS,
      payload: res.data.data,
    });
    dispatch(setAlert(res.data.message, "success"));
  } catch (err) {
    dispatch({
      type: POST_DONORSCOMMENT_FAIL,
      payload: err.response.data.message,
    });
    dispatch(setAlert(err.response.data.message, "error"));
  }
};
