import { ADD_TOASTS, CLEAR_TOASTS } from '../actions/types'
import shortid from 'shortid'

const initialState = {
  toastQueue: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_TOASTS:
      return {
      };
    case CLEAR_TOASTS:
      return {};
    default:
      return state;
  }
};
