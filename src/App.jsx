import * as React from 'react';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  BarChart as AnalyticsIcon,
  Login as LoginIcon,
  CheckCircle,
  Cancel,
  Person
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
      // Main App Background (Deep Black from top of screenshot)
      default: '#0b0e11', 
      // Sidebar Background (The "Bottom Bar" color from screenshot)
      paper: '#1e242b',   
    },
    text: {
      primary: '#e6e1e5',
      secondary: '#c4c7c5',
    },
    success: { main: '#4fd1c5' },
    error: { main: '#f2b8b5' },
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

// --- 2. Mock Data ---
const PRESENT_STUDENTS = [
    { id: 1, name: "Justin Johnson", time: "08:55 AM" },
    { id: 2, name: "Justin Smith", time: "09:00 AM" },
    { id: 3, name: "Justin Davis", time: "09:02 AM" },
    { id: 4, name: "Justin Prince", time: "09:05 AM" },
    { id: 5, name: "Charlie Kirk", time: "09:10 AM" },
];

const ABSENT_STUDENTS = [
    { id: 6, name: "George Floyd" },
    { id: 7, name: "Your Mom" },
    { id: 8, name: "Your Sister's Friend" },
];

// --- 3. Main Component ---
function App() {
  const [currentView, setCurrentView] = useState('home'); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // --- LAYOUT MATH (LOCKED) ---
  // To prevent jumping, we match the math of the collapsed state exactly.
  // Sidebar Width (Collapsed): 80px
  // Sidebar Padding: 12px
  // Available Content Width: 80 - 12 - 12 = 56px.
  // We want the icon (24px) centered in that 56px space.
  // (56 - 24) / 2 = 16px Padding.
  // Result: We force 16px Left/Right padding on all buttons.
  const sidebarPadding = 1.5; // 12px
  const buttonPadding = 2;    // 16px (Calculated to center icon in 56px space)
  const rowHeight = '56px';   // Fixed height

  // Helper: Sidebar Button
  const NavButton = ({ icon, label, viewName, onClick }) => {
    const isActive = currentView === viewName && viewName !== 'login';
    
    return (
      <Tooltip title={!isSidebarOpen ? label : ""} placement="right" arrow>
        <Button
            onClick={onClick ? onClick : () => setCurrentView(viewName)}
            startIcon={icon}
            sx={{
                justifyContent: 'flex-start', // Always left-align
                color: isActive ? 'primary.main' : 'text.secondary',
                bgcolor: isActive ? '#333a4f' : 'transparent',
                
                // MATH LOCK:
                px: buttonPadding, // 16px
                height: rowHeight, 
                mb: 1, 
                width: '100%',
                borderRadius: 28, // Pill shape
                
                transition: 'all 0.2s',
                whiteSpace: 'nowrap', 
                minWidth: 0, 
                '&:hover': {
                    bgcolor: isActive ? '#3e475e' : 'rgba(255, 255, 255, 0.05)',
                    color: 'primary.main',
                },
                '& .MuiButton-startIcon': {
                    // Only add margin if expanded to push text over
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

        {/* --- Collapsible Sidebar --- */}
        <Box sx={{
            width: isSidebarOpen ? 280 : 80, // 80px is standard M3 Rail width
            transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            p: sidebarPadding, // 12px
            bgcolor: 'background.paper', // Bottom Bar Color
            overflowX: 'hidden'
        }}>
            {/* Top: Hamburger */}
            <Box sx={{ 
                mb: 2, 
                height: rowHeight, 
                display: 'flex', 
                alignItems: 'center', 
                pl: 0 
            }}>
                <IconButton 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    color="inherit" 
                    aria-label="toggle sidebar"
                    disableRipple
                    sx={{
                        borderRadius: 28,
                        // MATH LOCK: Match Button padding exactly
                        p: buttonPadding, // 16px
                        width: 'auto',
                        color: 'text.secondary',
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)', color: 'text.primary' }
                    }}
                >
                    <MenuIcon sx={{ fontSize: 24 }} /> 
                </IconButton>
            </Box>

            {/* Navigation Links */}
            <Box sx={{ flexGrow: 1 }}>
                <NavButton icon={<HomeIcon />} label="Home" viewName="home" />
                <NavButton icon={<AnalyticsIcon />} label="Analytics" viewName="analytics" />
            </Box>

            {/* Bottom: Log In */}
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

        {/* --- Main Content Area --- */}
        <Box sx={{ flexGrow: 1, p: 4, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 700, color: 'text.primary' }}>
              The "Never Bunk" Attendance System
            </Typography>

            {/* --- View: HOME --- */}
            {currentView === 'home' && (
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, height: '100%' }}>
                    
                    {/* Widget 1: Present */}
                    <Card sx={{ flex: 1, minWidth: 0 }}>
                        <CardContent sx={{ p: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <Box sx={{ p: 3, pb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <CheckCircle sx={{ color: 'success.main' }} />
                                        <Typography variant="h6" color="text.primary">Present</Typography>
                                    </Box>
                                    <Typography variant="h5" color="success.main" sx={{ fontWeight: 700 }}>
                                        {PRESENT_STUDENTS.length}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
                                <List>
                                    {PRESENT_STUDENTS.map((student) => (
                                        <ListItem key={student.id} sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
                                            <ListItemIcon>
                                                <Avatar sx={{ bgcolor: 'rgba(79, 209, 197, 0.2)', color: 'success.main' }}>
                                                    {student.name[0]}
                                                </Avatar>
                                            </ListItemIcon>
                                            <ListItemText 
                                                primary={student.name} 
                                                secondary={`Detected: ${student.time}`} 
                                                primaryTypographyProps={{ fontWeight: 500, color: 'text.primary' }}
                                                secondaryTypographyProps={{ color: 'text.secondary' }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Widget 2: Absent */}
                    <Card sx={{ flex: 1, minWidth: 0 }}>
                        <CardContent sx={{ p: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
                             <Box sx={{ p: 3, pb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <Cancel sx={{ color: 'error.main' }} />
                                        <Typography variant="h6" color="text.primary">Absent</Typography>
                                    </Box>
                                    <Typography variant="h5" color="error.main" sx={{ fontWeight: 700 }}>
                                        {ABSENT_STUDENTS.length}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
                                <List>
                                    {ABSENT_STUDENTS.map((student) => (
                                        <ListItem key={student.id} sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
                                            <ListItemIcon>
                                                <Avatar sx={{ bgcolor: 'rgba(242, 184, 181, 0.2)', color: 'error.main' }}>
                                                    <Person />
                                                </Avatar>
                                            </ListItemIcon>
                                            <ListItemText 
                                                primary={student.name} 
                                                secondary="Not detected"
                                                primaryTypographyProps={{ fontWeight: 500, color: 'text.primary' }}
                                                secondaryTypographyProps={{ color: 'error.main' }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </CardContent>
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