import { Container, Stack, Typography } from "@mui/material";
import { JobList } from "@features/jobs";

export function JobsPage() {
  return (
    <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, sm: 3, md: 4 } }}>
      <Stack spacing={4}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
            color: "text.primary",
          }}
        >
          Lịch sử hoạt động
        </Typography>
        <JobList />
      </Stack>
    </Container>
  );
}

