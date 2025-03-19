import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Paper,
  Box,
  Button,
  styled
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';

const StyledButton = styled(Button)(({ theme, active }) => ({
  borderRadius: '20px',
  textTransform: 'none',
  color: active ? '#2e7d32' : 'inherit',
  backgroundColor: active ? 'rgba(46, 125, 50, 0.08)' : 'transparent',
  '&:hover': {
    backgroundColor: 'rgba(46, 125, 50, 0.12)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(46, 125, 50, 0.15)'
  },
  transition: 'all 0.3s ease',
  padding: '8px 16px',
  minWidth: '120px',
  '& .MuiSvgIcon-root': {
    color: active ? '#2e7d32' : 'inherit',
    marginRight: '8px'
  }
}));

const StudentNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Paper 
      sx={{ 
        p: 2, 
        mb: 3,
        borderRadius: '20px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        background: 'linear-gradient(to right, rgba(46, 125, 50, 0.02), rgba(46, 125, 50, 0.05))'
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2
      }}>
        <StyledButton
          startIcon={<HomeIcon />}
          onClick={() => navigate('/')}
          active={isActive('/')}
        >
          首页
        </StyledButton>
        <StyledButton
          startIcon={<AutoStoriesIcon />}
          onClick={() => navigate('/courses')}
          active={isActive('/courses')}
        >
          课程中心
        </StyledButton>
        <StyledButton
          startIcon={<SchoolIcon />}
          onClick={() => navigate('/teachers')}
          active={isActive('/teachers')}
        >
          教师团队
        </StyledButton>
        <StyledButton
          startIcon={<SchoolIcon />}
          onClick={() => navigate('/student/dashboard')}
          active={isActive('/student/dashboard')}
        >
          学习中心
        </StyledButton>
        <StyledButton
          startIcon={<PersonIcon />}
          onClick={() => navigate('/student/profile')}
          active={isActive('/student/profile')}
        >
          个人中心
        </StyledButton>
      </Box>
    </Paper>
  );
};

export default StudentNav; 