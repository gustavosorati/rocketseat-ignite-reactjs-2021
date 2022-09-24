import { render ,screen, waitFor} from '@testing-library/react'
import {Async} from '.';

test('it renders correctly', async () => {
  render(<Async />);

  screen.logTestingPlaygroundURL();

  expect(screen.getByText('Hello World')).toBeInTheDocument();
  // expect(await screen.findByText('Button', {}, {timeout: 5000})).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Button')).toBeInTheDocument();
  })
});
