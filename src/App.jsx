import * as React from 'react';
import { useState } from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Divider,
  Button,
  Tooltip,
  InputBase
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  BarChart as AnalyticsIcon,
  Login as LoginIcon,
  CheckCircle,
  Cancel,
  Person,
  Search as SearchIcon,
  AccessTime,
  School,
  Warning
} from '@mui/icons-material';

// --- 1. Theme Definition ---
const hackathonTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#d0bcff',
      contrastText: '#381e72',
    },
    secondary: { main: '#ccc2dc' },
    background: {
      default: '#0b0e11', 
      paper: '#1e242b',   
    },
    text: {
      primary: '#e6e1e5',
      secondary: '#c4c7c5',
    },
    success: { main: '#4fd1c5' },
    error: { main: '#f2b8b5' },
    warning: { main: '#edc889' }, // Added for Late Arrivals
  },
  shape: { borderRadius: 24 },
  typography: {
    fontFamily: '"DM Sans", "Roboto", sans-serif',
    h5: { fontWeight: 700, color: '#e6e1e5' },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          backgroundImage: 'none',
          boxShadow: 'none',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }),
      },
    },
    MuiListItem: {
        styleOverrides: {
            root: { borderRadius: 16, marginBottom: 8 }
        }
    }
  },
});

// --- 2. Styled Components (Search Bar) ---
const GradientSearchBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: 50,
  padding: '2px', // Thin border width
  // Blue/Lavender Gradient Border matching the theme
  background: 'linear-gradient(90deg, #381e72 0%, #d0bcff 50%, #381e72 100%)',
  width: '100%',
  maxWidth: '600px',
  marginBottom: theme.spacing(4),
}));

const SearchInner = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default, // Inner matches app background
  borderRadius: 48,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0.5, 2),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  flexGrow: 1,
  color: theme.palette.text.primary,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1),
    width: '100%',
    fontWeight: 500,
    '&::placeholder': { color: theme.palette.text.secondary, opacity: 0.7 }
  },
}));

// --- 3. Mock Data ---
// "On Time" Students
const PRESENT_STUDENTS = [
    { id: 1, name: "Justin Johnson", time: "08:55 AM" },
    { id: 2, name: "Justin Smith", time: "08:58 AM" },
    { id: 3, name: "Justin Davis", time: "08:59 AM" },
];

// "Late" Students (Arrived after 9:00 AM)
const LATE_STUDENTS = [
    { id: 4, name: "Charlie Kirk", time: "09:05 AM" },
    { id: 5, name: "Justin Prince", time: "09:12 AM" },
];

const ABSENT_STUDENTS = [
    { id: 6, name: "George Floyd" },
    { id: 7, name: "Your Mom" },
    { id: 8, name: "Your Sister's Friend" },
    { id: 9, name: "That Guy" }, // Added to make list longer to test scaling
];

// --- 4. Main Component ---
function App() {
  const [currentView, setCurrentView] = useState('home'); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // --- Layout Constants ---
  const sidebarPadding = 1.5; 
  const buttonPadding = 2;    
  const rowHeight = '56px';   

  const NavButton = ({ icon, label, viewName, onClick }) => {
    const isActive = currentView === viewName && viewName !== 'login';
    return (
      <Tooltip title={!isSidebarOpen ? label : ""} placement="right" arrow>
        <Button
            onClick={onClick ? onClick : () => setCurrentView(viewName)}
            startIcon={icon}
            sx={{
                justifyContent: 'flex-start',
                color: isActive ? 'primary.main' : 'text.secondary',
                bgcolor: isActive ? '#333a4f' : 'transparent',
                px: buttonPadding,
                height: rowHeight, 
                mb: 1, 
                width: '100%',
                borderRadius: 28,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap', 
                minWidth: 0, 
                '&:hover': {
                    bgcolor: isActive ? '#3e475e' : 'rgba(255, 255, 255, 0.05)',
                    color: 'primary.main',
                },
                '& .MuiButton-startIcon': {
                    marginRight: isSidebarOpen ? 2 : 0,
                    marginLeft: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '24px',
                    color: isActive ? 'primary.main' : 'inherit' 
                }
            }}
        >
            {isSidebarOpen && (
                <Box component="span" sx={{ opacity: 1, transition: 'opacity 0.2s' }}>
                    {label}
                </Box>
            )}
        </Button>
      </Tooltip>
    );
  };

  return (
    <ThemeProvider theme={hackathonTheme}>
      <CssBaseline />
      
      <Box sx={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>

        {/* --- Sidebar --- */}
        <Box sx={{
            width: isSidebarOpen ? 280 : 80,
            transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            p: sidebarPadding,
            bgcolor: 'background.paper',
            overflowX: 'hidden'
        }}>
            <Box sx={{ mb: 2, height: rowHeight, display: 'flex', alignItems: 'center', pl: 0 }}>
                <IconButton 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    color="inherit" 
                    disableRipple
                    sx={{
                        borderRadius: 28,
                        p: buttonPadding,
                        width: 'auto',
                        color: 'text.secondary',
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)', color: 'text.primary' }
                    }}
                >
                    <MenuIcon sx={{ fontSize: 24 }} /> 
                </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
                <NavButton icon={<HomeIcon />} label="Home" viewName="home" />
                <NavButton icon={<AnalyticsIcon />} label="Analytics" viewName="analytics" />
            </Box>

            <Box>
                <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.05)' }} />
                <NavButton 
                    icon={<LoginIcon />} 
                    label="Log in" 
                    viewName="login" 
                    onClick={() => console.log("Login Clicked")} 
                />
            </Box>
        </Box>

        {/* --- Main Content --- */}
        <Box sx={{ flexGrow: 1, p: 4, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            
            {/* Header */}
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: 'text.primary' }}>
              The "Never Bunk" Attendance System
            </Typography>

            {/* Gradient Search Bar */}
            <GradientSearchBox>
                <SearchInner>
                    <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
                    <StyledInputBase
                        placeholder="Search for a student..."
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </SearchInner>
            </GradientSearchBox>

            {currentView === 'home' && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    
                    {/* 1. Top Row: Small Info Widgets */}
                    <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
                        {/* Lecturer Box */}
                        <Card sx={{ flex: 1 }}>
                            <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ bgcolor: 'rgba(208, 188, 255, 0.1)', color: 'primary.main' }}>
                                    <School />
                                </Avatar>
                                <Box>
                                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>
                                        Lecturer
                                    </Typography>
                                    <Typography variant="h6" color="text.primary">
                                        Dr. Jonathan Jimson
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>

                        {/* Last Scan Box */}
                        <Card sx={{ flex: 1 }}>
                            <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ bgcolor: 'rgba(208, 188, 255, 0.1)', color: 'primary.main' }}>
                                    <AccessTime />
                                </Avatar>
                                <Box>
                                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>
                                        Last Scan
                                    </Typography>
                                    <Typography variant="h6" color="text.primary">
                                        09:45 AM
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>

                    {/* 2. Middle Row: Present & Absent (Dynamic Height Scaling) */}
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', md: 'row' }, 
                        gap: 3,
                        alignItems: 'stretch' // This ensures both cards stretch to the height of the tallest one
                    }}>
                        {/* Present */}
                        <Card sx={{ flex: 1 }}>
                            <Box sx={{ p: 3, pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <CheckCircle sx={{ color: 'success.main' }} />
                                    <Typography variant="h6">Present</Typography>
                                </Box>
                                <Typography variant="h5" color="success.main" fontWeight={700}>
                                    {PRESENT_STUDENTS.length}
                                </Typography>
                            </Box>
                            <Box sx={{ flexGrow: 1, p: 2 }}>
                                <List dense>
                                    {PRESENT_STUDENTS.map((student) => (
                                        <ListItem key={student.id} sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
                                            <ListItemIcon>
                                                <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(79, 209, 197, 0.2)', color: 'success.main', fontSize: '0.875rem' }}>
                                                    {student.name[0]}
                                                </Avatar>
                                            </ListItemIcon>
                                            <ListItemText 
                                                primary={student.name} 
                                                secondary={`Arrived: ${student.time}`}
                                                primaryTypographyProps={{ fontWeight: 500 }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Card>

                        {/* Absent */}
                        <Card sx={{ flex: 1 }}>
                            <Box sx={{ p: 3, pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Cancel sx={{ color: 'error.main' }} />
                                    <Typography variant="h6">Absent</Typography>
                                </Box>
                                <Typography variant="h5" color="error.main" fontWeight={700}>
                                    {ABSENT_STUDENTS.length}
                                </Typography>
                            </Box>
                            <Box sx={{ flexGrow: 1, p: 2 }}>
                                <List dense>
                                    {ABSENT_STUDENTS.map((student) => (
                                        <ListItem key={student.id} sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
                                            <ListItemIcon>
                                                <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(242, 184, 181, 0.2)', color: 'error.main', fontSize: '0.875rem' }}>
                                                    <Person fontSize="small" />
                                                </Avatar>
                                            </ListItemIcon>
                                            <ListItemText 
                                                primary={student.name} 
                                                secondary="Not detected"
                                                primaryTypographyProps={{ fontWeight: 500 }}
                                                secondaryTypographyProps={{ color: 'error.main' }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Card>
                    </Box>

                    {/* 3. Bottom Row: Late Arrivals */}
                    <Card>
                        <Box sx={{ p: 3, pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Warning sx={{ color: 'warning.main' }} />
                                <Typography variant="h6">Late Arrivals</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                    (After 9:00 AM)
                                </Typography>
                            </Box>
                            <Typography variant="h5" color="warning.main" fontWeight={700}>
                                {LATE_STUDENTS.length}
                            </Typography>
                        </Box>
                        <Box sx={{ p: 2 }}>
                            {/* Grid layout for list items to fill wide space */}
                            <List sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 1 }}>
                                {LATE_STUDENTS.map((student) => (
                                    <ListItem key={student.id} sx={{ bgcolor: 'rgba(237, 200, 137, 0.05)', borderRadius: 4 }}>
                                        <ListItemIcon>
                                            <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(237, 200, 137, 0.2)', color: 'warning.main', fontSize: '0.875rem' }}>
                                                {student.name[0]}
                                            </Avatar>
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary={student.name} 
                                            secondary={`Arrived: ${student.time}`}
                                            primaryTypographyProps={{ fontWeight: 500 }}
                                            secondaryTypographyProps={{ color: 'warning.main' }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Card>

                </Box>
            )}

            {currentView === 'analytics' && (
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
                    <Typography variant="h5" color="text.secondary">Analytics View (Under Construction)</Typography>
                </Box>
            )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;