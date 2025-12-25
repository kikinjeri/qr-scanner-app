"use client";

import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

export default function QRScanner() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const handler = (event) => {
      if (event.data?.type === "qr-result") {
        setResult(event.data.data);
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <Box sx={{ maxWidth: 420, margin: "40px auto", textAlign: "center" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        QR Scanner
      </Typography>

      {!result && (
        <iframe
          src="/qr-standalone.html"
          style={{
            width: "100%",
            height: 350,
            border: "none",
            borderRadius: 8,
            overflow: "hidden",
          }}
        />
      )}

      {result && (
        <Box sx={{ mt: 3, p: 2, background: "#f5f5f5", borderRadius: 2 }}>
          <Typography sx={{ wordBreak: "break-all" }}>{result}</Typography>
        </Box>
      )}
    </Box>
  );
}



