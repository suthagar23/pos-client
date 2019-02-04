
import * as constants from './invoiceItemsConstants';
import { UPDATE_INVOICE_INFO } from '../invoiceTotal/invoiceTotalConstants';

export function updateInvoiceItemsList(newItemObject, invoiceItems) {
  return (dispatch) => { 
    let newObjectItemId = newItemObject._id;
    let { quantity } = newItemObject;
    if (typeof quantity === 'undefined') {
      quantity = 0;
    } 
    const { unitPrice } = newItemObject;
    const updatedQuantity = (typeof quantity === 'undefined') ? 1 : quantity;

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
    dispatch({type: UPDATE_INVOICE_INFO, payload: {invoiceFocusedItem_id: newObjectItemId}});
    return updatedInvoiceItems;
  };
};
