
import * as constants from './orderConstants';

const INITAL_STATE =   [{
  _id: undefined,
  invoiceMadeByUserId: undefined,
  invoiceNetAmount: undefined,
  invoiceDiscount: undefined,
}];

export default (state = INITAL_STATE, action) => {
 
  if (action.type === 'UPDATE_NEW_ORDERS') {
    return action.payload.result;
  }

  if (action.type === 'RESET_ORDER_LIST') {
    return [];
  }
  return state.filter(state => state._id !== undefined);
};
  