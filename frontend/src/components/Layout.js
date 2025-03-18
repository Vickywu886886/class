import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // 基础菜单项
  const baseMenuItems = [
    { text: '首页', icon: <HomeIcon />, path: '/' },
    { text: '课程中心', icon: <AutoStoriesIcon />, path: '/courses' },
    { text: '教师团队', icon: <SchoolIcon />, path: '/teachers' },
  ];

  // 教师菜单项
  const teacherMenuItems = [
    ...baseMenuItems,
    { text: '教师中心', icon: <SchoolIcon />, path: '/teacher-profile' },
  ];

  // 学生菜单项
  const studentMenuItems = [
    ...baseMenuItems,
    { text: '个人中心', icon: <PersonIcon />, path: '/profile' },
  ];

  // 根据用户角色选择菜单项
  const menuItems = user ? (user.role === 'teacher' ? teacherMenuItems : studentMenuItems) : baseMenuItems;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ bgcolor: '#4caf50' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              KidNest童巢外语
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              {user ? (
                <>
                  <Tooltip title="打开设置">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt={user.username}
                        src={user.avatar}
                        sx={{ 
                          bgcolor: user.role === 'teacher' ? '#2196f3' : '#81c784',
                          border: '2px solid white'
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {user.role === 'teacher' ? (
                      <MenuItem onClick={() => {
                        navigate('/teacher-profile');
                        handleCloseUserMenu();
                      }}>
                        <SchoolIcon sx={{ mr: 1, color: '#2196f3' }} /> 教师中心
                      </MenuItem>
                    ) : (
                      <MenuItem onClick={() => {
                        navigate('/profile');
                        handleCloseUserMenu();
                      }}>
                        <PersonIcon sx={{ mr: 1, color: '#4caf50' }} /> 个人中心
                      </MenuItem>
                    )}
                    <MenuItem onClick={handleLogout}>
                      <LogoutIcon sx={{ mr: 1, color: '#f44336' }} /> 退出登录
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  color="inherit"
                  onClick={() => navigate('/login')}
                  sx={{
                    borderRadius: '20px',
                    border: '1px solid white',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  登录
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setDrawerOpen(false)}
        >
          {user && (
            <Box sx={{ 
              p: 3, 
              textAlign: 'center',
              background: user.role === 'teacher' ? 
                'linear-gradient(135deg, #2196f3 0%, #64b5f6 100%)' : 
                'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
              color: 'white'
            }}>
              <Avatar
                src={user.avatar}
                sx={{ 
                  width: 80, 
                  height: 80, 
                  margin: '0 auto', 
                  mb: 2,
                  border: '3px solid white',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {user.username}
              </Typography>
              <Chip
                label={user.role === 'teacher' ? '教师' : '学生'}
                sx={{ 
                  mt: 1,
                  bgcolor: 'rgba(255,255,255,0.9)',
                  color: user.role === 'teacher' ? '#2196f3' : '#4caf50',
                  fontWeight: 'bold'
                }}
              />
            </Box>
          )}
          
          <Divider />
          
          <List sx={{ pt: 2 }}>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    mx: 1,
                    borderRadius: '10px',
                    '&:hover': {
                      bgcolor: user?.role === 'teacher' ? '#e3f2fd' : '#e8f5e9',
                    }
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: user?.role === 'teacher' ? '#2196f3' : '#4caf50'
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text}
                    sx={{
                      '& .MuiTypography-root': {
                        fontWeight: 'bold'
                      }
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 