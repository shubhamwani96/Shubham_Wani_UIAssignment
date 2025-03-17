/**
 *Function to calculate unique month and year from the data
 *@argument data transaction data as a input to calculate unique month and year
 *@returns returns unique month and year
 */

 export const extractUniqueMonthYear = (data) => {
    const months = new Set();
    data.forEach((customer) => {
      Object.keys(customer.monthlyRewards).forEach((monthYear) => {
        months.add(monthYear);
      });
    });
    return Array.from(months);
  };
  