import { useState, useEffect } from "react";
import { RewardPoints } from "../rewardPoints/RewardPoints.js";
import { Transaction } from "../transactionRecord/Transaction.js";


/**
 *Dashboard Composite
 *Dashboard works as a composite which combines two composites "RewardsPoints" and "Transaction"
 *@returns Dashboard Page
 */

export const Dashboard = () => {
  const [customerData, setCustomerData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/CustomerData.json") //Fetch data from the local JSON file
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          setCustomerData(data); //Update state with the fetched data
        } else {
          setCustomerData([]);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []); //Empty dependency array ensures this effect runs only once after the initial render

  return (
    <>
      <RewardPoints rewardData={customerData} />
      <Transaction transactionData={customerData} />
    </>
  );
};
