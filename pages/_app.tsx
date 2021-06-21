import type { AppProps } from 'next/app';
import { FunctionComponent } from 'react';

import '../styles/main.scss';

const QuoteMachine: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default QuoteMachine;
