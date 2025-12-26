"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useHistoryStore } from "../context/HistoryContext";
import { Html5Qrcode } from "html5-qrcode";

export default function QRScanner() {
  const { addScan } = useHistoryStore();
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  // Listen for camera scan results from iframe
  useEffect(() => {
    const handler = (event) => {
      if (event.data?.type === "qr-result") {
        const text = event.data.data;
        setResult(text);
        addScan(text);
        navigator.vibrate?.(80);
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [addScan]);

  // Scan from image
  const handleImageScan = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const scanner = new Html5Qrcode("image-scanner");
      const decoded = await scanner.scanFile(file, true);
      setResult(decoded);
      addScan(decoded);
      navigator.vibrate?.(80);
    } catch (err) {
      alert("No QR code found in this image");
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 420 }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
        QR scanner
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
        Point your camera at a QR code or upload an image to scan.
      </Typography>

      {/* Hidden div for image scanning */}
      <div id="image-scanner" style={{ display: "none" }}></div>

      {/* Camera scanner */}
      {!result && (
        <Box
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            bgcolor: "#000",
          }}
        >
          <iframe
            src="/qr-standalone.html"
            style={{
              width: "100%",
              height: 360,
              border: "none",
              display: "block",
            }}
            title="QR scanner"
          />
        </Box>
      )}

      {/* Scan from image button */}
      {!result && (
        <>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageScan}
          />

          <Button
  fullWidth
  sx={{
    mt: 2,
    backgroundColor: "#111",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "8px",
    textTransform: "none",
    fontSize: "15px",
    fontWeight: 500,
    "&:hover": {
      backgroundColor: "#000",
    },
  }}
  onClick={() => fileInputRef.current.click()}
>
  Scan from image
</Button>

        </>
      )}

      {/* Result card */}
      {result && (
        <Box
          sx={{
            mt: 3,
            p: 2,
            borderRadius: 2,
            bgcolor: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ mb: 1, color: "text.secondary", fontSize: 12 }}
          >
            Last scan
          </Typography>
          <Typography sx={{ wordBreak: "break-word", fontSize: 14 }}>
            {result}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
            {result.startsWith("http") && (
              <Button
                variant="contained"
                size="small"
                onClick={() =>
                  window.open(result, "_blank", "noopener")
                }
              >
                Open link
              </Button>
            )}

            <Button
              variant="outlined"
              size="small"
              onClick={() => navigator.clipboard.writeText(result)}
            >
              Copy
            </Button>

            <Button
              size="small"
              onClick={() => setResult(null)}
              sx={{ ml: "auto" }}
            >
              Scan again
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
}






