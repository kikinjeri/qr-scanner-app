"use client";

import { Box, Typography } from "@mui/material";

export default function SettingsPage() {
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
      <Box sx={{ width: "100%", maxWidth: 420 }}>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
          Settings
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Settings controls will appear here in future versions.
        </Typography>
      </Box>
    </main>
  );
}

