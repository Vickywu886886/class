import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Chip,
  Avatar,
  IconButton,
  Badge,
  TextField,
} from '@mui/material';
import {
  AccessTime,
  Notifications,
  Schedule,
  Delete as DeleteIcon,
  VideoCall as VideoCallIcon,
  AudioFile as AudioFileIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Warning as WarningIcon,
  CalendarToday as CalendarTodayIcon,
  ArrowForward as ArrowForwardIcon,
  Info as InfoIcon,
  Event as EventIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import ClassIcon from '@mui/icons-material/Class';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StarIcon from '@mui/icons-material/Star';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import TeacherNav from '../components/TeacherNav';

const TeacherDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    bio: '',
    video: null,
    audio: null,
  });
  const [notifications] = useState([
    { id: 1, type: 'class', title: 'Upcoming Class', time: '10:00 AM', student: 'Zhang Xiaoming' },
    { id: 2, type: 'assignment', title: 'Assignment to Grade', time: 'Yesterday', student: 'Li Xiaohua' },
    { id: 3, type: 'feedback', title: 'New Course Review', time: '2 days ago', student: 'Wang Xiaohong' },
  ]);
  const [reminders] = useState([
  {
    id: 1,
      type: 'class',
      priority: 'high',
      title: 'IELTS Speaking Class',
      time: '10:00 AM',
      student: {
        name: 'Zhang Xiaoming',
        level: 'Advanced',
        course: 'IELTS Speaking'
      }
  },
  {
    id: 2,
      type: 'booking',
      priority: 'high',
      title: 'New Booking Request',
      time: '15:00 PM',
      student: {
        name: 'Li Xiaohua',
        level: 'Intermediate',
        course: 'Business English'
      }
  },
  {
    id: 3,
      type: 'assignment',
      priority: 'medium',
      title: 'Assignment to Grade',
      time: 'Due Today',
      student: {
        name: 'Wang Xiaohong',
        level: 'Intermediate',
        course: 'Academic Writing'
      }
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('today');
  const [selectedClass, setSelectedClass] = useState(null);

  const classSchedule = {
    today: [
  {
    id: 1,
        date: '2024-03-20',
        time: '09:00 - 10:00',
        student: {
          name: 'Zhang Xiaoming',
          level: 'Advanced',
          age: 15
        },
        course: {
          type: 'IELTS Speaking',
          topic: 'Part 2 - Cue Card Practice',
          materials: 'Cambridge IELTS 17',
          objectives: [
            'Improve descriptive expression ability',
            'Practice key word extraction and expansion',
            'Time management training'
          ]
        },
        status: 'upcoming'
  },
  {
    id: 2,
        date: '2024-03-20',
        time: '10:30 - 11:30',
        student: {
          name: 'Li Xiaohua',
          level: 'Intermediate',
          age: 14
        },
        course: {
          type: 'Business English',
          topic: 'Email Writing',
          materials: 'Market Leader - Intermediate',
          objectives: [
            'Master business email format',
            'Learn common business expressions',
            'Practice email writing'
          ]
        },
        status: 'completed'
      },
      {
        id: 3,
        date: '2024-03-20',
        time: '14:00 - 15:00',
        student: {
          name: 'Wang Xiaohong',
          level: 'Intermediate',
          age: 16
        },
        course: {
          type: 'Academic Writing',
          topic: 'Essay Structure',
          materials: 'Academic Writing Skills 2',
          objectives: [
            'Understand essay structure',
            'Practice topic sentence writing',
            'Learn paragraph development methods'
          ]
        },
        status: 'cancelled'
      }
    ],
    week: [
      // ... similar structure for weekly schedule
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return '#4caf50';
      case 'completed':
        return '#2196f3';
      case 'cancelled':
        return '#ff5252';
      default:
        return '#757575';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'upcoming':
        return 'Upcoming Class';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserData(user);
      setFormData({
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || '',
        video: user.video || null,
        audio: user.audio || null,
      });
        setLoading(false);
      }
  }, []);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUser = { ...userData, avatar: reader.result };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUserData(updatedUser);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUser = { ...userData, [type]: reader.result };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUserData(updatedUser);
        setFormData(prev => ({
        ...prev,
          [type]: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    const updatedUser = { 
      ...userData,
      email: formData.email,
      phone: formData.phone,
      bio: formData.bio,
      video: formData.video,
      audio: formData.audio
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUserData(updatedUser);
    setEditMode(false);
  };

  const handleBookingResponse = (reminderId, accepted) => {
    // 在实际应用中，这里会调用API处理预约响应
    console.log(`Booking ${accepted ? 'accepted' : 'rejected'} for reminder ${reminderId}`);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!userData) {
    return <Typography>No profile data available</Typography>;
  }

  const stats = [
    {
      title: "Today's Classes",
      value: '5',
      icon: <ClassIcon sx={{ fontSize: 40, color: '#4caf50' }} />,
    },
    {
      title: 'Pending Assignments',
      value: '12',
      icon: <AssignmentIcon sx={{ fontSize: 40, color: '#4caf50' }} />,
    },
    {
      title: 'Average Rating',
      value: '4.8',
      icon: <StarIcon sx={{ fontSize: 40, color: '#4caf50' }} />,
    },
  ];

    return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <TeacherNav />
      <Grid container spacing={3}>
        {/* Left Side: Profile Card */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Box sx={{ position: 'relative', mb: 2 }}>
                <Avatar
                  src={userData?.avatar}
                  alt="Teacher"
        sx={{
                    width: 120,
                    height: 120,
                    bgcolor: '#4caf50',
                    border: '3px solid #4caf50'
                  }}
                />
                <input
                  accept="image/*"
                  type="file"
                  id="dashboard-avatar-upload"
                  onChange={handleAvatarChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="dashboard-avatar-upload">
                  <IconButton
                    component="span"
                    sx={{
                      position: 'absolute',
                      right: 0,
                      bottom: 0,
                      bgcolor: '#4caf50',
                      color: 'white',
                      '&:hover': { bgcolor: '#45a049' }
                    }}
                  >
                    <PhotoCameraIcon />
                  </IconButton>
                </label>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Teacher
        </Typography>
              {!editMode ? (
                <Button
                  variant="outlined"
                  onClick={() => setEditMode(true)}
                  sx={{
                    color: '#4caf50',
                    borderColor: '#4caf50',
                    '&:hover': {
                      borderColor: '#45a049',
                      bgcolor: 'rgba(76, 175, 80, 0.04)'
                    }
                  }}
                >
                  Edit Profile
                </Button>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                    variant="contained"
                    onClick={handleSave}
                    sx={{
                      bgcolor: '#4caf50',
                      '&:hover': { bgcolor: '#45a049' }
                    }}
                  >
                    Save
              </Button>
              <Button
                    variant="outlined"
                    onClick={() => setEditMode(false)}
                    sx={{
                      color: '#4caf50',
                      borderColor: '#4caf50',
                      '&:hover': {
                        borderColor: '#45a049',
                        bgcolor: 'rgba(76, 175, 80, 0.04)'
                      }
                    }}
                  >
                    Cancel
              </Button>
            </Box>
          )}
            </Box>
            {editMode ? (
              <Box sx={{ mt: 3 }}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  sx={{ mb: 3 }}
                />
                
                {/* Video Upload */}
                <Box sx={{ mb: 2 }}>
                  <input
                    accept="video/*"
                    type="file"
                    id="video-upload"
                    onChange={(e) => handleFileUpload(e, 'video')}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="video-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<VideoCallIcon />}
                      fullWidth
                  sx={{
                        color: '#4caf50',
                        borderColor: '#4caf50',
                    '&:hover': {
                          borderColor: '#45a049',
                          bgcolor: 'rgba(76, 175, 80, 0.04)'
                        }
                      }}
                    >
                      Upload Introduction Video
        </Button>
                  </label>
                  {userData?.video && (
                    <Box sx={{ mt: 1 }}>
                      <video controls width="100%" src={userData.video} />
                      <IconButton
                        onClick={() => {
                          const updatedUser = { ...userData, video: null };
                          localStorage.setItem('user', JSON.stringify(updatedUser));
                          setUserData(updatedUser);
                        }}
                        size="small"
                        sx={{ color: '#ff5252', mt: 1 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
        )}
      </Box>

                {/* Audio Upload */}
                <Box>
                  <input
                    accept="audio/*"
                    type="file"
                    id="audio-upload"
                    onChange={(e) => handleFileUpload(e, 'audio')}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="audio-upload">
                <Button
                  variant="outlined"
                      component="span"
                      startIcon={<AudioFileIcon />}
                      fullWidth
                      sx={{
                        color: '#4caf50',
                        borderColor: '#4caf50',
                        '&:hover': {
                          borderColor: '#45a049',
                          bgcolor: 'rgba(76, 175, 80, 0.04)'
                        }
                      }}
                    >
                      Upload Voice Introduction
                </Button>
                  </label>
                  {userData?.audio && (
                    <Box sx={{ mt: 1 }}>
                      <audio controls width="100%" src={userData.audio} />
                      <IconButton
                        onClick={() => {
                          const updatedUser = { ...userData, audio: null };
                          localStorage.setItem('user', JSON.stringify(updatedUser));
                          setUserData(updatedUser);
                        }}
                        size="small"
                        sx={{ color: '#ff5252', mt: 1 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                      </Box>
                    )}
                  </Box>
                  </Box>
            ) : (
              <Box sx={{ mt: 3 }}>
                <Typography variant="body1" sx={{ mb: 1, color: '#666' }}>
                  Email: {userData?.email}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, color: '#666' }}>
                  Phone: {userData?.phone}
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: '#666' }}>
                  Bio: {userData?.bio}
                </Typography>
                
                {userData?.video && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, color: '#2D5A27' }}>
                      Introduction Video
                    </Typography>
                    <video controls width="100%" src={userData.video} />
                  </Box>
                )}
                
                {userData?.audio && (
                  <Box>
                    <Typography variant="subtitle1" sx={{ mb: 1, color: '#2D5A27' }}>
                      Voice Introduction
                  </Typography>
                    <audio controls width="100%" src={userData.audio} />
                  </Box>
                )}
              </Box>
            )}
                </Paper>
        </Grid>

        {/* Right Side: Stats and Schedule */}
        <Grid item xs={12} md={8}>
          {/* Today's Reminders - New Section */}
          <Paper sx={{ p: 3, mb: 3, border: '1px solid #4caf50' }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 2,
              pb: 1,
              borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
            }}>
              <WarningIcon sx={{ color: '#4caf50', mr: 1 }} />
              <Typography variant="h6" component="h2">
                Today's Reminders
              </Typography>
            </Box>
                  <List>
              {reminders.map((reminder) => (
                      <ListItem
                  key={reminder.id}
                        sx={{
                          mb: 1,
                    bgcolor: reminder.priority === 'high' ? 'rgba(76, 175, 80, 0.08)' : 'transparent',
                    borderRadius: 1,
                    border: '1px solid rgba(0, 0, 0, 0.12)'
                  }}
                >
                  <ListItemIcon>
                    {reminder.type === 'class' && <AccessTime sx={{ color: '#4caf50' }} />}
                    {reminder.type === 'booking' && <Schedule sx={{ color: '#4caf50' }} />}
                    {reminder.type === 'assignment' && <AssignmentIcon sx={{ color: '#4caf50' }} />}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle1" component="span">
                          {reminder.title}
                          </Typography>
                        {reminder.priority === 'high' && (
                          <Chip
                            label="Important" 
                            size="small"
                            sx={{ 
                              bgcolor: '#4caf50',
                              color: 'white',
                              height: '20px'
                            }} 
                          />
                        )}
                        </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" component="span">
                          Time: {reminder.time}
                        </Typography>
                        <br />
                        <Typography variant="body2" component="span">
                          Student: {reminder.student.name} ({reminder.student.level})
                        </Typography>
                        <br />
                        <Typography variant="body2" component="span">
                          Course: {reminder.student.course}
                        </Typography>
                      </Box>
                    }
                  />
                  {reminder.type === 'booking' && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton 
                        onClick={() => handleBookingResponse(reminder.id, true)}
                        sx={{ 
                          color: '#4caf50',
                          '&:hover': { bgcolor: 'rgba(76, 175, 80, 0.08)' }
                        }}
                      >
                        <CheckCircleIcon />
                      </IconButton>
                      <IconButton 
                        onClick={() => handleBookingResponse(reminder.id, false)}
                        sx={{ 
                          color: '#ff5252',
                          '&:hover': { bgcolor: 'rgba(255, 82, 82, 0.08)' }
                        }}
                      >
                        <CancelIcon />
                      </IconButton>
                        </Box>
                  )}
                      </ListItem>
                    ))}
                  </List>
                </Paper>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={4} key={index}>
                              <Paper
                                sx={{
                    p: 2,
                                  display: 'flex',
                    flexDirection: 'column',
                                  alignItems: 'center',
                    height: '100%',
                    bgcolor: 'white',
                  }}
                >
                  {stat.icon}
                  <Typography variant="h4" sx={{ mt: 2, color: '#2D5A27' }}>
                    {stat.value}
                                    </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.title}
                                    </Typography>
                              </Paper>
              </Grid>
            ))}
                      </Grid>

          {/* My Class Schedule - New Section */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 3,
              borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
              pb: 2
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarTodayIcon sx={{ color: '#4caf50', mr: 1 }} />
                <Typography variant="h6">My Class Schedule</Typography>
                          </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                  variant={selectedDate === 'today' ? 'contained' : 'outlined'}
                  onClick={() => setSelectedDate('today')}
                  sx={{
                    bgcolor: selectedDate === 'today' ? '#4caf50' : 'transparent',
                    color: selectedDate === 'today' ? 'white' : '#4caf50',
                    '&:hover': {
                      bgcolor: selectedDate === 'today' ? '#45a049' : 'rgba(76, 175, 80, 0.08)'
                    }
                  }}
                >
                  今日课程
                            </Button>
                            <Button
                  variant={selectedDate === 'week' ? 'contained' : 'outlined'}
                  onClick={() => setSelectedDate('week')}
                  sx={{
                    bgcolor: selectedDate === 'week' ? '#4caf50' : 'transparent',
                    color: selectedDate === 'week' ? 'white' : '#4caf50',
                    '&:hover': {
                      bgcolor: selectedDate === 'week' ? '#45a049' : 'rgba(76, 175, 80, 0.08)'
                    }
                  }}
                >
                  本周课程
                            </Button>
                          </Box>
            </Box>

            <List>
              {classSchedule[selectedDate].map((classItem) => (
                <ListItem
                  key={classItem.id}
                                    sx={{
                    mb: 2,
                    bgcolor: 'white',
                    borderRadius: 1,
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                                      '&:hover': {
                      bgcolor: 'rgba(76, 175, 80, 0.04)'
                    }
                  }}
                >
                  <ListItemIcon>
                    <EventIcon sx={{ color: getStatusColor(classItem.status) }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle1">
                          {classItem.time}
                                    </Typography>
                        <Chip
                          label={getStatusLabel(classItem.status)}
                          size="small"
                                      sx={{
                            bgcolor: getStatusColor(classItem.status),
                            color: 'white',
                            height: '20px'
                          }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          学生: {classItem.student.name} ({classItem.student.level})
                                    </Typography>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          课程: {classItem.course.type} - {classItem.course.topic}
                        </Typography>
                                    </Box>
                    }
                  />
          <IconButton
                    onClick={() => setSelectedClass(classItem)}
                    sx={{ color: '#4caf50' }}
                  >
                    <InfoIcon />
          </IconButton>
                </ListItem>
              ))}
            </List>

            {/* Course Details Dialog */}
            {selectedClass && (
              <Paper
                sx={{
                  mt: 2,
                  p: 3,
                  bgcolor: 'rgba(76, 175, 80, 0.04)',
                  border: '1px solid #4caf50'
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ color: '#2D5A27' }}>
                    Course Details
                  </Typography>
                  <IconButton onClick={() => setSelectedClass(null)} size="small">
                    <DeleteIcon />
                  </IconButton>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ color: '#2D5A27', mb: 1 }}>
                      Student Information
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      Name: {selectedClass.student.name}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      Level: {selectedClass.student.level}
                    </Typography>
                    <Typography variant="body2">
                      Age: {selectedClass.student.age} years
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ color: '#2D5A27', mb: 1 }}>
                      Course Information
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      Type: {selectedClass.course.type}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      Topic: {selectedClass.course.topic}
                    </Typography>
                    <Typography variant="body2">
                      Materials: {selectedClass.course.materials}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ color: '#2D5A27', mb: 1 }}>
                      Learning Objectives
                    </Typography>
                    <List dense>
                      {selectedClass.course.objectives.map((objective, index) => (
                        <ListItem key={index} sx={{ py: 0 }}>
                          <ListItemIcon sx={{ minWidth: '32px' }}>
                            <ArrowForwardIcon sx={{ color: '#4caf50', fontSize: '0.8rem' }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={objective}
                            sx={{ m: 0 }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                </Grid>
              </Paper>
            )}
          </Paper>

          {/* Recent Notifications */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Notifications
            </Typography>
            <List>
              {notifications.map((notification, index) => (
                <ListItem key={index} divider={index < notifications.length - 1}>
                  <ListItemIcon>
                    <Badge color="error" variant="dot" invisible={notification.read}>
                      <Notifications sx={{ color: '#4caf50' }} />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText
                    primary={notification.title}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          {notification.student}
                        </Typography>
                        <br />
                        <Typography component="span" variant="caption" color="textSecondary">
                          {notification.time}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
                </Grid>
                </Grid>
        </Container>
  );
};

export default TeacherDashboard; 