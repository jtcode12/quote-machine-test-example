import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetch from 'jest-fetch-mock';
import Index from '../pages';

describe('Index Page', () => {
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponse(JSON.stringify({
      status:200,
      result: {
        id: '4r1f69b38178g4b7',
        text: 'What we see depends mainly on what we look for.',
        author:'John Lubbock',
      },
    }));
    render(<Index />);
  });

  test('User can navigate with mouse', async () => {
    screen.getByText(/test your apps/i);
    const next = screen.getByRole('button', { name: 'Next Quote' });
    const prev = screen.getByRole('button', { name: 'Previous Quote' });
    userEvent.click(next);
    await waitFor(() => {
      screen.getByText(/John Lubbock/i);
    });
    expect(fetch).toHaveBeenCalledWith('https://cw-quotes.herokuapp.com/api/quotes/random');
    
    userEvent.click(prev);
    await waitFor(() => {
      screen.getByText(/test your apps/i);
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  
  test('User can navigate with keyboard', async () => {
    screen.getByText(/test your apps/i);
    userEvent.type(document.body, '{arrowright}');
    await waitFor(() => {
      screen.getByText(/John Lubbock/i);
    });
    expect(fetch).toHaveBeenCalledWith('https://cw-quotes.herokuapp.com/api/quotes/random');

    userEvent.type(document.body, '{arrowleft}');
    await waitFor(() => {
      screen.getByText(/test your apps/i);
    });
  });
});
