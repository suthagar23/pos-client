import * as constants from './orderConstants';
import { fetchGet } from '../../utils/restMethods';

export function findNewOrders() {
  return (dispatch) => {
    let restResponse = fetchGet('/order/status', 'NEW_ORDER');
    return restResponse.then(function(response, error){
      if(response) {
        dispatch({type: constants.UPDATE_NEW_ORDERS, payload: response});
      }
      else {
        dispatch({type: constants.RESET_ORDER_LIST, payload: error});
      }
    });
  };
}

export function findItemsOfAOrder(orderId) {
  let restResponse = fetchGet('/order/items', orderId);
  return restResponse.then(function(response, error){
    if(response) {
      let foundItems = response.result[0].orderItems; 
      if(foundItems) {
        
        return foundItems;
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
