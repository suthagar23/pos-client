
import * as constants from './itemSearchConstants';

const sampleItems = {
  '100' : {
    '_id':'5c4989ef2ec67513dd83afa1',
    'itemName':'Apple',
    'itemCode':'APP190',
    'unitPrice':107,
    'discountPercentage':10,
    'stockCount':100,
  },
  '101' : {
    '_id':'5c4989ef2ec67513dd83afa2',
    'itemName':'Orange',
    'itemCode':'ORG679',
    'unitPrice':220,
    'discountPercentage':0,
    'stockCount':100,
  },
  '102' : {
    '_id':'5c4989ef2ec67513dd83afa3',
    'itemName':'Pineapple',
    'itemCode':'PPP456',
    'unitPrice':90,
    'discountPercentage':21,
    'stockCount':100,
  }
};

export function searchForItem(payload) {
  return (dispatch) => {
    // console.log("Action payload : ", payload);
   
    // if (!searchFieldValue) {
    //   dispatch({ type: constants.EMPTY_SEARCH_VALUE_FOUND, payload });
    // }
    // const { searchFieldValue } = payload;
    const samplePayload = sampleItems[payload];
    if (typeof samplePayload !== 'undefined') {
      dispatch ({ type: constants.FIND_ITEM, payload: samplePayload });
      return true;
    }
    else {
      console.log('Not found');
      return false;
    }
  };
}

