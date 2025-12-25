"use client";

import { usePathname, useRouter } from "next/navigation";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState, useEffect } from "react";

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (pathname === "/") setValue(0);
    else if (pathname === "/history") setValue(1);
    else if (pathname === "/settings") setValue(2);
  }, [pathname]);

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: "#111",        // dark background
        color: "#fff",                  // light text
      }}
      elevation={8}
    >
      <BottomNavigation
        value={value}
        onChange={(e, newValue) => {
          setValue(newValue);
          if (newValue === 0) router.push("/");
          if (newValue === 1) router.push("/history");
          if (newValue === 2) router.push("/settings");
        }}
        sx={{
          backgroundColor: "#111",
          "& .MuiBottomNavigationAction-root": {
            color: "#bbb",              // inactive icons/text
          },
          "& .Mui-selected": {
            color: "#fff",              // active icon/text
          },
        }}
        showLabels
      >
        <BottomNavigationAction label="Scan" icon={<QrCodeScannerIcon />} />
        <BottomNavigationAction label="History" icon={<HistoryIcon />} />
        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
