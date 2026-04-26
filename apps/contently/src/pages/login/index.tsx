import { Box, Paper, Typography } from '@contently/toolkit';
import { LoginForm, useLogin } from 'modules/auth';

export default function LoginPage() {
  const loginProps = useLogin();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="grey.100"
    >
      <Paper elevation={2} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h5" fontWeight={700} mb={3}>
          Sign in to Contently
        </Typography>
        <LoginForm {...loginProps} />
      </Paper>
    </Box>
  );
}
