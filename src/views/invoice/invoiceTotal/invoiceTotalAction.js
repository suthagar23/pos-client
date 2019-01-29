import {DISCOUNT} from '../../../utils/constants';

export function calculateTotal(invoiceItems, invoiceInfo) {
  return (dispatch) => {
    let invoiceGrossAmount = 0; 
    for (var itemId in invoiceItems) {
      if (invoiceItems.hasOwnProperty(itemId)) {
        const { amount } = invoiceItems[itemId];
        invoiceGrossAmount = invoiceGrossAmount + amount;
      }
    }

    const invoiceDiscount = Math.round(invoiceGrossAmount * (DISCOUNT || 0)/100,2);
    const invoiceNetAmount = invoiceGrossAmount - invoiceDiscount;

    
    if(invoiceInfo.invoiceGrossAmount !== invoiceGrossAmount) {
      const updatedInvoiceInfo = {
        grossAmount: invoiceGrossAmount,
        discount : invoiceDiscount,
        netAmount: invoiceNetAmount,
      };
      dispatch ({ type: 'UPDATE_GROSSAMOUNT', payload: updatedInvoiceInfo });
    }
    
    
    
  };
}

