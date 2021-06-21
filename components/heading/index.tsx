import { FunctionComponent } from 'react';

interface HeadingProps {
  title: string;
}

const Heading: FunctionComponent<HeadingProps> = ({ title }) => {
  const mapFontSize = (text: string) => {
    if (text.length < 20) return 'xxxl';
    if (text.length < 40) return 'xxl';
    if (text.length < 75) return 'xl';
    if (text.length < 125) return 'l';
    if (text.length < 200) return 'm';
    return 's';
  }

  return (
    <h1 sa-font-size={mapFontSize(title)}>{ title }</h1>
  );
};
export default Heading;
