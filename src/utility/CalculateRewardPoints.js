/**
 *Function to calculate reward points for each transaction
 *@argument amount as a input to calculate reward points
 *@returns reward points for each transaction
 */

export const calculateRewardPoints = (amount) => {
  const purchaseAmount = parseFloat(amount);

  let points = 0;
  if (purchaseAmount > 100) {
    points += (purchaseAmount - 100) * 2; // 2 points for each dollar over $100
    points += 50; // 50 points for the $50 between $50 and $100
  } else if (purchaseAmount > 50) {
    points += purchaseAmount - 50; // 1 point for each dollar over $50
  }

  return points;
};
