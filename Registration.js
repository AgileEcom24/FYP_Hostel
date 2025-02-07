import React, { useState } from 'react'; 
import { Box, TextField, Button, Typography, InputAdornment, IconButton, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate(); // Initialize navigate
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState(null);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: '#f5f5f5', // Optional background color
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
          Register
        </Typography>

        <TextField label="Full Name" variant="outlined" fullWidth />
        <TextField label="Email" variant="outlined" fullWidth />
        <TextField label="Permanent Address" variant="outlined" fullWidth />

        {/* Gender Selection */}
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend" sx={{ mb: 1 }}>
            Gender
          </FormLabel>
          <RadioGroup
            row
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>

        {/* Date of Birth */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date of Birth"
            value={dob}
            onChange={(newDate) => setDob(newDate)}
            disableFuture
            openTo="year"
            views={['year', 'month', 'day']}
            renderInput={(params) => (
              <TextField {...params} fullWidth />
            )}
          />
        </LocalizationProvider>


        {/* Password Field */}
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Confirm Password Field */}
        <TextField
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          sx={{
            mt: 2,
            bgcolor: '#006CE4',
            '&:hover': { bgcolor: '#003580' },
          }}
        >
          Register
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
          Already have an account?{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault(); // Prevent default anchor behavior
              navigate('/login'); // Navigate to the login page
            }}
          >
            Login here
          </a>
        </Typography>
      </Box>
    </Box>
  );
}
