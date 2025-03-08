import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { Button } from "./components/button/Button";

test("Header renders with react testing from the appliction", () => {
  render(<App />);
  const linkElement = screen.getByText(/Customer Reward Program/i);
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
