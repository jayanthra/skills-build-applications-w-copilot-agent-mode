import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders navigation and default activities view', async () => {
  render(
    <MemoryRouter initialEntries={['/activities']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/octofit tracker/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /teams/i })).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /activities/i })).toBeInTheDocument();
  });
});
