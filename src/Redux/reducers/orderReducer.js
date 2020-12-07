import { orderActionTypes } from "../actions/order";

const {
  SET_ALERT,
  REMOVE_ALERT,
  GET_ORDER_INIT,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  ADD_ORDER_INIT,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAIL,
  DELETE_ORDER_INIT,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  EDIT_ORDER_INIT,
  EDIT_ORDER_SUCCESS,
  EDIT_ORDER_FAIL,
} = orderActionTypes;

const initialState = {
  orders: [],
  loading: false,
  errors: [],
};
const orderReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return { ...state, errors: [payload] };
    case REMOVE_ALERT:
      // eslint-disable-next-line no-case-declarations
      const { errors } = state;
      return {
        ...state,
        errors: errors?.filter((alert) => alert.id !== payload),
      };
    case GET_ORDER_INIT:
      return { ...state, loading: true };
    case GET_ORDER_SUCCESS:
      return { orders: payload, loading: false };
    case GET_ORDER_FAIL:
      return { ...state, loading: false };
    case ADD_ORDER_INIT:
      return { ...state, loading: true };
    case ADD_ORDER_SUCCESS:
      return { ...state, loading: false };
    case ADD_ORDER_FAIL:
      return { ...state, loading: false };
    case DELETE_ORDER_INIT:
      return { ...state, loading: true };
    case DELETE_ORDER_SUCCESS:
      return { ...state, loading: false };
    case DELETE_ORDER_FAIL:
      return { ...state, loading: false };
    case EDIT_ORDER_INIT:
      return { ...state, loading: true };
    case EDIT_ORDER_SUCCESS:
      return { ...state, loading: false };
    case EDIT_ORDER_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default orderReducer;
