import React, { useState } from 'react';
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
} from '@mui/icons-material';
import { format, addDays, subDays, startOfWeek, isSameDay, parseISO } from 'date-fns';
import zhCN from 'date-fns/locale/zh-CN';
import CourseManagement from './components/CourseManagement';
import StudentManagement from './components/StudentManagement';
import Profile from './components/Profile';

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

const TeacherDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openProfile, setOpenProfile] = useState(false);
  const [openSchedule, setOpenSchedule] = useState(false);
  const [profile, setProfile] = useState({
    // Basic Information
    firstName: 'Wendy',
    lastName: 'Wang',
    avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
    contact: {
      email: 'wang@example.com',
      phone: '13800138000',
      office: 'Computer Building 301',
      internalContact: 'Ext. 1234'
    },
    
    // Teaching Qualifications
    education: [
      {
        degree: 'Ph.D. in Computer Science',
        university: 'Stanford University',
        year: '2010-2015'
      },
      {
        degree: 'M.S. in Computer Science',
        university: 'Tsinghua University',
        year: '2008-2010'
      }
    ],
    certificates: [
      {
        name: 'TESOL Certificate',
        issuer: 'Cambridge University',
        year: '2016'
      }
    ],
    experience: {
      years: 20,
      ageGroups: ['High School', 'University', 'Adult'],
      courseTypes: ['Programming', 'Data Structures', 'Algorithms']
    },
    teachingStyle: {
      methods: ['Interactive Learning', 'Project-Based', 'Flipped Classroom'],
      specialties: ['KET Preparation', 'Speaking Practice', 'Grammar']
    },
    
    // Personal Characteristics
    introduction: 'Teaching computer science for 20 years, with expertise in algorithm and data structure teaching.',
    teachingPhilosophy: 'Learning through practice and real-world applications',
    interests: ['Travel', 'Reading', 'Photography'],
    
    // Available Time
    availableTime: {
      weekdays: {
        monday: ['09:00-12:00', '14:00-17:00'],
        tuesday: ['09:00-12:00', '14:00-17:00'],
        wednesday: ['09:00-12:00', '14:00-17:00'],
        thursday: ['09:00-12:00', '14:00-17:00'],
        friday: ['09:00-12:00', '14:00-17:00'],
        saturday: ['09:00-12:00'],
        sunday: []
      }
    }
  });

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const endHour = minute === 30 ? hour + 1 : hour;
        const endMinute = minute === 30 ? 0 : 30;
        const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
        slots.push({ start: startTime, end: endTime, enabled: false });
      }
    }
    return slots;
  };

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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

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

  const getScheduleForDate = (date) => {
    return weeklySchedule.filter(schedule => 
      isSameDay(parseISO(schedule.date), date)
    );
  };

  const renderDaySchedule = (date) => {
    const schedules = getScheduleForDate(date);
    if (schedules.length === 0) return null;

    return (
      <Box sx={{ mt: 1 }}>
        {schedules.map(schedule => (
          <Paper
            key={schedule.id}
            sx={{
              p: 1,
              mb: 1,
              backgroundColor: schedule.status === 'confirmed' ? 'success.light' : 'warning.light',
              color: 'white',
            }}
          >
            <Typography variant="caption" display="block">
              {schedule.time}
            </Typography>
            <Typography variant="body2">
              {schedule.student} - {schedule.type}
            </Typography>
            <Chip
              label={schedule.status === 'confirmed' ? 'Confirmed' : 'Pending'}
              color={schedule.status === 'confirmed' ? 'success' : 'warning'}
              size="small"
              sx={{ mt: 0.5 }}
            />
          </Paper>
        ))}
      </Box>
    );
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const startDate = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const handleTimeSlotToggle = (day, slotIndex) => {
    setScheduleSettings(prev => ({
      ...prev,
      weekdays: {
        ...prev.weekdays,
        [day]: prev.weekdays[day].map((slot, index) =>
          index === slotIndex ? { ...slot, enabled: !slot.enabled } : slot
        ),
      },
    }));
  };

  const handleSaveSchedule = () => {
    // 这里可以添加保存到后端的逻辑
    console.log('Saving schedule:', scheduleSettings);
    handleScheduleClose();
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    return `${hour.toString().padStart(2, '0')}:${minutes}`;
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
        <Typography variant="body2">
          {formatTime(slot.start)} - {formatTime(slot.end)}
        </Typography>
        <Typography variant="caption" display="block">
          {slot.enabled ? 'Available' : 'Not Available'}
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

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Teacher Card Preview */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Teacher Card Preview</Typography>
          <Button
            variant="outlined"
            startIcon={<Edit />}
            onClick={handleProfileOpen}
          >
            Edit Profile
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
                {profile.experience.years} years of teaching experience
              </Typography>
              {profile.audioIntroduction && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>Audio Introduction</Typography>
                  <audio controls src={profile.audioIntroduction} style={{ width: '100%' }} />
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="subtitle1" gutterBottom>Introduction</Typography>
            <Typography paragraph>{profile.introduction}</Typography>
            
            <Typography variant="subtitle1" gutterBottom>Teaching Philosophy</Typography>
            <Typography paragraph>{profile.teachingPhilosophy}</Typography>
            
            <Typography variant="subtitle1" gutterBottom>Specialties</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {profile.teachingStyle.specialties.map((specialty, index) => (
                <Chip key={index} label={specialty} color="primary" variant="outlined" />
              ))}
            </Box>
            
            <Typography variant="subtitle1" gutterBottom>Teaching Methods</Typography>
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
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Quick Actions
            </Typography>
            <List>
              <ListItem button onClick={handleScheduleOpen}>
                <ListItemIcon>
                  <Schedule />
                </ListItemIcon>
                <ListItemText primary="Set Available Time" />
              </ListItem>
            </List>
          </Paper>

          {/* Notifications */}
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Notifications
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
              Booking Requests
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
                      onClick={() => handleRejectRequest(request.id)}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => handleAcceptRequest(request.id)}
                    >
                      Accept
                    </Button>
                  </Box>
                </ListItem>
              ))}
              {pendingRequests.length === 0 && (
                <ListItem>
                  <ListItemText primary="No pending requests" />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>

        {/* Right Content Area: Tabs */}
        <Grid item xs={12} md={9}>
          <Paper sx={{ width: '100%' }}>
            {/* Weekly Schedule Tab */}
            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={3}>
                {/* Today's Schedule */}
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Today's Schedule
                    </Typography>
                    <List>
                      {getScheduleForDate(new Date()).map(schedule => (
                        <ListItem key={schedule.id}>
                          <ListItemIcon>
                            <CalendarToday color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={`${schedule.time}`}
                            secondary={`${schedule.student} - ${schedule.type}`}
                          />
                          <Chip
                            label={schedule.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                            color={schedule.status === 'confirmed' ? 'success' : 'warning'}
                            size="small"
                          />
                        </ListItem>
                      ))}
                      {getScheduleForDate(new Date()).length === 0 && (
                        <ListItem>
                          <ListItemText primary="No classes scheduled for today" />
                        </ListItem>
                      )}
                    </List>
                  </Paper>
                </Grid>

                {/* Weekly Schedule */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Weekly Schedule
                  </Typography>
                </Grid>

                <Grid item xs={12} md={8}>
                  <Paper sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <IconButton onClick={() => setSelectedDate(subDays(selectedDate, 7))}>
                        <ChevronLeft />
                      </IconButton>
                      <Typography variant="h6" sx={{ mx: 2 }}>
                        {format(startDate, 'MMM dd, yyyy')} - {format(addDays(startDate, 6), 'MMM dd, yyyy')}
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
                        This Week
                      </Button>
                      <Button
                        variant={isSameDay(startDate, startOfWeek(addDays(new Date(), 7), { weekStartsOn: 1 })) ? "contained" : "outlined"}
                        onClick={() => setSelectedDate(addDays(new Date(), 7))}
                      >
                        Next Week
                      </Button>
                    </Box>
                    <Grid container spacing={1}>
                      {weekDays.map((day, index) => (
                        <Grid item xs key={index}>
                          <Paper
                            sx={{
                              p: 1,
                              textAlign: 'center',
                              backgroundColor: isSameDay(weekDates[index], selectedDate)
                                ? 'primary.light'
                                : 'background.paper',
                              cursor: 'pointer',
                            }}
                            onClick={() => setSelectedDate(weekDates[index])}
                          >
                            <Typography variant="subtitle2">
                              {day}
                            </Typography>
                            <Typography variant="body2">
                              {format(weekDates[index], 'd')}
                            </Typography>
                            {renderDaySchedule(weekDates[index])}
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  {/* Empty Grid item to maintain layout */}
                </Grid>
              </Grid>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>

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
          <Button onClick={handleProfileClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Set Available Time Dialog */}
      <Dialog 
        open={openSchedule} 
        onClose={handleScheduleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Set Available Time</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" sx={{ mt: 2, mb: 3 }}>
            Select available time slots (30 minutes each)
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(scheduleSettings.weekdays).map(([day, slots]) => (
              <Grid item xs={12} key={day}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    {day === 'monday' ? 'Monday' :
                     day === 'tuesday' ? 'Tuesday' :
                     day === 'wednesday' ? 'Wednesday' :
                     day === 'thursday' ? 'Thursday' :
                     day === 'friday' ? 'Friday' :
                     day === 'saturday' ? 'Saturday' : 'Sunday'}
                  </Typography>
                  <Grid container spacing={1}>
                    {slots.map((slot, index) => (
                      <Grid item xs={6} sm={4} md={3} key={index}>
                        <Box
                          onClick={() => handleTimeSlotToggle(day, index)}
                        >
                          {renderTimeSlot(slot)}
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleScheduleClose}>Cancel</Button>
          <Button onClick={handleSaveSchedule} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TeacherDashboard; 