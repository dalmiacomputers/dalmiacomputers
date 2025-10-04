import Head from 'next/head'
export async function getServerSideProps() {
  // simple server-side props to prove SSR works
  return { props: { now: new Date().toISOString() } }
}
export default function Home({ now }) {
  return (
    <>
      <Head>
        <title>Dalmia Computers — Live</title>
        <meta name="description" content="Dalmia Computers — Purulia. Minimal SSR test page." />
      </Head>
      <main style={{ padding: 24, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto' }}>
        <h1>Dalmia Computers — Live ✅</h1>
        <p>This is a minimal SSR test page. Server time: <code>{now}</code></p>
        <p>If you see this, the Next.js app serves <strong>/</strong> correctly.</p>
        <p>Call: <a href="tel:+919734290001">+91-9734290001</a></p>
      </main>
    </>
  )
}
