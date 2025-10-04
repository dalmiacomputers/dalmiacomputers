import Head from "next/head";

export async function getServerSideProps() {
  // Minimal SSR props — ensures this page renders server-side
  return { props: { now: new Date().toISOString() } };
}

export default function Home({ now }) {
  return (
    <div style={{ fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto", background: "#020217", color: "#fff", minHeight: "100vh", padding: 24 }}>
      <Head>
        <title>Dalmia Computers — Purulia</title>
        <meta name="description" content="Dalmia Computers — Laptops, repairs, parts & software in Purulia." />
      </Head>

      <header style={{ maxWidth: 980, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <strong>Dalmia Computers</strong>
          <div style={{ fontSize: 12, color: "#9fb3d9" }}>Your Trusted Tech Partner</div>
        </div>
        <a href="tel:+919734290001" style={{ background: "#1e90ff", color: "#fff", padding: "8px 12px", borderRadius: 6, textDecoration: "none" }}>Call</a>
      </header>

      <main style={{ maxWidth: 980, margin: "36px auto", padding: 12 }}>
        <h1 style={{ fontSize: 28, marginBottom: 6 }}>Dalmia Computers — Live Check</h1>
        <p style={{ color: "#c7d0df" }}>This is a minimal SSR home page. Server time: <strong>{now}</strong></p>

        <section style={{ marginTop: 20, background: "rgba(255,255,255,0.03)", padding: 16, borderRadius: 8 }}>
          <h2 style={{ fontSize: 18 }}>Quick links</h2>
          <ul>
            <li><a href="/products" style={{ color: "#9ad1ff" }}>Products</a></li>
            <li><a href="/services" style={{ color: "#9ad1ff" }}>Services</a></li>
            <li><a href="/contact" style={{ color: "#9ad1ff" }}>Contact</a></li>
          </ul>
        </section>
      </main>

      <footer style={{ maxWidth: 980, margin: "24px auto", padding: 12, color: "#9fb3d9" }}>© {new Date().getFullYear()} Dalmia Computers</footer>
    </div>
  );
}