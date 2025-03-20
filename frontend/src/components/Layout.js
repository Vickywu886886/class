<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc
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
<<<<<<< HEAD
  const [userData, setUserData] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
=======
  const [drawerOpen, setDrawerOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc

  // 检查是否在登录页面
  const isLoginPage = location.pathname === '/login';

<<<<<<< HEAD
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

=======
>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc
  // 如果是登录页面，直接返回内容，不显示导航栏
  if (isLoginPage) {
    return <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {children}
    </Box>;
  }

<<<<<<< HEAD
  // 如果是学生用户，只在点击头像时显示导航菜单
  const isStudent = userData?.role === 'student';

  const handleOpenUserMenu = (event) => {
    if (isStudent) {
      setShowMenu(true);
    }
=======
  const handleOpenUserMenu = (event) => {
>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
<<<<<<< HEAD
    setShowMenu(false);
=======
>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
<<<<<<< HEAD
    setUserData(null);
=======
>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc
    navigate('/login');
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
<<<<<<< HEAD
        const updatedUser = { ...userData, avatar: reader.result };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUserData(updatedUser);
=======
        const updatedUser = { ...user, avatar: reader.result };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        window.location.reload(); // 刷新页面以更新所有组件中的头像
>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc
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
<<<<<<< HEAD
    { text: 'Dashboard', icon: <HomeIcon />, path: '/teacher/dashboard' },
    { text: 'Students', icon: <PersonIcon />, path: '/teacher/students' },
    { text: 'Schedule', icon: <CalendarIcon />, path: '/teacher/schedule' },
    { text: 'Assignments', icon: <AutoStoriesIcon />, path: '/teacher/assignments' },
=======
    ...baseMenuItems,
    { text: '教师中心', icon: <SchoolIcon />, path: '/teacher-profile' },
>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc
  ];

  // 学生菜单项
  const studentMenuItems = [
    ...baseMenuItems,
    { text: '学习中心', icon: <SchoolIcon />, path: '/student/dashboard' },
    { text: '个人中心', icon: <PersonIcon />, path: '/student/profile' },
  ];

  // 管理员菜单项
  const adminMenuItems = [
<<<<<<< HEAD
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

=======
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

>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ 
        bgcolor: 'white',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
<<<<<<< HEAD
=======
        zIndex: (theme) => theme.zIndex.drawer + 1 
>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc
      }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ position: 'relative', mr: 2 }}>
              <Avatar
<<<<<<< HEAD
                alt={userData?.username}
                src={userData?.avatar}
=======
                alt={user?.username}
                src={user?.avatar}
>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc
                onClick={handleOpenUserMenu}
                sx={{ 
                  width: 40,
                  height: 40,
<<<<<<< HEAD
                  bgcolor: userData?.role === 'teacher' ? '#2196f3' : '#81c784',
                  border: '2px solid',
                  borderColor: userData?.role === 'teacher' ? '#2196f3' : '#4caf50',
                  cursor: 'pointer'
                }}
              />
              {userData && (
=======
                  bgcolor: user?.role === 'teacher' ? '#2196f3' : '#81c784',
                  border: '2px solid',
                  borderColor: user?.role === 'teacher' ? '#2196f3' : '#4caf50',
                  cursor: 'pointer'
                }}
              />
              {user && (
>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc
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
<<<<<<< HEAD
                        bgcolor: userData.role === 'teacher' ? '#2196f3' : '#4caf50',
=======
                        bgcolor: user.role === 'teacher' ? '#2196f3' : '#4caf50',
>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc
                        color: 'white',
                        width: 24,
                        height: 24,
                        '&:hover': {
<<<<<<< HEAD
                          bgcolor: userData.role === 'teacher' ? '#1976d2' : '#45a049'
=======
                          bgcolor: user.role === 'teacher' ? '#1976d2' : '#45a049'
>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc
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
<<<<<<< HEAD
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
=======
              {user ? (
                <>{user.username}</>
>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc
              ) : (
                <>KidNest童巢优课</>
              )}
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
<<<<<<< HEAD
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
=======
              {user ? (
                <>
                  <Drawer
                    anchor="left"
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    sx={{
                      '& .MuiDrawer-paper': {
                        width: '80vw',
>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc
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
<<<<<<< HEAD
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
=======
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: 2
                      }}>
                        {menuItems.map((item) => (
                          <MenuItem 
                            key={item.text}
                            onClick={() => {
                              navigate(item.path);
                              handleCloseUserMenu();
                            }}
                            sx={{
                              py: 3,
                              px: 4,
                              borderRadius: 2,
                              '&:hover': {
                                bgcolor: 'rgba(45, 90, 39, 0.08)'
                              }
                            }}
                          >
                            {item.icon}
                            <ListItemText 
                              primary={item.text} 
                              sx={{ ml: 2 }}
                            />
                          </MenuItem>
                        ))}
                      </Box>
                      <Divider sx={{ my: 2 }} />
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
                  </Drawer>
>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc
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

<<<<<<< HEAD
      <Toolbar /> {/* Spacer */}

      <Box component="main" sx={{ 
        flexGrow: 1, 
        bgcolor: '#f5f5f5', 
        minHeight: '100vh',
        pt: 3
      }}>
=======
      <Toolbar /> {/* 添加一个空的Toolbar来占位，防止内容被AppBar遮挡 */}

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
>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 