import { calculateRewardPoints } from "./CalculateRewardPoints";

/**
 *Function to show each and every transaction data
 *@argument transactionData array of customer transaction data
 *@returns key, customerId, name, date, amount, point
 */

export const transformTransactionData = (transactionData) =>
  // Its combination of flat() and map() method. The flat() method concatenates sub-array elements.

  transactionData.flatMap((customer) =>
    customer.transactions.map((transaction, index) => ({
      key: `${customer.customerId}-${index}`,
      customerId: customer.customerId,
      name: customer.name,
      date: transaction.date,
      amount: transaction.amount,
      point: calculateRewardPoints(transaction.amount),
    }))
  );
