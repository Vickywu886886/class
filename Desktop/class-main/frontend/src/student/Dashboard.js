import React, { useState, useEffect } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Container,
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
  Typography,
  Button,
  TextField,
  Stack,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import {
  Book as BookIcon,
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  Score as ScoreIcon,
  ExitToApp as LogoutIcon,
  Person as PersonIcon,
  PhotoCamera as PhotoCameraIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState('courses');
  const [anchorEl, setAnchorEl] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const drawerWidth = isMobile ? 200 : isTablet ? 240 : 280;

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    if (!userInfo || userInfo.role !== 'student') {
      navigate('/login');
      return;
    }
    setUser(userInfo);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUser = { ...user, avatar: reader.result };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { label: '我的课程', value: 'courses', icon: <BookIcon /> },
    { label: '课程表', value: 'schedule', icon: <ScheduleIcon /> },
    { label: '作业', value: 'assignments', icon: <AssignmentIcon /> },
    { label: '成绩单', value: 'scores', icon: <ScoreIcon /> }
  ];

  const drawer = (
    <Box sx={{ overflow: 'auto', mt: 2 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.value}
            selected={selectedMenu === item.value}
            onClick={() => setSelectedMenu(item.value)}
            sx={{
              '&.Mui-selected': {
                bgcolor: 'rgba(197,230,176,0.2)',
                '&:hover': {
                  bgcolor: 'rgba(197,230,176,0.3)'
                }
              },
              '&:hover': {
                bgcolor: 'rgba(197,230,176,0.1)'
              },
              borderRadius: '0 24px 24px 0',
              mr: 2,
              mb: 1,
              py: { xs: 2, sm: 1.5 }
            }}
          >
            <ListItemIcon 
              sx={{ 
                color: selectedMenu === item.value ? '#2D5A27' : 'inherit',
                minWidth: { xs: 40, sm: 45 }
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.label} 
              sx={{ 
                '& .MuiTypography-root': { 
                  fontWeight: selectedMenu === item.value ? 600 : 400,
                  color: selectedMenu === item.value ? '#2D5A27' : 'inherit',
                  fontSize: { xs: '0.95rem', sm: '1rem' }
                } 
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const renderContent = () => {
    switch (selectedMenu) {
      case 'courses':
        return (
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 3, color: '#2D5A27', fontWeight: 600 }}>
              我的课程
            </Typography>
            {/* 课程内容 */}
          </Paper>
        );
      case 'schedule':
        return (
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 3, color: '#2D5A27', fontWeight: 600 }}>
              课程表
            </Typography>
            {/* 课程表内容 */}
          </Paper>
        );
      case 'assignments':
        return (
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 3, color: '#2D5A27', fontWeight: 600 }}>
              作业
            </Typography>
            {/* 作业内容 */}
          </Paper>
        );
      case 'scores':
        return (
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 3, color: '#2D5A27', fontWeight: 600 }}>
              成绩单
            </Typography>
            {/* 成绩单内容 */}
          </Paper>
        );
      default:
        return null;
    }
  };

  if (!user) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <span>加载中...</span>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'white',
          color: 'text.primary',
          boxShadow: 1,
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            flexGrow: 1 
          }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar 
                src={user.avatar} 
                alt={user.username}
                onClick={handleAvatarClick}
                sx={{ 
                  width: { xs: 32, sm: 40 }, 
                  height: { xs: 32, sm: 40 },
                  mr: 2,
                  cursor: 'pointer'
                }}
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    borderRadius: 2,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                <MenuItem onClick={() => { handleMenuClose(); setSelectedMenu('courses'); }}>
                  <ListItemIcon>
                    <BookIcon fontSize="small" sx={{ color: '#2D5A27' }} />
                  </ListItemIcon>
                  <ListItemText primary="我的课程" />
                </MenuItem>
                <MenuItem onClick={() => { handleMenuClose(); setSelectedMenu('schedule'); }}>
                  <ListItemIcon>
                    <ScheduleIcon fontSize="small" sx={{ color: '#2D5A27' }} />
                  </ListItemIcon>
                  <ListItemText primary="课程表" />
                </MenuItem>
                <MenuItem onClick={() => { handleMenuClose(); setSelectedMenu('assignments'); }}>
                  <ListItemIcon>
                    <AssignmentIcon fontSize="small" sx={{ color: '#2D5A27' }} />
                  </ListItemIcon>
                  <ListItemText primary="作业" />
                </MenuItem>
                <MenuItem onClick={() => { handleMenuClose(); setSelectedMenu('scores'); }}>
                  <ListItemIcon>
                    <ScoreIcon fontSize="small" sx={{ color: '#2D5A27' }} />
                  </ListItemIcon>
                  <ListItemText primary="成绩单" />
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" sx={{ color: '#2D5A27' }} />
                  </ListItemIcon>
                  <ListItemText primary="退出登录" />
                </MenuItem>
              </Menu>
            </Box>
            <Typography
              sx={{ 
                fontSize: '1rem',
                color: '#2D5A27',
                fontWeight: 600
              }}
            >
              {user.username}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'white',
            borderRight: '1px solid rgba(0, 0, 0, 0.12)'
          }
        }}
      >
        <Toolbar />
        {drawer}
      </Drawer>

      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar />
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            <Grid item xs={12}>
              {renderContent()}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard; 