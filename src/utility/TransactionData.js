import { calculateRewardPoints } from "./CalculateRewardPoints";

/**
 *Function to show each and every transaction data
 *@param prop transactionData Array as a props"
 *@returns customerId, name, month, amount, point, key
 */

export const transactionDataFunction = (transactionData) =>
  // Its combination of flat() and map() method. The flat() method concatenates sub-array elements.
  transactionData.flatMap((customer) =>
    customer.transactions.map((transaction, index) => ({
      key: `${customer.customerId}-${index}`,
      customerId: customer.customerId,
      name: customer.name,
      month: transaction.month,
      amount: transaction.amount,
      point: calculateRewardPoints(transaction.amount),
    }))
  );
