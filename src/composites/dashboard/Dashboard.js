import { RewardPoints } from "../rewardPoints/RewardPoints.js";
import { Transaction } from "../transactionRecord/Transaction.js";

/**
 *Dashboard Composite
 */

export const Dashboard = () => {
  return (
    <>
      <RewardPoints />
      <Transaction />
    </>
  );
};
