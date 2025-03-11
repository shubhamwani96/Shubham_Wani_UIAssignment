/**
 *Calculate Monthly and Total Reward Points
 *@param prop rewardCustomerData as a props"
 *@returns monthlyRewards, totalRewards, name, customerId
 */

import { calculateRewardPoints } from "./CalculateRewardPoints";

export const calculateMonthlyRewardPoints = (rewardCustomerData) => {
  const rewardSummary = rewardCustomerData.map((customer) => {
    let monthlyRewards = {};
    let totalRewards = 0;

    customer.transactions.forEach(({ month, amount }) => {
      const formatMonth = new Date(month).toLocaleString("default", {
        month: "long",
      });
      const points = calculateRewardPoints(amount);
      monthlyRewards[formatMonth] = (monthlyRewards[formatMonth] || 0) + points;
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
