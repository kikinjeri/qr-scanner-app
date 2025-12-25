"use client";

import QRScanner from "./components/QRScanner";

export default function Page() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "24px 16px 90px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        background: "#fafafa",
      }}
    >
      <QRScanner />
    </main>
  );
}
