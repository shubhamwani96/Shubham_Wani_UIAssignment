// /**
//  *Function to calculate reward points for each transaction
//  *@param prop amount as a props"
//  *@returns reward points for each transaction
//  */

// import { calculateRewardPoints } from "./CalculateRewardPoints";

//   const calculateMonthlyRewardPoints = () => {
//     const rewardSummary = rewardCustomerData.map((customer) => {
//       let monthlyRewards = {};
//       let totalRewards = 0;

//       customer.transactions.forEach(({ month, amount }) => {
//         const formatMonth = new Date(month).toLocaleString("default", {
//           month: "long",
//         });
//         const points = calculateRewardPoints(amount);
//         monthlyRewards[formatMonth] =
//           (monthlyRewards[formatMonth] || 0) + points;
//         totalRewards += points;
//       });

//       return {
//         customerId: customer.customerId,
//         name: customer.name,
//         monthlyRewards,
//         totalRewards,
//       };
//     });

//     setRewards(rewardSummary);
//   };
