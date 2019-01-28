
import { combineReducers } from 'redux';
import loginReducer from '../views/login/loginReducer';
import itemSearchReducer from '../views/invoice/itemSearchReducer';
import invoiceTotalReducer from '../views/invoice/invoiceTotalReducer';


const rootReducer = combineReducers({
  auth: loginReducer,
  invoiceItems: itemSearchReducer,
  invoiceInfo : invoiceTotalReducer,
});
export default rootReducer;
