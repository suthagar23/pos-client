import { fetchPost } from '../../utils/restMethods';
import { errorNotification, successNotification } from '../../components/notification/notificationAction';

export function saveSalesInvoice(invoiceItems, invoiceInfo) {
  // const { invoiceInfo, invoiceItems } = reduxState;

  let invoiceItemList = [];

  Object.keys(invoiceItems).forEach(function(key) {
    invoiceItemList = [...invoiceItemList, invoiceItems[key]];
  });
 
  let OrderObject = {
    orderMadeByUserId : invoiceInfo.invoiceStartedById || 0,
    orderDiscount: invoiceInfo.discount,
    orderNetAmount: invoiceInfo.netAmount,
    orderStatus: invoiceInfo.invoiceStatus,
    orderStaredDate: invoiceInfo.invoiceStartedAt,
    orderItems : invoiceItemList
  };

  if (invoiceInfo.invoiceId !== undefined) {
    OrderObject.orderId =invoiceInfo.invoiceId;
  }


  return fetchPost('/order', OrderObject)
    .then((res) => {
      const resStatusCode = (res || {}).status;
      if (resStatusCode === 201) {
        // Success
        return res.result;
      } else {
        // Error in Saving Order
        errorNotification('Failed to save order changes.');
        return false;
      }
    })
    .catch((err) => {
      // Erro in Saving Order
      errorNotification('Failed to save order changes.');
      return false;
    });
}