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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { register } from '../services/authApi';

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

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
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
      await register(formData);
      setSuccess(isEnglish ? 'Registration successful! Please login.' : '注册成功！请登录');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError(isEnglish ? 'Registration failed. Please try again.' : '注册失败，请重试');
    }
  };

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
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

          <Button
            onClick={toggleLanguage}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: theme.primary,
              '&:hover': {
                color: theme.secondary
              }
            }}
          >
            {isEnglish ? '中文' : 'English'}
          </Button>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label={isEnglish ? "Username" : "用户名"}
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
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
              id="email"
              label={isEnglish ? "Email" : "邮箱"}
              name="email"
              autoComplete="email"
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
              label={isEnglish ? "Password" : "密码"}
              type={showPassword ? 'text' : 'password'}
              id="password"
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label={isEnglish ? "Confirm Password" : "确认密码"}
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>{isEnglish ? "Role" : "角色"}</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                label={isEnglish ? "Role" : "角色"}
                sx={{
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: theme.primary
                  }
                }}
              >
                <MenuItem value="student">{isEnglish ? "Student" : "学生"}</MenuItem>
                <MenuItem value="teacher">{isEnglish ? "Teacher" : "教师"}</MenuItem>
              </Select>
            </FormControl>
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
              {isEnglish ? 'Sign Up' : '注册'}
            </Button>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" sx={{ color: theme.lightText }}>
                {isEnglish ? "Already have an account?" : "已有账号？"}
                <Link
                  href="/login"
                  sx={{
                    ml: 1,
                    color: theme.primary,
                    textDecoration: 'none',
                    '&:hover': {
                      color: theme.secondary,
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {isEnglish ? "Sign In" : "立即登录"}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register; 