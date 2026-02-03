import { render, screen } from '@testing-library/react';
import App from './App';

test('renders retro UI header title', () => {
  render(<App />);
  const title = screen.getByText(/retro ui/i);
  expect(title).toBeInTheDocument();
});
