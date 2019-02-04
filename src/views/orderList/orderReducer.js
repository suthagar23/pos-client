
import * as constants from './orderConstants';

const INITAL_STATE =   [{
  _id: undefined,
  invoiceMadeByUserId: undefined,
  invoiceNetAmount: undefined,
  invoiceDiscount: undefined,
}];

export default (state = INITAL_STATE, action) => {
 
  if (action.type === constants.UPDATE_NEW_ORDERS) {
    return action.payload.result;
  }

  if (action.type === constants.RESET_ORDER_LIST) {
    return [];
  }
  return state.filter(state => state._id !== undefined);
};
  