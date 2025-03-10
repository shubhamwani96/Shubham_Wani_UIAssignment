import { useState, useEffect } from "react";
import { RewardPoints } from "../rewardPoints/RewardPoints.js";
import { Transaction } from "../transactionRecord/Transaction.js";

/**
 *Dashboard Composite
 */

export const Dashboard = () => {
  const [customerData, setCustomerData] = useState([]);
  useEffect(() => {
    /**
     *Fetch data from the local JSON file
     */

    fetch("http://localhost:3000/CustomerData.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        /**
         *Update state with the fetched data
         */

        if (data.length > 0) {
          setCustomerData(data);
        } else {
          setCustomerData([]);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);
  /**
   *Empty dependency array ensures this effect runs only once after the initial render
   */
  return (
    <>
      <RewardPoints rewardData={customerData} />
      <Transaction transactionData={customerData} />
    </>
  );
};
