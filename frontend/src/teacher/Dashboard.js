import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
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
  Menu,
  MenuItem,
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
  School,
  Group,
  Assignment,
  Assessment,
  ChevronLeft,
  ChevronRight,
  Add,
  Delete,
  PhotoCamera,
  Mic,
  Settings,
  ExitToApp,
} from '@mui/icons-material';
import { format, addDays, subDays, startOfWeek, isSameDay, parseISO } from 'date-fns';
import zhCN from 'date-fns/locale/zh-CN';
import CourseManagement from './components/CourseManagement';
import StudentManagement from './components/StudentManagement';
import Profile from './components/Profile';
import {
  getTeacherProfile,
  updateTeacherProfile,
  setTeacherSchedule,
  getTeacherSchedule,
  getBookingRequests,
  handleBookingRequest
} from '../services/teacherApi';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

// Mock data
const weeklySchedule = [
  {
    id: 1,
    date: '2024-03-18',
    time: '09:00-10:30',
    student: 'Zhang San',
    type: 'Speaking',
    status: 'confirmed',
  },
  {
    id: 2,
    date: '2024-03-19',
    time: '14:00-15:30',
    student: 'Li Si',
    type: 'Writing',
    status: 'pending',
  },
  {
    id: 3,
    date: '2024-03-20',
    time: '16:00-17:30',
    student: 'Wang Wu',
    type: 'Listening',
    status: 'confirmed',
  },
  // ... 更多课程
];

const pendingRequests = [
  {
    id: 1,
    student: 'Wang Wu',
    englishName: 'William',
    grade: 'Grade 3',
    material: 'Oxford English',
    unit: 'Unit 5 - My Family',
    requestTime: '2024-03-18 14:30'
  },
  {
    id: 2,
    student: 'Li Si',
    englishName: 'Lucy',
    grade: 'Grade 4',
    material: 'Cambridge English',
    unit: 'Unit 3 - Daily Activities',
    requestTime: '2024-03-18 15:45'
  }
];

const notifications = [
  {
    id: 1,
    type: 'course_change',
    content: 'Student Zhang San requested leave, class cancelled',
    time: '10 minutes ago',
  },
  // ... 更多通知
];

// 生成时间槽
const generateTimeSlots = () => {
  const slots = [];
  const startHour = 0; // 从0点开始
  const endHour = 24;  // 到24点结束
  const interval = 30; // 每30分钟一个时间段

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      let nextHour = hour;
      let nextMinute = minute + interval;

      if (nextMinute >= 60) {
        nextHour = hour + 1;
        nextMinute = 0;
      }

      const endTime = `${nextHour.toString().padStart(2, '0')}:${nextMinute.toString().padStart(2, '0')}`;

      slots.push({
        start: startTime,
        end: endTime,
        enabled: true
      });
    }
  }
  return slots;
};

const TeacherDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openProfile, setOpenProfile] = useState(false);
  const [openSchedule, setOpenSchedule] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState({});
  const [profile, setProfile] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scheduleSettings, setScheduleSettings] = useState({
    weekdays: {
      monday: generateTimeSlots(),
      tuesday: generateTimeSlots(),
      wednesday: generateTimeSlots(),
      thursday: generateTimeSlots(),
      friday: generateTimeSlots(),
      saturday: generateTimeSlots(),
      sunday: generateTimeSlots(),
    },
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const profileData = await getTeacherProfile();
        setProfile(profileData);

        // 获取当前周的起始和结束日期
        const startDate = startOfWeek(selectedDate, { weekStartsOn: 1 });
        const endDate = addDays(startDate, 6);

        const [scheduleData, requestsData] = await Promise.all([
          getTeacherSchedule(
            format(startDate, 'yyyy-MM-dd'),
            format(endDate, 'yyyy-MM-dd')
          ),
          getBookingRequests()
        ]);

        setAvailableTimeSlots(
          scheduleData.reduce((acc, schedule) => ({
            ...acc,
            [format(new Date(schedule.date), 'yyyy-MM-dd')]: schedule.timeSlots
          }), {})
        );
        setPendingRequests(requestsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('获取数据失败');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedDate]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleProfileOpen = () => setOpenProfile(true);
  const handleProfileClose = () => setOpenProfile(false);
  const handleScheduleOpen = () => {
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    if (!availableTimeSlots[dateStr]) {
      setAvailableTimeSlots(prev => ({
        ...prev,
        [dateStr]: generateTimeSlots()
      }));
    }
    setOpenSchedule(true);
  };
  const handleScheduleClose = () => setOpenSchedule(false);

  const handleProfileUpdate = async () => {
    try {
      const profileData = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        experience: {
          years: parseInt(profile.experience.years),
          ageGroups: profile.experience.ageGroups,
          courseTypes: profile.experience.courseTypes
        },
        teachingStyle: {
          methods: profile.teachingStyle.methods,
          specialties: profile.teachingStyle.specialties
        },
        introduction: profile.introduction,
        teachingPhilosophy: profile.teachingPhilosophy,
        interests: profile.interests,
        education: profile.education.map(edu => ({
          degree: edu.degree,
          university: edu.university,
          year: edu.year
        }))
      };

      const updatedProfile = await updateTeacherProfile(profileData);
      setProfile(updatedProfile);
      setOpenProfile(false);
      toast.success('个人资料更新成功');
    } catch (error) {
      console.error('更新个人资料失败:', error);
      toast.error('更新个人资料失败');
    }
  };

  const handleScheduleSave = async () => {
    try {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      await setTeacherSchedule(dateStr, availableTimeSlots[dateStr] || []);
      toast.success('时间设置已保存');
      handleScheduleClose();
    } catch (error) {
      console.error('Error saving schedule:', error);
      toast.error('保存时间设置失败');
    }
  };

  const handleBookingRequestResponse = async (requestId, status) => {
    try {
      await handleBookingRequest(requestId, status);
      setPendingRequests(prevRequests =>
        prevRequests.filter(request => request._id !== requestId)
      );
    } catch (error) {
      console.error('Error handling booking request:', error);
    }
  };

  const handleTimeSlotToggle = (date, slotIndex) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const slots = availableTimeSlots[dateStr] || [];
    const updatedSlots = [...slots];
    updatedSlots[slotIndex] = {
      ...updatedSlots[slotIndex],
      enabled: !updatedSlots[slotIndex].enabled
    };
    setAvailableTimeSlots(prev => ({
      ...prev,
      [dateStr]: updatedSlots
    }));
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (item) => {
    if (item === 'logout') {
      // 处理退出逻辑
      localStorage.removeItem('token'); // 清除登录token
      localStorage.removeItem('user'); // 清除用户信息
      navigate('/login'); // 重定向到登录页面
    } else {
      setSelectedMenuItem(item);
    }
    handleMenuClose();
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!profile) {
    return <Typography>No profile data available</Typography>;
  }

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const startDate = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const handleSaveSchedule = () => {
    // 这里可以添加保存到后端的逻辑
    console.log('Saving schedule:', scheduleSettings);
    handleScheduleClose();
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  };

  const renderTimeSlot = (slot) => {
    return (
      <Paper
        sx={{
          p: 1,
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: slot.enabled ? 'primary.light' : 'grey.200',
          color: slot.enabled ? 'white' : 'text.secondary',
          '&:hover': {
            backgroundColor: slot.enabled ? 'primary.main' : 'grey.300',
          },
        }}
      >
        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
          {formatTime(slot.start)} - {formatTime(slot.end)}
        </Typography>
        <Typography variant="caption" display="block" sx={{ fontSize: '0.75rem' }}>
          {slot.enabled ? '可用' : '不可用'}
        </Typography>
      </Paper>
    );
  };

  const handleAddEducation = () => {
    setProfile({
      ...profile,
      education: [
        ...profile.education,
        {
          degree: '',
          university: '',
          year: ''
        }
      ]
    });
  };

  const handleRemoveEducation = (index) => {
    setProfile({
      ...profile,
      education: profile.education.filter((_, i) => i !== index)
    });
  };

  const handleProfilePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAvatarUrl = reader.result;
        setProfile({
          ...profile,
          avatar: newAvatarUrl
        });
        // Update all avatars in the application
        const avatars = document.querySelectorAll('.MuiAvatar-root');
        avatars.forEach(avatar => {
          avatar.src = newAvatarUrl;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({
          ...profile,
          audioIntroduction: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({
          ...profile,
          teachingVideo: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // 渲染通知列表
  const renderNotifications = () => (
    <List>
      {notifications.map((notification) => (
        <ListItem key={notification.id}>
          <ListItemIcon>
            <Badge color="error" variant="dot" invisible={notification.read}>
              <Notifications />
            </Badge>
          </ListItemIcon>
          <ListItemText
            primary={notification.title}
            secondary={
              <>
                <Typography component="span" variant="body2">
                  {notification.content}
                </Typography>
                <br />
                <Typography component="span" variant="caption" color="textSecondary">
                  {notification.time}
                </Typography>
              </>
            }
          />
          {!notification.read && notification.type === 'booking' && (
            <Box>
              <Button
                size="small"
                color="primary"
                onClick={() => handleBookingRequestResponse(notification.id, true)}
                sx={{ mr: 1 }}
              >
                接受
              </Button>
              <Button
                size="small"
                color="error"
                onClick={() => handleBookingRequestResponse(notification.id, false)}
              >
                拒绝
              </Button>
            </Box>
          )}
        </ListItem>
      ))}
    </List>
  );

  // 渲染时间设置对话框
  const renderTimeSettingsDialog = () => (
    <Dialog open={openSchedule} onClose={() => setOpenSchedule(false)} maxWidth="sm" fullWidth>
      <DialogTitle>设置可用时间</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            选择日期：{format(selectedDate, 'yyyy年MM月dd日')}
          </Typography>
          <Grid container spacing={2}>
            {(availableTimeSlots[format(selectedDate, 'yyyy-MM-dd')] || generateTimeSlots()).map((slot, index) => (
              <Grid item xs={6} sm={4} key={index}>
                <Paper
                  sx={{
                    p: 1,
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: slot.enabled ? 'primary.light' : 'grey.200',
                    color: slot.enabled ? 'white' : 'text.secondary',
                    '&:hover': {
                      backgroundColor: slot.enabled ? 'primary.main' : 'grey.300',
                    },
                  }}
                  onClick={() => handleTimeSlotToggle(selectedDate, index)}
                >
                  <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                    {formatTime(slot.start)} - {formatTime(slot.end)}
                  </Typography>
                  <Typography variant="caption" display="block" sx={{ fontSize: '0.75rem' }}>
                    {slot.enabled ? '可用' : '不可用'}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenSchedule(false)}>取消</Button>
        <Button onClick={handleScheduleSave} color="primary">
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );

  const getScheduleForDate = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return availableTimeSlots[dateStr]?.filter(slot => slot.enabled && slot.status === 'confirmed') || [];
  };

  const renderDaySchedule = (date) => {
    const schedules = getScheduleForDate(date);

    return (
      <Box sx={{ mt: 0.5 }}>
        {schedules.length > 0 ? (
          schedules.map((schedule, index) => (
            <Paper
              key={index}
              sx={{
                p: 0.5,
                backgroundColor: 'primary.light',
                color: 'white',
                fontSize: '0.7rem',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                boxShadow: 'none'
              }}
            >
              {schedule.start} - {schedule.end}
            </Paper>
          ))
        ) : (
          <Paper
            sx={{
              p: 0.5,
              backgroundColor: 'grey.100',
              color: 'text.secondary',
              fontSize: '0.7rem',
              textAlign: 'center',
              minHeight: '20px',
              boxShadow: 'none'
            }}
          >
            No confirmed classes
          </Paper>
        )}
      </Box>
    );
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'dashboard':
        return (
          <>
            {/* 通知面板 */}
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>通知</Typography>
              {renderNotifications()}
            </Paper>

            {/* Teacher Card Preview */}
            <Paper sx={{ p: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">教师资料</Typography>
                <Button
                  variant="outlined"
                  startIcon={<Edit />}
                  onClick={handleProfileOpen}
                >
                  编辑资料
                </Button>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar
                      src={profile.avatar}
                      sx={{ width: 150, height: 150, mx: 'auto', mb: 2 }}
                    />
                    <Typography variant="h6">{profile.firstName} {profile.lastName}</Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {profile.experience.years} 年教学经验
                    </Typography>
                    {profile.audioIntroduction && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>语音介绍</Typography>
                        <audio controls src={profile.audioIntroduction} style={{ width: '100%' }} />
                      </Box>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography variant="subtitle1" gutterBottom>个人介绍</Typography>
                  <Typography paragraph>{profile.introduction}</Typography>

                  <Typography variant="subtitle1" gutterBottom>教学理念</Typography>
                  <Typography paragraph>{profile.teachingPhilosophy}</Typography>

                  <Typography variant="subtitle1" gutterBottom>专长领域</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {profile.teachingStyle.specialties.map((specialty, index) => (
                      <Chip key={index} label={specialty} color="primary" variant="outlined" />
                    ))}
                  </Box>

                  <Typography variant="subtitle1" gutterBottom>教学方法</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {profile.teachingStyle.methods.map((method, index) => (
                      <Chip key={index} label={method} color="secondary" variant="outlined" />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            {/* Main Content Area */}
            <Grid container spacing={3}>
              {/* Left Sidebar: Quick Actions and Notifications */}
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    快捷操作
                  </Typography>
                  <List>
                    <ListItem button onClick={handleScheduleOpen}>
                      <ListItemIcon>
                        <Schedule />
                      </ListItemIcon>
                      <ListItemText primary="设置可用时间" />
                    </ListItem>
                  </List>
                </Paper>

                {/* Notifications */}
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    通知
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

                  <Divider sx={{ my: 2 }} />

                  {/* Booking Requests */}
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    预约请求
                  </Typography>
                  <List>
                    {pendingRequests.map(request => (
                      <ListItem
                        key={request.id}
                        sx={{
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 1,
                          mb: 1,
                          p: 2
                        }}
                      >
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="subtitle1">
                            {request.englishName}
                          </Typography>
                          <Chip
                            label={request.grade}
                            color="primary"
                            size="small"
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          Material: {request.material}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          Unit: {request.unit}
                        </Typography>
                        <Box sx={{ width: '100%', display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => handleBookingRequestResponse(request.id, false)}
                          >
                            拒绝
                          </Button>
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() => handleBookingRequestResponse(request.id, true)}
                          >
                            接受
                          </Button>
                        </Box>
                      </ListItem>
                    ))}
                    {pendingRequests.length === 0 && (
                      <ListItem>
                        <ListItemText primary="暂无预约请求" />
                      </ListItem>
                    )}
                  </List>
                </Paper>
              </Grid>

              {/* Right Content Area */}
              <Grid item xs={12} md={8}>
                <Paper sx={{ width: '100%' }}>
                  {/* Weekly Schedule */}
                  <Box sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                      {/* Today's Schedule */}
                      <Grid item xs={12}>
                        <Paper sx={{ p: 2, mb: 3 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6">
                              今日课程
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {format(new Date(), 'yyyy年MM月dd日')}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {getScheduleForDate(new Date()).map(schedule => (
                              <Paper
                                key={schedule.id}
                                sx={{
                                  p: 1.5,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  backgroundColor: 'background.default',
                                  border: '1px solid',
                                  borderColor: 'divider',
                                  '&:hover': {
                                    backgroundColor: 'action.hover',
                                  }
                                }}
                              >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                  <AccessTime color="primary" />
                                  <Box>
                                    <Typography variant="subtitle2">
                                      {schedule.time}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {schedule.student} - {schedule.type}
                                    </Typography>
                                  </Box>
                                </Box>
                                <Chip
                                  label={schedule.status === 'confirmed' ? '已确认' : '待确认'}
                                  color={schedule.status === 'confirmed' ? 'success' : 'warning'}
                                  size="small"
                                  sx={{ minWidth: '80px' }}
                                />
                              </Paper>
                            ))}
                            {getScheduleForDate(new Date()).length === 0 && (
                              <Paper
                                sx={{
                                  p: 2,
                                  textAlign: 'center',
                                  backgroundColor: 'background.default',
                                  border: '1px dashed',
                                  borderColor: 'divider'
                                }}
                              >
                                <Typography color="text.secondary">
                                  今日暂无课程安排
                                </Typography>
                              </Paper>
                            )}
                          </Box>
                        </Paper>
                      </Grid>

                      {/* Weekly Schedule */}
                      <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                          周课表
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Paper sx={{ p: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <IconButton onClick={() => setSelectedDate(subDays(selectedDate, 7))}>
                              <ChevronLeft />
                            </IconButton>
                            <Typography variant="h6" sx={{ mx: 2 }}>
                              {format(startDate, 'yyyy年MM月dd日')} - {format(addDays(startDate, 6), 'yyyy年MM月dd日')}
                            </Typography>
                            <IconButton onClick={() => setSelectedDate(addDays(selectedDate, 7))}>
                              <ChevronRight />
                            </IconButton>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                            <Button
                              variant={isSameDay(startDate, startOfWeek(new Date(), { weekStartsOn: 1 })) ? "contained" : "outlined"}
                              onClick={() => setSelectedDate(new Date())}
                              sx={{ mr: 1 }}
                            >
                              本周
                            </Button>
                            <Button
                              variant={isSameDay(startDate, startOfWeek(addDays(new Date(), 7), { weekStartsOn: 1 })) ? "contained" : "outlined"}
                              onClick={() => setSelectedDate(addDays(new Date(), 7))}
                            >
                              下周
                            </Button>
                          </Box>
                          <Grid container spacing={1}>
                            <Grid item xs={12}>
                              <Box sx={{
                                display: 'flex',
                                gap: 1,
                                overflowX: 'auto',
                                pb: 1,
                                '&::-webkit-scrollbar': {
                                  height: '8px',
                                },
                                '&::-webkit-scrollbar-track': {
                                  backgroundColor: 'grey.100',
                                  borderRadius: '4px',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                  backgroundColor: 'grey.300',
                                  borderRadius: '4px',
                                  '&:hover': {
                                    backgroundColor: 'grey.400',
                                  },
                                },
                              }}>
                                {weekDays.map((day, index) => (
                                  <Paper
                                    key={index}
                                    sx={{
                                      p: 1,
                                      textAlign: 'center',
                                      backgroundColor: isSameDay(weekDates[index], selectedDate)
                                        ? 'primary.light'
                                        : 'background.paper',
                                      cursor: 'pointer',
                                      minWidth: '120px',
                                      maxWidth: '120px',
                                      minHeight: '80px',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      flex: '0 0 auto',
                                      boxShadow: isSameDay(weekDates[index], selectedDate)
                                        ? 3
                                        : 1,
                                      transition: 'all 0.2s ease-in-out',
                                      '&:hover': {
                                        boxShadow: 3,
                                      }
                                    }}
                                    onClick={() => setSelectedDate(weekDates[index])}
                                  >
                                    <Typography
                                      variant="subtitle2"
                                      sx={{
                                        mb: 0.5,
                                        fontWeight: isSameDay(weekDates[index], selectedDate) ? 'bold' : 'normal'
                                      }}
                                    >
                                      {day}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        mb: 0.5,
                                        color: isSameDay(weekDates[index], selectedDate) ? 'white' : 'text.primary'
                                      }}
                                    >
                                      {format(weekDates[index], 'd')}
                                    </Typography>
                                    <Box sx={{
                                      flex: 1,
                                      display: 'flex',
                                      flexDirection: 'column',
                                      gap: 0.5,
                                      overflowY: 'auto',
                                      '&::-webkit-scrollbar': {
                                        width: '4px',
                                      },
                                      '&::-webkit-scrollbar-track': {
                                        backgroundColor: 'transparent',
                                      },
                                      '&::-webkit-scrollbar-thumb': {
                                        backgroundColor: 'grey.300',
                                        borderRadius: '2px',
                                      },
                                    }}>
                                      {renderDaySchedule(weekDates[index])}
                                    </Box>
                                  </Paper>
                                ))}
                              </Box>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </>
        );

      case 'schedule':
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>课程安排</Typography>
            {/* Add schedule management content here */}
          </Paper>
        );

      case 'students':
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>学生管理</Typography>
            {/* Add student management content here */}
          </Paper>
        );

      case 'assignments':
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>作业管理</Typography>
            {/* Add assignment management content here */}
          </Paper>
        );

      case 'reports':
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>成绩报告</Typography>
            {/* Add reports content here */}
          </Paper>
        );

      case 'settings':
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>设置</Typography>
            {/* Add settings content here */}
          </Paper>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{
        bgcolor: 'white',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}>
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{ mr: 2 }}
          >
            <Avatar
              src={profile?.avatar}
              sx={{
                width: 40,
                height: 40,
                border: '2px solid',
                borderColor: 'primary.main',
              }}
            />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'text.primary' }}>
            教师中心
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* 添加一个空的Toolbar来占位，防止内容被AppBar遮挡 */}

      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Container maxWidth="lg">
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={() => handleMenuItemClick('dashboard')}>
              <ListItemIcon>
                <School fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="仪表盘" />
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('schedule')}>
              <ListItemIcon>
                <Schedule fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="课程安排" />
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('students')}>
              <ListItemIcon>
                <Group fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="学生管理" />
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('assignments')}>
              <ListItemIcon>
                <Assignment fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="作业管理" />
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('reports')}>
              <ListItemIcon>
                <Assessment fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="成绩报告" />
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => handleMenuItemClick('settings')}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="设置" />
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('logout')}>
              <ListItemIcon>
                <ExitToApp fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="退出" />
            </MenuItem>
          </Menu>

          {/* Render content based on selected menu item */}
          {renderContent()}

          {/* Edit Profile Dialog */}
          <Dialog open={openProfile} onClose={handleProfileClose} maxWidth="md" fullWidth>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent>
              {/* Profile Photo Section */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                >
                  <Avatar
                    src={profile.avatar}
                    sx={{ width: 120, height: 120, mb: 2 }}
                  />
                </Badge>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="profile-photo-upload"
                  type="file"
                  onChange={handleProfilePhotoUpload}
                />
                <label htmlFor="profile-photo-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<PhotoCamera />}
                  >
                    Upload Profile Photo
                  </Button>
                </label>
              </Box>

              {/* Audio Introduction Section */}
              <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Audio Introduction</Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {profile.audioIntroduction ? (
                      <audio controls src={profile.audioIntroduction} style={{ width: '100%' }} />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No audio uploaded yet
                      </Typography>
                    )}
                    <input
                      accept="audio/*"
                      style={{ display: 'none' }}
                      id="audio-upload"
                      type="file"
                      onChange={handleAudioUpload}
                    />
                    <label htmlFor="audio-upload">
                      <Button
                        variant="outlined"
                        component="span"
                        startIcon={<Mic />}
                      >
                        {profile.audioIntroduction ? 'Change Audio' : 'Upload Audio'}
                      </Button>
                    </label>
                  </Box>
                </Grid>
              </Grid>

              {/* Teaching Video Section */}
              <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Teaching Video</Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {profile.teachingVideo ? (
                      <video controls src={profile.teachingVideo} style={{ width: '100%', maxHeight: '300px' }} />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No teaching video uploaded yet
                      </Typography>
                    )}
                    <input
                      accept="video/*"
                      style={{ display: 'none' }}
                      id="video-upload"
                      type="file"
                      onChange={handleVideoUpload}
                    />
                    <label htmlFor="video-upload">
                      <Button
                        variant="outlined"
                        component="span"
                        startIcon={<VideoLibrary />}
                      >
                        {profile.teachingVideo ? 'Change Video' : 'Upload Video'}
                      </Button>
                    </label>
                  </Box>
                </Grid>
              </Grid>

              {/* Teaching Qualifications Section */}
              <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Teaching Qualifications</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1">Education</Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Add />}
                      onClick={handleAddEducation}
                    >
                      Add Education
                    </Button>
                  </Box>
                  {profile.education.map((edu, index) => (
                    <Paper key={index} sx={{ p: 2, mb: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            label="Degree"
                            value={edu.degree}
                            onChange={(e) => {
                              const newEducation = [...profile.education];
                              newEducation[index] = { ...edu, degree: e.target.value };
                              setProfile({ ...profile, education: newEducation });
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            label="University"
                            value={edu.university}
                            onChange={(e) => {
                              const newEducation = [...profile.education];
                              newEducation[index] = { ...edu, university: e.target.value };
                              setProfile({ ...profile, education: newEducation });
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            label="Year"
                            value={edu.year}
                            onChange={(e) => {
                              const newEducation = [...profile.education];
                              newEducation[index] = { ...edu, year: e.target.value };
                              setProfile({ ...profile, education: newEducation });
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <Button
                            color="error"
                            size="small"
                            startIcon={<Delete />}
                            onClick={() => handleRemoveEducation(index)}
                          >
                            Remove
                          </Button>
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
                </Grid>
              </Grid>

              {/* Teaching Experience Section */}
              <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Teaching Experience</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Years of Experience"
                    type="number"
                    value={profile.experience.years}
                    onChange={(e) => setProfile({
                      ...profile,
                      experience: { ...profile.experience, years: e.target.value }
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    label="Age Groups"
                    value={profile.experience.ageGroups.join(', ')}
                    onChange={(e) => setProfile({
                      ...profile,
                      experience: { ...profile.experience, ageGroups: e.target.value.split(', ') }
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Course Types"
                    value={profile.experience.courseTypes.join(', ')}
                    onChange={(e) => setProfile({
                      ...profile,
                      experience: { ...profile.experience, courseTypes: e.target.value.split(', ') }
                    })}
                  />
                </Grid>
              </Grid>

              {/* Teaching Style Section */}
              <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Teaching Style</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Teaching Methods"
                    value={profile.teachingStyle.methods.join(', ')}
                    onChange={(e) => setProfile({
                      ...profile,
                      teachingStyle: { ...profile.teachingStyle, methods: e.target.value.split(', ') }
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Specialties"
                    value={profile.teachingStyle.specialties.join(', ')}
                    onChange={(e) => setProfile({
                      ...profile,
                      teachingStyle: { ...profile.teachingStyle, specialties: e.target.value.split(', ') }
                    })}
                  />
                </Grid>
              </Grid>

              {/* Personal Characteristics Section */}
              <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Personal Characteristics</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Introduction"
                    value={profile.introduction}
                    onChange={(e) => setProfile({ ...profile, introduction: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Teaching Philosophy"
                    value={profile.teachingPhilosophy}
                    onChange={(e) => setProfile({ ...profile, teachingPhilosophy: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Interests"
                    value={profile.interests.join(', ')}
                    onChange={(e) => setProfile({ ...profile, interests: e.target.value.split(', ') })}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleProfileClose}>Cancel</Button>
              <Button onClick={handleProfileUpdate} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>

          {/* Time Settings Dialog */}
          {renderTimeSettingsDialog()}
        </Container>
      </Box>
    </Box>
  );
};

export default TeacherDashboard; 