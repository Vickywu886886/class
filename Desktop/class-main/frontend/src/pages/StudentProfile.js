import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Grid,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  School as SchoolIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Lock as LockIcon,
  Notifications as NotificationsIcon,
  Help as HelpIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import StudentNav from '../components/StudentNav';

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [userInfo, setUserInfo] = useState({
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '13800138000',
    school: '第一中学',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setSnackbar({
      open: true,
      message: '个人信息更新成功！',
      severity: 'success'
    });
  };

  const handlePasswordChange = () => {
    setOpenPasswordDialog(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <StudentNav />
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
            个人中心
          </Typography>
          {!isEditing ? (
            <Button
              startIcon={<EditIcon />}
              onClick={handleEdit}
              sx={{
                color: '#2e7d32',
                '&:hover': {
                  backgroundColor: 'rgba(46, 125, 50, 0.08)',
                },
              }}
            >
              编辑资料
            </Button>
          ) : (
            <Button
              startIcon={<SaveIcon />}
              onClick={handleSave}
              variant="contained"
              sx={{
                backgroundColor: '#2e7d32',
                '&:hover': {
                  backgroundColor: '#1b5e20',
                },
              }}
            >
              保存修改
            </Button>
          )}
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Avatar
                src={userInfo.avatar}
                sx={{
                  width: 120,
                  height: 120,
                  margin: '0 auto 16px',
                  border: '4px solid #e8f5e9'
                }}
              />
              <Typography variant="h6" gutterBottom>
                {userInfo.name}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                学生
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon sx={{ color: '#2e7d32' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="姓名"
                    secondary={
                      isEditing ? (
                        <TextField
                          fullWidth
                          value={userInfo.name}
                          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                          size="small"
                        />
                      ) : (
                        userInfo.name
                      )
                    }
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon sx={{ color: '#2e7d32' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="邮箱"
                    secondary={
                      isEditing ? (
                        <TextField
                          fullWidth
                          value={userInfo.email}
                          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                          size="small"
                        />
                      ) : (
                        userInfo.email
                      )
                    }
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon sx={{ color: '#2e7d32' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="手机号"
                    secondary={
                      isEditing ? (
                        <TextField
                          fullWidth
                          value={userInfo.phone}
                          onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                          size="small"
                        />
                      ) : (
                        userInfo.phone
                      )
                    }
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <SchoolIcon sx={{ color: '#2e7d32' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="学校"
                    secondary={
                      isEditing ? (
                        <TextField
                          fullWidth
                          value={userInfo.school}
                          onChange={(e) => setUserInfo({ ...userInfo, school: e.target.value })}
                          size="small"
                        />
                      ) : (
                        userInfo.school
                      )
                    }
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#2e7d32' }}>
              账号安全
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <LockIcon sx={{ color: '#2e7d32' }} />
                </ListItemIcon>
                <ListItemText
                  primary="修改密码"
                  secondary="定期修改密码可以提高账号安全性"
                />
                <Button
                  variant="outlined"
                  onClick={handlePasswordChange}
                  sx={{
                    color: '#2e7d32',
                    borderColor: '#2e7d32',
                    '&:hover': {
                      borderColor: '#1b5e20',
                      backgroundColor: 'rgba(46, 125, 50, 0.08)',
                    },
                  }}
                >
                  修改
                </Button>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <NotificationsIcon sx={{ color: '#2e7d32' }} />
                </ListItemIcon>
                <ListItemText
                  primary="消息通知"
                  secondary="管理您的消息通知设置"
                />
                <Button
                  variant="outlined"
                  sx={{
                    color: '#2e7d32',
                    borderColor: '#2e7d32',
                    '&:hover': {
                      borderColor: '#1b5e20',
                      backgroundColor: 'rgba(46, 125, 50, 0.08)',
                    },
                  }}
                >
                  设置
                </Button>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <HelpIcon sx={{ color: '#2e7d32' }} />
                </ListItemIcon>
                <ListItemText
                  primary="帮助中心"
                  secondary="查看常见问题和使用帮助"
                />
                <Button
                  variant="outlined"
                  sx={{
                    color: '#2e7d32',
                    borderColor: '#2e7d32',
                    '&:hover': {
                      borderColor: '#1b5e20',
                      backgroundColor: 'rgba(46, 125, 50, 0.08)',
                    },
                  }}
                >
                  查看
                </Button>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <LogoutIcon sx={{ color: '#f44336' }} />
                </ListItemIcon>
                <ListItemText
                  primary="退出登录"
                  secondary="安全退出您的账号"
                />
                <Button
                  variant="outlined"
                  onClick={handleLogout}
                  sx={{
                    color: '#f44336',
                    borderColor: '#f44336',
                    '&:hover': {
                      borderColor: '#d32f2f',
                      backgroundColor: 'rgba(244, 67, 54, 0.08)',
                    },
                  }}
                >
                  退出
                </Button>
              </ListItem>
            </List>
          </Paper>
        </Box>

        <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)}>
          <DialogTitle>修改密码</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="当前密码"
              type="password"
              fullWidth
            />
            <TextField
              margin="dense"
              label="新密码"
              type="password"
              fullWidth
            />
            <TextField
              margin="dense"
              label="确认新密码"
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenPasswordDialog(false)}>取消</Button>
            <Button
              onClick={() => {
                setOpenPasswordDialog(false);
                setSnackbar({
                  open: true,
                  message: '密码修改成功！',
                  severity: 'success'
                });
              }}
              variant="contained"
              sx={{
                backgroundColor: '#2e7d32',
                '&:hover': {
                  backgroundColor: '#1b5e20',
                },
              }}
            >
              确认修改
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: '100%', borderRadius: '15px' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default StudentProfile; 