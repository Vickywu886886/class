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
import { useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CalendarIcon from '@mui/icons-material/CalendarToday';
import SettingsIcon from '@mui/icons-material/Settings';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  // 检查是否在登录页面
  const isLoginPage = location.pathname === '/login';

  // 如果是登录页面，直接返回内容，不显示导航栏
  if (isLoginPage) {
    return <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {children}
    </Box>;
  }

  // 如果是学生用户，只在点击头像时显示导航菜单
  const isStudent = user?.role === 'student';

  const handleOpenUserMenu = (event) => {
    if (isStudent) {
      setShowMenu(true);
    }
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setShowMenu(false);
    setAnchorElUser(null);
  };

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
        localStorage.setItem('user', JSON.stringify(updatedUser));
        window.location.reload(); // 刷新页面以更新所有组件中的头像
      };
      reader.readAsDataURL(file);
    }
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
    { text: '学习中心', icon: <SchoolIcon />, path: '/student/dashboard' },
    { text: '个人中心', icon: <PersonIcon />, path: '/student/profile' },
  ];

  // 管理员菜单项
  const adminMenuItems = [
    { text: '教师管理', icon: <SchoolIcon />, path: '/admin/dashboard' },
    { text: '学生管理', icon: <PersonIcon />, path: '/admin/dashboard' },
    { text: '课表管理', icon: <CalendarIcon />, path: '/admin/dashboard' },
    { text: '系统设置', icon: <SettingsIcon />, path: '/admin/dashboard' },
  ];

  // 根据用户角色选择菜单项
  const menuItems = user ? (
    user.role === 'admin' ? adminMenuItems :
    user.role === 'teacher' ? teacherMenuItems : 
    studentMenuItems
  ) : baseMenuItems;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ 
        bgcolor: 'white',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        zIndex: (theme) => theme.zIndex.drawer + 1 
      }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ position: 'relative', mr: 2 }}>
              <Avatar
                alt={user?.username}
                src={user?.avatar}
                onClick={handleOpenUserMenu}
                sx={{ 
                  width: 40,
                  height: 40,
                  bgcolor: user?.role === 'teacher' ? '#2196f3' : '#81c784',
                  border: '2px solid',
                  borderColor: user?.role === 'teacher' ? '#2196f3' : '#4caf50',
                  cursor: 'pointer'
                }}
              />
              {user && (
                <>
                  <input
                    accept="image/*"
                    type="file"
                    id="layout-avatar-upload"
                    onChange={handleAvatarChange}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="layout-avatar-upload">
                    <IconButton
                      component="span"
                      size="small"
                      onClick={(e) => e.stopPropagation()}
                      sx={{
                        position: 'absolute',
                        right: -8,
                        bottom: -8,
                        bgcolor: user.role === 'teacher' ? '#2196f3' : '#4caf50',
                        color: 'white',
                        width: 24,
                        height: 24,
                        '&:hover': {
                          bgcolor: user.role === 'teacher' ? '#1976d2' : '#45a049'
                        }
                      }}
                    >
                      <PhotoCameraIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </label>
                </>
              )}
            </Box>

            <Typography variant="h6" noWrap component="div" sx={{ 
              flexGrow: 1, 
              display: 'flex', 
              alignItems: 'center',
              color: '#2D5A27',
              fontWeight: 600
            }}>
              {user ? (
                <>{user.username}</>
              ) : (
                <>KidNest童巢优课</>
              )}
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              {user ? (
                <>
                  <Menu
                    anchorEl={anchorElUser}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    sx={{
                      '& .MuiPaper-root': {
                        width: '80vw',
                        maxWidth: '300px',
                        boxSizing: 'border-box',
                        bgcolor: 'background.paper',
                        boxShadow: '4px 0 8px rgba(0, 0, 0, 0.1)'
                      }
                    }}
                  >
                    <Box sx={{ 
                      height: '100%',
                      width: '100%',
                      display: 'flex', 
                      flexDirection: 'column',
                      p: 3
                    }}>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'flex-end',
                        mb: 2
                      }}>
                        <IconButton onClick={handleCloseUserMenu}>
                          <CloseIcon />
                        </IconButton>
                      </Box>
                      <MenuItem 
                        onClick={handleLogout}
                        sx={{
                          py: 3,
                          px: 4,
                          borderRadius: 2,
                          color: '#f44336',
                          '&:hover': {
                            bgcolor: 'rgba(244, 67, 54, 0.08)'
                          }
                        }}
                      >
                        <LogoutIcon sx={{ mr: 2 }} /> 退出登录
                      </MenuItem>
                    </Box>
                  </Menu>
                </>
              ) : (
                <Button
                  variant="outlined"
                  onClick={() => navigate('/login')}
                  sx={{
                    borderRadius: '20px',
                    borderColor: '#4caf50',
                    color: '#4caf50',
                    '&:hover': {
                      borderColor: '#45a049',
                      bgcolor: 'rgba(76, 175, 80, 0.04)'
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

      <Toolbar /> {/* 添加一个空的Toolbar来占位，防止内容被AppBar遮挡 */}

      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 