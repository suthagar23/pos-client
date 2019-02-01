
import { combineReducers } from 'redux';
import loginReducer from '../views/login/loginReducer';
import InvoiceItemsReducer from '../views/invoice/invoiceItems/InvoiceItemsReducer';
import invoiceTotalReducer from '../views/invoice/invoiceTotal/invoiceTotalReducer';
import invoiceSearchReducer from '../views/invoice/invoiceSearch/invoiceSearchReducer';
import orderReducer from '../views/orderList/orderReducer';
import notificationReducer from '../components/notification/notificationReducer';

const rootReducer = combineReducers({
  auth: loginReducer,
  invoiceItems: InvoiceItemsReducer,
  invoiceInfo : invoiceTotalReducer,
  invoiceItemSuggestions: invoiceSearchReducer,
  orderLists: orderReducer,
  notifications: notificationReducer,
});
export default rootReducer;
