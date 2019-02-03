import * as constants from './invoiceTotalConstants';
import { formatDateTime } from '../../../utils/commonUtils';

const INITAL_STATE =  { 
  invoiceTitle: 'New Invoice',
  invoiceStartedAt: formatDateTime(new Date()),
  invoiceStartedByName: undefined,
  invoiceStartedById: undefined,
  invoiceId : undefined,
  invoiceGrossAmount : 0,
  invoiceDiscount: 0,
  invoiceNetAmount: 0,
  invoiceTotalQuantity: 0,
  invoiceStatus: 'NEW_ORDER',
  invoiceFocusedItem_id : '',
};

export default (state = INITAL_STATE, action) => {

  if (action.type === constants.UPDATE_GROSSAMOUNT) {
    return Object.assign({}, state, {
      ...state,
      invoiceGrossAmount:action.payload.grossAmount,
      invoiceDiscount: action.payload.discount,
      invoiceNetAmount: action.payload.netAmount,
      invoiceTotalQuantity: action.payload.totalQuantity,
    });
  }
  
  if (action.type === 'UPDATE_INVOICE_INFO') {
    return Object.assign({}, state, {
      ...state,
      ...action.payload
    });
  }

  if (action.type === constants.RESET_INVOICE_TOTAL) {
    return INITAL_STATE;
  }

  return  state;
};