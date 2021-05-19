import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import "nprogress/nprogress.css";

const ProgressBarLoading = dynamic(
  () => {
    return import('../components/ProgressBarLoading');
  },
  { ssr: false },
);


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <ProgressBarLoading />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
