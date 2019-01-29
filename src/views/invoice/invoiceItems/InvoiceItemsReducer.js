
import * as constants from './invoiceItemsConstants';

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
};

export default (state = INITAL_STATE, action) => {

  const {sampleItemId, ...remainState} = state;
  if (action.type === constants.ADD_UPDATED_LIST) {
    return action.payload;
  }
  return remainState;
};
  