import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  Book as BookIcon,
  AccessTime as AccessTimeIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';

const Courses = () => {
  // 模拟课程数据
  const courses = [
    {
      id: 1,
      name: '高等数学',
      teacher: '张老师',
      schedule: '周一 1-2节',
      location: '教学楼A101',
      progress: 60,
      status: '进行中',
    },
    {
      id: 2,
      name: '程序设计',
      teacher: '李老师',
      schedule: '周二 3-4节',
      location: '实验楼B203',
      progress: 45,
      status: '进行中',
    },
    {
      id: 3,
      name: '大学英语',
      teacher: '王老师',
      schedule: '周三 5-6节',
      location: '外语楼C305',
      progress: 75,
      status: '进行中',
    },
    {
      id: 4,
      name: '物理实验',
      teacher: '刘老师',
      schedule: '周四 7-8节',
      location: '物理楼D407',
      progress: 30,
      status: '进行中',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        我的课程
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <BookIcon sx={{ mr: 1 }} />
                  <Typography variant="h6" component="div">
                    {course.name}
                  </Typography>
                </Box>
                <Typography color="text.secondary" gutterBottom>
                  授课教师：{course.teacher}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AccessTimeIcon sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="body2">
                    {course.schedule}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationIcon sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="body2">
                    {course.location}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" sx={{ mr: 1 }}>
                    课程进度：
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={course.progress}
                    sx={{ flexGrow: 1, mr: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {course.progress}%
                  </Typography>
                </Box>
                <Chip
                  label={course.status}
                  color="primary"
                  size="small"
                  sx={{ mt: 1 }}
                />
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  查看详情
                </Button>
                <Button size="small" color="primary">
                  进入课程
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Courses; 