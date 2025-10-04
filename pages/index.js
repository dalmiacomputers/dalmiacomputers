import Head from 'next/head'
export async function getServerSideProps() {
  return { props: { now: new Date().toISOString() } }
}
export default function Home({ now }) {
  return (
    <>
      <Head>
        <title>Dalmia Computers — SSR Test</title>
        <meta name="description" content="Minimal test page for SSR" />
      </Head>
      <main style={{ padding: 24, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto' }}>
        <h1>Dalmia Computers — SSR Live Test ✅</h1>
        <p>Server timestamp: <code>{now}</code></p>
      </main>
    </>
  )
}
