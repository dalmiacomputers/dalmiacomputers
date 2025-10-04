import Head from 'next/head'
export async function getServerSideProps() {
  return { props: { now: new Date().toISOString() } }
}
export default function Home({ now }) {
  return (
    <>
      <Head>
        <title>Dalmia Computers — SSR Test</title>
        <meta name="description" content="Minimal SSR test page for Dalmia Computers" />
      </Head>
      <main style={{ padding: 24, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto' }}>
        <h1>Dalmia Computers — SSR Live Test ✅</h1>
        <p>Server timestamp: <code>{now}</code></p>
        <p>If you see this, the Next.js app serves <strong>/</strong> correctly.</p>
        <p>Contact: <a href="tel:+919734290001">+91-9734290001</a></p>
      </main>
    </>
  )
}
