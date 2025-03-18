import { useState, useEffect } from "react";
import { RewardPoints } from "../rewardPoints/RewardPoints.js";
import { Transaction } from "../transactionRecord/Transaction.js";

/**
 *Dashboard Composite
 *Dashboard works as a composite which combines two composites "RewardPoints" and "Transaction"
 *@returns Dashboard Page
 */

export const Dashboard = () => {
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);

    fetch("http://localhost:3000/CustomerData.json") //Fetch data from the local JSON file
      .then((response) => {
        if (!response.ok) {
          alert("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        if (data.length > 0) {
          setCustomerData(data); //Update state with the fetched data
        } else {
          setCustomerData([]);
        }
      })
      .catch((error) => {
        setLoading(false);
        alert("There was a problem with the fetch operation:", error);
      });
  }, []); //Empty dependency array ensures this effect runs only once after the initial render

  return (
    <>
      <RewardPoints rewardData={customerData} Loading={loading} />
      <Transaction transactionData={customerData} Loading={loading} />
    </>
  );
};
