import React, { useState, useEffect } from 'react';
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
  const [userData, setUserData] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // 检查是否在登录页面
  const isLoginPage = location.pathname === '/login';

  // 监听用户数据变化
  useEffect(() => {
    const checkUserData = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (JSON.stringify(user) !== JSON.stringify(userData)) {
        setUserData(user);
      }
    };

    // 初始化用户数据
    checkUserData();

    // 设置定期检查
    const interval = setInterval(checkUserData, 1000);

    // 添加storage事件监听
    const handleStorageChange = (e) => {
      if (e.key === 'user') {
        const user = JSON.parse(e.newValue);
        setUserData(user);
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [userData]);

  // 如果是登录页面，直接返回内容，不显示导航栏
  if (isLoginPage) {
    return <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {children}
    </Box>;
  }

  // 如果是学生用户，只在点击头像时显示导航菜单
  const isStudent = userData?.role === 'student';

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
    setUserData(null);
    navigate('/login');
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUser = { ...userData, avatar: reader.result };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUserData(updatedUser);
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
    { text: 'Dashboard', icon: <HomeIcon />, path: '/teacher/dashboard' },
    { text: 'Students', icon: <PersonIcon />, path: '/teacher/students' },
    { text: 'Schedule', icon: <CalendarIcon />, path: '/teacher/schedule' },
    { text: 'Assignments', icon: <AutoStoriesIcon />, path: '/teacher/assignments' },
  ];

  // 学生菜单项
  const studentMenuItems = [
    ...baseMenuItems,
    { text: '学习中心', icon: <SchoolIcon />, path: '/student/dashboard' },
    { text: '个人中心', icon: <PersonIcon />, path: '/student/profile' },
  ];

  // 管理员菜单项
  const adminMenuItems = [
    { text: '员工管理', icon: <SchoolIcon />, path: '/admin/dashboard?menu=staff' },
    { text: '学员管理', icon: <PersonIcon />, path: '/admin/dashboard?menu=students' },
    { text: '班级管理', icon: <CalendarIcon />, path: '/admin/dashboard?menu=classes' },
    { text: '课表管理', icon: <CalendarIcon />, path: '/admin/dashboard?menu=schedule' },
    { text: '课程订单', icon: <AutoStoriesIcon />, path: '/admin/dashboard?menu=orders' },
  ];

  // 根据用户角色选择菜单项
  const menuItems = userData ? (
    userData.role === 'admin' ? adminMenuItems :
    userData.role === 'teacher' ? teacherMenuItems : 
    studentMenuItems
  ) : baseMenuItems;

  const drawerWidth = 240;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ 
        bgcolor: 'white',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ position: 'relative', mr: 2 }}>
              <Avatar
                alt={userData?.username}
                src={userData?.avatar}
                onClick={handleOpenUserMenu}
                sx={{ 
                  width: 40,
                  height: 40,
                  bgcolor: userData?.role === 'teacher' ? '#2196f3' : '#81c784',
                  border: '2px solid',
                  borderColor: userData?.role === 'teacher' ? '#2196f3' : '#4caf50',
                  cursor: 'pointer'
                }}
              />
              {userData && (
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
                        bgcolor: userData.role === 'teacher' ? '#2196f3' : '#4caf50',
                        color: 'white',
                        width: 24,
                        height: 24,
                        '&:hover': {
                          bgcolor: userData.role === 'teacher' ? '#1976d2' : '#45a049'
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
              {userData ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {userData.username}
                  {userData.role === 'teacher' && (
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: '#666',
                        ml: 1,
                        fontWeight: 400,
                        fontSize: '0.9rem'
                      }}
                    >
                      - Teacher
                    </Typography>
                  )}
                  <Button
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                    sx={{
                      ml: 2,
                      textTransform: 'none',
                      color: '#2e7d32',
                      '&:hover': {
                        backgroundColor: 'rgba(46, 125, 50, 0.08)',
                      },
                      padding: '4px 12px',
                      minWidth: 'auto',
                      '& .MuiSvgIcon-root': {
                        marginRight: '4px',
                        fontSize: '20px'
                      }
                    }}
                  >
                    退出登录
                  </Button>
                </Box>
              ) : (
                <>KidNest童巢优课</>
              )}
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              {userData ? (
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
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2
                      }}>
                        <Avatar
                          alt={userData?.username}
                          src={userData?.avatar}
                          sx={{ 
                            width: 100,
                            height: 100,
                            bgcolor: userData?.role === 'teacher' ? '#2196f3' : '#81c784',
                            border: '2px solid',
                            borderColor: userData?.role === 'teacher' ? '#2196f3' : '#4caf50',
                          }}
                        />
                        <Typography variant="h6" sx={{ color: '#2D5A27' }}>
                          {userData?.username}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {userData?.role === 'student' ? '学生' : userData?.role === 'teacher' ? '教师' : '管理员'}
                        </Typography>
                      </Box>
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

      <Toolbar /> {/* Spacer */}

      <Box component="main" sx={{ 
        flexGrow: 1, 
        bgcolor: '#f5f5f5', 
        minHeight: '100vh',
        pt: 3
      }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 