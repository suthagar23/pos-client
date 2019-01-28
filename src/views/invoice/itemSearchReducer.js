
import * as constants from './itemSearchConstants';

const INITAL_STATE =   {
  sampleItemId: {
    _id : 'sampleItemId',
    itemName : 'sample',
    unitPrice : 10,
    discountPercentage : undefined,
    quantity : 1,
    amount : 10,
    stockCount: undefined,
  }
 } ;

const updateInvoiceItemsList = (newItemObject, invoiceItems) => {
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

  console.log(updatedInvoiceItems)
  return updatedInvoiceItems;
};

export default (state = INITAL_STATE, action) => {

  if (action.type === constants.EMPTY_SEARCH_VALUE_FOUND) {
    console.log('EMPTY_SEARCH_VALUE_FOUND', action.payload);
  }
  
  if (action.type === constants.FIND_ITEM) {
    console.log('FIND_ITEM', action.payload);
    return(updateInvoiceItemsList(action.payload, state));
  }

  // console.log("State :", state)
  const {sampleItemId, ...remainState} = state;
  return remainState;
};
  