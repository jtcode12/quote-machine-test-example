import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetch from 'jest-fetch-mock';
import Index from '../pages';


test('Index page', async () => {
  fetch.mockResponseOnce(JSON.stringify({"status":200,"result":{"text":"What we see depends mainly on what we look for.","author":"John Lubbock","id":"4r1f69b38178g4b7"}}))
  const { getByText, getByTestId } = render(<Index />);
  getByText(/test your apps/i);
  const prevBtn = getByTestId('prevBtn');
  const nextBtn = getByTestId('nextBtn');
  await act(async () => {
    await userEvent.click(nextBtn);
  });
  expect(fetch).toHaveBeenCalledWith('https://cw-quotes.herokuapp.com/api/quotes/random');
  getByText(/John Lubbock/i);
  await act(async () => {
    await userEvent.click(prevBtn);
  });
  getByText(/test your apps/i);
});
