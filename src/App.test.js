import { render, screen, fireEvent,waitFor  } from "@testing-library/react";
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

test("updates input value on change", async() => {
  render(<RewardPoints />);
  const searchInput = screen.getByPlaceholderText("Search customers by name");
  fireEvent.change(searchInput, { target: { value: "test" } });
  userEvent.type(searchInput, { target: { value: "test" } });
  await waitFor(() => expect(searchInput.value).toBe("test"));
});

