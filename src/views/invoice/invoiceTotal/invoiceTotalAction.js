import {DISCOUNT} from '../../../utils/constants';
import { saveSalesInvoice } from '../../sales/salesAction';
import { checkForLoginStatus } from '../../../utils/authUtils';
import { errorNotification, successNotification } from '../../../components/notification/notificationAction';

export function calculateTotal(invoiceItems, invoiceInfo, props) {
  return (dispatch) => { 
    let invoiceGrossAmount = 0; 
    let totalQuantity = 0;
    for (var itemId in invoiceItems) {
      if (invoiceItems.hasOwnProperty(itemId)) {
        const { amount, quantity } = invoiceItems[itemId];
        invoiceGrossAmount += amount;
        totalQuantity += quantity;
      }
    }

    const invoiceDiscount = Math.round(invoiceGrossAmount * (DISCOUNT || 0)/100,2);
    const invoiceNetAmount = invoiceGrossAmount - invoiceDiscount;

    if(invoiceInfo.invoiceGrossAmount !== invoiceGrossAmount) {
      const updatedInvoiceInfo = {
        grossAmount: invoiceGrossAmount,
        discount : invoiceDiscount,
        netAmount: invoiceNetAmount,
        totalQuantity : totalQuantity,
      };
      
      
      if (checkForLoginStatus(props)) {
        let savedOrderObject = saveSalesInvoice(invoiceItems, { ...updatedInvoiceInfo, 
          invoiceStartedAt: invoiceInfo.invoiceStartedAt,
          invoiceId: invoiceInfo.invoiceId,
          invoiceStatus: invoiceInfo.invoiceStatus});
  
        savedOrderObject.then(function(object) {
          if (object) {
            dispatch ({ type: 'UPDATE_INVOICE_INFO', payload: {invoiceId: object._id, invoiceTitle: 'Invoice #'.concat( object._id)}});
          }
          else {
            errorNotification('Failed to save order details.');
          }
        });

        dispatch ({ type: 'UPDATE_GROSSAMOUNT', payload: updatedInvoiceInfo });

      }
    
    }
    
    
    
  };
}

