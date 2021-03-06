import type { AppProps } from 'next/app';
import DefaultLayout from '../layouts/default';

function CustomApp({ Component, pageProps }: AppProps) {

  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  )
}

export default CustomApp
