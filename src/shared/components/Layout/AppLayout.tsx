import { useState } from "react";
import { Box } from "@mui/material";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Header, useAuth } from "./Header";
import { Sidebar } from "./Sidebar";

export function AppLayout() {
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem("access_token");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!isAuthenticated && !token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      {/* Main Content Area with Sidebar */}
      <Box sx={{ display: "flex", flexGrow: 1, height: "calc(100vh - 64px)", overflow: "hidden" }}>
        {/* Sidebar */}
        <Sidebar collapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />
        
        {/* Scrollable Right Content Panel */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflowY: "auto",
            position: "relative",
            overflowX: "hidden",
            backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#030712" : "#F8FAFC"),
            background: (theme) =>
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, #030712 0%, #0B132B 50%, #1C2541 100%)"
                : "linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 50%, #E2E8F0 100%)",
            backgroundImage: (theme) =>
              theme.palette.mode === "dark"
                ? `
                  radial-gradient(circle at 15% 20%, rgba(28, 37, 65, 0.6) 0%, transparent 50%),
                  radial-gradient(circle at 85% 70%, rgba(15, 23, 42, 0.5) 0%, transparent 50%),
                  radial-gradient(rgba(255, 255, 255, 0.05) 1.2px, transparent 1.2px)
                `
                : `
                  radial-gradient(circle at 15% 20%, rgba(203, 213, 225, 0.5) 0%, transparent 50%),
                  radial-gradient(circle at 85% 70%, rgba(226, 232, 240, 0.6) 0%, transparent 50%),
                  radial-gradient(rgba(0, 0, 0, 0.04) 1.2px, transparent 1.2px)
                `,
            backgroundSize: "100% 100%, 100% 100%, 28px 28px",
            color: "text.primary",
          }}
        >
          {/* Main Content Area - Full width & height flexible canvas */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              width: "100%",
              minHeight: 0,
              pb: 4,
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}