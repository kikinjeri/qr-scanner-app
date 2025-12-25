"use client";

import dynamic from "next/dynamic";

const QRScanner = dynamic(() => import("./components/QRScanner"), {
  ssr: false,
});

export default function Page() {
  return <QRScanner />;
}
