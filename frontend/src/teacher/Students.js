import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tabs,
  Tab,
  Divider,
  LinearProgress,
  TextareaAutosize,
} from '@mui/material';
import TeacherNav from '../components/TeacherNav';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import AssessmentIcon from '@mui/icons-material/Assessment';
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BookIcon from '@mui/icons-material/Book';
import NoteIcon from '@mui/icons-material/Note';
import SendIcon from '@mui/icons-material/Send';
import StarIcon from '@mui/icons-material/Star';

const TeacherStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [messageText, setMessageText] = useState('');

  // Mock student data
  const students = [
    {
      id: 1,
      name: 'Zhang Xiaoming',
      avatar: null,
      level: 'Intermediate',
      attendance: 95,
      progress: 85,
      lastClass: '2024-03-15',
      nextClass: '2024-03-22',
      assignments: [
        { id: 1, title: 'IELTS Writing Task 1', status: 'completed', score: 7.5 },
        { id: 2, title: 'Speaking Practice', status: 'pending', score: null },
      ],
      notes: [
        { id: 1, date: '2024-03-15', content: 'Pronunciation has improved significantly, but needs to strengthen grammar' },
        { id: 2, date: '2024-03-10', content: 'Writing structure is clear, but vocabulary needs improvement' },
      ],
      learningProgress: {
        speaking: 80,
        writing: 75,
        reading: 85,
        listening: 70,
      },
      recentMessages: [
        { id: 1, date: '2024-03-15', content: 'Teacher, I completed my homework', type: 'received' },
        { id: 2, date: '2024-03-15', content: 'Well done, keep it up!', type: 'sent' },
      ],
    },
    {
      id: 2,
      name: 'Li Xiaohua',
      avatar: null,
      level: 'Beginner',
      attendance: 88,
      progress: 75,
      lastClass: '2024-03-14',
      nextClass: '2024-03-21',
      assignments: [
        { id: 1, title: 'Grammar Exercise', status: 'completed', score: 85 },
        { id: 2, title: 'Vocabulary Test', status: 'pending', score: null },
      ],
      notes: [
        { id: 1, date: '2024-03-14', content: 'Basic grammar is good, needs more speaking practice' },
      ],
      learningProgress: {
        speaking: 65,
        writing: 70,
        reading: 75,
        listening: 60,
      },
      recentMessages: [
        { id: 1, date: '2024-03-14', content: 'Can you help me with pronunciation?', type: 'received' },
        { id: 2, date: '2024-03-14', content: 'Of course, we can practice in the next class', type: 'sent' },
      ],
    },
    {
      id: 3,
      name: 'Wang Xiaohong',
      avatar: null,
      level: 'Advanced',
      attendance: 92,
      progress: 90,
      lastClass: '2024-03-16',
      nextClass: '2024-03-23',
      assignments: [
        { id: 1, title: 'Business Presentation', status: 'completed', score: 95 },
        { id: 2, title: 'Email Writing', status: 'completed', score: 88 },
      ],
      notes: [
        { id: 1, date: '2024-03-16', content: 'Excellent business English expression ability, recommend advanced certification' },
      ],
      learningProgress: {
        speaking: 90,
        writing: 85,
        reading: 95,
        listening: 88,
      },
      recentMessages: [
        { id: 1, date: '2024-03-16', content: 'Thank you for the recommendation!', type: 'received' },
      ],
    },
  ];

  const stats = [
    { title: 'Total Students', value: students.length, icon: <GroupIcon sx={{ color: '#4caf50' }} /> },
    { title: 'Average Attendance Rate', value: '92%', icon: <CheckCircleIcon sx={{ color: '#ff9800' }} /> },
    { title: 'Average Progress', value: '83%', icon: <TrendingUpIcon sx={{ color: '#f44336' }} /> },
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setOpenDialog(true);
    setCurrentTab(0);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedStudent(null);
    setMessageText('');
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // 在实际应用中，这里会调用API发送消息
      console.log('Sending message to', selectedStudent.name, ':', messageText);
      setMessageText('');
    }
  };

  const getProgressColor = (value) => {
    if (value >= 80) return '#4caf50';
    if (value >= 60) return '#ff9800';
    return '#f44336';
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <TeacherNav />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* 搜索栏 */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search students..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#4caf50' }} />
                  </InputAdornment>
                ),
                sx: {
                  bgcolor: '#fff',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(76, 175, 80, 0.23)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4caf50',
                  },
                }
              }}
            />
          </Grid>

          {/* 统计卡片 */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {stats.map((stat, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Card sx={{
                    bgcolor: '#fff',
                    borderRadius: 2,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    <CardContent sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <Box>
                        <Typography variant="h4" sx={{ color: '#2D5A27', fontWeight: 600 }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          {stat.title}
                        </Typography>
                      </Box>
                      {stat.icon}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* 学生列表 */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <List>
                {filteredStudents.map((student) => (
                  <ListItem
                    key={student.id}
                    sx={{
                      bgcolor: '#fff',
                      borderRadius: 1,
                      mb: 1,
                      '&:hover': { bgcolor: 'rgba(76, 175, 80, 0.08)' }
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: '#4caf50' }}>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {student.name}
                          <Chip
                            label={student.level}
                            size="small"
                            sx={{
                              bgcolor: 'rgba(76, 175, 80, 0.1)',
                              color: '#2D5A27',
                              borderRadius: '4px'
                            }}
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            Next class: {student.nextClass}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                            <Typography variant="body2" color="textSecondary">
                              Learning Progress:
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={student.progress}
                              sx={{
                                width: 100,
                                height: 6,
                                borderRadius: 3,
                                bgcolor: 'rgba(76, 175, 80, 0.1)',
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: getProgressColor(student.progress),
                                },
                              }}
                            />
                            <Typography variant="body2" color="textSecondary">
                              {student.progress}%
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        startIcon={<MessageIcon />}
                        onClick={() => {
                          handleStudentClick(student);
                          setCurrentTab(2);
                        }}
                        sx={{
                          color: '#4caf50',
                          '&:hover': { bgcolor: 'rgba(76, 175, 80, 0.08)' }
                        }}
                      >
                        Message
                      </Button>
                      <Button
                        startIcon={<AssessmentIcon />}
                        onClick={() => handleStudentClick(student)}
                        sx={{
                          color: '#4caf50',
                          '&:hover': { bgcolor: 'rgba(76, 175, 80, 0.08)' }
                        }}
                      >
                        Details
                      </Button>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* 学生详情对话框 */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider', pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: '#4caf50', width: 56, height: 56 }}>
              <PersonIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ color: '#2D5A27' }}>
                {selectedStudent?.name}
              </Typography>
              <Chip
                label={selectedStudent?.level}
                size="small"
                sx={{
                  bgcolor: 'rgba(76, 175, 80, 0.1)',
                  color: '#2D5A27',
                  mt: 0.5
                }}
              />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                minHeight: 48,
              },
              '& .Mui-selected': {
                color: '#4caf50',
              },
              '& .MuiTabs-indicator': {
                bgcolor: '#4caf50',
              },
            }}
          >
            <Tab icon={<AssessmentIcon />} label="Learning Progress" />
            <Tab icon={<NoteIcon />} label="Class Notes" />
            <Tab icon={<MessageIcon />} label="Message" />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {currentTab === 0 && selectedStudent && (
              <Grid container spacing={3}>
                {/* 基本信息 */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ color: '#2D5A27', mb: 2 }}>
                    Learning Data
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                      <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ color: '#4caf50' }}>
                          {selectedStudent.attendance}%
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Attendance Rate
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ color: '#4caf50' }}>
                          {selectedStudent.assignments.length}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Assignment Number
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ color: '#4caf50' }}>
                          {selectedStudent.assignments.filter(a => a.status === 'completed').length}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Completed
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ color: '#4caf50' }}>
                          {selectedStudent.progress}%
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Total Progress
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>

                {/* 技能进度 */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ color: '#2D5A27', mb: 2 }}>
                    Skill Progress
                  </Typography>
                  <Grid container spacing={2}>
                    {Object.entries(selectedStudent.learningProgress).map(([skill, progress]) => (
                      <Grid item xs={12} sm={6} key={skill}>
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                              {skill}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {progress}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              bgcolor: 'rgba(76, 175, 80, 0.1)',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: getProgressColor(progress),
                              },
                            }}
                          />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                {/* 作业列表 */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ color: '#2D5A27', mb: 2 }}>
                    Assignment Completion
                  </Typography>
                  <List>
                    {selectedStudent.assignments.map((assignment) => (
                      <ListItem
                        key={assignment.id}
                        sx={{
                          bgcolor: 'background.paper',
                          borderRadius: 1,
                          mb: 1,
                        }}
                      >
                        <ListItemIcon>
                          <AssignmentIcon sx={{ color: '#4caf50' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={assignment.title}
                          secondary={
                            <Chip
                              label={assignment.status === 'completed' ? 'Completed' : 'In Progress'}
                              size="small"
                              sx={{
                                bgcolor: assignment.status === 'completed' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 152, 0, 0.1)',
                                color: assignment.status === 'completed' ? '#2D5A27' : '#f57c00',
                                mt: 0.5
                              }}
                            />
                          }
                        />
                        {assignment.score && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <StarIcon sx={{ color: '#ffc107', fontSize: 20 }} />
                            <Typography variant="body2" sx={{ color: '#2D5A27' }}>
                              {assignment.score}
                            </Typography>
                          </Box>
                        )}
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            )}

            {currentTab === 1 && selectedStudent && (
              <List>
                {selectedStudent.notes.map((note) => (
                  <ListItem
                    key={note.id}
                    sx={{
                      bgcolor: 'background.paper',
                      borderRadius: 1,
                      mb: 1,
                    }}
                  >
                    <ListItemIcon>
                      <BookIcon sx={{ color: '#4caf50' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={note.content}
                      secondary={note.date}
                    />
                  </ListItem>
                ))}
              </List>
            )}

            {currentTab === 2 && selectedStudent && (
              <Box>
                <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                  {selectedStudent.recentMessages.map((message) => (
                    <ListItem
                      key={message.id}
                      sx={{
                        flexDirection: message.type === 'sent' ? 'row-reverse' : 'row',
                      }}
                    >
                      <Box
                        sx={{
                          bgcolor: message.type === 'sent' ? '#4caf50' : '#f5f5f5',
                          color: message.type === 'sent' ? 'white' : 'inherit',
                          p: 1.5,
                          borderRadius: 2,
                          maxWidth: '70%',
                        }}
                      >
                        <Typography variant="body2">
                          {message.content}
                        </Typography>
                        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.8 }}>
                          {message.date}
                        </Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    placeholder="Enter message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderColor: 'rgba(76, 175, 80, 0.23)',
                        '&:hover': {
                          borderColor: '#4caf50',
                        },
                      },
                    }}
                  />
                  <IconButton
                    onClick={handleSendMessage}
                    sx={{
                      bgcolor: '#4caf50',
                      color: 'white',
                      '&:hover': { bgcolor: '#45a049' },
                    }}
                  >
                    <SendIcon />
                  </IconButton>
                </Box>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              color: '#666',
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeacherStudents; 