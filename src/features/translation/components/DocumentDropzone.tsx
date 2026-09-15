import { Box, CircularProgress, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import type { DragEvent } from "react";

interface Props {
  maxTasks: number;
  totalFiles: number;
  isDragging: boolean;
  isAnalyzing: boolean;
  isSubmitting: boolean;
  canAddMore: boolean;
  onDragOver: (e: DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: DragEvent) => void;
  onFilesSelected: (files: FileList) => void;
}

// Multi-file drag & drop input area, plus the "N of maxTasks" dot indicator.
export function DocumentDropzone({
  maxTasks,
  totalFiles,
  isDragging,
  isAnalyzing,
  isSubmitting,
  canAddMore,
  onDragOver,
  onDragLeave,
  onDrop,
  onFilesSelected,
}: Props) {
  const disabled = isSubmitting || isAnalyzing || !canAddMore;

  return (
    <>
      <Box
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        component="label"
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: { xs: 230, sm: 270, md: 310 },
          p: { xs: 3, md: 5 },
          borderRadius: "12px",
          border: "2.5px dashed",
          borderColor: (theme) =>
            isDragging
              ? "#10B981"
              : !canAddMore
              ? theme.palette.divider
              : theme.palette.mode === "dark"
              ? "rgba(16, 185, 129, 0.4)"
              : "rgba(16, 185, 129, 0.55)",
          bgcolor: (theme) =>
            isDragging
              ? "rgba(16, 185, 129, 0.16)"
              : !canAddMore
              ? theme.palette.mode === "dark"
                ? "rgba(15, 23, 42, 0.6)"
                : "rgba(241, 245, 249, 0.8)"
              : theme.palette.mode === "dark"
              ? "rgba(15, 23, 42, 0.5)"
              : "rgba(248, 250, 252, 0.9)",
          cursor: disabled ? "default" : "pointer",
          transition: "all 200ms ease",
          "&:hover": {
            borderColor: (theme) => (disabled ? theme.palette.divider : "#10B981"),
            bgcolor: (theme) =>
              disabled
                ? theme.palette.mode === "dark"
                  ? "rgba(15, 23, 42, 0.6)"
                  : "rgba(241, 245, 249, 0.8)"
                : "rgba(16, 185, 129, 0.08)",
            boxShadow: disabled ? "none" : "0 8px 30px rgba(16, 185, 129, 0.12)",
          },
        }}
      >
        <input
          type="file"
          hidden
          accept=".docx,.pptx,.xlsx,.doc,.ppt,.xls,.pdf"
          multiple
          disabled={disabled}
          onChange={(e) => {
            if (e.target.files) onFilesSelected(e.target.files);
            e.target.value = "";
          }}
        />
        {isAnalyzing ? (
          <CircularProgress sx={{ color: "#10B981" }} size={44} />
        ) : (
          <>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                backgroundColor: "rgba(16, 185, 129, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
                transition: "all 200ms ease",
                boxShadow: "0 0 20px rgba(16, 185, 129, 0.2)",
              }}
            >
              <CloudUpload
                sx={{
                  fontSize: 40,
                  color: "#10B981",
                }}
              />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 0.8,
                color: "text.primary",
                fontFamily: '"Lexend", sans-serif',
                fontSize: { xs: "1.05rem", md: "1.25rem" },
                textAlign: "center",
              }}
            >
              Kéo & thả tài liệu vào đây
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                textAlign: "center",
                fontSize: "0.88rem",
                mb: 2,
              }}
            >
              hoặc <span style={{ color: "#10B981", fontWeight: 600 }}>bấm vào đây</span> để chọn file từ máy tính
            </Typography>

            {/* Format Chips */}
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: "center" }}>
              {["DOCX", "XLSX", "PPTX", "PDF"].map((fmt) => (
                <Box
                  key={fmt}
                  sx={{
                    px: 1.4,
                    py: 0.4,
                    borderRadius: "6px",
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.05)",
                    color: "text.secondary",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    fontFamily: '"Lexend", sans-serif',
                    letterSpacing: "0.5px",
                  }}
                >
                  {fmt}
                </Box>
              ))}
            </Box>
          </>
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 1, my: 1 }}>
        {Array.from({ length: maxTasks }).map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 36,
              height: 5,
              borderRadius: "4px",
              backgroundColor: index < totalFiles ? "#10B981" : "rgba(255, 255, 255, 0.15)",
              transition: "background-color 0.3s",
            }}
          />
        ))}
      </Box>
    </>
  );
}
