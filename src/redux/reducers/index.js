import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import faq from "./faq";
import news from "./news";
import organizations from "./organizations";
import DonorsComments from "./donors-comment";

export default combineReducers({
  alert,
  auth,
  faq,
  news,
  organizations,
  DonorsComments,
});
