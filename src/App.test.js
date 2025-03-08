import { render, screen } from '@testing-library/react';
import App from './App';


test('Header renders with react testing from the appliction', () => {
  render(<App />);
  const linkElement = screen.getByText(/Customer Reward Program/i);
  expect(linkElement).toBeInTheDocument();
});


test('Render Reward Points component in the application', () => {
  render(<App />);
  const childElement = screen.getByText("Transaction Records");
  expect(childElement).toBeInTheDocument();

});



