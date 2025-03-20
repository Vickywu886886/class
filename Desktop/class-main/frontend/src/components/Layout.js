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
                sx={{ 
                  width: 40,
                  height: 40,
                  bgcolor: user?.role === 'teacher' ? '#2196f3' : '#81c784',
                  border: '2px solid',
                  borderColor: user?.role === 'teacher' ? '#2196f3' : '#4caf50'
                }}
              />
            </Box>

            <Typography variant="h6" noWrap component="div" sx={{ 
              flexGrow: 1, 
              display: 'flex', 
              alignItems: 'center',
              color: '#2D5A27',
              fontWeight: 600
            }}>
              {user ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {user.username}
                  <Button
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                    sx={{
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
                    退出
                  </Button>
                </Box>
              ) : (
                <>KidNest童巢优课</>
              )}
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              {user ? (
                <></>
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