import { render, screen } from '@testing-library/react';
import Heading from '.';

const mockTitles = {
  'xxxl': 'abcdefg',
  'xxl': 'My mock title that is a bit longer',
};

test('Heading component', () => {
  Object.entries(mockTitles).forEach(([size, title]) => {
    render(<Heading title={title} />);
    const heading = screen.getByText(title);
    expect(heading).toHaveAttribute('sa-font-size', size);
  });
})