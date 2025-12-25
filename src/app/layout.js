import "./globals.css";
import { HistoryProvider } from "./context/HistoryContext";
import BottomNav from "./components/BottomNav";

export const metadata = {
  title: "QR Scanner",
  description: "A fast, modern QR scanner with history and image scanning.",
  manifest: "/manifest.json",
  themeColor: "#111111",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <HistoryProvider>
          {/* Main content wrapper with bottom padding */}
          <div style={{ paddingBottom: "80px" }}>
            {children}
          </div>

          {/* Persistent bottom navigation */}
          <BottomNav />
        </HistoryProvider>
      </body>
    </html>
  );
}

