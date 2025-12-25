"use client";

import { useHistoryStore } from "../context/HistoryContext";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default function HistoryPage() {
  const { history, deleteScan, clearHistory } = useHistoryStore();

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
      <Box
        sx={{
          width: "100%",
          maxWidth: 420,
        }}
      >
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
          Scan history
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
          Your scans are stored locally on this device only.
        </Typography>

        {history.length === 0 && (
          <Box
            sx={{
              mt: 4,
              textAlign: "center",
              color: "text.secondary",
              fontSize: 14,
            }}
          >
            No scans yet. Scan a QR code to see it here.
          </Box>
        )}

        {history.length > 0 && (
          <>
            <List
              sx={{
                borderRadius: 2,
                bgcolor: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                overflow: "hidden",
              }}
            >
              {history.map((item, idx) => (
                <ListItem
                  key={item.id}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1,
                  }}
                  secondaryAction={
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() =>
                          navigator.clipboard.writeText(item.text)
                        }
                      >
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>

                      {item.text.startsWith("http") && (
                        <IconButton
                          size="small"
                          onClick={() =>
                            window.open(item.text, "_blank", "noopener")
                          }
                        >
                          <OpenInNewIcon fontSize="small" />
                        </IconButton>
                      )}

                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => deleteScan(item.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemText
                    primaryTypographyProps={{
                      sx: {
                        fontSize: 14,
                        wordBreak: "break-word",
                      },
                    }}
                    secondaryTypographyProps={{
                      sx: { fontSize: 12, color: "text.secondary", mt: 0.5 },
                    }}
                    primary={item.text}
                    secondary={new Date(
                      item.timestamp
                    ).toLocaleString()}
                  />
                </ListItem>
              ))}
            </List>

            <Button
              variant="outlined"
              color="error"
              fullWidth
              sx={{ mt: 3 }}
              onClick={clearHistory}
            >
              Clear all history
            </Button>
          </>
        )}
      </Box>
    </main>
  );
}
