import { Rewards } from "../rewardPoints/Rewards.js";
import { Transaction } from "../transactionRecord/Transaction.js";
// Main React Component
export const Dashboard = () => {
  return (
    <>
      <Rewards />
      <Transaction />
    </>
  );
};
