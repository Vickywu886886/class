import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
  Tabs,
  Tab,
  Divider,
  Checkbox,
  FormControlLabel,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff, Email, Person, Lock, School, EmojiObjects, Close, Refresh, QrCode2, LockOutlined } from '@mui/icons-material';

// 微信登录配置
const WECHAT_APP_ID = 'your_wechat_app_id'; // 替换为您的微信应用ID
const REDIRECT_URI = encodeURIComponent(window.location.origin + '/wechat-callback');

// 样式组件
const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: 8,
  top: 8,
  color: theme.palette.grey[500],
}));

const QRCodeBox = styled(Box)(({ theme }) => ({
  width: '200px',
  height: '200px',
  margin: '20px auto',
  padding: '10px',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#f5f5f5',
  position: 'relative',
}));

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // 表单验证状态
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [qrUrl, setQrUrl] = useState('');
  const [qrLoading, setQrLoading] = useState(false);
  const [qrExpired, setQrExpired] = useState(false);
  const [polling, setPolling] = useState(false);

  const theme = useTheme();

  // 更新配色方案，加深文字颜色
  const childFriendlyColors = {
    primary: '#C5E6B0',     // 清新的浅绿色
    secondary: '#9DC88D',   // 深一点的绿色
    accent: '#E6D7B0',      // 温暖的米色
    text: '#2D5A27',        // 更深的绿色文字
    lightText: '#3A7434',   // 深绿色次要文字
    success: '#B8E6B0',     // 柔和的绿色
    error: '#E6B0B0',       // 柔和的红色
    background: '#F7FAF5',  // 浅绿色背景
    buttonHover: '#B8D9A3', // 按钮悬停色
    secondaryHover: '#8CB87D' // 次要按钮悬停色
  };

  // 加载微信 JS SDK
  useEffect(() => {
    const loadWechatScript = () => {
      const script = document.createElement('script');
      script.src = 'https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js';
      script.async = true;
      document.body.appendChild(script);
    };
    loadWechatScript();
  }, []);

  // 初始化微信登录
  const initWechatLogin = async () => {
    setQrLoading(true);
    setQrExpired(false);
    try {
      // 这里应该调用您的后端 API 获取微信登录二维码
      const response = await fetch('/api/wechat/qr-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          redirect_uri: REDIRECT_URI,
          state: 'random_state',
        }),
      });

      const data = await response.json();
      setQrUrl(data.qrUrl);
      startPolling(data.state);
    } catch (error) {
      console.error('获取微信二维码失败:', error);
      setSnackbar({
        open: true,
        message: '获取微信二维码失败，请重试',
        severity: 'error'
      });
    } finally {
      setQrLoading(false);
    }
  };

  // 开始轮询检查登录状态
  const startPolling = (state) => {
    setPolling(true);
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch('/api/wechat/check-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ state }),
        });

        const data = await response.json();
        if (data.logged_in) {
          clearInterval(pollInterval);
          setPolling(false);
          handleWechatLoginSuccess(data);
        }
      } catch (error) {
        console.error('检查登录状态失败:', error);
      }
    }, 2000);

    // 5分钟后二维码过期
    setTimeout(() => {
      clearInterval(pollInterval);
      setPolling(false);
      setQrExpired(true);
    }, 300000);

    return () => {
      clearInterval(pollInterval);
      setPolling(false);
    };
  };

  const handleWechatLoginSuccess = (data) => {
    // 处理微信登录成功
    localStorage.setItem('user', JSON.stringify({
      username: data.nickname,
      role: 'student',
      avatar: data.headimgurl
    }));

    setSnackbar({
      open: true,
      message: '微信登录成功！',
      severity: 'success'
    });

    setTimeout(() => {
      setQrDialogOpen(false);
      navigate('/');
    }, 1500);
  };

  const handleWechatLogin = () => {
    setQrDialogOpen(true);
    initWechatLogin();
  };

  const handleRefreshQrCode = () => {
    initWechatLogin();
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = (isLoginForm = true) => {
    const newErrors = {};
    if (isLoginForm) {
      if (!loginForm.username) newErrors.username = '请输入账号';
      if (!loginForm.password) newErrors.password = '请输入密码';
    } else {
      if (!registerForm.username) newErrors.username = '请输入账号';
      if (!registerForm.email) newErrors.email = '请输入邮箱';
      else if (!validateEmail(registerForm.email)) newErrors.email = '请输入有效的邮箱地址';
      if (!registerForm.password) newErrors.password = '请输入密码';
      else if (registerForm.password.length < 6) newErrors.password = '密码长度至少6位';
      if (!registerForm.confirmPassword) newErrors.confirmPassword = '请确认密码';
      else if (registerForm.password !== registerForm.confirmPassword) {
        newErrors.confirmPassword = '两次输入的密码不一致';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!validateForm(true)) return;

    // 根据用户名判断角色
    let role = 'student'; // 默认为学生
    if (loginForm.username === 'sarah.johnson') {
      role = 'teacher';
    } else if (loginForm.username === 'admin') {
      role = 'admin';
    }

    // 这里应该调用后端API进行验证
    // 目前模拟登录成功
    const userInfo = {
      username: loginForm.username,
      role: role,
      avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
      // 为管理员添加额外的菜单项
      adminMenuItems: role === 'admin' ? [
        { label: '员工管理', value: 'staff' },
        { label: '学员管理', value: 'students' },
        { label: '班级管理', value: 'classes' },
        { label: '课表管理', value: 'schedule' },
        { label: '课程订单', value: 'orders' }
      ] : []
    };

    if (rememberMe) {
      localStorage.setItem('rememberedUser', JSON.stringify({
        username: loginForm.username
      }));
    }

    localStorage.setItem('user', JSON.stringify(userInfo));

    setSnackbar({
      open: true,
      message: '登录成功！',
      severity: 'success'
    });

    setTimeout(() => {
      // 根据角色跳转到不同的页面
      switch (role) {
        case 'teacher':
          navigate('/teacher/dashboard');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
        default:
          navigate('/student/dashboard');
      }
    }, 1500);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!validateForm(false)) return;

    // 这里应该调用后端API进行注册
    // 目前模拟注册成功
    setSnackbar({
      open: true,
      message: '注册成功！请登录',
      severity: 'success'
    });

    setTimeout(() => {
      setIsLogin(true);
      setRegisterForm({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student'
      });
    }, 1500);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
    // 清除对应的错误信息
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({
      ...prev,
      [name]: value
    }));
    // 清除对应的错误信息
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCloseQrDialog = () => {
    setQrDialogOpen(false);
  };

  return (
    <>
      <Container maxWidth="sm" sx={{
        mt: 4,
        mb: 4,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        bgcolor: childFriendlyColors.background
      }}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: '24px',
            bgcolor: 'white',
            boxShadow: '0 8px 32px rgba(197,230,176,0.2)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: childFriendlyColors.primary,
            }
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              component="div"
              sx={{
                color: childFriendlyColors.primary,
                fontWeight: 600,
                mb: 1
              }}
            >
              KidNest
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: childFriendlyColors.text,
                fontWeight: 500
              }}
            >
              童巢优课
            </Typography>
          </Box>

          <Tabs
            value={isLogin ? 0 : 1}
            onChange={(e, newValue) => setIsLogin(newValue === 0)}
            centered
            sx={{
              mb: 4,
              '& .MuiTab-root': {
                fontSize: '1.1rem',
                fontWeight: 600,
                minWidth: 120,
                textTransform: 'none',
                color: childFriendlyColors.lightText
              },
              '& .Mui-selected': {
                color: childFriendlyColors.primary
              },
              '& .MuiTabs-indicator': {
                backgroundColor: childFriendlyColors.primary,
                height: 3,
                borderRadius: '3px'
              }
            }}
          >
            <Tab label="登录" icon={<Person />} iconPosition="start" />
            <Tab label="注册" icon={<School />} iconPosition="start" />
          </Tabs>

          {isLogin ? (
            <form onSubmit={handleLoginSubmit}>
              <TextField
                fullWidth
                label="账号"
                name="username"
                value={loginForm.username}
                onChange={handleLoginChange}
                margin="normal"
                variant="outlined"
                error={!!errors.username}
                helperText={errors.username || '请输入账号'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiInputLabel-root': {
                    color: childFriendlyColors.lightText,
                    fontWeight: 500
                  },
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: childFriendlyColors.primary
                    }
                  },
                  '& .MuiInputBase-input': {
                    color: childFriendlyColors.text
                  },
                  '& .MuiInputAdornment-root .MuiSvgIcon-root': {
                    color: childFriendlyColors.text
                  },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: childFriendlyColors.secondary
                  }
                }}
              />

              <TextField
                fullWidth
                label="密码"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={loginForm.password}
                onChange={handleLoginChange}
                margin="normal"
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
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
                  '& .MuiInputLabel-root': {
                    color: childFriendlyColors.lightText,
                    fontWeight: 500
                  },
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: childFriendlyColors.primary
                    }
                  },
                  '& .MuiInputBase-input': {
                    color: childFriendlyColors.text
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
                  borderRadius: '12px',
                  padding: '12px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  bgcolor: childFriendlyColors.primary,
                  color: childFriendlyColors.text,
                  boxShadow: '0 3px 12px rgba(197,230,176,0.3)',
                  fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
                  '&:hover': {
                    bgcolor: childFriendlyColors.buttonHover,
                    boxShadow: '0 4px 16px rgba(197,230,176,0.4)',
                  }

                }}
              >
                {isLogin ? '登录' : '注册'}
              </Button>

              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  或使用以下方式登录
                </Typography>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<QrCode2 />}
                  onClick={handleWechatLogin}
                  sx={{
                    mt: 2,
                    color: childFriendlyColors.secondary,
                    borderColor: childFriendlyColors.secondary,
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: childFriendlyColors.secondaryHover,
                      bgcolor: `${childFriendlyColors.secondary}10`,

                    }
                  }}
                >
                  微信{isLogin ? '登录' : '注册'}
                </Button>
              </Box>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit}>
              <TextField
                fullWidth
                label="账号"
                name="username"
                value={registerForm.username}
                onChange={handleRegisterChange}
                margin="normal"
                variant="outlined"
                error={!!errors.username}
                helperText={errors.username || '请输入账号'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiInputLabel-root': {
                    color: childFriendlyColors.lightText,
                    fontWeight: 500
                  },
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: childFriendlyColors.primary
                    }
                  },
                  '& .MuiInputBase-input': {
                    color: childFriendlyColors.text
                  },
                  '& .MuiInputAdornment-root .MuiSvgIcon-root': {
                    color: childFriendlyColors.text
                  },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: childFriendlyColors.secondary
                  }
                }}
              />

              <TextField
                fullWidth
                label="邮箱"
                name="email"
                type="email"
                value={registerForm.email}
                onChange={handleRegisterChange}
                margin="normal"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiInputLabel-root': {
                    color: childFriendlyColors.lightText,
                    fontWeight: 500
                  },
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: childFriendlyColors.primary
                    }
                  },
                  '& .MuiInputBase-input': {
                    color: childFriendlyColors.text
                  },
                  '& .MuiInputAdornment-root .MuiSvgIcon-root': {
                    color: childFriendlyColors.text
                  },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: childFriendlyColors.secondary
                  }
                }}
              />

              <TextField
                fullWidth
                label="密码"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={registerForm.password}
                onChange={handleRegisterChange}
                margin="normal"
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
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
                  '& .MuiInputLabel-root': {
                    color: childFriendlyColors.lightText,
                    fontWeight: 500
                  },
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: childFriendlyColors.primary
                    }
                  },
                  '& .MuiInputBase-input': {
                    color: childFriendlyColors.text
                  },
                  '& .MuiInputAdornment-root .MuiSvgIcon-root': {
                    color: childFriendlyColors.text
                  },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: childFriendlyColors.secondary
                  }
                }}
              />

              <TextField
                fullWidth
                label="确认密码"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={registerForm.confirmPassword}
                onChange={handleRegisterChange}
                margin="normal"
                variant="outlined"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
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
                  '& .MuiInputLabel-root': {
                    color: childFriendlyColors.lightText,
                    fontWeight: 500
                  },
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: childFriendlyColors.primary
                    }
                  },
                  '& .MuiInputBase-input': {
                    color: childFriendlyColors.text
                  },
                  '& .MuiInputAdornment-root .MuiSvgIcon-root': {
                    color: childFriendlyColors.text
                  },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: childFriendlyColors.secondary
                  }
                }}
              />

              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>角色</InputLabel>
                <Select
                  name="role"
                  value={registerForm.role}
                  onChange={handleRegisterChange}
                  label="角色"
                >
                  <MenuItem value="student">学生</MenuItem>
                  <MenuItem value="teacher">教师</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  borderRadius: '12px',
                  padding: '12px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  bgcolor: childFriendlyColors.primary,
                  color: childFriendlyColors.text,
                  boxShadow: '0 3px 12px rgba(197,230,176,0.3)',
                  fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
                  '&:hover': {
                    bgcolor: childFriendlyColors.buttonHover,
                    boxShadow: '0 4px 16px rgba(197,230,176,0.4)',
                  },
                  '& .MuiSvgIcon-root': {
                    color: childFriendlyColors.text
                  }
                }}
              >
                {isLogin ? '登录' : '注册'}
              </Button>

              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  或使用以下方式注册
                </Typography>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<QrCode2 />}
                  onClick={handleWechatLogin}
                  sx={{
                    mt: 2,
                    color: childFriendlyColors.secondary,
                    borderColor: childFriendlyColors.secondary,
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: childFriendlyColors.secondaryHover,
                      bgcolor: `${childFriendlyColors.secondary}10`,
                    },
                    '& .MuiSvgIcon-root': {
                      color: childFriendlyColors.text
                    }
                  }}
                >
                  微信{isLogin ? '登录' : '注册'}
                </Button>
              </Box>
            </form>
          )}

          <Divider sx={{ my: 2 }} />

          <Typography
            variant="body2"
            sx={{
              color: childFriendlyColors.text,
              fontWeight: 500,
              textAlign: 'center',
              mt: 2,
              '& .MuiButton-root': {
                color: childFriendlyColors.text
              }
            }}
          >
            {isLogin ? '还没有账号？' : '已有账号？'}
            <Button
              sx={{
                color: childFriendlyColors.primary,
                fontWeight: 600,
                '&:hover': {
                  bgcolor: `${childFriendlyColors.primary}10`,
                }
              }}
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
              }}
            >
              {isLogin ? '立即注册' : '立即登录'}
            </Button>
          </Typography>
        </Paper>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            * 这是一个演示版本，输入任意用户名和密码即可登录
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            * 管理员账号：admin / 密码：admin123
          </Typography>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            severity={snackbar.severity}
            sx={{
              width: '100%',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              fontWeight: 500,
              '&.MuiAlert-standardSuccess': {
                bgcolor: childFriendlyColors.success,
                color: childFriendlyColors.text
              },
              '&.MuiAlert-standardError': {
                bgcolor: childFriendlyColors.error,
                color: childFriendlyColors.text
              },
              '& .MuiAlert-message': {
                color: childFriendlyColors.text
              },
              '& .MuiSvgIcon-root': {
                color: childFriendlyColors.text
              }
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>

      <Dialog
        open={qrDialogOpen}
        onClose={handleCloseQrDialog}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '24px',
            padding: '16px',
            bgcolor: childFriendlyColors.background
          }
        }}
      >
        <DialogTitle sx={{
          textAlign: 'center',
          pb: 1,
          pt: 2,
          position: 'relative',
          color: childFriendlyColors.text,
          fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
          fontWeight: 600,
          '& .MuiSvgIcon-root': {
            color: childFriendlyColors.text
          }
        }}>
          <QrCode2 sx={{ fontSize: 40, color: childFriendlyColors.secondary, mb: 2 }} />
          <Typography variant="h5">微信扫码{isLogin ? '登录' : '注册'}</Typography>
        </DialogTitle>
        <DialogContent sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pb: 4
        }}>
          <QRCodeBox>
            {qrLoading ? (
              <CircularProgress size={40} sx={{ color: childFriendlyColors.secondary }} />
            ) : qrExpired ? (
              <Box sx={{ textAlign: 'center' }}>
                <Typography color="error" gutterBottom>
                  二维码已过期
                </Typography>
                <Button
                  startIcon={<Refresh />}
                  onClick={handleRefreshQrCode}
                  sx={{ color: childFriendlyColors.secondary }}
                >
                  刷新二维码
                </Button>
              </Box>
            ) : (
              <img
                src={qrUrl}
                alt="微信二维码"
                style={{
                  width: '180px',
                  height: '180px',
                  objectFit: 'contain'
                }}
              />
            )}
          </QRCodeBox>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 2, textAlign: 'center' }}
          >
            请使用微信扫描二维码{isLogin ? '登录' : '注册'}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, textAlign: 'center' }}
          >
            二维码有效期为5分钟
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Login; 