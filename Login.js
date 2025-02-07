import * as React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate(); // Hook to navigate between pages

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: '#f5f5f5',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          bgcolor: 'white',
          boxShadow: 3,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Login
        </Typography>
        <TextField label="Email" variant="outlined" fullWidth />
        <TextField label="Password" type="password" variant="outlined" fullWidth />
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            bgcolor: '#006CE4',
            '&:hover': { bgcolor: '#003580' },
          }}
        >
          Login
        </Button>
        <Typography
          variant="body2"
          sx={{
            mt: 2,
            textAlign: 'center',
            '& a': {
              color: '#006CE4',
              textDecoration: 'none',
              fontWeight: 'bold',
            },
            '& a:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Don't have an account?{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault(); // Prevent default anchor behavior
              navigate('/register'); // Navigate to the register page
            }}
          >
            Register here
          </a>
        </Typography>
      </Box>
    </Box>
  );
}
