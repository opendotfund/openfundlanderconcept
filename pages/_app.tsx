import Head from 'next/head'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const canonicalUrl = `https://openfund.com${router.asPath}`  // Replace with your actual domain

  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp 