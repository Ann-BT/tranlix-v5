import { Box, Typography, Container } from "@mui/material";
import { TranslationForm } from "@features/translation";

export function HomePage() {
  return (
    <Box
      sx={{
        py: { xs: 3, md: 4 },
        px: { xs: 2, sm: 3, md: 4 },
        backgroundColor: "transparent",
        flexGrow: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container maxWidth="lg" sx={{ py: 1 }}>
        {/* Title Header */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "text.primary",
              fontFamily: '"Lexend", sans-serif',
              fontSize: { xs: "1.5rem", sm: "1.9rem", md: "2.1rem" },
              letterSpacing: "-0.5px",
            }}
          >
            Dịch thuật Tài liệu Đa ngôn ngữ
          </Typography>
        </Box>

        {/* Translation Studio Component */}
        <Box sx={{ width: "100%", mx: "auto" }}>
          <TranslationForm />
        </Box>
      </Container>
    </Box>
  );
}