import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  Container,
  IconButton,
  Paper,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from '@mui/material';
import { Hotel, Person, Search, Language, Help } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

export default function Home() {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const navigate = useNavigate();

  const images = [
    '/Photos/4.jpg',
    '/Photos/dorm.jpg',
    '/Photos/lib.jpg',
    '/Photos/4.jpg',
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length]);

  return (
    <Box sx={{ flexGrow: 1, position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <AppBar position="static" color="primary" sx={{ bgcolor: 'DodgerBlue' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
            Hostel Booking
          </Typography>
          <Button color="inherit">NPR</Button>
          <IconButton color="inherit">
            <Language />
          </IconButton>
          <IconButton color="inherit">
            <Help />
          </IconButton>
          <Toolbar sx={{ gap: 2 }}>
            <Button
              variant="contained"
              onClick={() => navigate('/list')}
              startIcon={<Hotel />}
              sx={{ bgcolor: 'white', color: '#003580' }}
            >
              Stays
            </Button>
          </Toolbar>
          <Button color="inherit" onClick={() => navigate('/register')}>
            Register
          </Button>
          <Button color="inherit" onClick={() => navigate('/login')}>
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Background Images */}
      {images.map((image, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'opacity 1s ease-in-out',
            opacity: currentSlide === index ? 1 : 0,
            zIndex: -1,
          }}
        />
      ))}

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, color: 'white' , marginTop:'3rem'}}>
        
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem' },
            fontWeight: 'bold',
            mb: 2,
          }}
        >
          Finding HOSTELS has never felt this easy before...
        </Typography>
        <Typography
          variant="h4"
          sx={{
            mb: 4,
          }}
        >
          Book a hostel that suits you.
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: '#006CE4',
            color: 'white',
            mb: 4,
            '&:hover': {
              bgcolor: '#003580',
            },
          }}
        >
          Discover more hostels
        </Button>

        <Paper
          sx={{
            p: 2,
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            flexWrap: { xs: 'wrap', md: 'nowrap' },
          }}
        >
          {/* City Dropdown */}
          <FormControl sx={{ flex: 1 }}>
            <InputLabel id="city-label">City</InputLabel>
            <Select
              labelId="city-label"
              label="City"
              defaultValue=""
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <Hotel />
                </InputAdornment>
              }
            >
              <MenuItem value="Kathmandu">Kathmandu</MenuItem>
              <MenuItem value="Lalitpur">Lalitpur</MenuItem>
              <MenuItem value="Bhaktapur">Bhaktapur</MenuItem>
              <MenuItem value="Pokhara">Pokhara</MenuItem>
              <MenuItem value="Chitwan">Chitwan</MenuItem>
            </Select>
          </FormControl>

          {/* Date Picker */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              minDate={dayjs()}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ flex: 1 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </LocalizationProvider>

          {/* End Date Picker (Optional) */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date (Optional)"
              value={endDate}
              onChange={(newDate) => setEndDate(newDate)}
              minDate={selectedDate || dayjs()}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ flex: 1 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </LocalizationProvider>

          {/* Seaters Dropdown */}
          <FormControl sx={{ flex: 1 }}>
            <InputLabel id="seaters-label">Seaters</InputLabel>
            <Select
              labelId="seaters-label"
              label="Seaters"
              defaultValue=""
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              }
            >
              <MenuItem value={1}>1 Seater</MenuItem>
              <MenuItem value={2}>2 Seaters</MenuItem>
              <MenuItem value={3}>3 Seaters</MenuItem>
              <MenuItem value={4}>4 Seaters</MenuItem>
              <MenuItem value={5}>5 Seaters</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            size="large"
            startIcon={<Search />}
            sx={{
              bgcolor: '#006CE4',
              minWidth: '120px',
              '&:hover': {
                bgcolor: '#003580',
              },
            }}
          >
            Search
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
