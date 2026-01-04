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
  ButtonBase, 
  InputBase,
  CircularProgress 
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeFilled,
  AssessmentSharp, 
  AccountCircle as AccountFilled,
  CheckCircle,
  Cancel,
  Person,
  AccessTime,
  School,
  Warning,
  HomeOutlined,
  AssessmentOutlined as AnalyticsOutlined,
  AccountCircleOutlined as AccountOutlined,
  Send as SendIcon,
  ArrowBack
} from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

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
    warning: { main: '#edc889' },
  },
  shape: { borderRadius: 24 },
  typography: {
    fontFamily: '"DM Sans", "Roboto", sans-serif',
    h5: { fontWeight: 700, color: '#e6e1e5' },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 500, fontSize: '0.875rem' },
    caption: { fontWeight: 500, fontSize: '0.75rem', lineHeight: 1.2 }
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

// --- 2. Styled Components ---
const GradientSearchBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: 50,
  padding: '2px', 
  background: 'linear-gradient(90deg, #381e72 0%, #d0bcff 50%, #381e72 100%)',
  width: '100%',
  maxWidth: '700px', 
  marginBottom: 0, 
}));

const SearchInner = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default, 
  borderRadius: 48,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0.5, 1, 0.5, 2.5), 
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  flexGrow: 1,
  color: theme.palette.text.primary,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1),
    width: '100%',
    fontWeight: 500,
    fontSize: '1rem',
    '&::placeholder': { color: theme.palette.text.secondary, opacity: 0.7 }
  },
}));

// --- 3. Mock Data (For Home View) ---
const PRESENT_STUDENTS = [
    { id: 1, name: "Justin Johnson", time: "08:55 AM" },
    { id: 2, name: "Justin Smith", time: "08:58 AM" },
    { id: 3, name: "Justin Davis", time: "08:59 AM" },
];

const LATE_STUDENTS = [
    { id: 4, name: "Charlie Kirk", time: "09:05 AM" },
    { id: 5, name: "Justin Prince", time: "09:12 AM" },
];

const ABSENT_STUDENTS = [
    { id: 6, name: "George Floyd" },
    { id: 7, name: "Your Mom" },
    { id: 8, name: "Your Sister's Friend" },
    { id: 9, name: "That Guy" },
];

const CLASS_ANALYTICS = {
    total: 60,
    present: 45,
    absent: 10,
    late: 5,
};

const CHART_COLORS = {
    present: '#4fd1c5', 
    absent: '#f2b8b5',  
    late: '#edc889',    
};

// --- 4. NavButton Component ---
const NavButton = ({ activeIcon, inactiveIcon, label, viewName, isSidebarOpen, currentView, setCurrentView, onClick }) => {
    const isActive = currentView === viewName && viewName !== 'account';
    const [isHovered, setIsHovered] = useState(false);

    return (
        <ButtonBase
            onClick={onClick ? onClick : () => setCurrentView(viewName)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disableRipple 
            sx={{
                width: '100%', height: '56px', borderRadius: '28px', marginBottom: 1,
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                backgroundColor: (isSidebarOpen && isActive) ? '#333a4f' : (isSidebarOpen && isHovered) ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                color: isActive ? 'primary.main' : 'text.secondary',
                display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: 0, userSelect: 'none',
            }}
        >
            <Box sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '32px', borderRadius: '16px',
                backgroundColor: (!isSidebarOpen && isActive) ? '#333a4f' : (!isSidebarOpen && isHovered) ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                transition: 'background-color 0.2s', flexShrink: 0,
            }}>
                {isActive ? activeIcon : inactiveIcon}
            </Box>
            <Box sx={{
                overflow: 'hidden', whiteSpace: 'nowrap', opacity: isSidebarOpen ? 1 : 0, width: isSidebarOpen ? 'auto' : '0px',
                transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-10px)', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', marginLeft: '12px',
            }}>
                <Typography variant="button" sx={{ fontWeight: isActive ? 700 : 500, color: isActive ? 'primary.main' : 'text.primary' }}>
                    {label}
                </Typography>
            </Box>
        </ButtonBase>
    );
};

// --- 5. Main Component ---
function App() {
  const [currentView, setCurrentView] = useState('home'); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  
  // Analytics State
  const [analyticsMode, setAnalyticsMode] = useState('class'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentData, setSelectedStudentData] = useState(null);
  
  // N8N Loading State
  const [isLoading, setIsLoading] = useState(false);

  const collapsedWidth = 80; 
  const expandedWidth = 280; 
  const containerPadding = '12px';

  // --- N8N API Handler ---
  const handleSearch = async () => {
      const query = searchQuery.toLowerCase().trim();
      
      // Default reset
      if (!query || query === 'class' || query === 'all') {
          setAnalyticsMode('class');
          setCurrentView('analytics'); 
          return;
      }

      setIsLoading(true);

      try {
          // --- CONNECTING TO N8N ---
          const response = await fetch('https://trialfortomorrow.app.n8n.cloud/webhook/student-report', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              // We send the query as a JSON body
              body: JSON.stringify({ query: query })
          });

          if (!response.ok) {
              throw new Error('Network response was not ok');
          }

          const data = await response.json();
          
          // Assuming N8N returns data in format: { name: "...", present: X, absent: Y, late: Z }
          // If your N8N returns an array, use data[0]
          if (data) {
              setSelectedStudentData(data);
              setAnalyticsMode('student');
              setCurrentView('analytics');
          } else {
              console.warn("Student not found or empty response");
          }

      } catch (error) {
          console.error("Error fetching student report:", error);
          // Optional: Show error snackbar here
      } finally {
          setIsLoading(false);
      }
  };

  const getChartData = () => {
      const data = analyticsMode === 'student' && selectedStudentData 
        ? selectedStudentData 
        : CLASS_ANALYTICS;

      return [
          { name: 'Present', value: data.present || 0, color: CHART_COLORS.present },
          { name: 'Absent', value: data.absent || 0, color: CHART_COLORS.absent },
          { name: 'Late', value: data.late || 0, color: CHART_COLORS.late },
      ];
  };

  const chartData = getChartData();

  return (
    <ThemeProvider theme={hackathonTheme}>
      <CssBaseline />
      
      <Box sx={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>

        {/* --- Sidebar --- */}
        <Box sx={{
            width: isSidebarOpen ? expandedWidth : collapsedWidth,
            transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)', flexShrink: 0,
            display: 'flex', flexDirection: 'column', p: containerPadding, 
            bgcolor: 'background.paper', overflowX: 'hidden',
        }}>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-start', width: '100%', alignItems: 'center' }}>
                <Box sx={{ width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)} color="inherit" disableRipple
                        sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary', bgcolor: 'rgba(255,255,255,0.05)' }}}
                    >
                        <MenuIcon /> 
                    </IconButton>
                </Box>
            </Box>
            <Box sx={{ flexGrow: 1, width: '100%' }}>
                <NavButton activeIcon={<HomeFilled />} inactiveIcon={<HomeOutlined />} label="Home" viewName="home" isSidebarOpen={isSidebarOpen} currentView={currentView} setCurrentView={setCurrentView} />
                <NavButton activeIcon={<AssessmentSharp />} inactiveIcon={<AnalyticsOutlined />} label="Analytics" viewName="analytics" isSidebarOpen={isSidebarOpen} currentView={currentView} setCurrentView={setCurrentView} />
            </Box>
            <Box sx={{ width: '100%' }}>
                <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.05)' }} />
                <NavButton activeIcon={<AccountFilled />} inactiveIcon={<AccountOutlined />} label="Account" viewName="account" isSidebarOpen={isSidebarOpen} currentView={currentView} setCurrentView={setCurrentView} onClick={() => console.log("Account Clicked")} />
            </Box>
        </Box>

        {/* --- Main Content --- */}
        <Box sx={{ flexGrow: 1, p: 4, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', mt: 8, mb: 6 }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: 'text.primary', textAlign: 'center' }}>
                  Pupil
                </Typography>
                
                {/* SEARCH BAR */}
                <GradientSearchBox>
                    <SearchInner>
                        <StyledInputBase
                            placeholder="Ask Pupil AI... (e.g., 'Justin', 'Class')"
                            value={searchQuery}
                            disabled={isLoading}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            inputProps={{ 'aria-label': 'ask agent' }}
                        />
                        <IconButton onClick={handleSearch} disabled={isLoading} sx={{ color: 'primary.main', bgcolor: 'rgba(208, 188, 255, 0.1)', mr: 0.5, '&:hover': { bgcolor: 'rgba(208, 188, 255, 0.2)' } }}>
                            {isLoading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                        </IconButton>
                    </SearchInner>
                </GradientSearchBox>
            </Box>

            {/* --- VIEW: HOME --- */}
            {currentView === 'home' && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
                        <Card sx={{ flex: 1 }}>
                            <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ bgcolor: 'rgba(208, 188, 255, 0.1)', color: 'primary.main' }}><School /></Avatar>
                                <Box>
                                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>Lecturer</Typography>
                                    <Typography variant="h6" color="text.primary">Dr. Jonathan Jimson</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                        <Card sx={{ flex: 1 }}>
                            <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ bgcolor: 'rgba(208, 188, 255, 0.1)', color: 'primary.main' }}><AccessTime /></Avatar>
                                <Box>
                                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>Last Scan</Typography>
                                    <Typography variant="h6" color="text.primary">09:45 AM</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: 'stretch' }}>
                        <Card sx={{ flex: 1 }}>
                            <Box sx={{ p: 3, pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}><CheckCircle sx={{ color: 'success.main' }} /><Typography variant="h6">Present</Typography></Box>
                                <Typography variant="h5" color="success.main" fontWeight={700}>{PRESENT_STUDENTS.length}</Typography>
                            </Box>
                            <Box sx={{ flexGrow: 1, p: 2 }}>
                                <List dense>{PRESENT_STUDENTS.map((student) => (<ListItem key={student.id} sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}><ListItemIcon><Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(79, 209, 197, 0.2)', color: 'success.main', fontSize: '0.875rem' }}>{student.name[0]}</Avatar></ListItemIcon><ListItemText primary={student.name} secondary={`Arrived: ${student.time}`} primaryTypographyProps={{ fontWeight: 500 }} /></ListItem>))}</List>
                            </Box>
                        </Card>
                        <Card sx={{ flex: 1 }}>
                            <Box sx={{ p: 3, pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}><Cancel sx={{ color: 'error.main' }} /><Typography variant="h6">Absent</Typography></Box>
                                <Typography variant="h5" color="error.main" fontWeight={700}>{ABSENT_STUDENTS.length}</Typography>
                            </Box>
                            <Box sx={{ flexGrow: 1, p: 2 }}>
                                <List dense>{ABSENT_STUDENTS.map((student) => (<ListItem key={student.id} sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}><ListItemIcon><Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(242, 184, 181, 0.2)', color: 'error.main', fontSize: '0.875rem' }}><Person fontSize="small" /></Avatar></ListItemIcon><ListItemText primary={student.name} secondary="Not detected" primaryTypographyProps={{ fontWeight: 500 }} secondaryTypographyProps={{ color: 'error.main' }} /></ListItem>))}</List>
                            </Box>
                        </Card>
                    </Box>
                    <Card>
                        <Box sx={{ p: 3, pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}><Warning sx={{ color: 'warning.main' }} /><Typography variant="h6">Late Arrivals</Typography><Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>(After 9:00 AM)</Typography></Box>
                            <Typography variant="h5" color="warning.main" fontWeight={700}>{LATE_STUDENTS.length}</Typography>
                        </Box>
                        <Box sx={{ p: 2 }}><List sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 1 }}>{LATE_STUDENTS.map((student) => (<ListItem key={student.id} sx={{ bgcolor: 'rgba(237, 200, 137, 0.05)', borderRadius: 4 }}><ListItemIcon><Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(237, 200, 137, 0.2)', color: 'warning.main', fontSize: '0.875rem' }}>{student.name[0]}</Avatar></ListItemIcon><ListItemText primary={student.name} secondary={`Arrived: ${student.time}`} primaryTypographyProps={{ fontWeight: 500 }} secondaryTypographyProps={{ color: 'warning.main' }} /></ListItem>))}</List></Box>
                    </Card>
                </Box>
            )}

            {/* --- VIEW: ANALYTICS --- */}
            {currentView === 'analytics' && (
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 3 }}>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        {analyticsMode === 'student' && (
                            <IconButton onClick={() => setAnalyticsMode('class')} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }}>
                                <ArrowBack />
                            </IconButton>
                        )}
                        <Typography variant="h5" color="text.primary">
                            {analyticsMode === 'class' ? "Class Overview: Software Engineering" : `Student Report: ${selectedStudentData?.name || 'Unknown'}`}
                        </Typography>
                    </Box>

                    {/* FIXED FLEXBOX LAYOUT */}
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', md: 'row' }, 
                        gap: 3, 
                        width: '100%',
                        minHeight: '400px'
                    }}> 
                        
                        {/* LEFT BOX */}
                        <Card sx={{ flex: 1, width: '100%' }}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h6" color="text.secondary" sx={{ mb: 4, textTransform: 'uppercase', letterSpacing: 1 }}>
                                    Statistics
                                </Typography>
                                
                                <List sx={{ width: '100%', bgcolor: 'transparent' }}>
                                    <ListItem sx={{ py: 2, borderBottom: '1px solid rgba(255,255,255,0.05)', justifyContent: 'space-between' }}>
                                        <ListItemText primary="Total" primaryTypographyProps={{ fontSize: '1.1rem', fontWeight: 500 }} />
                                        <Typography variant="h6" fontWeight={700}>
                                            {analyticsMode === 'class' 
                                                ? CLASS_ANALYTICS.total 
                                                : ((selectedStudentData?.present || 0) + (selectedStudentData?.absent || 0) + (selectedStudentData?.late || 0))
                                            }
                                        </Typography>
                                    </ListItem>

                                    <ListItem sx={{ py: 2, borderBottom: '1px solid rgba(255,255,255,0.05)', justifyContent: 'space-between' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <ListItemIcon sx={{ minWidth: 40 }}><CheckCircle sx={{ color: CHART_COLORS.present }} /></ListItemIcon>
                                            <ListItemText primary="Present" primaryTypographyProps={{ fontSize: '1.1rem' }} />
                                        </Box>
                                        <Typography variant="h6" color="success.main" fontWeight={700}>
                                            {analyticsMode === 'class' ? CLASS_ANALYTICS.present : selectedStudentData?.present || 0}
                                        </Typography>
                                    </ListItem>

                                    <ListItem sx={{ py: 2, borderBottom: '1px solid rgba(255,255,255,0.05)', justifyContent: 'space-between' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <ListItemIcon sx={{ minWidth: 40 }}><Cancel sx={{ color: CHART_COLORS.absent }} /></ListItemIcon>
                                            <ListItemText primary="Absent" primaryTypographyProps={{ fontSize: '1.1rem' }} />
                                        </Box>
                                        <Typography variant="h6" color="error.main" fontWeight={700}>
                                            {analyticsMode === 'class' ? CLASS_ANALYTICS.absent : selectedStudentData?.absent || 0}
                                        </Typography>
                                    </ListItem>

                                    <ListItem sx={{ py: 2, justifyContent: 'space-between' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <ListItemIcon sx={{ minWidth: 40 }}><Warning sx={{ color: CHART_COLORS.late }} /></ListItemIcon>
                                            <ListItemText primary="Late" primaryTypographyProps={{ fontSize: '1.1rem' }} />
                                        </Box>
                                        <Typography variant="h6" color="warning.main" fontWeight={700}>
                                            {analyticsMode === 'class' ? CLASS_ANALYTICS.late : selectedStudentData?.late || 0}
                                        </Typography>
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>

                        {/* RIGHT BOX */}
                        <Card sx={{ flex: 1, width: '100%', minHeight: '400px' }}>
                            <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                {/* HARD CODED HEIGHT - ESSENTIAL FOR RECHARTS IN FLEXBOX */}
                                <Box sx={{ width: '100%', height: 300 }}> 
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={chartData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={80} 
                                                outerRadius={110}
                                                paddingAngle={5}
                                                dataKey="value"
                                                stroke="none"
                                            >
                                                {chartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <RechartsTooltip 
                                                contentStyle={{ backgroundColor: '#1e242b', borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
                                                itemStyle={{ color: '#e6e1e5' }}
                                            />
                                            <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;