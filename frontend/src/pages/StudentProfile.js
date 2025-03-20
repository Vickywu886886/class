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
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel
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
  Logout as LogoutIcon,
  PhotoCamera as PhotoCameraIcon
} from '@mui/icons-material';
import StudentNav from '../components/StudentNav';
import { updateAvatar } from '../services/authApi';

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // 从 localStorage 获取用户信息
  const user = JSON.parse(localStorage.getItem('user'));

  const [userInfo, setUserInfo] = useState({
    name: user?.name || '张三',
    englishName: user?.englishName || 'Zhang San',
    phone: user?.phone || '13800138000',
    school: user?.school || '第一中学',
    grade: user?.grade || '高一',
    hobbies: user?.hobbies || '篮球、阅读、音乐',
    avatar: user?.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'
  });

  const [followedTeachers] = useState([
    {
      id: 1,
      name: '王老师',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      subject: '英语',
      description: '资深英语教师，专注英语教学10年'
    },
    {
      id: 2,
      name: '李老师',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      subject: '西班牙语',
      description: '西班牙留学归国，专注西语教学8年'
    },
    {
      id: 3,
      name: '张老师',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      subject: '法语',
      description: '法国语言文学硕士，培养多名法语高级人才'
    }
  ]);

  const [myCourses] = useState([
    {
      id: 1,
      name: '英语提高班',
      teacher: '王老师',
      teacherAvatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      subject: '英语',
      schedule: '每周一、三 14:00-15:30',
      nextClass: '2024-03-20 14:00',
      status: '已预约',
      price: '¥299/课时',
      description: '资深英语教师，专注英语教学10年'
    },
    {
      id: 2,
      name: '西班牙语入门班',
      teacher: '李老师',
      teacherAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      subject: '西班牙语',
      schedule: '每周二、四 15:30-17:00',
      nextClass: '2024-03-21 15:30',
      status: '已预约',
      price: '¥399/课时',
      description: '西班牙留学归国，专注西语教学8年'
    },
    {
      id: 3,
      name: '法语基础班',
      teacher: '张老师',
      teacherAvatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      subject: '法语',
      schedule: '每周五 16:00-17:30',
      nextClass: '2024-03-22 16:00',
      status: '已预约',
      price: '¥349/课时',
      description: '法国语言文学硕士，培养多名法语高级人才'
    }
  ]);

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

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // 检查文件类型
      if (!file.type.startsWith('image/')) {
        setSnackbar({
          open: true,
          message: '请选择图片文件',
          severity: 'error'
        });
        return;
      }

      // 检查文件大小（限制为 2MB）
      if (file.size > 2 * 1024 * 1024) {
        setSnackbar({
          open: true,
          message: '图片大小不能超过 2MB',
          severity: 'error'
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        const newAvatar = reader.result;
        try {
          // 调用后端API更新头像
          console.log('开始更新头像...');
          const response = await updateAvatar(newAvatar);
          console.log('头像更新响应:', response);

          if (!response || !response.user) {
            throw new Error('服务器响应格式不正确');
          }

          // 更新本地状态
          setUserInfo(prevState => ({
            ...prevState,
            avatar: newAvatar
          }));

          // 从 localStorage 获取最新的用户信息
          const currentUser = JSON.parse(localStorage.getItem('user'));

          // 更新 localStorage 中的用户信息
          const updatedUser = {
            ...currentUser,
            avatar: newAvatar
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));

          setSnackbar({
            open: true,
            message: '头像更新成功！',
            severity: 'success'
          });

          // 等待一小段时间后再刷新页面，确保数据已保存
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } catch (error) {
          console.error('头像更新失败:', error);
          setSnackbar({
            open: true,
            message: `头像更新失败: ${error.message || '请重试'}`,
            severity: 'error'
          });
        }
      };
      reader.readAsDataURL(file);
    }
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
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Box sx={{ position: 'relative', display: 'inline-block' }}>
                      <Avatar
                        src={userInfo.avatar}
                        sx={{
                          width: 80,
                          height: 80,
                          border: '2px solid #e8f5e9'
                        }}
                      />
                      {isEditing && (
                        <>
                          <input
                            accept="image/*"
                            type="file"
                            id="avatar-upload"
                            onChange={handleAvatarChange}
                            style={{ display: 'none' }}
                          />
                          <label htmlFor="avatar-upload">
                            <IconButton
                              component="span"
                              sx={{
                                position: 'absolute',
                                right: 0,
                                bottom: 0,
                                bgcolor: '#2e7d32',
                                color: 'white',
                                '&:hover': {
                                  bgcolor: '#1b5e20',
                                },
                              }}
                            >
                              <PhotoCameraIcon />
                            </IconButton>
                          </label>
                        </>
                      )}
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="h6" sx={{ color: '#2D5A27' }}>
                        {userInfo.name}
                      </Typography>
                    }
                    secondary={
                      <Typography color="text.secondary">
                        学生
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider />
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
                    <PersonIcon sx={{ color: '#2e7d32' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="英文名"
                    secondary={
                      isEditing ? (
                        <TextField
                          fullWidth
                          value={userInfo.englishName}
                          onChange={(e) => setUserInfo({ ...userInfo, englishName: e.target.value })}
                          size="small"
                        />
                      ) : (
                        userInfo.englishName
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
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <SchoolIcon sx={{ color: '#2e7d32' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="年级"
                    secondary={
                      isEditing ? (
                        <FormControl fullWidth size="small">
                          <Select
                            value={userInfo.grade}
                            onChange={(e) => setUserInfo({ ...userInfo, grade: e.target.value })}
                          >
                            <MenuItem value="初一">初一</MenuItem>
                            <MenuItem value="初二">初二</MenuItem>
                            <MenuItem value="初三">初三</MenuItem>
                            <MenuItem value="高一">高一</MenuItem>
                            <MenuItem value="高二">高二</MenuItem>
                            <MenuItem value="高三">高三</MenuItem>
                          </Select>
                        </FormControl>
                      ) : (
                        userInfo.grade
                      )
                    }
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon sx={{ color: '#2e7d32' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="爱好"
                    secondary={
                      isEditing ? (
                        <TextField
                          fullWidth
                          value={userInfo.hobbies}
                          onChange={(e) => setUserInfo({ ...userInfo, hobbies: e.target.value })}
                          size="small"
                          placeholder="请输入爱好，用顿号分隔"
                        />
                      ) : (
                        userInfo.hobbies
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
              我的课程
            </Typography>
            <Grid container spacing={2}>
              {myCourses.map((course) => (
                <Grid item xs={12} key={course.id}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      '&:hover': {
                        boxShadow: 3,
                        transform: 'translateY(-2px)',
                        transition: 'all 0.2s'
                      }
                    }}
                  >
                    <Avatar
                      src={course.teacherAvatar}
                      sx={{
                        width: 60,
                        height: 60,
                        mr: 2,
                        border: '2px solid #e8f5e9'
                      }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ color: '#2D5A27', mb: 0.5 }}>
                        {course.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        授课教师：{course.teacher} ({course.subject})
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {course.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        课程安排：{course.schedule}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        下次课程：{course.nextClass}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                      <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold' }}>
                        {course.status}
                      </Typography>
                      <Typography variant="body2" color="error" sx={{ fontWeight: 'bold' }}>
                        {course.price}
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          color: '#2e7d32',
                          borderColor: '#2e7d32',
                          '&:hover': {
                            borderColor: '#1b5e20',
                            backgroundColor: 'rgba(46, 125, 50, 0.08)',
                          },
                        }}
                      >
                        查看详情
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#2e7d32' }}>
              我的关注
            </Typography>
            <Grid container spacing={2}>
              {followedTeachers.map((teacher) => (
                <Grid item xs={12} sm={6} md={4} key={teacher.id}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      '&:hover': {
                        boxShadow: 3,
                        transform: 'translateY(-2px)',
                        transition: 'all 0.2s'
                      }
                    }}
                  >
                    <Avatar
                      src={teacher.avatar}
                      sx={{
                        width: 80,
                        height: 80,
                        mb: 1,
                        border: '2px solid #e8f5e9'
                      }}
                    />
                    <Typography variant="h6" sx={{ color: '#2D5A27', mb: 0.5 }}>
                      {teacher.name}
                    </Typography>
                    <Typography variant="subtitle2" color="primary" sx={{ mb: 1 }}>
                      {teacher.subject}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {teacher.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Box>

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
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default StudentProfile; 