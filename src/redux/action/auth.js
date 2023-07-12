import axios from "../../axios/index";
import { USER_LOG_IN, USER_LOG_OUT } from "../actionTypes/authentication";
import store from "../store";

export const handleUserLogin = async (userData) => {
  try {
    const loginRes = await axios.post("auth/login", userData);

    if (loginRes.data) {
      store.dispatch({
        type: USER_LOG_IN,
      });
    }
  } catch (e) {
    throw e.response;
  }
};

export const handleUserLogout = async () => {
  try {
    store.dispatch({
      type: USER_LOG_OUT,
    });
    window.location = "/";
  } catch (e) {
    throw e.code;
  }
};
