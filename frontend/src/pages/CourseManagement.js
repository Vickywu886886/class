import React, { useState } from 'react';
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
  Avatar,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tab,
  Tabs,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Schedule as ScheduleIcon,
  Assignment as AssignmentIcon,
  Notifications as NotificationsIcon,
  EmojiEvents as EmojiEventsIcon,
  Book as BookIcon,
} from '@mui/icons-material';

// Mock data
const courses = [
  {
    id: 1,
    name: '英语口语课程',
    teacher: '李老师',
    student: '张三',
    date: '2024-03-20',
    time: '14:00-15:00',
    status: 'confirmed',
    classroomId: '123456',
    classInLink: 'https://classin.com/join/123456',
  },
  {
    id: 2,
    name: '阅读理解课程',
    teacher: '王老师',
    student: '李四',
    date: '2024-03-21',
    time: '15:00-16:00',
    status: 'pending',
    classroomId: null,
    classInLink: null,
  },
  {
    id: 3,
    name: '写作课程',
    teacher: '张老师',
    student: '王五',
    date: '2024-03-22',
    time: '16:00-17:00',
    status: 'confirmed',
    classroomId: '789012',
    classInLink: 'https://classin.com/join/789012',
  },
];

const CourseManagement = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    teacher: '',
    student: '',
    date: '',
    time: '',
    status: 'pending',
    classroomId: '',
  });

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleOpenDialog = (type, course = null) => {
    setDialogType(type);
    if (course) {
      setSelectedCourse(course);
      setFormData({
        name: course.name,
        teacher: course.teacher,
        student: course.student,
        date: course.date,
        time: course.time,
        status: course.status,
        classroomId: course.classroomId || '',
      });
    } else {
      setSelectedCourse(null);
      setFormData({
        name: '',
        teacher: '',
        student: '',
        date: '',
        time: '',
        status: 'pending',
        classroomId: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogType('');
    setSelectedCourse(null);
  };

  const handleFormChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return '已确认';
      case 'pending':
        return '待确认';
      case 'cancelled':
        return '已取消';
      default:
        return status;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* 左侧导航 */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <List>
                <ListItem button selected={selectedTab === 0} onClick={() => setSelectedTab(0)}>
                  <ListItemIcon><CalendarIcon /></ListItemIcon>
                  <ListItemText primary="课程列表" />
                </ListItem>
                <ListItem button selected={selectedTab === 1} onClick={() => setSelectedTab(1)}>
                  <ListItemIcon><ScheduleIcon /></ListItemIcon>
                  <ListItemText primary="课程安排" />
                </ListItem>
                <ListItem button selected={selectedTab === 2} onClick={() => setSelectedTab(2)}>
                  <ListItemIcon><NotificationsIcon /></ListItemIcon>
                  <ListItemText primary="课程提醒" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* 右侧内容 */}
        <Grid item xs={12} md={9}>
          <Card>
            <CardContent>
              {/* 课程列表 */}
              {selectedTab === 0 && (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6">课程列表</Typography>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => handleOpenDialog('add')}
                    >
                      添加课程
                    </Button>
                  </Box>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>课程名称</TableCell>
                          <TableCell>教师</TableCell>
                          <TableCell>学生</TableCell>
                          <TableCell>日期</TableCell>
                          <TableCell>时间</TableCell>
                          <TableCell>状态</TableCell>
                          <TableCell>教室信息</TableCell>
                          <TableCell>操作</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {courses.map((course) => (
                          <TableRow key={course.id}>
                            <TableCell>{course.name}</TableCell>
                            <TableCell>{course.teacher}</TableCell>
                            <TableCell>{course.student}</TableCell>
                            <TableCell>{course.date}</TableCell>
                            <TableCell>{course.time}</TableCell>
                            <TableCell>
                              <Chip
                                label={getStatusText(course.status)}
                                color={getStatusColor(course.status)}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>
                              {course.classroomId ? (
                                <Box>
                                  <Typography variant="body2">
                                    教室号：{course.classroomId}
                                  </Typography>
                                  <Button
                                    size="small"
                                    href={course.classInLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    进入教室
                                  </Button>
                                </Box>
                              ) : (
                                <Typography variant="body2" color="text.secondary">
                                  待确认
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button
                                  size="small"
                                  startIcon={<EditIcon />}
                                  onClick={() => handleOpenDialog('edit', course)}
                                >
                                  编辑
                                </Button>
                                <Button
                                  size="small"
                                  color="error"
                                  startIcon={<DeleteIcon />}
                                  onClick={() => handleOpenDialog('delete', course)}
                                >
                                  删除
                                </Button>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}

              {/* 课程安排 */}
              {selectedTab === 1 && (
                <Typography variant="h6" color="text.secondary">
                  课程安排功能开发中...
                </Typography>
              )}

              {/* 课程提醒 */}
              {selectedTab === 2 && (
                <Typography variant="h6" color="text.secondary">
                  课程提醒功能开发中...
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 添加/编辑课程对话框 */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'add' ? '添加课程' : dialogType === 'edit' ? '编辑课程' : '删除课程'}
        </DialogTitle>
        <DialogContent>
          {dialogType !== 'delete' ? (
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="课程名称"
                value={formData.name}
                onChange={handleFormChange('name')}
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>教师</InputLabel>
                <Select
                  value={formData.teacher}
                  onChange={handleFormChange('teacher')}
                  label="教师"
                >
                  <MenuItem value="李老师">李老师</MenuItem>
                  <MenuItem value="王老师">王老师</MenuItem>
                  <MenuItem value="张老师">张老师</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>学生</InputLabel>
                <Select
                  value={formData.student}
                  onChange={handleFormChange('student')}
                  label="学生"
                >
                  <MenuItem value="张三">张三</MenuItem>
                  <MenuItem value="李四">李四</MenuItem>
                  <MenuItem value="王五">王五</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="日期"
                type="date"
                value={formData.date}
                onChange={handleFormChange('date')}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="时间"
                value={formData.time}
                onChange={handleFormChange('time')}
                margin="normal"
                placeholder="例如：14:00-15:00"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>状态</InputLabel>
                <Select
                  value={formData.status}
                  onChange={handleFormChange('status')}
                  label="状态"
                >
                  <MenuItem value="pending">待确认</MenuItem>
                  <MenuItem value="confirmed">已确认</MenuItem>
                  <MenuItem value="cancelled">已取消</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="ClassIn教室号"
                value={formData.classroomId}
                onChange={handleFormChange('classroomId')}
                margin="normal"
                placeholder="请输入ClassIn教室号"
              />
            </Box>
          ) : (
            <Typography>
              确定要删除课程 {selectedCourse?.name} 吗？此操作不可撤销。
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button
            variant="contained"
            color={dialogType === 'delete' ? 'error' : 'primary'}
            onClick={handleCloseDialog}
          >
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CourseManagement; 