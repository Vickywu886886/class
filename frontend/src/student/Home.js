import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Book as BookIcon,
  Assignment as AssignmentIcon,
  Grade as GradeIcon,
  Event as EventIcon,
} from '@mui/icons-material';

const Home = () => {
  // 模拟数据
  const upcomingEvents = [
    { id: 1, title: '高等数学期中考试', date: '2024-04-15', type: 'exam' },
    { id: 2, title: '程序设计作业提交', date: '2024-04-20', type: 'assignment' },
    { id: 3, title: '英语口语考试', date: '2024-04-25', type: 'exam' },
  ];

  const recentCourses = [
    { id: 1, name: '高等数学', teacher: '张老师', progress: 60 },
    { id: 2, name: '程序设计', teacher: '李老师', progress: 45 },
    { id: 3, name: '大学英语', teacher: '王老师', progress: 75 },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* 欢迎信息 */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h4" gutterBottom>
              欢迎回来，同学！
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              今天是 {new Date().toLocaleDateString()}
            </Typography>
          </Paper>
        </Grid>

        {/* 课程概览 */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              我的课程
            </Typography>
            <List>
              {recentCourses.map((course) => (
                <React.Fragment key={course.id}>
                  <ListItem>
                    <ListItemIcon>
                      <BookIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={course.name}
                      secondary={`授课教师：${course.teacher}`}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* 待办事项 */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              待办事项
            </Typography>
            <List>
              {upcomingEvents.map((event) => (
                <React.Fragment key={event.id}>
                  <ListItem>
                    <ListItemIcon>
                      {event.type === 'exam' ? <GradeIcon /> : <AssignmentIcon />}
                    </ListItemIcon>
                    <ListItemText
                      primary={event.title}
                      secondary={event.date}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home; 