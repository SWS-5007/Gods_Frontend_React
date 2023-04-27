import axios from "../../api/axios";
import { submitContactUsForm } from "../../api/endpoints/contact-us";
import { setAlert } from "./alert";

export const doContactUs = (data) => async (dispatch) => {
  try {
    const res = await axios(submitContactUsForm(data));
    dispatch(setAlert(res.data.message, "success"));
    return res;
  } catch (err) {
    const errorMessage =
      (Object.values(err?.response.data || {}) || []).flat()[0] || "";
    dispatch(setAlert(errorMessage, "error"));
    return err;
  }
};
