import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { Button } from "./components/button/Button";
import { RewardPoints } from "./composites/rewardPoints/RewardPoints";

import userEvent from "@testing-library/user-event";

test("Header renders with react testing from the appliction", () => {
  render(<App />);
  const linkElement = screen.getByText("Customer Reward Program");
  expect(linkElement).toBeInTheDocument();
});

test("Render Reward Points component in the application", () => {
  render(<App />);
  const childElement = screen.getByText("Transaction Records");
  expect(childElement).toBeInTheDocument();
});

test("renders Calculate Rewards button with correct text", () => {
  render(<Button>Calculate Rewards</Button>);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveTextContent("Calculate Rewards");
});

test("renders Close button with correct text", () => {
  render(<Button>Close</Button>);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveTextContent("Close");
});

test("Close button click triggers function", () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Close</Button>);
  const buttonElement = screen.getByRole("button");
  fireEvent.click(buttonElement);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("Calculate Rewards button click triggers function", () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Calculate Rewards</Button>);
  const buttonElement = screen.getByRole("button");
  fireEvent.click(buttonElement);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("updates input value on change", async () => {
  render(<RewardPoints />);
  const searchInput = screen.getByPlaceholderText("Search customers by name");
  fireEvent.change(searchInput, { target: { value: "test" } });
  searchInput.setSelectionRange(0, searchInput.value.length); // Select all text
  userEvent.type(searchInput, "test"); // will replace the existing content with the new input.
  await waitFor(() => expect(searchInput.value).toBe("test"));
});

test("filters customer data based on search input", async () => {
  const mockRewardData = [
    {
      customerId: 1,
      name: "Alice",
      transactions: [
        { date: "January 12, 2025", amount: 120 },
        { date: "January 10, 2025", amount: 75 },
        { date: "February 16, 2025", amount: 200 },
        { date: "February 05, 2025", amount: 50 },
        { date: "March 09, 2025", amount: 95 },
      ],
    },
    {
      customerId: 2,
      name: "Bob",
      transactions: [
        { date: "January 21, 2025", amount: 45 },
        { date: "January 23, 2025", amount: 150 },
        { date: "February 14, 2025", amount: 85 },
        { date: "February 19, 2025", amount: 130 },
        { date: "March 10, 2025", amount: 55 },
      ],
    },
  ];

  render(<RewardPoints rewardData={mockRewardData} Loading={false} />);

  const searchInput = screen.getByPlaceholderText("Search customers by name");
  const rewardButon = screen.getByText("Calculate Rewards");

  // Simulate clicking the 'Calculate Rewards' button
  fireEvent.click(rewardButon);

  // Wait for the component to re-render with filtered data
  await waitFor(() => {
    const rows = screen.getAllByRole("row");
    // Assert that only two row is displayed (the header row plus the 'Alice' row)
    expect(rows).toHaveLength(3);
  });
  // Simulate typing 'Alice' into the search input
  fireEvent.change(searchInput, { target: { value: "Alice" } });

  await waitFor(() => {
    const rows = screen.getAllByRole("row");
    // Optionally, assert that the row contains 'Alice'
    expect(rows).toHaveLength(2);
  });
});
