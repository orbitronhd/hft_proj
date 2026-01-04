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
  Fade
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  BarChart as AnalyticsIcon,
  Login as LoginIcon, // Changed icon for Log In
  CheckCircle,
  Cancel,
  Person
} from '@mui/icons-material';

// --- 1. Theme Definition (Blue Palette) ---
const hackathonTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#64b5f6',
      contrastText: '#0a1929',
    },
    secondary: {
      main: '#1976d2',
    },
    background: {
      default: '#0a1929',
      paper: '#132f4c',
    },
    text: {
      primary: '#e3f2fd',
      secondary: '#90caf9',
    },
    success: {
      main: '#66bb6a',
    },
    error: {
      main: '#f44336',
    },
  },
  shape: {
    borderRadius: 24,
  },
  typography: {
    fontFamily: '"DM Sans", "Roboto", sans-serif',
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 500 }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          boxShadow: '0px 4px 24px rgba(0,0,0,0.4)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }),
      },
    },
    MuiListItem: {
        styleOverrides: {
            root: {
                borderRadius: 12,
                marginBottom: 8,
                '&:hover': { backgroundColor: 'rgba(100, 181, 246, 0.08)' }
            }
        }
    }
  },
});

// --- 2. Mock Data ---
const PRESENT_STUDENTS = [
    { id: 1, name: "Alice Johnson", time: "08:55 AM" },
    { id: 2, name: "Bob Smith", time: "09:00 AM" },
    { id: 3, name: "Charlie Davis", time: "09:02 AM" },
    { id: 4, name: "Diana Prince", time: "09:05 AM" },
    { id: 5, name: "Evan Wright", time: "09:10 AM" },
];

const ABSENT_STUDENTS = [
    { id: 6, name: "Frank Castle" },
    { id: 7, name: "Grace Hopper" },
    { id: 8, name: "Hank Pym" },
];

// --- 3. Main Component ---
function App() {
  const [currentView, setCurrentView] = useState('home'); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for expansion

  // Helper: Sidebar Button Component
  const NavButton = ({ icon, label, viewName, onClick }) => {
    const isActive = currentView === viewName && viewName !== 'login';
    
    return (
      <Tooltip title={!isSidebarOpen ? label : ""} placement="right" arrow>
        <Button
            onClick={onClick ? onClick : () => setCurrentView(viewName)}
            startIcon={icon}
            sx={{
                justifyContent: isSidebarOpen ? 'flex-start' : 'center',
                // Uniform color for all buttons (text.primary)
                color: 'text.primary', 
                // Background shows active state
                bgcolor: isActive ? 'rgba(100, 181, 246, 0.15)' : 'transparent',
                px: isSidebarOpen ? 3 : 1, // Adjust padding based on width
                py: 1.5,
                mb: 1,
                minWidth: 0, // Allows button to shrink properly
                width: '100%',
                borderRadius: 4,
                transition: 'all 0.2s',
                '&:hover': {
                    bgcolor: 'rgba(100, 181, 246, 0.25)',
                },
                '& .MuiButton-startIcon': {
                    marginRight: isSidebarOpen ? 2 : 0, // Remove margin when collapsed
                    marginLeft: 0,
                }
            }}
        >
            {/* Fade text in/out smoothly */}
            {isSidebarOpen && (
                <Fade in={isSidebarOpen} timeout={200}>
                    <Box component="span" sx={{ whiteSpace: 'nowrap' }}>
                        {label}
                    </Box>
                </Fade>
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
            width: isSidebarOpen ? 280 : 80, // Dynamic Width
            transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Smooth "Gemini-like" easing
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid rgba(255,255,255,0.08)',
            p: 2, // Reduced padding to fit collapsed state
            bgcolor: 'background.paper',
            overflowX: 'hidden' // Hide content while collapsing
        }}>
            {/* Top: Hamburger */}
            <Box sx={{ 
                mb: 4, 
                display: 'flex', 
                justifyContent: isSidebarOpen ? 'flex-start' : 'center',
                pl: isSidebarOpen ? 1 : 0 
            }}>
                <IconButton 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    color="inherit" 
                    aria-label="toggle sidebar"
                >
                    <MenuIcon sx={{ fontSize: 28 }} />
                </IconButton>
            </Box>

            {/* Navigation Links */}
            <Box sx={{ flexGrow: 1 }}>
                <NavButton icon={<HomeIcon />} label="Home" viewName="home" />
                <NavButton icon={<AnalyticsIcon />} label="Analytics" viewName="analytics" />
            </Box>

            {/* Bottom: Log In */}
            <Box>
                <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.1)' }} />
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
            
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: 'text.primary' }}>
                {currentView === 'home' ? 'Classroom Monitor' : 'Attendance Analytics'}
            </Typography>

            {/* --- View: HOME --- */}
            {currentView === 'home' && (
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', md: 'row' }, 
                    gap: 4, 
                    height: '100%' 
                }}>
                    {/* Widget 1: Present */}
                    <Card sx={{ flex: 1, minWidth: 0 }}>
                        <CardContent sx={{ p: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <Box sx={{ p: 3, pb: 2, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <CheckCircle sx={{ color: 'success.main' }} />
                                        <Typography variant="h6">Present</Typography>
                                    </Box>
                                    <Typography variant="h6" color="success.main">
                                        {PRESENT_STUDENTS.length}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
                                <List>
                                    {PRESENT_STUDENTS.map((student) => (
                                        <ListItem key={student.id}>
                                            <ListItemIcon>
                                                <Avatar sx={{ bgcolor: 'rgba(102, 187, 106, 0.2)', color: 'success.main' }}>
                                                    {student.name[0]}
                                                </Avatar>
                                            </ListItemIcon>
                                            <ListItemText 
                                                primary={student.name} 
                                                secondary={`Detected: ${student.time}`}
                                                primaryTypographyProps={{ fontWeight: 500 }}
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
                             <Box sx={{ p: 3, pb: 2, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <Cancel sx={{ color: 'error.main' }} />
                                        <Typography variant="h6">Absent</Typography>
                                    </Box>
                                    <Typography variant="h6" color="error.main">
                                        {ABSENT_STUDENTS.length}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
                                <List>
                                    {ABSENT_STUDENTS.map((student) => (
                                        <ListItem key={student.id}>
                                            <ListItemIcon>
                                                <Avatar sx={{ bgcolor: 'rgba(244, 67, 54, 0.2)', color: 'error.main' }}>
                                                    <Person />
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
                        </CardContent>
                    </Card>
                </Box>
            )}

            {/* --- View: ANALYTICS --- */}
            {currentView === 'analytics' && (
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
                    <Typography variant="h5" color="text.secondary">
                        Analytics View
                    </Typography>
                </Box>
            )}

        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;