import * as constants from './invoiceSearchConstants';
import { fetchGet } from '../../../utils/restMethods';

export function searchForSuggestions(searchValue) {
  return (dispatch) => {
    let response = fetchGet('/item/search', searchValue);
    response.then(function(searchResult, err){
      let itemSuggestions;
      if(searchResult) {
        itemSuggestions = searchResult.result;
         
        dispatch({type: constants.ADD_UPDATED_ITEM_SUGGESTIONS, payload: itemSuggestions});
      }
      else {
        return false;
      }
    });
    return false;
  };
}

export function FindItemByItemCode(searchValue) {
  let responseForItemCode = fetchGet('/item/itemCode', searchValue);
  return responseForItemCode.then(function(searchResultForItemCode, errForItemCode){
    let foundItem;
    if(searchResultForItemCode) {
      foundItem = searchResultForItemCode.result[0]; 
      if(foundItem) {
        return foundItem ;
      }
      else {
        return FindItemByItemName(searchValue);
      }
    }
    else {
      return false;
    }
  });
}
 
export function FindItemByItemName(searchValue) {
  let responseForItemName = fetchGet('/item/itemName', searchValue);
  return responseForItemName.then(function(searchResultForItemName, errForItemCode){
    let foundItem;
    if(searchResultForItemName) {
      foundItem = searchResultForItemName.result[0]; 
      if(foundItem) {
        return foundItem ;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  });
}
