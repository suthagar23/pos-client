
import * as constants from './invoiceItemsConstants';
import { fetchGet } from '../../../utils/restMethods';


export function updateInvoiceItemsList(newItemObject, invoiceItems) {
  return (dispatch) => { 
    let newObjectItemId = newItemObject._id;
    let { quantity } = invoiceItems[newObjectItemId] || {};
    if (typeof quantity === 'undefined') {
      quantity = 0;
    } 
    const { unitPrice } = newItemObject;
    const updatedQuantity = (typeof quantity === 'undefined') ? 0 : quantity + 1;

    const { [newObjectItemId] : existingSameItem, ...OtherInvoiceItems} = invoiceItems;
    const updatedInvoiceItems =  Object.assign({
      [newObjectItemId] : {
        ...newItemObject,
        quantity: updatedQuantity,
        amount: updatedQuantity * unitPrice,
        addedAt: new Date().getTime(),
      }
    }, OtherInvoiceItems);

    dispatch ({ type: constants.ADD_UPDATED_LIST, payload: updatedInvoiceItems });
  };
};
