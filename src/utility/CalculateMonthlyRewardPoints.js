import { calculateRewardPoints } from "./CalculateRewardPoints";

/**
 *Calculate Monthly and Total Reward Points
 *@argument rewardCustomerData Array of customer reward data
 *@returns monthlyRewards, totalRewards, name, customerId
 */

export const calculateMonthlyRewardPoints = (rewardCustomerData) => {
  const rewardSummary = rewardCustomerData.map((customer) => {
    let monthlyRewards = {};
    let totalRewards = 0;

    customer.transactions.forEach(({ date, amount }) => {
      const formatMonth = new Date(date).toLocaleString("default", {
        month: "long",
      });
      const year = new Date(date).getFullYear();
      const points = calculateRewardPoints(amount);
      monthlyRewards[formatMonth + " " + year] =
        (monthlyRewards[formatMonth + " " + year] || 0) + points;
      totalRewards += points;
    });

    return {
      customerId: customer.customerId,
      name: customer.name,
      monthlyRewards,
      totalRewards,
    };
  });

  return rewardSummary;
};
