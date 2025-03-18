import React, { useState, useEffect } from 'react';
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
  LinearProgress,
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
  CircularProgress,
  Rating,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Collapse,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ToggleButton,
  ToggleButtonGroup,
  AppBar,
  Toolbar,
  Tooltip,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PeopleIcon from '@mui/icons-material/People';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CommentIcon from '@mui/icons-material/Comment';
import { useNavigate } from 'react-router-dom';
import {
  AccessTime,
  CheckCircle,
  HourglassEmpty,
  CalendarToday,
  ArrowForward,
  VideoCall,
  Timer,
  ExpandMore as ExpandMoreIcon,
  SupportAgent as SupportAgentIcon,
  Close,
  Brightness2,
  WbSunny,
  Brightness7,
  Brightness5,
  Brightness4,
} from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '20px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  height: '100%',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  }
}));

const ProgressCard = styled(Card)(({ theme }) => ({
  borderRadius: '20px',
  background: 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
  color: 'white',
  boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
}));

const AchievementBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#ffd700',
    color: '#000',
  }
}));

const languageColors = {
  english: '#2196f3',
  spanish: '#ff9800',
  french: '#9c27b0'
};

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    appointmentId: null
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [supportDialog, setSupportDialog] = useState(false);

  // 模拟课时数据
  const [courseHours, setCourseHours] = useState({
    total: 50,      // 总购买课时
    completed: 15,  // 已完成课时
    remaining: 35   // 剩余课时
  });

  // 添加上课记录数据
  const [courseHistory, setCourseHistory] = useState([
    {
      id: 1,
      teacherName: "Sarah Johnson",
      teacherAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      subject: "英语会话",
      date: "2024年3月15日",
      timeSlot: "14:00-14:30",
      teacherType: "english",
      rating: 5,
      comment: "老师很耐心，讲解非常清晰"
    },
    {
      id: 2,
      teacherName: "Carlos Rodriguez",
      teacherAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      subject: "西语入门",
      date: "2024年3月14日",
      timeSlot: "15:00-15:30",
      teacherType: "spanish",
      rating: 4,
      comment: "课程内容很实用"
    },
    {
      id: 3,
      teacherName: "Sophie Martin",
      teacherAvatar: "https://randomuser.me/api/portraits/women/46.jpg",
      subject: "法语基础",
      date: "2024年3月13日",
      timeSlot: "16:00-16:30",
      teacherType: "french",
      rating: 5,
      comment: "老师教学方法很好"
    }
  ]);

  const [ratingDialog, setRatingDialog] = useState({
    open: false,
    course: null
  });

  const [ratingForm, setRatingForm] = useState({
    rating: 5,
    comment: ''
  });

  // 添加状态管理
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  // 获取未来7天的日期
  const getWeekDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  // 检查时间段是否可约（12小时限制）
  const isTimeSlotBookable = (date, timeSlot) => {
    const now = new Date();
    const [hours, minutes] = timeSlot.split(':');
    const slotTime = new Date(date);
    slotTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    const diffHours = (slotTime - now) / (1000 * 60 * 60);
    return diffHours >= 12;
  };

  // 模拟老师的可约时间段
  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '19:00', '20:00'
  ];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotSelect = (slot) => {
    setSelectedTimeSlot(slot);
  };

  // 格式化日期显示
  const formatDate = (date) => {
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return {
      day: days[date.getDay()],
      date: `${date.getMonth() + 1}月${date.getDate()}日`
    };
  };

  useEffect(() => {
    // 获取用户信息
    const userInfo = JSON.parse(localStorage.getItem('user'));
    if (!userInfo) {
      navigate('/login');
      return;
    }
    setUser(userInfo);

    // 获取预约信息
    const savedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(savedAppointments);
  }, [navigate]);

  const handleOpenDialog = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAppointment(null);
  };

  const handleDeleteClick = (appointmentId) => {
    setDeleteDialog({
      open: true,
      appointmentId
    });
  };

  const handleDeleteConfirm = () => {
    const updatedAppointments = appointments.filter(
      app => app.id !== deleteDialog.appointmentId
    );
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);
    setDeleteDialog({ open: false, appointmentId: null });
    setSnackbar({
      open: true,
      message: '预约已取消',
      severity: 'success'
    });
    handleCloseDialog();
  };

  const handleCopyClassroomId = (classroomId) => {
    navigator.clipboard.writeText(classroomId);
    setSnackbar({
      open: true,
      message: '教室号已复制，可以直接粘贴使用啦！',
      severity: 'success'
    });
  };

  const handleContactSupport = () => {
    setSupportDialog(true);
  };

  const handleCloseSupportDialog = () => {
    setSupportDialog(false);
  };

  const handleCopyWechat = () => {
    navigator.clipboard.writeText('kidnest022');
    setSnackbar({
      open: true,
      message: '微信号已复制到剪贴板',
      severity: 'success'
    });
  };

  const CourseHoursCard = ({ title, value, icon, color }) => (
    <Card sx={{
      height: '100%',
      borderRadius: '20px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      position: 'relative',
      overflow: 'visible'
    }}>
      <CardContent sx={{
        textAlign: 'center',
        p: 3,
        '&:last-child': { pb: 3 }
      }}>
        <Box sx={{
          position: 'absolute',
          top: -20,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 40,
          height: 40,
          borderRadius: '50%',
          bgcolor: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        }}>
          {icon}
        </Box>
        <Typography variant="h4" sx={{ mt: 2, mb: 1, color: color, fontWeight: 'bold' }}>
          {value}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );

  // 添加评分对话框处理函数
  const handleOpenRating = (course) => {
    setRatingForm({
      rating: course.rating || 5,
      comment: course.comment || ''
    });
    setRatingDialog({
      open: true,
      course: course
    });
  };

  const handleCloseRating = () => {
    setRatingDialog({
      open: false,
      course: null
    });
  };

  const handleRatingChange = (event, newValue) => {
    setRatingForm(prev => ({
      ...prev,
      rating: newValue
    }));
  };

  const handleCommentChange = (event) => {
    setRatingForm(prev => ({
      ...prev,
      comment: event.target.value
    }));
  };

  const handleSubmitRating = () => {
    // 这里可以添加保存评分和评价的逻辑
    const updatedCourseHistory = courseHistory.map(course => {
      if (course.id === ratingDialog.course.id) {
        return {
          ...course,
          rating: ratingForm.rating,
          comment: ratingForm.comment,
          hasRated: true
        };
      }
      return course;
    });

    // 更新状态
    setCourseHistory(updatedCourseHistory);

    setSnackbar({
      open: true,
      message: '评价提交成功！',
      severity: 'success'
    });

    handleCloseRating();
  };

  if (!user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 2 }}>
      {/* 课时统计 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#2D5A27', fontWeight: 'bold' }}>
          课时统计
        </Typography>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #C5E6B0',
          py: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SupportAgentIcon sx={{ color: '#2D5A27', fontSize: 20 }} />
            <Typography variant="body1" sx={{ color: '#2D5A27' }}>
              联系客服
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: '#2D5A27', fontWeight: 'bold' }}>
            24h
          </Typography>
        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #C5E6B0',
          py: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccessTimeIcon sx={{ color: '#2D5A27', fontSize: 20 }} />
            <Typography variant="body1" sx={{ color: '#2D5A27' }}>
              总课时
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: '#2D5A27', fontWeight: 'bold' }}>
            {courseHours.total}
          </Typography>
        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #C5E6B0',
          py: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleIcon sx={{ color: '#2D5A27', fontSize: 20 }} />
            <Typography variant="body1" sx={{ color: '#2D5A27' }}>
              已完成
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: '#2D5A27', fontWeight: 'bold' }}>
            {courseHours.completed}
          </Typography>
        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <HourglassEmptyIcon sx={{ color: '#2D5A27', fontSize: 20 }} />
            <Typography variant="body1" sx={{ color: '#2D5A27' }}>
              剩余
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: '#2D5A27', fontWeight: 'bold' }}>
            {courseHours.remaining}
          </Typography>
        </Box>
      </Box>

      {/* 我的预约 */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ color: '#2D5A27', fontWeight: 'bold' }}>
            我的预约
          </Typography>
          <Button
            endIcon={<ArrowForward />}
            sx={{ color: '#2D5A27' }}
          >
            全部预约
          </Button>
        </Box>
        <List sx={{ bgcolor: 'white' }}>
          {appointments.map((appointment) => (
            <Box
              key={appointment.id}
              sx={{
                borderBottom: '1px solid #C5E6B0',
                py: 2,
                '&:last-child': {
                  borderBottom: 'none'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar
                  src={appointment.teacherAvatar}
                  sx={{ width: 32, height: 32, mr: 1.5 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" sx={{ color: '#2D5A27', fontWeight: 'bold' }}>
                    {appointment.courseName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#3A7434' }}>
                    {appointment.teacherName}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    bgcolor: '#2D5A27',
                    '&:hover': { bgcolor: '#1F3F1C' },
                    minWidth: 'auto',
                    px: 2
                  }}
                >
                  进入
                </Button>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pl: 5.5 }}>
                <CalendarToday sx={{ fontSize: 14, color: '#3A7434' }} />
                <Typography variant="body2" sx={{ color: '#3A7434' }}>
                  {appointment.dateTime}
                </Typography>
              </Box>
            </Box>
          ))}
        </List>
      </Box>

      {/* 我的课程 */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ color: '#2D5A27', fontWeight: 'bold' }}>
            我的课程
          </Typography>
          <Button
            endIcon={<ArrowForward />}
            sx={{ color: '#2D5A27' }}
          >
            全部课程
          </Button>
        </Box>
        <List>
          {courseHistory.map((course) => (
            <Box
              key={course.id}
              onClick={() => handleOpenRating(course)}
              sx={{
                borderBottom: '1px solid #C5E6B0',
                py: 2,
                '&:last-child': {
                  borderBottom: 'none'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar
                  src={course.teacherAvatar}
                  sx={{ width: 32, height: 32, mr: 1.5 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" sx={{ color: '#2D5A27', fontWeight: 'bold' }}>
                    {course.subject}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#3A7434' }}>
                    {course.teacherName}
                  </Typography>
                </Box>
                <Rating
                  value={course.rating}
                  readOnly
                  size="small"
                  sx={{
                    fontSize: '0.75rem',
                    '& .MuiRating-icon': {
                      color: '#2D5A27'
                    }
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pl: 5.5 }}>
                <CalendarToday sx={{ fontSize: 14, color: '#3A7434' }} />
                <Typography variant="body2" sx={{ color: '#3A7434' }}>
                  {course.date}
                </Typography>
              </Box>
            </Box>
          ))}
        </List>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '20px',
            padding: '16px',
          }
        }}
      >
        {selectedAppointment && (
          <>
            <DialogTitle sx={{
              textAlign: 'center',
              color: '#2D5A27',
              fontWeight: 'bold',
              pb: 1
            }}>
              预约课程
            </DialogTitle>
            <DialogContent>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 3,
                pb: 2,
                borderBottom: '1px solid #C5E6B0'
              }}>
                <Avatar
                  src={selectedAppointment.teacherAvatar}
                  sx={{ width: 48, height: 48, mr: 2 }}
                />
                <Box>
                  <Typography variant="h6" sx={{ color: '#2D5A27', fontWeight: 'bold' }}>
                    {selectedAppointment.teacherName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#3A7434' }}>
                    {selectedAppointment.courseName}
                  </Typography>
                </Box>
              </Box>

              {/* 日期选择 */}
              <Typography variant="subtitle1" sx={{ mb: 1, color: '#2D5A27', fontWeight: 'bold' }}>
                选择上课日期
              </Typography>
              <Box sx={{ mb: 3, display: 'flex', gap: 1, overflowX: 'auto', pb: 1 }}>
                {getWeekDates().map((date) => {
                  const formattedDate = formatDate(date);
                  return (
                    <ToggleButton
                      key={date.toISOString()}
                      value={date}
                      selected={selectedDate && selectedDate.getDate() === date.getDate()}
                      onChange={() => handleDateSelect(date)}
                      sx={{
                        minWidth: 80,
                        borderRadius: 2,
                        border: '1px solid #C5E6B0',
                        '&.Mui-selected': {
                          bgcolor: 'rgba(45, 90, 39, 0.1)',
                          borderColor: '#2D5A27',
                          color: '#2D5A27',
                        },
                        flexDirection: 'column',
                        p: 1
                      }}
                    >
                      <Typography variant="caption" sx={{ mb: 0.5 }}>
                        {formattedDate.day}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {formattedDate.date}
                      </Typography>
                    </ToggleButton>
                  );
                })}
              </Box>

              {/* 时间段选择 */}
              {selectedDate && (
                <>
                  <Typography variant="subtitle1" sx={{ mb: 1, color: '#2D5A27', fontWeight: 'bold' }}>
                    选择上课时间
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                    {timeSlots.map((slot) => {
                      const isBookable = isTimeSlotBookable(selectedDate, slot);
                      return (
                        <ToggleButton
                          key={slot}
                          value={slot}
                          selected={selectedTimeSlot === slot}
                          onChange={() => handleTimeSlotSelect(slot)}
                          disabled={!isBookable}
                          sx={{
                            minWidth: 90,
                            borderRadius: 2,
                            border: '1px solid #C5E6B0',
                            '&.Mui-selected': {
                              bgcolor: 'rgba(45, 90, 39, 0.1)',
                              borderColor: '#2D5A27',
                              color: '#2D5A27',
                            },
                            '&.Mui-disabled': {
                              bgcolor: '#f5f5f5',
                              color: '#bdbdbd',
                            }
                          }}
                        >
                          {slot}
                        </ToggleButton>
                      );
                    })}
                  </Box>
                </>
              )}

              <Typography variant="body2" sx={{ color: '#666', mt: 2 }}>
                温馨提示：
                <br />
                1. 课程需要提前12小时预约
                <br />
                2. 如需取消课程，请提前24小时操作
                <br />
                3. 请准时参加课程，迟到超过10分钟将被视为缺课
              </Typography>
            </DialogContent>
            <DialogActions sx={{ p: 2, justifyContent: 'center' }}>
              <Button
                onClick={handleCloseDialog}
                sx={{
                  color: '#2D5A27',
                  borderRadius: '20px',
                  mr: 1
                }}
              >
                取消
              </Button>
              <Button
                variant="contained"
                disabled={!selectedDate || !selectedTimeSlot}
                sx={{
                  borderRadius: '20px',
                  bgcolor: '#2D5A27',
                  '&:hover': { bgcolor: '#1F3F1C' },
                  '&.Mui-disabled': {
                    bgcolor: '#C5E6B0',
                  }
                }}
              >
                确认预约
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, appointmentId: null })}
      >
        <DialogTitle>确认取消预约？</DialogTitle>
        <DialogContent>
          <Typography>
            确定要取消这节课程吗？取消后将无法恢复。
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialog({ open: false, appointmentId: null })}
            sx={{ borderRadius: '20px' }}
          >
            返回
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            sx={{ borderRadius: '20px' }}
          >
            确认取消
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={ratingDialog.open}
        onClose={handleCloseRating}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '20px',
            padding: '16px',
          }
        }}
      >
        {ratingDialog.course && (
          <>
            <DialogTitle sx={{
              textAlign: 'center',
              color: '#2e7d32',
              fontWeight: 'bold'
            }}>
              课程评价
            </DialogTitle>
            <DialogContent>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 3,
                pb: 2,
                borderBottom: '1px dashed #e0e0e0'
              }}>
                <Avatar
                  src={ratingDialog.course.teacherAvatar}
                  sx={{
                    width: 60,
                    height: 60,
                    mr: 2,
                    border: `2px solid ${languageColors[ratingDialog.course.teacherType]}`
                  }}
                />
                <Box>
                  <Typography variant="h6">
                    {ratingDialog.course.teacherName}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {ratingDialog.course.subject}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {ratingDialog.course.date} {ratingDialog.course.timeSlot}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ color: '#2e7d32' }}>
                  课程评分
                </Typography>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: 1
                }}>
                  <Rating
                    value={ratingForm.rating}
                    onChange={handleRatingChange}
                    size="large"
                    sx={{ fontSize: '2rem' }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {ratingForm.rating === 5 && '非常满意'}
                    {ratingForm.rating === 4 && '满意'}
                    {ratingForm.rating === 3 && '一般'}
                    {ratingForm.rating === 2 && '不满意'}
                    {ratingForm.rating === 1 && '非常不满意'}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ color: '#2e7d32' }}>
                  评价内容
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={ratingForm.comment}
                  onChange={handleCommentChange}
                  placeholder="请分享您的学习体验和建议..."
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '15px',
                    }
                  }}
                />
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button
                onClick={handleCloseRating}
                sx={{ borderRadius: '20px' }}
              >
                取消
              </Button>
              <Button
                onClick={handleSubmitRating}
                variant="contained"
                sx={{
                  borderRadius: '20px',
                  bgcolor: '#4caf50',
                  '&:hover': {
                    bgcolor: '#388e3c'
                  }
                }}
              >
                提交评价
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* 客服对话框 */}
      <Dialog
        open={supportDialog}
        onClose={handleCloseSupportDialog}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '20px',
            padding: '16px',
          }
        }}
      >
        <DialogTitle sx={{
          textAlign: 'center',
          color: '#2D5A27',
          fontWeight: 'bold',
          pb: 1
        }}>
          联系客服
        </DialogTitle>
        <DialogContent>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            py: 2
          }}>
            <SupportAgentIcon sx={{ fontSize: 48, color: '#2D5A27' }} />
            <Typography variant="h6" sx={{ color: '#2D5A27', fontWeight: 'bold' }}>
              客服微信
            </Typography>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: 'rgba(197, 230, 176, 0.2)',
              p: 2,
              borderRadius: 2,
              width: '100%',
              justifyContent: 'center'
            }}>
              <Typography variant="h6" sx={{ color: '#2D5A27' }}>
                kidnest022
              </Typography>
              <IconButton
                onClick={handleCopyWechat}
                size="small"
                sx={{ color: '#2D5A27' }}
              >
                <ContentCopyIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" sx={{ color: '#666', textAlign: 'center' }}>
              工作时间：周一至周日 9:00-21:00
              <br />
              您可以添加客服微信咨询任何问题
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            onClick={handleCloseSupportDialog}
            variant="contained"
            sx={{
              borderRadius: '20px',
              bgcolor: '#2D5A27',
              '&:hover': { bgcolor: '#1F3F1C' },
              minWidth: 120
            }}
          >
            关闭
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
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Profile; 