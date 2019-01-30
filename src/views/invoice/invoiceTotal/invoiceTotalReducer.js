import * as constants from './invoiceTotalConstants';

const INITAL_STATE =  { 
  invoiceId : undefined,
  invoiceGrossAmount : 0,
  invoiceDiscount: 0,
  invoiceNetAmount: 0,
};

export default (state = INITAL_STATE, action) => {

  if (action.type === constants.UPDATE_GROSSAMOUNT) {
    console.log('UPDATE_GROSSAMOUNT', action.payload);
    return Object.assign({}, state, {
      ...state,
      invoiceGrossAmount:action.payload.grossAmount,
      invoiceDiscount: action.payload.discount,
      invoiceNetAmount: action.payload.netAmount,
    });
  }
  
  if (action.type === constants.RESET_INVOICE_TOTAL) {
    return INITAL_STATE;
  }

  return  state;
};