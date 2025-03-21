/**
 *Function to calculate unique month and year from the customer data
 *@argument customerData as a input to calculate unique month and year
 *@returns returns unique month and year
 */

export const extractUniqueMonthYear = (customerData) => {
  const months = new Set();

  customerData.forEach((customer) => {
    Object.keys(customer.monthlyRewards).forEach((monthYear) => {
      months.add(monthYear);
    });
  });

  return Array.from(months);
};
