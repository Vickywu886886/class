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
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  CalendarToday as CalendarIcon,
  LibraryBooks as LibraryBooksIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Assessment as AssessmentIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  PersonAdd as PersonAddIcon,
  Assignment as AssignmentIcon,
  Message as MessageIcon,
  Security as SecurityIcon,
  BarChart as BarChartIcon,
} from '@mui/icons-material';

// 仪表板卡片组件
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

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    language: '',
    status: 'active'
  });

  // Mock data
  const dashboardStats = {
    totalTeachers: 12,
    totalStudents: 45,
    totalClasses: 8,
    activeTeachers: 10,
    activeStudents: 42,
    upcomingClasses: 15,
    totalRevenue: 150000,
    averageClassPrice: 2000,
    totalHours: 1200,
    remainingHours: 800
  };

  const teachers = [
    { id: 1, username: 'teacher001', name: '李老师', language: '英语', status: 'active' },
    { id: 2, username: 'teacher002', name: '王老师', language: '法语', status: 'active' },
    { id: 3, username: 'teacher003', name: '张老师', language: '西语', status: 'inactive' },
  ];

  const students = [
    { 
      id: 1, 
      username: 'student001', 
      name: '张三', 
      grade: '一年级',
      status: 'active',
      totalCourses: 3,
      totalAmount: 6000,
      remainingHours: 20
    },
    { 
      id: 2, 
      username: 'student002', 
      name: '李四', 
      grade: '二年级',
      status: 'active',
      totalCourses: 2,
      totalAmount: 4000,
      remainingHours: 15
    },
    { 
      id: 3, 
      username: 'student003', 
      name: '王五', 
      grade: '三年级',
      status: 'inactive',
      totalCourses: 1,
      totalAmount: 2000,
      remainingHours: 5
    },
  ];

  const upcomingClasses = [
    { id: 1, teacher: '李老师', student: '张三', time: '14:00-15:00', language: '英语' },
    { id: 2, teacher: '王老师', student: '李四', time: '15:00-16:00', language: '法语' },
    { id: 3, teacher: '张老师', student: '王五', time: '16:00-17:00', language: '西语' },
  ];

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleOpenDialog = (type) => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogType('');
    setFormData({
      username: '',
      password: '',
      name: '',
      language: '',
      status: 'active'
    });
  };

  const handleFormChange = (field) => (event) => {
    const value = event.target.value;
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      // 如果修改了用户名，自动设置密码为用户名后6位
      if (field === 'username' && value.length >= 6) {
        newData.password = value.slice(-6);
      }
      return newData;
    });
  };

  const handleSubmit = () => {
    // 这里应该调用后端API保存数据
    console.log('提交的数据:', formData);
    handleCloseDialog();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* 顶部统计卡片 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <DashboardCard title="教师总数" icon="👨‍🏫">
            <Typography variant="h4" color="primary">
              {dashboardStats.totalTeachers}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              在职教师 {dashboardStats.activeTeachers} 人
            </Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardCard title="学员总数" icon="👨‍🎓">
            <Typography variant="h4" color="success.main">
              {dashboardStats.totalStudents}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              在读学员 {dashboardStats.activeStudents} 人
            </Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardCard title="总收入" icon="💰">
            <Typography variant="h4" color="warning.main">
              ¥{dashboardStats.totalRevenue}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              平均课时费 ¥{dashboardStats.averageClassPrice}
            </Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardCard title="课时统计" icon="⏱️">
            <Typography variant="h4" color="info.main">
              {dashboardStats.totalHours}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              剩余课时 {dashboardStats.remainingHours} 小时
            </Typography>
          </DashboardCard>
        </Grid>
      </Grid>

      {/* 主要内容区域 */}
      <Grid container spacing={3}>
        {/* 左侧导航 */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <List>
                <ListItem button selected={selectedTab === 0} onClick={() => setSelectedTab(0)}>
                  <ListItemIcon><PeopleIcon /></ListItemIcon>
                  <ListItemText primary="教师管理" />
                </ListItem>
                <ListItem button selected={selectedTab === 1} onClick={() => setSelectedTab(1)}>
                  <ListItemIcon><SchoolIcon /></ListItemIcon>
                  <ListItemText primary="学员管理" />
                </ListItem>
                <ListItem button selected={selectedTab === 2} onClick={() => setSelectedTab(2)}>
                  <ListItemIcon><CalendarIcon /></ListItemIcon>
                  <ListItemText primary="课表管理" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* 右侧内容 */}
        <Grid item xs={12} md={9}>
          <Card>
            <CardContent>
              {/* 教师管理内容 */}
              {selectedTab === 0 && (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6">教师管理</Typography>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => handleOpenDialog('addTeacher')}
                    >
                      添加教师
                    </Button>
                  </Box>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>账号</TableCell>
                          <TableCell>姓名</TableCell>
                          <TableCell>教学语言</TableCell>
                          <TableCell>状态</TableCell>
                          <TableCell>操作</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {teachers.map((teacher) => (
                          <TableRow key={teacher.id}>
                            <TableCell>{teacher.username}</TableCell>
                            <TableCell>{teacher.name}</TableCell>
                            <TableCell>{teacher.language}</TableCell>
                            <TableCell>
                              <Chip 
                                label={teacher.status === 'active' ? '在职' : '离职'} 
                                color={teacher.status === 'active' ? 'success' : 'error'} 
                                size="small" 
                              />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button
                                  size="small"
                                  startIcon={<EditIcon />}
                                  onClick={() => handleOpenDialog('editTeacher')}
                                >
                                  编辑
                                </Button>
                                <Button
                                  size="small"
                                  color="error"
                                  startIcon={<DeleteIcon />}
                                  onClick={() => handleOpenDialog('deleteTeacher')}
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

              {/* 学员管理内容 */}
              {selectedTab === 1 && (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6">学员管理</Typography>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => handleOpenDialog('addStudent')}
                    >
                      添加学员
                    </Button>
                  </Box>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>账号</TableCell>
                          <TableCell>姓名</TableCell>
                          <TableCell>年级</TableCell>
                          <TableCell>报课数量</TableCell>
                          <TableCell>报课金额</TableCell>
                          <TableCell>剩余课时</TableCell>
                          <TableCell>状态</TableCell>
                          <TableCell>操作</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {students.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>{student.username}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.grade}</TableCell>
                            <TableCell>{student.totalCourses}</TableCell>
                            <TableCell>¥{student.totalAmount}</TableCell>
                            <TableCell>{student.remainingHours}小时</TableCell>
                            <TableCell>
                              <Chip 
                                label={student.status === 'active' ? '在读' : '已结课'} 
                                color={student.status === 'active' ? 'success' : 'error'} 
                                size="small" 
                              />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button
                                  size="small"
                                  startIcon={<EditIcon />}
                                  onClick={() => handleOpenDialog('editStudent')}
                                >
                                  编辑
                                </Button>
                                <Button
                                  size="small"
                                  color="error"
                                  startIcon={<DeleteIcon />}
                                  onClick={() => handleOpenDialog('deleteStudent')}
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

              {/* 课表管理内容 */}
              {selectedTab === 2 && (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6">课表管理</Typography>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => handleOpenDialog('addSchedule')}
                    >
                      添加课程
                    </Button>
                  </Box>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>时间</TableCell>
                          <TableCell>教师</TableCell>
                          <TableCell>学员</TableCell>
                          <TableCell>课程</TableCell>
                          <TableCell>状态</TableCell>
                          <TableCell>操作</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {upcomingClasses.map((class_) => (
                          <TableRow key={class_.id}>
                            <TableCell>{class_.time}</TableCell>
                            <TableCell>{class_.teacher}</TableCell>
                            <TableCell>{class_.student}</TableCell>
                            <TableCell>{class_.language}</TableCell>
                            <TableCell>
                              <Chip label="已确认" color="success" size="small" />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button
                                  size="small"
                                  startIcon={<EditIcon />}
                                  onClick={() => handleOpenDialog('editSchedule')}
                                >
                                  编辑
                                </Button>
                                <Button
                                  size="small"
                                  color="error"
                                  startIcon={<DeleteIcon />}
                                  onClick={() => handleOpenDialog('deleteSchedule')}
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 通用对话框 */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'addTeacher' ? '添加教师' : 
           dialogType === 'addStudent' ? '添加学员' : 
           dialogType === 'addSchedule' ? '添加课程' : 
           dialogType === 'editSchedule' ? '编辑课程' : 
           dialogType === 'deleteSchedule' ? '删除课程' : '其他操作'}
        </DialogTitle>
        <DialogContent>
          {dialogType === 'addTeacher' && (
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="教师账号"
                value={formData.username}
                onChange={handleFormChange('username')}
                margin="normal"
                required
                helperText="密码默认为账号后6位"
              />
              <TextField
                fullWidth
                label="密码"
                value={formData.password}
                onChange={handleFormChange('password')}
                margin="normal"
                required
                type="password"
              />
              <TextField
                fullWidth
                label="姓名"
                value={formData.name}
                onChange={handleFormChange('name')}
                margin="normal"
                required
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>教学语言</InputLabel>
                <Select
                  value={formData.language}
                  onChange={handleFormChange('language')}
                  label="教学语言"
                  required
                >
                  <MenuItem value="英语">英语</MenuItem>
                  <MenuItem value="法语">法语</MenuItem>
                  <MenuItem value="西语">西语</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>状态</InputLabel>
                <Select
                  value={formData.status}
                  onChange={handleFormChange('status')}
                  label="状态"
                >
                  <MenuItem value="active">在职</MenuItem>
                  <MenuItem value="inactive">离职</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
          {dialogType === 'addStudent' && (
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="学员账号"
                value={formData.username}
                onChange={handleFormChange('username')}
                margin="normal"
                required
                helperText="密码默认为账号后6位"
              />
              <TextField
                fullWidth
                label="密码"
                value={formData.password}
                onChange={handleFormChange('password')}
                margin="normal"
                required
                type="password"
              />
              <TextField
                fullWidth
                label="姓名"
                value={formData.name}
                onChange={handleFormChange('name')}
                margin="normal"
                required
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>年级</InputLabel>
                <Select
                  value={formData.grade}
                  onChange={handleFormChange('grade')}
                  label="年级"
                  required
                >
                  <MenuItem value="一年级">一年级</MenuItem>
                  <MenuItem value="二年级">二年级</MenuItem>
                  <MenuItem value="三年级">三年级</MenuItem>
                  <MenuItem value="四年级">四年级</MenuItem>
                  <MenuItem value="五年级">五年级</MenuItem>
                  <MenuItem value="六年级">六年级</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>状态</InputLabel>
                <Select
                  value={formData.status}
                  onChange={handleFormChange('status')}
                  label="状态"
                >
                  <MenuItem value="active">在读</MenuItem>
                  <MenuItem value="inactive">已结课</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button variant="contained" onClick={handleSubmit}>
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard; 