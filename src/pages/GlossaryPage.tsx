import { Container, Stack } from "@mui/material";
import { GlossaryManager } from "@features/glossary";

export function GlossaryPage() {
  return (
    <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, sm: 3, md: 4 } }}>
      <Stack spacing={4}>
        <GlossaryManager />
      </Stack>
    </Container>
  );
}

