import React from 'react';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BookIcon from '@mui/icons-material/Book';
import SettingsIcon from '@mui/icons-material/Settings';

const StyledButton = styled(Button)(({ theme, active }) => ({
  color: active ? 'white' : '#4caf50',
  backgroundColor: active ? '#4caf50' : 'transparent',
  margin: theme.spacing(1),
  '&:hover': {
    backgroundColor: active ? '#45a049' : 'rgba(76, 175, 80, 0.08)',
  },
  textTransform: 'none',
  borderRadius: '8px',
  padding: '8px 16px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  minWidth: '120px',
  justifyContent: 'flex-start',
}));

const TeacherNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/teacher/dashboard' },
    { text: 'Students', icon: <PeopleIcon />, path: '/teacher/students' },
    { text: 'Courses', icon: <BookIcon />, path: '/teacher/courses' },
    { text: 'Availability', icon: <CalendarTodayIcon />, path: '/teacher/availability' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/teacher/settings' },
  ];

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'row',
      alignItems: 'center',
      bgcolor: 'white',
      borderRadius: 2,
      p: 1,
      mb: 3,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      {menuItems.map((item) => (
        <StyledButton
          key={item.text}
          startIcon={item.icon}
          active={location.pathname === item.path ? 1 : 0}
          onClick={() => navigate(item.path)}
        >
          {item.text}
        </StyledButton>
      ))}
    </Box>
  );
};

export default TeacherNav; 