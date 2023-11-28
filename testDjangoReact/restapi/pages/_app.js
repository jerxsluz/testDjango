import Layout from "../src/commons/layout"

export default function App({ Component, pageProps }) {
  return (
      <>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
  )
}
