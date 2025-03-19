import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Chip,
  Divider,
  LinearProgress,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Avatar
} from '@mui/material';
import {
  Target as TargetIcon,
  Book as BookIcon,
  Assignment as AssignmentIcon,
  LibraryBooks as LibraryBooksIcon,
  Quiz as QuizIcon,
  EmojiEvents as EmojiEventsIcon,
  Feedback as FeedbackIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon,
  Star as StarIcon,
  ExitToApp as LogoutIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const DashboardCard = ({ title, icon, children, onClick }) => (
  <Card 
    sx={{ 
      height: '100%',
      cursor: 'pointer',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
      }
    }}
    onClick={onClick}
  >
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" sx={{ mr: 1 }}>{icon}</Typography>
        <Typography variant="h6">{title}</Typography>
      </Box>
      {children}
    </CardContent>
  </Card>
);

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    if (!userInfo || userInfo.role !== 'student') {
      navigate('/login');
      return;
    }
    setUser(userInfo);
  }, [navigate]);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Mock data
  const learningPlan = {
    currentLevel: 'Level 3',
    nextLevel: 'Level 4',
    progress: 75,
    tasks: [
      { id: 1, title: '完成口语练习', completed: true },
      { id: 2, title: '阅读文章', completed: false },
      { id: 3, title: '词汇测试', completed: false },
    ],
  };

  const courseResources = [
    { id: 1, title: '新概念英语第二册', type: '教材', lastAccessed: '2024-03-19' },
    { id: 2, title: '口语练习材料', type: '音频', lastAccessed: '2024-03-18' },
    { id: 3, title: '阅读理解技巧', type: '视频', lastAccessed: '2024-03-17' },
  ];

  const homework = [
    { id: 1, title: 'Unit 5 课后练习', dueDate: '2024-03-25', status: 'pending' },
    { id: 2, title: '口语作业', dueDate: '2024-03-23', status: 'completed' },
    { id: 3, title: '阅读理解', dueDate: '2024-03-24', status: 'pending' },
  ];

  const vocabulary = {
    total: 1000,
    mastered: 750,
    recent: [
      { word: 'appreciate', meaning: '感激，欣赏', mastered: true },
      { word: 'determine', meaning: '决定，确定', mastered: false },
      { word: 'essential', meaning: '必要的，本质的', mastered: true },
    ],
  };

  const assessments = [
    { id: 1, title: '期中考试', date: '2024-04-15', type: '考试' },
    { id: 2, title: '口语测评', date: '2024-03-30', type: '测评' },
    { id: 3, title: '词汇自测', date: '2024-03-28', type: '自测' },
  ];

  const achievements = [
    { id: 1, title: '连续学习30天', icon: '🔥', unlocked: true },
    { id: 2, title: '完成100个单词', icon: '📚', unlocked: true },
    { id: 3, title: '口语达人', icon: '🎤', unlocked: false },
  ];

  const feedback = [
    { id: 1, teacher: '李老师', content: '发音准确，表达流畅', date: '2024-03-19' },
    { id: 2, teacher: '王老师', content: '阅读理解能力有提升', date: '2024-03-18' },
  ];

  if (!user) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <span>加载中...</span>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4 
      }}>
        <Typography variant="h4" sx={{ color: '#2D5A27', fontWeight: 600 }}>
          学生仪表盘
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* 学习计划 */}
        <Grid item xs={12} md={6}>
          <DashboardCard title="学习计划" icon="🎯">
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                当前等级：{learningPlan.currentLevel}
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={learningPlan.progress} 
                sx={{ mb: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                距离下一等级：{learningPlan.progress}%
              </Typography>
            </Box>
            <List>
              {learningPlan.tasks.map((task) => (
                <ListItem key={task.id}>
                  <ListItemIcon>
                    {task.completed ? <CheckCircleIcon color="success" /> : <AccessTimeIcon />}
                  </ListItemIcon>
                  <ListItemText primary={task.title} />
                  <Chip 
                    label={task.completed ? '已完成' : '待完成'} 
                    color={task.completed ? 'success' : 'default'} 
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </DashboardCard>
        </Grid>

        {/* 课程资源 */}
        <Grid item xs={12} md={6}>
          <DashboardCard title="课程资源" icon="📚">
            <List>
              {courseResources.map((resource) => (
                <ListItem key={resource.id}>
                  <ListItemIcon>
                    <BookIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={resource.title}
                    secondary={`${resource.type} · 最近访问：${resource.lastAccessed}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end">
                      <ArrowForwardIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </DashboardCard>
        </Grid>

        {/* 我的作业 */}
        <Grid item xs={12} md={6}>
          <DashboardCard title="我的作业" icon="📝">
            <List>
              {homework.map((item) => (
                <ListItem key={item.id}>
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.title}
                    secondary={`截止日期：${item.dueDate}`}
                  />
                  <Chip 
                    label={item.status === 'completed' ? '已完成' : '待完成'} 
                    color={item.status === 'completed' ? 'success' : 'warning'} 
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </DashboardCard>
        </Grid>

        {/* 词汇库 */}
        <Grid item xs={12} md={6}>
          <DashboardCard title="词汇库" icon="📖">
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                词汇掌握进度
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={(vocabulary.mastered / vocabulary.total) * 100} 
                sx={{ mb: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                已掌握 {vocabulary.mastered}/{vocabulary.total} 个单词
              </Typography>
            </Box>
            <List>
              {vocabulary.recent.map((word, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <StarIcon color={word.mastered ? 'primary' : 'disabled'} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={word.word}
                    secondary={word.meaning}
                  />
                </ListItem>
              ))}
            </List>
          </DashboardCard>
        </Grid>

        {/* 测评与自测 */}
        <Grid item xs={12} md={6}>
          <DashboardCard title="测评与自测" icon="✅">
            <List>
              {assessments.map((assessment) => (
                <ListItem key={assessment.id}>
                  <ListItemIcon>
                    <QuizIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={assessment.title}
                    secondary={`${assessment.type} · 日期：${assessment.date}`}
                  />
                  <ListItemSecondaryAction>
                    <Button variant="outlined" size="small">
                      开始
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </DashboardCard>
        </Grid>

        {/* 成就与奖励 */}
        <Grid item xs={12} md={6}>
          <DashboardCard title="成就与奖励" icon="🏅">
            <List>
              {achievements.map((achievement) => (
                <ListItem key={achievement.id}>
                  <ListItemIcon>
                    <Typography variant="h5">{achievement.icon}</Typography>
                  </ListItemIcon>
                  <ListItemText primary={achievement.title} />
                  <Chip 
                    label={achievement.unlocked ? '已解锁' : '未解锁'} 
                    color={achievement.unlocked ? 'success' : 'default'} 
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </DashboardCard>
        </Grid>

        {/* 学习反馈 */}
        <Grid item xs={12} md={6}>
          <DashboardCard title="学习反馈" icon="🗒️">
            <List>
              {feedback.map((item) => (
                <ListItem key={item.id}>
                  <ListItemIcon>
                    <FeedbackIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.content}
                    secondary={`${item.teacher} · ${item.date}`}
                  />
                </ListItem>
              ))}
            </List>
          </DashboardCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StudentDashboard; 