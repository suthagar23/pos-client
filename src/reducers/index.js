
import { combineReducers } from 'redux';
import loginReducer from '../views/login/loginReducer';
import InvoiceItemsReducer from '../views/invoice/invoiceItems/InvoiceItemsReducer';
import invoiceTotalReducer from '../views/invoice/invoiceTotal/invoiceTotalReducer';
import invoiceSearchReducer from '../views/invoice/invoiceSearch/invoiceSearchReducer';

const rootReducer = combineReducers({
  auth: loginReducer,
  invoiceItems: InvoiceItemsReducer,
  invoiceInfo : invoiceTotalReducer,
  invoiceItemSuggestions: invoiceSearchReducer,
});
export default rootReducer;
