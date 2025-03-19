import React, { useState, useEffect } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
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
  Menu,
  MenuItem,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  People as PeopleIcon,
  Class as ClassIcon,
  Schedule as ScheduleIcon,
  ShoppingCart as OrderIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState('staff');
  const [anchorEl, setAnchorEl] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const drawerWidth = isMobile ? 200 : isTablet ? 240 : 280;

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    if (!userInfo || userInfo.role !== 'admin') {
      navigate('/login');
      return;
    }
    if (!userInfo.adminMenuItems) {
      userInfo.adminMenuItems = [
        { label: '员工管理', value: 'staff' },
        { label: '学员管理', value: 'students' },
        { label: '班级管理', value: 'classes' },
        { label: '课表管理', value: 'schedule' },
        { label: '课程订单', value: 'orders' }
      ];
    }
    setUser(userInfo);
  }, [navigate]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleMenuItemClick = (value) => {
    setSelectedMenu(value);
  };

  const getMenuIcon = (value) => {
    switch (value) {
      case 'staff':
        return <PeopleIcon />;
      case 'students':
        return <PersonIcon />;
      case 'classes':
        return <ClassIcon />;
      case 'schedule':
        return <ScheduleIcon />;
      case 'orders':
        return <OrderIcon />;
      default:
        return <PeopleIcon />;
    }
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'staff':
        return (
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
              员工管理
            </Typography>
            {/* 员工管理内容 */}
          </Paper>
        );
      case 'students':
        return (
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
              学员管理
            </Typography>
            {/* 学员管理内容 */}
          </Paper>
        );
      case 'classes':
        return (
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
              班级管理
            </Typography>
            {/* 班级管理内容 */}
          </Paper>
        );
      case 'schedule':
        return (
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
              课表管理
            </Typography>
            {/* 课表管理内容 */}
          </Paper>
        );
      case 'orders':
        return (
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
              课程订单
            </Typography>
            {/* 课程订单内容 */}
          </Paper>
        );
      default:
        return null;
    }
  };

  const drawer = (
    <Box sx={{ overflow: 'auto', mt: 2 }}>
      <List>
        {user?.adminMenuItems.map((item) => (
          <ListItem
            button
            key={item.value}
            selected={selectedMenu === item.value}
            onClick={() => handleMenuItemClick(item.value)}
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
              {getMenuIcon(item.value)}
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

  if (!user || !user.adminMenuItems) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <Typography>加载中...</Typography>
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
            <Avatar 
              src={user.avatar} 
              alt={user.username}
              sx={{ 
                width: { xs: 32, sm: 40 }, 
                height: { xs: 32, sm: 40 },
                mr: 2
              }}
            />
            <span style={{ 
              fontSize: '1rem',
              color: '#2D5A27',
              fontWeight: 600
            }}>
              {user.username}
            </span>
          </Box>
          <IconButton 
            onClick={handleLogout}
            sx={{ 
              color: '#2D5A27',
              '&:hover': {
                bgcolor: 'rgba(197,230,176,0.2)'
              }
            }}
          >
            <LogoutIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
          </IconButton>
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