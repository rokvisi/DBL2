import '../styles/global.css';

import { AppProps } from 'next/app';
import Layout from '@/layout/layout';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default MyApp;
