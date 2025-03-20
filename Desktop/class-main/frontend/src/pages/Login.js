import React, { useState } from 'react';
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Snackbar,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { login } from '../services/authApi';

// 使用更高级的配色方案
const theme = {
  primary: '#2E7D32',     // 深绿色主色调
  secondary: '#1B5E20',   // 更深的绿色
  accent: '#4CAF50',      // 清新的绿色
  text: '#1B1B1B',        // 深灰色文字
  lightText: '#424242',   // 次要文字颜色
  success: '#43A047',     // 成功状态绿色
  error: '#D32F2F',       // 错误状态红色
  background: '#F5F5F5',  // 浅灰色背景
  buttonHover: '#1B5E20', // 按钮悬停色
  secondaryHover: '#2E7D32' // 次要按钮悬停色
};

// 添加 Poppins 字体样式
const poppinsStyle = {
  fontFamily: 'Poppins, sans-serif'
};

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      setSuccess('登录成功');
      
      // 确保用户信息包含头像
      const userInfo = {
        ...response.user,
        avatar: response.user.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'
      };
      
      localStorage.setItem('user', JSON.stringify(userInfo));
      localStorage.setItem('token', response.token);
      
      setTimeout(() => {
        // 根据用户角色跳转到不同页面
        if (response.user.role === 'teacher') {
          navigate('/teacher-profile');
        } else if (response.user.role === 'student') {
          navigate('/teachers');
        } else if (response.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      }, 1000);
    } catch (err) {
      setError('账号或密码错误');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: '400px',
            background: '#FFFFFF'
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              mb: 3,
              color: theme.text,
              fontWeight: 600,
              ...poppinsStyle
            }}
          >
            KidNest
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="账号"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: theme.primary
                  }
                },
                '& .MuiInputLabel-root': {
                  ...poppinsStyle
                }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="密码"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: theme.primary
                  }
                },
                '& .MuiInputLabel-root': {
                  ...poppinsStyle
                }
              }}
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    color="primary"
                  />
                }
                label="记住我"
              />
              <Button color="primary">忘记密码？</Button>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                bgcolor: theme.primary,
                color: '#FFFFFF',
                borderRadius: '12px',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                ...poppinsStyle,
                '&:hover': {
                  bgcolor: theme.buttonHover
                }
              }}
            >
              登录
            </Button>
          </Box>
        </Paper>
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess('')}
      >
        <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login; 