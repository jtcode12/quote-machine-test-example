import { render } from '@testing-library/react';
import Heading from '.';

const mockTitles = {
  'xxxl': 'abcdefg',
  'xxl': 'My mock title that is a big longer',
};

test('Heading component', () => {
  Object.entries(mockTitles).forEach(([size, title]) => {
    const { getByText } = render(<Heading title={title} />);
    const heading = getByText(title);
    expect(heading).toHaveAttribute('sa-font-size', size);
  });
})