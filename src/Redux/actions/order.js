import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const orderActionTypes = {
  SET_ALERT: "SET_ALERT",
  REMOVE_ALERT: "REMOVE_ALERT",
  ADD_ORDER_INIT: "ADD_ORDER_INIT",
  ADD_ORDER_SUCCESS: "ADD_ORDER_SUCCESS",
  ADD_ORDER_FAIL: "ADD_ORDER_FAIL",
  GET_ORDER_INIT: "GET_ORDER_INIT",
  GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS",
  GET_ORDER_FAIL: "GET_ORDER_FAIL",
  DELETE_ORDER_INIT: "DELETE_ORDER_INIT",
  DELETE_ORDER_SUCCESS: "DELETE_ORDER_SUCCESS",
  DELETE_ORDER_FAIL: "DELETE_ORDER_FAIL",
  EDIT_ORDER_INIT: "EDIT_ORDER_INIT",
  EDIT_ORDER_SUCCESS: "EDIT_ORDER_SUCCESS",
  EDIT_ORDER_FAIL: "EDIT_ORDER_FAIL",
};

axios.defaults.baseURL = "https://testutilize.herokuapp.com/api/orders";
axios.defaults.headers.common["Content-Type"] = "application/json";

export const setAlert = (message, variant) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: orderActionTypes.SET_ALERT,
    payload: { message, variant, id },
  });

  setTimeout(
    () => dispatch({ type: orderActionTypes.REMOVE_ALERT, payload: id }),
    3000
  );
};

export const removeAlert = (id) => (dispatch) => {
  dispatch({
    type: orderActionTypes.REMOVE_ALERT,
    payload: id,
  });
};

export const getOrder = () => (dispatch) => {
  dispatch({ type: orderActionTypes.GET_ORDER_INIT });
  axios
    .get("/list")
    .then((response) => {
      dispatch({
        type: orderActionTypes.GET_ORDER_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({ type: orderActionTypes.GET_ORDER_FAIL });
      console.log(error);
      dispatch(setAlert("Failed To Load ORDERS", "danger"));
    });
};

export const addOrder = (orderData) => async (dispatch) => {
  dispatch({ type: orderActionTypes.ADD_ORDER_INIT });
  axios({
    method: "post",
    url: "/",
    data: orderData,
  })
    .then((response) => {
      dispatch({
        type: orderActionTypes.ADD_ORDER_SUCCESS,
        payload: response.data,
      });
      dispatch(setAlert("order Added", "success"));
      dispatch(getOrder());
    })
    .catch((error) => {
      dispatch({ type: orderActionTypes.ADD_ORDER_FAIL });
      dispatch(setAlert("Failed to Add order", "danger"));
      console.log(error);
    });
};

export const deleteOrder = (orderData) => async (dispatch) => {
  dispatch({ type: orderActionTypes.DELETE_ORDER_INIT });
  axios({
    method: "delete",
    url: "/" + orderData,
  })
    .then((response) => {
      dispatch({ type: orderActionTypes.DELETE_ORDER_SUCCESS });
      dispatch(getOrder());
      dispatch(setAlert("order Deleted!", "success"));
    })
    .catch((error) => {
      dispatch({ type: orderActionTypes.DELETE_ORDER_FAIL });
      console.log(error);
      dispatch(setAlert("Failed To Delete order", "danger"));
    });
};

export const editOrder = (orderData, orderId) => async (dispatch) => {
  dispatch({ type: orderActionTypes.EDIT_ORDER_INIT });
  axios({
    method: "post",
    url: "/" + orderId,
    data: orderData,
  })
    .then((response) => {
      dispatch({ type: orderActionTypes.EDIT_ORDER_SUCCESS });
      dispatch(getOrder());
      dispatch(setAlert("order Updated", "success"));
    })
    .catch((error) => {
      dispatch({ type: orderActionTypes.EDIT_ORDER_FAIL });
      console.log(error);
      dispatch(setAlert("Failed To Update order", "danger"));
    });
};
