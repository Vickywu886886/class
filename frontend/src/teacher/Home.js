import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
  Divider,
  IconButton,
  Badge,
} from '@mui/material';
import {
  CalendarToday,
  AccessTime,
  Person,
  CheckCircle,
  Cancel,
  Notifications,
  Edit,
  VideoLibrary,
  Message,
  Schedule,
} from '@mui/icons-material';

// 模拟数据
const weeklySchedule = [
  {
    day: '周一',
    time: '09:00-10:30',
    student: '张三',
    type: '口语',
    status: 'confirmed',
  },
  {
    day: '周二',
    time: '14:00-15:30',
    student: '李四',
    type: '写作',
    status: 'pending',
  },
  // ... 更多课程
];

const pendingRequests = [
  {
    id: 1,
    student: '王五',
    time: '2024-03-20 16:00-17:30',
    note: '希望练习口语',
  },
  // ... 更多请求
];

const notifications = [
  {
    id: 1,
    type: 'course_change',
    content: '学生张三请假，原定课程取消',
    time: '10分钟前',
  },
  // ... 更多通知
];

const TeacherHome = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openSchedule, setOpenSchedule] = useState(false);
  const [profile, setProfile] = useState({
    name: '王老师',
    title: '副教授',
    department: '计算机科学与技术',
    email: 'wang@example.com',
    phone: '13800138000',
    office: '计算机楼 301',
    avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
    introduction: '从事计算机教育20年，擅长算法和数据结构教学。',
  });

  const handleProfileOpen = () => setOpenProfile(true);
  const handleProfileClose = () => setOpenProfile(false);
  const handleScheduleOpen = () => setOpenSchedule(true);
  const handleScheduleClose = () => setOpenSchedule(false);

  const handleAcceptRequest = (id) => {
    // 处理接受预约请求
    console.log('Accept request:', id);
  };

  const handleRejectRequest = (id) => {
    // 处理拒绝预约请求
    console.log('Reject request:', id);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* 左侧栏：个人资料和快捷操作 */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                src={profile.avatar}
                sx={{ width: 80, height: 80, mr: 2 }}
              />
              <Box>
                <Typography variant="h6">{profile.name}</Typography>
                <Typography color="textSecondary">{profile.title}</Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <List>
              <ListItem button onClick={handleProfileOpen}>
                <ListItemIcon>
                  <Edit />
                </ListItemIcon>
                <ListItemText primary="编辑个人资料" />
              </ListItem>
              <ListItem button onClick={handleScheduleOpen}>
                <ListItemIcon>
                  <Schedule />
                </ListItemIcon>
                <ListItemText primary="设置可预约时间" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <VideoLibrary />
                </ListItemIcon>
                <ListItemText primary="上传教学视频" />
              </ListItem>
            </List>
          </Paper>

          {/* 通知提醒 */}
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              通知提醒
            </Typography>
            <List>
              {notifications.map((notification) => (
                <ListItem key={notification.id}>
                  <ListItemIcon>
                    <Notifications color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={notification.content}
                    secondary={notification.time}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* 中间栏：本周课表 */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              本周课表
            </Typography>
            <List>
              {weeklySchedule.map((schedule, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CalendarToday color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${schedule.day} ${schedule.time}`}
                    secondary={`${schedule.student} - ${schedule.type}`}
                  />
                  <Chip
                    label={schedule.status === 'confirmed' ? '已确认' : '待确认'}
                    color={schedule.status === 'confirmed' ? 'success' : 'warning'}
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* 预约请求管理 */}
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              预约请求
            </Typography>
            <List>
              {pendingRequests.map((request) => (
                <ListItem key={request.id}>
                  <ListItemIcon>
                    <Person color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={request.student}
                    secondary={`${request.time}\n${request.note}`}
                  />
                  <Box>
                    <IconButton
                      color="success"
                      onClick={() => handleAcceptRequest(request.id)}
                    >
                      <CheckCircle />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleRejectRequest(request.id)}
                    >
                      <Cancel />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* 右侧栏：消息中心 */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              消息中心
            </Typography>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <Badge badgeContent={3} color="error">
                    <Message />
                  </Badge>
                </ListItemIcon>
                <ListItemText
                  primary="张三"
                  secondary="老师，我想预约明天的课程"
                />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Badge badgeContent={1} color="error">
                    <Message />
                  </Badge>
                </ListItemIcon>
                <ListItemText
                  primary="李四"
                  secondary="关于作业的问题想请教"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* 编辑个人资料对话框 */}
      <Dialog open={openProfile} onClose={handleProfileClose}>
        <DialogTitle>编辑个人资料</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="姓名"
            fullWidth
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="职称"
            fullWidth
            value={profile.title}
            onChange={(e) => setProfile({ ...profile, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="部门"
            fullWidth
            value={profile.department}
            onChange={(e) => setProfile({ ...profile, department: e.target.value })}
          />
          <TextField
            margin="dense"
            label="邮箱"
            fullWidth
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="电话"
            fullWidth
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          />
          <TextField
            margin="dense"
            label="办公室"
            fullWidth
            value={profile.office}
            onChange={(e) => setProfile({ ...profile, office: e.target.value })}
          />
          <TextField
            margin="dense"
            label="个人简介"
            fullWidth
            multiline
            rows={4}
            value={profile.introduction}
            onChange={(e) => setProfile({ ...profile, introduction: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleProfileClose}>取消</Button>
          <Button onClick={handleProfileClose} color="primary">
            保存
          </Button>
        </DialogActions>
      </Dialog>

      {/* 设置可预约时间对话框 */}
      <Dialog open={openSchedule} onClose={handleScheduleClose}>
        <DialogTitle>设置可预约时间</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            请选择每周可预约的时间段
          </Typography>
          {/* 这里可以添加时间选择组件 */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleScheduleClose}>取消</Button>
          <Button onClick={handleScheduleClose} color="primary">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TeacherHome; 