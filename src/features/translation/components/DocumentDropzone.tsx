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
          p: { xs: 4, md: 5 },
          borderRadius: "6px",
          border: "2px dashed",
          borderColor: (theme) =>
            isDragging
              ? "#10B981"
              : !canAddMore
              ? theme.palette.divider
              : theme.palette.mode === "dark"
              ? "rgba(16, 185, 129, 0.35)"
              : "rgba(16, 185, 129, 0.5)",
          bgcolor: (theme) =>
            isDragging
              ? "rgba(16, 185, 129, 0.15)"
              : !canAddMore
              ? theme.palette.mode === "dark"
                ? "rgba(15, 23, 42, 0.6)"
                : "rgba(241, 245, 249, 0.8)"
              : theme.palette.mode === "dark"
              ? "rgba(15, 23, 42, 0.5)"
              : "rgba(248, 250, 252, 0.8)",
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
          <CircularProgress sx={{ color: "#10B981" }} />
        ) : (
          <>
            <CloudUpload
              sx={{
                fontSize: 48,
                color: "#10B981",
                mb: 1.5,
                transition: "transform 200ms ease",
                "&:hover": { transform: "scale(1.1)" },
              }}
            />
            <Typography variant="body1" sx={{ fontWeight: 700, mb: 0.5, color: "text.primary", fontFamily: '"Lexend", sans-serif' }}>
              Tải tài liệu cần dịch
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", textAlign: "center", fontSize: "0.8rem" }}>
              Hỗ trợ: Word, Excel, PowerPoint, PDF (Tối đa 3 file)
            </Typography>
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
