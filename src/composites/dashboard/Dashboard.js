import { RewardsPoints } from "../rewardPoints/RewardsPoints.js";
import { Transaction } from "../transactionRecord/Transaction.js";

/**
 *Dashboard Composite
 */

export const Dashboard = () => {
  return (
    <>
      <RewardsPoints />
      <Transaction />
    </>
  );
};
