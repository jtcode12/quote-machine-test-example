import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetch from 'jest-fetch-mock';
import Index from '../pages';


test('Index page', async () => {
  /**
   * Mock fetch responses
   */
  fetch.mockResponse(JSON.stringify({
    status:200,
    result: {
      id: '4r1f69b38178g4b7',
      text: 'What we see depends mainly on what we look for.',
      author:'John Lubbock',
    },
  }));

  render(<Index />);

  /**
   * Ensure core element rendered on the screen
   */
  screen.getByText(/test your apps/i);
  const prevBtn = screen.getByTestId('prevBtn');
  const nextBtn = screen.getByTestId('nextBtn');

  /**
   * Test forward button
   */
  userEvent.click(nextBtn);
  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith('https://cw-quotes.herokuapp.com/api/quotes/random');
  });
  screen.getByText(/John Lubbock/i);

  /**
   * Test back button
   */
  userEvent.click(prevBtn);
  await waitFor(() => {
    screen.getByText(/test your apps/i);
  });

  /**
   * Test right and left arrow key press
   */
  userEvent.type(nextBtn, '{arrowright}');
  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith('https://cw-quotes.herokuapp.com/api/quotes/random');
  });
  screen.getByText(/John Lubbock/i);

  userEvent.type(prevBtn, '{arrowleft}');
  await waitFor(() => {
    screen.getByText(/test your apps/i);
  });
});
