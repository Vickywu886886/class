import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  styled,
  Paper,
  IconButton,
  Badge,
  Rating,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  Divider,
  Tab,
  Tabs,
  Menu,
  MenuItem,
  Link,
  CircularProgress,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Edit as EditIcon,
  School as SchoolIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Person as PersonIcon,
  CalendarToday,
  VideoCall,
  Assignment,
  Book,
  Grade,
  Notifications,
  Settings,
  Lock,
  Download,
  Delete,
  AccessTime,
  CheckCircle,
  Cancel,
  Warning,
  CloudDownload,
  CloudUpload,
  Comment,
  Star,
  StarBorder,
  Visibility,
  VisibilityOff,
  Add,
  Close,
  LocalOffer,
  Timer,
  Remove,
} from '@mui/icons-material';
import {
  BookingsPanel,
  MaterialsPanel,
  FeedbackPanel,
  NotificationsPanel,
  AccountPanel,
} from '../components/ProfileTabs';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  height: '100%',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Profile = () => {
  const [value, setValue] = useState(0);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Mock data - In a real app, this would come from an API
  const [personalInfo, setPersonalInfo] = useState({
    name: '张三',
    age: '16',
    grade: '高中一年级',
    currentTextbook: '新概念英语第二册',
    avatar: '/avatar.jpg',
  });

  const [courseInfo] = useState({
    totalHours: 100,
    usedHours: 45,
    remainingHours: 55,
    points: {
      total: 500,
      available: 300,
      history: [
        {
          id: 1,
          type: 'earn',
          amount: 100,
          description: '完成课程奖励',
          date: '2024-03-15',
        },
        {
          id: 2,
          type: 'use',
          amount: -50,
          description: '兑换学习资料',
          date: '2024-03-16',
        },
      ],
    },
  });

  const [schedule] = useState([
    {
      id: 1,
      date: '2024-03-20',
      time: '14:00-15:00',
      teacher: '李老师',
      courseType: '英语口语',
      status: 'confirmed',
      classroomId: '123456',
      classInLink: 'https://classin.com/join/123456',
    },
    {
      id: 2,
      date: '2024-03-22',
      time: '15:00-16:00',
      teacher: '王老师',
      courseType: '阅读理解',
      status: 'pending',
    },
    {
      id: 3,
      date: '2024-03-25',
      time: '16:00-17:00',
      teacher: '张老师',
      courseType: '写作',
      status: 'confirmed',
      classroomId: '789012',
      classInLink: 'https://classin.com/join/789012',
    },
    {
      id: 4,
      date: '2024-03-27',
      time: '14:00-15:00',
      teacher: '刘老师',
      courseType: '听力',
      status: 'confirmed',
      classroomId: '345678',
      classInLink: 'https://classin.com/join/345678',
    },
  ]);

  const [bookings] = useState([
    {
      id: 1,
      courseType: '英语口语',
      teacher: '李老师',
      date: '2024-03-20',
      time: '14:00-15:00',
      status: 'confirmed',
    },
    {
      id: 2,
      courseType: '阅读理解',
      teacher: '王老师',
      date: '2024-03-22',
      time: '15:00-16:00',
      status: 'pending',
    },
  ]);

  const [materials] = useState([
    {
      id: 1,
      title: '英语口语练习材料',
      type: 'PDF',
      uploadDate: '2024-03-15',
      size: '2.5MB',
    },
    {
      id: 2,
      title: '阅读理解技巧总结',
      type: 'DOC',
      uploadDate: '2024-03-16',
      size: '1.8MB',
    },
  ]);

  const [feedback] = useState([
    {
      id: 1,
      teacher: '李老师',
      courseType: '英语口语',
      rating: 5,
      content: '发音准确，表达流畅，继续保持！',
      date: '2024-03-15',
    },
    {
      id: 2,
      teacher: '王老师',
      courseType: '阅读理解',
      rating: 4,
      content: '理解能力有提升，建议多练习长难句。',
      date: '2024-03-16',
    },
  ]);

  const [notifications] = useState([
    {
      id: 1,
      title: '课程提醒',
      content: '您有一节英语口语课程将在30分钟后开始',
      date: '2024-03-20 13:30',
      read: false,
    },
    {
      id: 2,
      title: '作业提醒',
      content: '新的阅读理解作业已发布',
      date: '2024-03-19 15:00',
      read: true,
    },
  ]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleEditProfile = () => {
    setOpenEditDialog(true);
  };

  const handleSaveProfile = () => {
    setOpenEditDialog(false);
    setSnackbar({
      open: true,
      message: '个人信息已更新',
      severity: 'success',
    });
  };

  const handleChangePassword = () => {
    setOpenPasswordDialog(true);
  };

  const handleSavePassword = () => {
    setOpenPasswordDialog(false);
    setSnackbar({
      open: true,
      message: '密码已更新',
      severity: 'success',
    });
  };

  const handleCancelBooking = (bookingId) => {
    // Handle booking cancellation
    setSnackbar({
      open: true,
      message: '预约已取消',
      severity: 'info',
    });
  };

  const handleNotificationRead = (notificationId) => {
    // Handle marking notification as read
    setSnackbar({
      open: true,
      message: '通知已标记为已读',
      severity: 'success',
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar
                    src={personalInfo.avatar}
                    sx={{ width: 100, height: 100 }}
                  />
                </Grid>
                <Grid item xs>
                  <Typography variant="h5">{personalInfo.name}</Typography>
                  <Typography color="text.secondary">
                    {personalInfo.age}岁 | {personalInfo.grade}
                  </Typography>
                  <Typography variant="body2">
                    当前教材：{personalInfo.currentTextbook}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleEditProfile}>
                    编辑资料
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Course Hours and Points */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                课时信息
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="primary">
                      {courseInfo.totalHours}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      总课时
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="success.main">
                      {courseInfo.usedHours}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      已用课时
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="warning.main">
                      {courseInfo.remainingHours}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      剩余课时
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                积分信息
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="primary">
                      {courseInfo.points.total}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      总积分
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="success.main">
                      {courseInfo.points.available}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      可用积分
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                积分记录
              </Typography>
              <List>
                {courseInfo.points.history.map((record) => (
                  <React.Fragment key={record.id}>
                    <ListItem>
                      <ListItemIcon>
                        {record.type === 'earn' ? (
                          <Add color="success" />
                        ) : (
                          <Remove color="error" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={record.description}
                        secondary={
                          <>
                            <Typography component="span" variant="body2">
                              {record.type === 'earn' ? '+' : ''}{record.amount} 积分
                            </Typography>
                            <br />
                            <Typography component="span" variant="body2" color="text.secondary">
                              {record.date}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Tabs */}
        <Grid item xs={12}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleTabChange} aria-label="profile tabs">
              <Tab label="我的课表" />
              <Tab label="预约记录" />
              <Tab label="学习资料" />
              <Tab label="学习反馈" />
              <Tab label="消息通知" />
              <Tab label="账户管理" />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  今日课程
                </Typography>
                <Grid container spacing={2}>
                  {schedule
                    .filter(class_ => class_.date === new Date().toISOString().split('T')[0])
                    .map(class_ => (
                      <Grid item xs={12} key={class_.id}>
                        <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box>
                            <Typography variant="subtitle1" gutterBottom>
                              {class_.time} - {class_.courseType}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {class_.teacher}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            {class_.status === 'confirmed' && (
                              <>
                                <Typography variant="body2" color="text.secondary">
                                  教室号：{class_.classroomId}
                                </Typography>
                                <Button
                                  variant="contained"
                                  size="small"
                                  startIcon={<VideoCall />}
                                  href={class_.classInLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  进入教室
                                </Button>
                              </>
                            )}
                            <Chip
                              label={class_.status === 'confirmed' ? '已确认' : '待确认'}
                              color={class_.status === 'confirmed' ? 'success' : 'warning'}
                            />
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  {schedule.filter(class_ => class_.date === new Date().toISOString().split('T')[0]).length === 0 && (
                    <Grid item xs={12}>
                      <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography color="text.secondary">
                          今日暂无课程安排
                        </Typography>
                      </Paper>
                    </Grid>
                  )}
                </Grid>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom>
                  本周课程安排
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>日期</TableCell>
                        <TableCell>时间</TableCell>
                        <TableCell>课程类型</TableCell>
                        <TableCell>教师</TableCell>
                        <TableCell>状态</TableCell>
                        <TableCell>教室信息</TableCell>
                        <TableCell>操作</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {schedule.map((class_) => (
                        <TableRow key={class_.id}>
                          <TableCell>{class_.date}</TableCell>
                          <TableCell>{class_.time}</TableCell>
                          <TableCell>{class_.courseType}</TableCell>
                          <TableCell>{class_.teacher}</TableCell>
                          <TableCell>
                            <Chip
                              label={class_.status === 'confirmed' ? '已确认' : '待确认'}
                              color={class_.status === 'confirmed' ? 'success' : 'warning'}
                            />
                          </TableCell>
                          <TableCell>
                            {class_.status === 'confirmed' ? (
                              <Box>
                                <Typography variant="body2" color="text.secondary">
                                  教室号：{class_.classroomId}
                                </Typography>
                                <Link
                                  href={class_.classInLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  sx={{ display: 'block', mt: 0.5 }}
                                >
                                  点击进入ClassIn教室
                                </Link>
                              </Box>
                            ) : (
                              <Typography variant="body2" color="text.secondary">
                                待确认
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            {class_.status === 'confirmed' ? (
                              <Button
                                variant="contained"
                                size="small"
                                startIcon={<VideoCall />}
                                href={class_.classInLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                进入教室
                              </Button>
                            ) : (
                              <Button
                                variant="outlined"
                                size="small"
                                disabled
                              >
                                等待确认
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <BookingsPanel
              bookings={bookings}
              onCancelBooking={handleCancelBooking}
            />
          </TabPanel>

          <TabPanel value={value} index={2}>
            <MaterialsPanel
              materials={materials}
              homework={schedule}
            />
          </TabPanel>

          <TabPanel value={value} index={3}>
            <FeedbackPanel feedback={feedback} />
          </TabPanel>

          <TabPanel value={value} index={4}>
            <NotificationsPanel
              notifications={notifications}
              onNotificationRead={handleNotificationRead}
            />
          </TabPanel>

          <TabPanel value={value} index={5}>
            <AccountPanel
              onEditProfile={handleEditProfile}
              onChangePassword={handleChangePassword}
            />
          </TabPanel>
        </Grid>
      </Grid>

      {/* Edit Profile Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>编辑个人资料</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="姓名"
            fullWidth
            defaultValue={personalInfo.name}
          />
          <TextField
            margin="dense"
            label="年龄"
            fullWidth
            defaultValue={personalInfo.age}
          />
          <TextField
            margin="dense"
            label="年级"
            fullWidth
            defaultValue={personalInfo.grade}
          />
          <TextField
            margin="dense"
            label="当前教材"
            fullWidth
            defaultValue={personalInfo.currentTextbook}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>取消</Button>
          <Button onClick={handleSaveProfile} variant="contained">保存</Button>
        </DialogActions>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)}>
        <DialogTitle>修改密码</DialogTitle>
        <DialogContent>
          <TextField
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
          <Button onClick={handleSavePassword} variant="contained">保存</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Profile; 