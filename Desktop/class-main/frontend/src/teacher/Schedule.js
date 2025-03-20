import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Snackbar,
  ToggleButton,
  ToggleButtonGroup,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Divider,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Today as TodayIcon,
  ViewWeek as ViewWeekIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
  Book as BookIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Message as MessageIcon,
  Info as InfoIcon,
  MoreVert as MoreVertIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import TeacherNav from '../components/TeacherNav';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import zhCN from 'date-fns/locale/zh-CN';

const TeacherSchedule = () => {
  const [view, setView] = useState('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // 快速回复模板
  const quickReplies = [
    { id: 1, text: '该时间段已满，建议选择其他时间' },
    { id: 2, text: '抱歉，该时段我已有其他课程安排' },
    { id: 3, text: '好的，我已收到您的预约请求，稍后确认' },
  ];

  // 模拟课程数据
  const courses = [
    {
      id: 1,
      studentName: '张小明',
      time: '09:00-10:00',
      date: '2024-03-20',
      type: '口语',
      status: 'confirmed',
      timezone: 'GMT+8',
      studentLevel: '中级',
      notes: '重点练习音调和语气',
    },
    {
      id: 2,
      studentName: '李小华',
      time: '10:30-11:30',
      date: '2024-03-20',
      type: '阅读',
      status: 'pending',
      timezone: 'GMT+8',
      studentLevel: '初级',
      notes: '需要预习课文',
    },
    {
      id: 3,
      studentName: '王小红',
      time: '14:00-15:00',
      date: '2024-03-20',
      type: '写作',
      status: 'completed',
      timezone: 'GMT+8',
      studentLevel: '高级',
      notes: '已完成作业批改',
    },
  ];

  // 模拟预约请求
  const bookingRequests = [
    {
      id: 1,
      studentName: '刘小明',
      time: '11:00-12:00',
      date: '2024-03-21',
      type: '口语',
      status: 'pending',
      timezone: 'GMT+8',
      studentLevel: '中级',
      hasConflict: true,
      conflictWith: {
        studentName: '张小明',
        time: '11:30-12:30',
      },
    },
    {
      id: 2,
      studentName: '赵小华',
      time: '15:00-16:00',
      date: '2024-03-21',
      type: '阅读',
      status: 'pending',
      timezone: 'GMT+8',
      studentLevel: '初级',
      hasConflict: false,
    },
  ];

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const handleDateChange = (direction) => {
    const days = view === 'week' ? 7 : 1;
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - days);
    } else {
      newDate.setDate(newDate.getDate() + days);
    }
    setCurrentDate(newDate);
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedSlot(null);
  };

  const handleMenuClick = (event, course) => {
    setAnchorEl(event.currentTarget);
    setSelectedCourse(course);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCourse(null);
  };

  const handleQuickReply = (reply) => {
    console.log('Sending quick reply:', reply);
    setSnackbarMessage('回复已发送');
    setOpenSnackbar(true);
    handleMenuClose();
  };

  const handleBookingResponse = (request, accepted) => {
    const action = accepted ? '接受' : '拒绝';
    setSnackbarMessage(`已${action}${request.studentName}的预约请求`);
    setOpenSnackbar(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return '#4caf50';
      case 'pending':
        return '#ff9800';
      case 'completed':
        return '#2196f3';
      default:
        return '#757575';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'confirmed':
        return '已确认';
      case 'pending':
        return '待确认';
      case 'completed':
        return '已完成';
      default:
        return '未知';
    }
  };

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    return (
      <Grid container spacing={2}>
        {weekDays.map((day) => (
          <Grid item xs={12} key={day.toISOString()}>
            <Paper sx={{ p: 2, bgcolor: isSameDay(day, new Date()) ? 'rgba(76, 175, 80, 0.08)' : 'white' }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#2D5A27' }}>
                {format(day, 'M月d日 EEEE', { locale: zhCN })}
              </Typography>
              <List>
                {courses
                  .filter(course => isSameDay(new Date(course.date), day))
                  .map(course => (
                    <ListItem
                      key={course.id}
                      sx={{
                        mb: 1,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                      }}
                    >
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: getStatusColor(course.status) }}>
                          <PersonIcon />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle1">
                              {course.studentName}
                            </Typography>
                            <Chip
                              label={course.type}
                              size="small"
                              sx={{
                                bgcolor: 'rgba(76, 175, 80, 0.1)',
                                color: '#2D5A27',
                              }}
                            />
                            <Chip
                              label={getStatusLabel(course.status)}
                              size="small"
                              sx={{
                                bgcolor: `${getStatusColor(course.status)}20`,
                                color: getStatusColor(course.status),
                              }}
                            />
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 0.5 }}>
                            <Typography variant="body2" color="textSecondary">
                              {course.time} ({course.timezone})
                            </Typography>
                          </Box>
                        }
                      />
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          sx={{ color: '#4caf50' }}
                          onClick={() => {
                            setSnackbarMessage('消息发送功能即将上线');
                            setOpenSnackbar(true);
                          }}
                        >
                          <MessageIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{ color: '#4caf50' }}
                          onClick={(e) => handleMenuClick(e, course)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Box>
                    </ListItem>
                  ))}
              </List>
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderDayView = () => {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, color: '#2D5A27' }}>
          {format(currentDate, 'M月d日 EEEE', { locale: zhCN })}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <List>
              {courses
                .filter(course => isSameDay(new Date(course.date), currentDate))
                .map(course => (
                  <ListItem
                    key={course.id}
                    sx={{
                      mb: 2,
                      bgcolor: 'background.paper',
                      borderRadius: 1,
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      p: 2,
                    }}
                  >
                    <Box sx={{ width: '100%' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ bgcolor: getStatusColor(course.status) }}>
                            <PersonIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="h6">
                              {course.studentName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {course.studentLevel}
                            </Typography>
                          </Box>
                        </Box>
                        <Box>
                          <Chip
                            label={getStatusLabel(course.status)}
                            sx={{
                              bgcolor: `${getStatusColor(course.status)}20`,
                              color: getStatusColor(course.status),
                            }}
                          />
                        </Box>
                      </Box>
                      <Divider sx={{ my: 1 }} />
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AccessTimeIcon sx={{ color: '#666' }} />
                            <Typography variant="body2">
                              {course.time} ({course.timezone})
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <BookIcon sx={{ color: '#666' }} />
                            <Typography variant="body2">
                              {course.type}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                      {course.notes && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2" color="textSecondary">
                            备注：{course.notes}
                          </Typography>
                        </Box>
                      )}
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
                        <Button
                          startIcon={<MessageIcon />}
                          size="small"
                          sx={{
                            color: '#4caf50',
                            '&:hover': { bgcolor: 'rgba(76, 175, 80, 0.08)' },
                          }}
                          onClick={() => {
                            setSnackbarMessage('消息发送功能即将上线');
                            setOpenSnackbar(true);
                          }}
                        >
                          发送消息
                        </Button>
                        <Button
                          startIcon={<InfoIcon />}
                          size="small"
                          sx={{
                            color: '#4caf50',
                            '&:hover': { bgcolor: 'rgba(76, 175, 80, 0.08)' },
                          }}
                          onClick={() => {
                            setSnackbarMessage('查看详情功能即将上线');
                            setOpenSnackbar(true);
                          }}
                        >
                          查看详情
                        </Button>
                      </Box>
                    </Box>
                  </ListItem>
                ))}
            </List>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, bgcolor: 'rgba(255, 152, 0, 0.05)', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <NotificationsIcon sx={{ color: '#ff9800' }} />
                <Typography variant="h6" sx={{ color: '#f57c00' }}>
                  待处理预约
                </Typography>
              </Box>
              <List>
                {bookingRequests.map(request => (
                  <ListItem
                    key={request.id}
                    sx={{
                      mb: 1,
                      bgcolor: 'white',
                      borderRadius: 1,
                      border: '1px solid rgba(255, 152, 0, 0.3)',
                      flexDirection: 'column',
                      alignItems: 'stretch',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Avatar sx={{ bgcolor: '#ff9800' }}>
                        <PersonIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1">
                          {request.studentName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {request.type} · {request.studentLevel}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="body2">
                        预约时间：{request.time}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {format(new Date(request.date), 'M月d日 EEEE', { locale: zhCN })}
                      </Typography>
                    </Box>
                    {request.hasConflict && (
                      <Alert severity="warning" sx={{ mb: 1 }}>
                        与 {request.conflictWith.studentName} 的课程时间（{request.conflictWith.time}）有冲突
                      </Alert>
                    )}
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <Button
                        size="small"
                        startIcon={<CloseIcon />}
                        onClick={() => handleBookingResponse(request, false)}
                        sx={{
                          color: '#f44336',
                          '&:hover': { bgcolor: 'rgba(244, 67, 54, 0.08)' },
                        }}
                      >
                        拒绝
                      </Button>
                      <Button
                        size="small"
                        startIcon={<CheckIcon />}
                        onClick={() => handleBookingResponse(request, true)}
                        variant="contained"
                        sx={{
                          bgcolor: '#4caf50',
                          '&:hover': { bgcolor: '#45a049' },
                        }}
                      >
                        接受
                      </Button>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    );
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <TeacherNav />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={handleViewChange}
              sx={{
                '& .MuiToggleButton-root.Mui-selected': {
                  bgcolor: '#4caf50',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#45a049',
                  },
                },
              }}
            >
              <ToggleButton value="week">
                <ViewWeekIcon sx={{ mr: 1 }} />
                周视图
              </ToggleButton>
              <ToggleButton value="day">
                <TodayIcon sx={{ mr: 1 }} />
                日视图
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={() => handleDateChange('prev')}>
              <NavigateBeforeIcon />
            </IconButton>
            <Button
              variant="outlined"
              onClick={() => setCurrentDate(new Date())}
              sx={{
                color: '#4caf50',
                borderColor: '#4caf50',
                '&:hover': {
                  borderColor: '#45a049',
                  bgcolor: 'rgba(76, 175, 80, 0.04)',
                },
              }}
            >
              今天
            </Button>
            <IconButton onClick={() => handleDateChange('next')}>
              <NavigateNextIcon />
            </IconButton>
          </Box>
        </Box>

        {view === 'week' ? renderWeekView() : renderDayView()}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <InfoIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>查看详情</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem disabled>
            <Typography variant="body2" color="textSecondary">
              快速回复
            </Typography>
          </MenuItem>
          {quickReplies.map((reply) => (
            <MenuItem
              key={reply.id}
              onClick={() => handleQuickReply(reply)}
              sx={{ minWidth: 200 }}
            >
              {reply.text}
            </MenuItem>
          ))}
        </Menu>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          message={snackbarMessage}
        />
      </Container>
    </Box>
  );
};

export default TeacherSchedule; 