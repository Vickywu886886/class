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
  TextField
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 4, borderRadius: '20px', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar
            src={user.avatar}
            sx={{
              width: 100,
              height: 100,
              mr: 3,
              border: '3px solid',
              borderColor: user.role === 'teacher' ? '#2196f3' : '#4caf50'
            }}
          />
          <Box>
            <Typography variant="h4" gutterBottom>
              {user.username}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user.role === 'teacher' ? '教师' : '学生'}
            </Typography>
          </Box>
        </Box>

        {user.role === 'student' && (
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <CourseHoursCard
                title="总购买课时"
                value={courseHours.total}
                icon={<AccessTimeIcon sx={{ color: 'white' }} />}
                color="#4caf50"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <CourseHoursCard
                title="已完成课时"
                value={courseHours.completed}
                icon={<CheckCircleIcon sx={{ color: 'white' }} />}
                color="#2196f3"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <CourseHoursCard
                title="剩余课时"
                value={courseHours.remaining}
                icon={<HourglassEmptyIcon sx={{ color: 'white' }} />}
                color="#ff9800"
              />
            </Grid>
          </Grid>
        )}

        <Paper sx={{ p: 4, borderRadius: '20px', mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ 
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <LocalLibraryIcon sx={{ color: '#4caf50' }} />
            上课记录
          </Typography>

          <Grid container spacing={3}>
            {courseHistory.map((course) => (
              <Grid item xs={12} key={course.id}>
                <Card sx={{ 
                  borderRadius: '15px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  border: `1px solid ${languageColors[course.teacherType]}20`
                }}>
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            src={course.teacherAvatar}
                            sx={{ 
                              width: 60, 
                              height: 60, 
                              mr: 2,
                              border: `2px solid ${languageColors[course.teacherType]}`
                            }}
                          />
                          <Box>
                            <Typography variant="h6">
                              {course.teacherName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {course.subject}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={3}>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            上课时间
                          </Typography>
                          <Typography variant="body1">
                            {course.date}
                          </Typography>
                          <Typography variant="body1">
                            {course.timeSlot}
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={3}>
                        <Box>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            课程评分
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Rating value={course.rating} readOnly size="small" />
                            <Typography variant="body2" color="text.secondary">
                              ({course.rating}.0)
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={2}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleOpenRating(course)}
                          sx={{
                            borderRadius: '20px',
                            borderColor: languageColors[course.teacherType],
                            color: languageColors[course.teacherType],
                            '&:hover': {
                              borderColor: languageColors[course.teacherType],
                              bgcolor: `${languageColors[course.teacherType]}10`
                            }
                          }}
                        >
                          {course.hasRated ? '修改评价' : '评价课程'}
                        </Button>
                      </Grid>

                      <Grid item xs={12}>
                        <Box sx={{ 
                          mt: 1, 
                          pt: 2, 
                          borderTop: '1px dashed #e0e0e0',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}>
                          <CommentIcon sx={{ color: 'text.secondary', fontSize: '1rem' }} />
                          <Typography variant="body2" color="text.secondary">
                            {course.comment}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          我的预约
        </Typography>

        {appointments.length > 0 ? (
          <Grid container spacing={3}>
            {appointments.map((appointment) => (
              <Grid item xs={12} md={6} key={appointment.id}>
                <Card sx={{ 
                  borderRadius: '15px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        src={appointment.teacherAvatar}
                        sx={{ width: 50, height: 50, mr: 2 }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6">
                          {appointment.teacherName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {appointment.subject}
                        </Typography>
                      </Box>
                      <IconButton
                        onClick={() => handleDeleteClick(appointment.id)}
                        sx={{ color: '#ff5252' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      上课时间：{appointment.day} {appointment.timeSlot}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ 
            textAlign: 'center',
            py: 4,
            bgcolor: '#f5f5f5',
            borderRadius: '10px'
          }}>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              暂无预约课程
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/teachers')}
              sx={{
                mt: 2,
                borderRadius: '20px',
                bgcolor: '#4caf50',
                '&:hover': {
                  bgcolor: '#388e3c'
                }
              }}
            >
              去预约课程
            </Button>
          </Box>
        )}
      </Paper>

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
              color: '#2e7d32',
              fontWeight: 'bold'
            }}>
              课程详情
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
                  src={selectedAppointment.teacherAvatar}
                  sx={{ width: 60, height: 60, mr: 2 }}
                />
                <Box>
                  <Typography variant="h6">
                    {selectedAppointment.teacherName}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {selectedAppointment.subject}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ color: '#2e7d32' }}>
                  上课时间
                </Typography>
                <Typography variant="body1">
                  {selectedAppointment.day} {selectedAppointment.timeSlot}
                </Typography>
              </Box>

              {selectedAppointment.classIn && (
                <Paper sx={{ p: 2, bgcolor: '#f1f8e9', borderRadius: '15px' }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ color: '#2e7d32' }}>
                    教室信息
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body1" sx={{ mr: 1 }}>
                      教室号：{selectedAppointment.classIn.classroomId}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleCopyClassroomId(selectedAppointment.classIn.classroomId)}
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  <Button
                    variant="contained"
                    href={selectedAppointment.classIn.link}
                    target="_blank"
                    sx={{
                      mt: 1,
                      borderRadius: '15px',
                      background: 'linear-gradient(45deg, #4caf50 30%, #81c784 90%)',
                    }}
                  >
                    进入教室
                  </Button>

                  <Typography variant="body2" sx={{ mt: 2, color: '#666' }}>
                    温馨提示：请提前5分钟进入教室，确保设备和网络正常哦～
                  </Typography>
                </Paper>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseDialog}
                sx={{ borderRadius: '15px' }}
              >
                关闭
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