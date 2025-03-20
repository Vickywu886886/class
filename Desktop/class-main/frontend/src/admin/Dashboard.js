import React, { useState, useEffect } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Container,
  Paper,
  Grid,
  Menu,
  MenuItem,
  Divider,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Chip,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  FormControl,
  InputLabel,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material';
import {
  People as PeopleIcon,
  Class as ClassIcon,
  Schedule as ScheduleIcon,
  ShoppingCart as OrderIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Book as BookIcon,
  CalendarToday as CalendarIcon,
  Assessment as AssessmentIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  TrendingUp as TrendingUpIcon,
  Group as GroupIcon,
  Payment as PaymentIcon,
  Notifications as NotificationsIcon,
  LockReset as LockResetIcon,
  UploadFile as UploadFileIcon
} from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(searchParams.get('menu') || 'staff');
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [staffForm, setStaffForm] = useState({
    name: '',
    username: '',
    role: 'admin',
    email: '',
    phone: '',
    password: ''
  });
  const [resetPasswordForm, setResetPasswordForm] = useState({
    password: '',
    confirmPassword: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [staffList, setStaffList] = useState([
    { id: 1, name: '张老师', username: 'teacher1', role: 'teacher', status: 'active', lastLogin: '2024-03-20 10:30' },
    { id: 2, name: '李教务', username: 'staff1', role: 'staff', status: 'active', lastLogin: '2024-03-20 09:15' }
  ]);
  const [studentList, setStudentList] = useState([
    { 
      id: 1, 
      name: '王小明', 
      username: 'student1', 
      grade: '三年级', 
      parent: '王先生', 
      status: 'active', 
      lastLogin: '2024-03-19 15:20',
      totalHours: 120,
      remainingHours: 45,
      courses: ['英语口语', '数学思维']
    },
    { 
      id: 2, 
      name: '李小红', 
      username: 'student2', 
      grade: '四年级', 
      parent: '李女士', 
      status: 'active', 
      lastLogin: '2024-03-19 16:45',
      totalHours: 150,
      remainingHours: 80,
      courses: ['英语阅读', '数学提高']
    }
  ]);
  const [studentForm, setStudentForm] = useState({
    name: '',
    username: '',
    grade: '',
    parent: '',
    parentPhone: '',
    email: '',
    password: '',
    totalHours: 0,
    remainingHours: 0
  });

  // 添加购买课时表单状态
  const [purchaseHoursForm, setPurchaseHoursForm] = useState({
    hours: 0,
    amount: 0,
    paymentMethod: 'cash',
    notes: ''
  });

  // 课表管理相关状态
  const [scheduleView, setScheduleView] = useState('week');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedClassForGeneration, setSelectedClassForGeneration] = useState('');
  const [scheduleForm, setScheduleForm] = useState({
    classId: '',
    teacherId: '',
    subject: '',
    classroom: '',
    time: '',
    day: ''
  });

  // 添加订单相关状态
  const [orderList, setOrderList] = useState([
    {
      id: 1,
      orderNo: 'ORD2024032001',
      studentName: '王小明',
      courseName: '英语口语课程',
      hours: 20,
      amount: 2000,
      status: 'pending',
      createTime: '2024-03-20 10:30',
      paymentMethod: 'wechat',
      paymentTime: null,
      notes: '家长要求尽快安排课程'
    },
    {
      id: 2,
      orderNo: 'ORD2024032002',
      studentName: '李小红',
      courseName: '数学提高班',
      hours: 30,
      amount: 3000,
      status: 'paid',
      createTime: '2024-03-20 11:15',
      paymentMethod: 'alipay',
      paymentTime: '2024-03-20 11:20',
      notes: '已确认课程时间'
    }
  ]);

  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [orderSearchText, setOrderSearchText] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const drawerWidth = isMobile ? 200 : isTablet ? 240 : 280;

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    console.log('Current user info:', userInfo);
    
    if (!userInfo || userInfo.role !== 'admin') {
      console.log('No admin user found, redirecting to login');
      navigate('/login');
      return;
    }
    
    // 初始化管理员菜单项
    const adminMenuItems = [
      { label: '员工管理', value: 'staff' },
      { label: '学员管理', value: 'students' },
      { label: '班级管理', value: 'classes' },
      { label: '课表管理', value: 'schedule' },
      { label: '课程订单', value: 'orders' }
    ];
    
    // 更新用户信息，添加菜单项
    const updatedUserInfo = {
      ...userInfo,
      adminMenuItems
    };
    localStorage.setItem('user', JSON.stringify(updatedUserInfo));
    setUser(updatedUserInfo);
  }, [navigate]);

  useEffect(() => {
    const menu = searchParams.get('menu');
    if (menu) {
      setSelectedMenu(menu);
    }
  }, [searchParams]);

  useEffect(() => {
    console.log('Selected menu:', selectedMenu);
    console.log('Open dialog:', openDialog);
    console.log('Dialog type:', dialogType);
  }, [selectedMenu, openDialog, dialogType]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleMenuItemClick = (value) => {
    setSelectedMenu(value);
    navigate(`/admin/dashboard?menu=${value}`);
  };

  const getMenuIcon = (value) => {
    switch (value) {
      case 'staff':
        return <PeopleIcon />;
      case 'students':
        return <PersonIcon />;
      case 'classes':
        return <ClassIcon />;
      case 'schedule':
        return <ScheduleIcon />;
      case 'orders':
        return <OrderIcon />;
      default:
        return <PeopleIcon />;
    }
  };

  const renderContent = () => {
    console.log('Rendering content for menu:', selectedMenu);
    switch (selectedMenu) {
      case 'staff':
        return (
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                员工管理
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenDialog('addStaff')}
                  sx={{ 
                    color: '#2D5A27',
                    borderColor: '#2D5A27',
                    '&:hover': {
                      borderColor: '#2D5A27',
                      bgcolor: 'rgba(45, 90, 39, 0.04)'
                    }
                  }}
                >
                  添加员工
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenDialog('importStaff')}
                  sx={{ 
                    color: '#2D5A27',
                    borderColor: '#2D5A27',
                    '&:hover': {
                      borderColor: '#2D5A27',
                      bgcolor: 'rgba(45, 90, 39, 0.04)'
                    }
                  }}
                >
                  批量导入
                </Button>
              </Box>
            </Box>

            {/* 员工列表 */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>姓名</TableCell>
                    <TableCell>用户名</TableCell>
                    <TableCell>角色</TableCell>
                    <TableCell>状态</TableCell>
                    <TableCell>最后登录</TableCell>
                    <TableCell>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {staffList.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell>{staff.name}</TableCell>
                      <TableCell>{staff.username}</TableCell>
                      <TableCell>
                        <Chip 
                          label={staff.role} 
                          color={
                            staff.role === 'admin' ? 'error' :
                            staff.role === 'teacher' ? 'primary' :
                            'default'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={staff.status} 
                          color={staff.status === 'active' ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{staff.lastLogin}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenDialog('editStaff', staff)}
                            sx={{ color: '#2D5A27' }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenDialog('resetPassword', staff)}
                            sx={{ color: '#2D5A27' }}
                          >
                            <LockResetIcon />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenDialog('deleteStaff', staff)}
                            sx={{ color: '#f44336' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* 添加/编辑员工对话框 */}
            <Dialog 
              open={openDialog && (dialogType === 'addStaff' || dialogType === 'editStaff')} 
              onClose={handleCloseDialog}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>
                {dialogType === 'addStaff' ? '添加员工' : '编辑员工信息'}
              </DialogTitle>
              <DialogContent>
                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="姓名"
                    fullWidth
                    value={staffForm.name}
                    onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                  />
                  <TextField
                    label="用户名"
                    fullWidth
                    value={staffForm.username}
                    onChange={(e) => setStaffForm({ ...staffForm, username: e.target.value })}
                  />
                  <FormControl fullWidth>
                    <InputLabel>角色</InputLabel>
                    <Select
                      value={staffForm.role}
                      label="角色"
                      onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value })}
                    >
                      <MenuItem value="admin">管理员</MenuItem>
                      <MenuItem value="teacher">教师</MenuItem>
                      <MenuItem value="staff">教务</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label="邮箱"
                    fullWidth
                    type="email"
                    value={staffForm.email}
                    onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })}
                  />
                  <TextField
                    label="手机号"
                    fullWidth
                    value={staffForm.phone}
                    onChange={(e) => setStaffForm({ ...staffForm, phone: e.target.value })}
                  />
                  {dialogType === 'addStaff' && (
                    <TextField
                      label="初始密码"
                      fullWidth
                      type="password"
                      value={staffForm.password}
                      onChange={(e) => setStaffForm({ ...staffForm, password: e.target.value })}
                    />
                  )}
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>取消</Button>
                <Button 
                  variant="contained" 
                  onClick={handleSaveStaff}
                  sx={{ bgcolor: '#2D5A27', '&:hover': { bgcolor: '#1b3d17' } }}
                >
                  保存
                </Button>
              </DialogActions>
            </Dialog>

            {/* 重置密码对话框 */}
            <Dialog 
              open={openDialog && dialogType === 'resetPassword'} 
              onClose={handleCloseDialog}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>重置密码</DialogTitle>
              <DialogContent>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" gutterBottom>
                    确定要重置 {selectedItem?.name} 的密码吗？
                  </Typography>
                  <TextField
                    label="新密码"
                    fullWidth
                    type="password"
                    value={resetPasswordForm.password}
                    onChange={(e) => setResetPasswordForm({ ...resetPasswordForm, password: e.target.value })}
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    label="确认密码"
                    fullWidth
                    type="password"
                    value={resetPasswordForm.confirmPassword}
                    onChange={(e) => setResetPasswordForm({ ...resetPasswordForm, confirmPassword: e.target.value })}
                    sx={{ mt: 2 }}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>取消</Button>
                <Button 
                  variant="contained" 
                  onClick={handleResetPassword}
                  sx={{ bgcolor: '#2D5A27', '&:hover': { bgcolor: '#1b3d17' } }}
                >
                  确认重置
                </Button>
              </DialogActions>
            </Dialog>

            {/* 批量导入对话框 */}
            <Dialog 
              open={openDialog && dialogType === 'importStaff'} 
              onClose={handleCloseDialog}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>批量导入员工</DialogTitle>
              <DialogContent>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" gutterBottom>
                    请上传包含员工信息的Excel文件
                  </Typography>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<UploadFileIcon />}
                    sx={{ mt: 2 }}
                  >
                    选择文件
                    <input
                      type="file"
                      hidden
                      accept=".xlsx,.xls"
                      onChange={handleFileUpload}
                    />
                  </Button>
                  {selectedFile && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      已选择: {selectedFile.name}
                    </Typography>
                  )}
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>取消</Button>
                <Button 
                  variant="contained" 
                  onClick={handleImportStaff}
                  disabled={!selectedFile}
                  sx={{ bgcolor: '#2D5A27', '&:hover': { bgcolor: '#1b3d17' } }}
                >
                  开始导入
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
        );
      case 'students':
        return (
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                学员管理
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenDialog('addStudent')}
                  sx={{ 
                    color: '#2D5A27',
                    borderColor: '#2D5A27',
                    '&:hover': {
                      borderColor: '#2D5A27',
                      bgcolor: 'rgba(45, 90, 39, 0.04)'
                    }
                  }}
                >
                  添加学员
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<UploadFileIcon />}
                  onClick={() => handleOpenDialog('importStudents')}
                  sx={{ 
                    color: '#2D5A27',
                    borderColor: '#2D5A27',
                    '&:hover': {
                      borderColor: '#2D5A27',
                      bgcolor: 'rgba(45, 90, 39, 0.04)'
                    }
                  }}
                >
                  批量导入
                </Button>
              </Box>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>姓名</TableCell>
                    <TableCell>账号</TableCell>
                    <TableCell>年级</TableCell>
                    <TableCell>家长</TableCell>
                    <TableCell>总课时</TableCell>
                    <TableCell>剩余课时</TableCell>
                    <TableCell>在读课程</TableCell>
                    <TableCell>状态</TableCell>
                    <TableCell>最后登录</TableCell>
                    <TableCell>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentList.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.username}</TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell>{student.parent}</TableCell>
                      <TableCell>{student.totalHours}</TableCell>
                      <TableCell>{student.remainingHours}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          {student.courses.map((course, index) => (
                            <Chip 
                              key={index}
                              label={course}
                              size="small"
                              sx={{ 
                                bgcolor: 'rgba(45, 90, 39, 0.1)',
                                color: '#2D5A27',
                                '&:hover': {
                                  bgcolor: 'rgba(45, 90, 39, 0.2)'
                                }
                              }}
                            />
                          ))}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={student.status} 
                          color={student.status === 'active' ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{student.lastLogin}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenDialog('purchaseHours', student)}
                            sx={{ color: '#2D5A27' }}
                          >
                            <PaymentIcon />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenDialog('editStudent', student)}
                            sx={{ color: '#2D5A27' }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenDialog('resetStudentPassword', student)}
                            sx={{ color: '#2D5A27' }}
                          >
                            <LockResetIcon />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenDialog('deleteStudent', student)}
                            sx={{ color: '#f44336' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* 添加/编辑学员对话框 */}
            <Dialog 
              open={openDialog && (dialogType === 'addStudent' || dialogType === 'editStudent')} 
              onClose={handleCloseDialog}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>
                {dialogType === 'addStudent' ? '添加学员' : '编辑学员信息'}
              </DialogTitle>
              <DialogContent>
                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="姓名"
                    fullWidth
                    value={studentForm.name}
                    onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                  />
                  <TextField
                    label="账号"
                    fullWidth
                    value={studentForm.username}
                    onChange={(e) => setStudentForm({ ...studentForm, username: e.target.value })}
                  />
                  <TextField
                    label="年级"
                    fullWidth
                    value={studentForm.grade}
                    onChange={(e) => setStudentForm({ ...studentForm, grade: e.target.value })}
                  />
                  <TextField
                    label="家长姓名"
                    fullWidth
                    value={studentForm.parent}
                    onChange={(e) => setStudentForm({ ...studentForm, parent: e.target.value })}
                  />
                  <TextField
                    label="家长手机号"
                    fullWidth
                    value={studentForm.parentPhone}
                    onChange={(e) => setStudentForm({ ...studentForm, parentPhone: e.target.value })}
                  />
                  <TextField
                    label="邮箱"
                    fullWidth
                    type="email"
                    value={studentForm.email}
                    onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                  />
                  <TextField
                    label="总课时"
                    fullWidth
                    type="number"
                    value={studentForm.totalHours || 0}
                    onChange={(e) => setStudentForm({ ...studentForm, totalHours: parseInt(e.target.value) })}
                  />
                  <TextField
                    label="剩余课时"
                    fullWidth
                    type="number"
                    value={studentForm.remainingHours || 0}
                    onChange={(e) => setStudentForm({ ...studentForm, remainingHours: parseInt(e.target.value) })}
                  />
                  {dialogType === 'addStudent' && (
                    <TextField
                      label="初始密码"
                      fullWidth
                      type="password"
                      value={studentForm.password}
                      onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                    />
                  )}
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>取消</Button>
                <Button 
                  variant="contained" 
                  onClick={handleSaveStudent}
                  sx={{ bgcolor: '#2D5A27', '&:hover': { bgcolor: '#1b3d17' } }}
                >
                  保存
                </Button>
              </DialogActions>
            </Dialog>

            {/* 重置密码对话框 */}
            <Dialog 
              open={openDialog && dialogType === 'resetStudentPassword'} 
              onClose={handleCloseDialog}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>重置密码</DialogTitle>
              <DialogContent>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" gutterBottom>
                    确定要重置 {selectedItem?.name} 的密码吗？
                  </Typography>
                  <TextField
                    label="新密码"
                    fullWidth
                    type="password"
                    value={resetPasswordForm.password}
                    onChange={(e) => setResetPasswordForm({ ...resetPasswordForm, password: e.target.value })}
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    label="确认密码"
                    fullWidth
                    type="password"
                    value={resetPasswordForm.confirmPassword}
                    onChange={(e) => setResetPasswordForm({ ...resetPasswordForm, confirmPassword: e.target.value })}
                    sx={{ mt: 2 }}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>取消</Button>
                <Button 
                  variant="contained" 
                  onClick={handleResetStudentPassword}
                  sx={{ bgcolor: '#2D5A27', '&:hover': { bgcolor: '#1b3d17' } }}
                >
                  确认重置
                </Button>
              </DialogActions>
            </Dialog>

            {/* 删除确认对话框 */}
            <Dialog 
              open={openDialog && dialogType === 'deleteStudent'} 
              onClose={handleCloseDialog}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>删除学员</DialogTitle>
              <DialogContent>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1">
                    确定要删除学员 {selectedItem?.name} 吗？此操作不可恢复。
                  </Typography>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>取消</Button>
                <Button 
                  variant="contained" 
                  color="error"
                  onClick={handleDeleteStudent}
                >
                  确认删除
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
        );
      case 'classes':
        return (
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
              班级管理
            </Typography>
            {/* 班级管理内容 */}
          </Paper>
        );
      case 'schedule':
        return (
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                课表管理
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenDialog('addSchedule')}
                  sx={{ 
                    color: '#2D5A27',
                    borderColor: '#2D5A27',
                    '&:hover': {
                      borderColor: '#2D5A27',
                      bgcolor: 'rgba(45, 90, 39, 0.04)'
                    }
                  }}
                >
                  添加课程
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<CalendarIcon />}
                  onClick={() => handleOpenDialog('generateSchedule')}
                  sx={{ 
                    color: '#2D5A27',
                    borderColor: '#2D5A27',
                    '&:hover': {
                      borderColor: '#2D5A27',
                      bgcolor: 'rgba(45, 90, 39, 0.04)'
                    }
                  }}
                >
                  自动排课
                </Button>
              </Box>
            </Box>

            {/* 课表视图切换 */}
            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
              <Button
                variant={scheduleView === 'week' ? 'contained' : 'outlined'}
                onClick={() => setScheduleView('week')}
                sx={{ 
                  bgcolor: scheduleView === 'week' ? '#2D5A27' : 'transparent',
                  color: scheduleView === 'week' ? 'white' : '#2D5A27',
                  borderColor: '#2D5A27',
                  '&:hover': {
                    bgcolor: scheduleView === 'week' ? '#1b3d17' : 'rgba(45, 90, 39, 0.04)',
                    borderColor: '#2D5A27'
                  }
                }}
              >
                周视图
              </Button>
              <Button
                variant={scheduleView === 'class' ? 'contained' : 'outlined'}
                onClick={() => setScheduleView('class')}
                sx={{ 
                  bgcolor: scheduleView === 'class' ? '#2D5A27' : 'transparent',
                  color: scheduleView === 'class' ? 'white' : '#2D5A27',
                  borderColor: '#2D5A27',
                  '&:hover': {
                    bgcolor: scheduleView === 'class' ? '#1b3d17' : 'rgba(45, 90, 39, 0.04)',
                    borderColor: '#2D5A27'
                  }
                }}
              >
                班级课表
              </Button>
              <Button
                variant={scheduleView === 'teacher' ? 'contained' : 'outlined'}
                onClick={() => setScheduleView('teacher')}
                sx={{ 
                  bgcolor: scheduleView === 'teacher' ? '#2D5A27' : 'transparent',
                  color: scheduleView === 'teacher' ? 'white' : '#2D5A27',
                  borderColor: '#2D5A27',
                  '&:hover': {
                    bgcolor: scheduleView === 'teacher' ? '#1b3d17' : 'rgba(45, 90, 39, 0.04)',
                    borderColor: '#2D5A27'
                  }
                }}
              >
                教师课表
              </Button>
            </Box>

            {/* 周视图 */}
            {scheduleView === 'week' && (
              <Box sx={{ overflowX: 'auto' }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>时间</TableCell>
                        <TableCell>周一</TableCell>
                        <TableCell>周二</TableCell>
                        <TableCell>周三</TableCell>
                        <TableCell>周四</TableCell>
                        <TableCell>周五</TableCell>
                        <TableCell>周六</TableCell>
                        <TableCell>周日</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {timeSlots.map((time) => (
                        <TableRow key={time}>
                          <TableCell>{time}</TableCell>
                          {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map((day) => (
                            <TableCell key={day}>
                              {weeklySchedule[day]?.[time] ? (
                                <Box sx={{ 
                                  p: 1, 
                                  bgcolor: 'rgba(45, 90, 39, 0.1)',
                                  borderRadius: 1,
                                  cursor: 'pointer'
                                }}
                                onClick={() => handleOpenDialog('editSchedule', weeklySchedule[day][time])}
                                >
                                  <Typography variant="body2" sx={{ color: '#2D5A27' }}>
                                    {weeklySchedule[day][time].className}
                                  </Typography>
                                  <Typography variant="caption" display="block">
                                    {weeklySchedule[day][time].teacher}
                                  </Typography>
                                </Box>
                              ) : (
                                <Box 
                                  sx={{ 
                                    p: 1, 
                                    border: '1px dashed #ccc',
                                    borderRadius: 1,
                                    cursor: 'pointer',
                                    textAlign: 'center'
                                  }}
                                  onClick={() => handleOpenDialog('addSchedule', { day, time })}
                                >
                                  <AddIcon sx={{ fontSize: 20, color: '#999' }} />
                                </Box>
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            {/* 班级课表 */}
            {scheduleView === 'class' && (
              <Box>
                <FormControl sx={{ minWidth: 200, mb: 2 }}>
                  <InputLabel>选择班级</InputLabel>
                  <Select
                    value={selectedClass}
                    label="选择班级"
                    onChange={(e) => setSelectedClass(e.target.value)}
                  >
                    {classList.map((cls) => (
                      <MenuItem key={cls.id} value={cls.id}>
                        {cls.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {selectedClass && (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>时间</TableCell>
                          <TableCell>周一</TableCell>
                          <TableCell>周二</TableCell>
                          <TableCell>周三</TableCell>
                          <TableCell>周四</TableCell>
                          <TableCell>周五</TableCell>
                          <TableCell>周六</TableCell>
                          <TableCell>周日</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {timeSlots.map((time) => (
                          <TableRow key={time}>
                            <TableCell>{time}</TableCell>
                            {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map((day) => (
                              <TableCell key={day}>
                                {classSchedule[selectedClass]?.[day]?.[time] ? (
                                  <Box sx={{ 
                                    p: 1, 
                                    bgcolor: 'rgba(45, 90, 39, 0.1)',
                                    borderRadius: 1
                                  }}>
                                    <Typography variant="body2" sx={{ color: '#2D5A27' }}>
                                      {classSchedule[selectedClass][day][time].subject}
                                    </Typography>
                                    <Typography variant="caption" display="block">
                                      {classSchedule[selectedClass][day][time].teacher}
                                    </Typography>
                                  </Box>
                                ) : null}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            )}

            {/* 教师课表 */}
            {scheduleView === 'teacher' && (
              <Box>
                <FormControl sx={{ minWidth: 200, mb: 2 }}>
                  <InputLabel>选择教师</InputLabel>
                  <Select
                    value={selectedTeacher}
                    label="选择教师"
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                  >
                    {teacherList.map((teacher) => (
                      <MenuItem key={teacher.id} value={teacher.id}>
                        {teacher.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {selectedTeacher && (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>时间</TableCell>
                          <TableCell>周一</TableCell>
                          <TableCell>周二</TableCell>
                          <TableCell>周三</TableCell>
                          <TableCell>周四</TableCell>
                          <TableCell>周五</TableCell>
                          <TableCell>周六</TableCell>
                          <TableCell>周日</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {timeSlots.map((time) => (
                          <TableRow key={time}>
                            <TableCell>{time}</TableCell>
                            {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map((day) => (
                              <TableCell key={day}>
                                {teacherSchedule[selectedTeacher]?.[day]?.[time] ? (
                                  <Box sx={{ 
                                    p: 1, 
                                    bgcolor: 'rgba(45, 90, 39, 0.1)',
                                    borderRadius: 1
                                  }}>
                                    <Typography variant="body2" sx={{ color: '#2D5A27' }}>
                                      {teacherSchedule[selectedTeacher][day][time].className}
                                    </Typography>
                                    <Typography variant="caption" display="block">
                                      {teacherSchedule[selectedTeacher][day][time].subject}
                                    </Typography>
                                  </Box>
                                ) : null}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            )}

            {/* 添加/编辑课程对话框 */}
            <Dialog 
              open={openDialog && (dialogType === 'addSchedule' || dialogType === 'editSchedule')} 
              onClose={handleCloseDialog}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>
                {dialogType === 'addSchedule' ? '添加课程' : '编辑课程'}
              </DialogTitle>
              <DialogContent>
                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel>班级</InputLabel>
                    <Select
                      value={scheduleForm.classId}
                      label="班级"
                      onChange={(e) => setScheduleForm({ ...scheduleForm, classId: e.target.value })}
                    >
                      {classList.map((cls) => (
                        <MenuItem key={cls.id} value={cls.id}>
                          {cls.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>教师</InputLabel>
                    <Select
                      value={scheduleForm.teacherId}
                      label="教师"
                      onChange={(e) => setScheduleForm({ ...scheduleForm, teacherId: e.target.value })}
                    >
                      {teacherList.map((teacher) => (
                        <MenuItem key={teacher.id} value={teacher.id}>
                          {teacher.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>科目</InputLabel>
                    <Select
                      value={scheduleForm.subject}
                      label="科目"
                      onChange={(e) => setScheduleForm({ ...scheduleForm, subject: e.target.value })}
                    >
                      {subjectList.map((subject) => (
                        <MenuItem key={subject.id} value={subject.id}>
                          {subject.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>教室</InputLabel>
                    <Select
                      value={scheduleForm.classroom}
                      label="教室"
                      onChange={(e) => setScheduleForm({ ...scheduleForm, classroom: e.target.value })}
                    >
                      {classroomList.map((room) => (
                        <MenuItem key={room.id} value={room.id}>
                          {room.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>时间</InputLabel>
                    <Select
                      value={scheduleForm.time}
                      label="时间"
                      onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                    >
                      {timeSlots.map((time) => (
                        <MenuItem key={time} value={time}>
                          {time}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>星期</InputLabel>
                    <Select
                      value={scheduleForm.day}
                      label="星期"
                      onChange={(e) => setScheduleForm({ ...scheduleForm, day: e.target.value })}
                    >
                      {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map((day) => (
                        <MenuItem key={day} value={day}>
                          {day}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>取消</Button>
                <Button 
                  variant="contained" 
                  onClick={handleSaveSchedule}
                  sx={{ bgcolor: '#2D5A27', '&:hover': { bgcolor: '#1b3d17' } }}
                >
                  保存
                </Button>
              </DialogActions>
            </Dialog>

            {/* 自动排课对话框 */}
            <Dialog 
              open={openDialog && dialogType === 'generateSchedule'} 
              onClose={handleCloseDialog}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>自动排课</DialogTitle>
              <DialogContent>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" gutterBottom>
                    请选择要生成课表的班级
                  </Typography>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>选择班级</InputLabel>
                    <Select
                      value={selectedClassForGeneration}
                      label="选择班级"
                      onChange={(e) => setSelectedClassForGeneration(e.target.value)}
                    >
                      {classList.map((cls) => (
                        <MenuItem key={cls.id} value={cls.id}>
                          {cls.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                    系统将根据以下规则自动排课：
                    <ul>
                      <li>避免教师时间冲突</li>
                      <li>避免教室时间冲突</li>
                      <li>考虑教师偏好时间</li>
                      <li>保持课程间隔合理</li>
                    </ul>
                  </Typography>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>取消</Button>
                <Button 
                  variant="contained" 
                  onClick={handleGenerateSchedule}
                  disabled={!selectedClassForGeneration}
                  sx={{ bgcolor: '#2D5A27', '&:hover': { bgcolor: '#1b3d17' } }}
                >
                  开始排课
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
        );
      case 'orders':
        return (
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                课程订单
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  size="small"
                  placeholder="搜索订单号/学员姓名"
                  value={orderSearchText}
                  onChange={(e) => setOrderSearchText(e.target.value)}
                  sx={{ width: 200 }}
                />
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>订单状态</InputLabel>
                  <Select
                    value={orderStatusFilter}
                    label="订单状态"
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                  >
                    <MenuItem value="all">全部</MenuItem>
                    <MenuItem value="pending">待支付</MenuItem>
                    <MenuItem value="paid">已支付</MenuItem>
                    <MenuItem value="cancelled">已取消</MenuItem>
                    <MenuItem value="refunded">已退款</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>订单号</TableCell>
                    <TableCell>学员姓名</TableCell>
                    <TableCell>课程名称</TableCell>
                    <TableCell>课时数</TableCell>
                    <TableCell>金额</TableCell>
                    <TableCell>状态</TableCell>
                    <TableCell>创建时间</TableCell>
                    <TableCell>支付方式</TableCell>
                    <TableCell>支付时间</TableCell>
                    <TableCell>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderList
                    .filter(order => {
                      const matchesStatus = orderStatusFilter === 'all' || order.status === orderStatusFilter;
                      const matchesSearch = !orderSearchText || 
                        order.orderNo.toLowerCase().includes(orderSearchText.toLowerCase()) ||
                        order.studentName.toLowerCase().includes(orderSearchText.toLowerCase());
                      return matchesStatus && matchesSearch;
                    })
                    .map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.orderNo}</TableCell>
                        <TableCell>{order.studentName}</TableCell>
                        <TableCell>{order.courseName}</TableCell>
                        <TableCell>{order.hours}</TableCell>
                        <TableCell>¥{order.amount}</TableCell>
                        <TableCell>
                          <Chip 
                            label={
                              order.status === 'pending' ? '待支付' :
                              order.status === 'paid' ? '已支付' :
                              order.status === 'cancelled' ? '已取消' :
                              '已退款'
                            }
                            color={
                              order.status === 'pending' ? 'warning' :
                              order.status === 'paid' ? 'success' :
                              order.status === 'cancelled' ? 'error' :
                              'default'
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{order.createTime}</TableCell>
                        <TableCell>
                          {order.paymentMethod === 'wechat' ? '微信支付' :
                           order.paymentMethod === 'alipay' ? '支付宝' :
                           order.paymentMethod === 'cash' ? '现金' : '银行转账'}
                        </TableCell>
                        <TableCell>{order.paymentTime || '-'}</TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            <IconButton 
                              size="small" 
                              onClick={() => handleOpenDialog('viewOrder', order)}
                              sx={{ color: '#2D5A27' }}
                            >
                              <AssessmentIcon />
                            </IconButton>
                            {order.status === 'pending' && (
                              <>
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleOpenDialog('confirmPayment', order)}
                                  sx={{ color: '#2D5A27' }}
                                >
                                  <PaymentIcon />
                                </IconButton>
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleOpenDialog('cancelOrder', order)}
                                  sx={{ color: '#f44336' }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </>
                            )}
                            {order.status === 'paid' && (
                              <IconButton 
                                size="small" 
                                onClick={() => handleOpenDialog('refundOrder', order)}
                                sx={{ color: '#f44336' }}
                              >
                                <PaymentIcon />
                              </IconButton>
                            )}
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* 订单详情对话框 */}
            <Dialog 
              open={openDialog && dialogType === 'viewOrder'} 
              onClose={handleCloseDialog}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>订单详情</DialogTitle>
              <DialogContent>
                <Box sx={{ mt: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">订单号</Typography>
                      <Typography variant="body1">{selectedItem?.orderNo}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">创建时间</Typography>
                      <Typography variant="body1">{selectedItem?.createTime}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">学员姓名</Typography>
                      <Typography variant="body1">{selectedItem?.studentName}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">课程名称</Typography>
                      <Typography variant="body1">{selectedItem?.courseName}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">课时数</Typography>
                      <Typography variant="body1">{selectedItem?.hours}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">订单金额</Typography>
                      <Typography variant="body1">¥{selectedItem?.amount}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">支付方式</Typography>
                      <Typography variant="body1">
                        {selectedItem?.paymentMethod === 'wechat' ? '微信支付' :
                         selectedItem?.paymentMethod === 'alipay' ? '支付宝' :
                         selectedItem?.paymentMethod === 'cash' ? '现金' : '银行转账'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">支付时间</Typography>
                      <Typography variant="body1">{selectedItem?.paymentTime || '-'}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">备注</Typography>
                      <Typography variant="body1">{selectedItem?.notes || '-'}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>关闭</Button>
              </DialogActions>
            </Dialog>

            {/* 确认支付对话框 */}
            <Dialog 
              open={openDialog && dialogType === 'confirmPayment'} 
              onClose={handleCloseDialog}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>确认支付</DialogTitle>
              <DialogContent>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" gutterBottom>
                    确认收到 {selectedItem?.studentName} 的课程费用 ¥{selectedItem?.amount} 吗？
                  </Typography>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>支付方式</InputLabel>
                    <Select
                      value={selectedItem?.paymentMethod}
                      label="支付方式"
                      onChange={(e) => setSelectedItem({
                        ...selectedItem,
                        paymentMethod: e.target.value
                      })}
                    >
                      <MenuItem value="wechat">微信支付</MenuItem>
                      <MenuItem value="alipay">支付宝</MenuItem>
                      <MenuItem value="cash">现金</MenuItem>
                      <MenuItem value="bank">银行转账</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>取消</Button>
                <Button 
                  variant="contained" 
                  onClick={handleConfirmPayment}
                  sx={{ bgcolor: '#2D5A27', '&:hover': { bgcolor: '#1b3d17' } }}
                >
                  确认支付
                </Button>
              </DialogActions>
            </Dialog>

            {/* 取消订单对话框 */}
            <Dialog 
              open={openDialog && dialogType === 'cancelOrder'} 
              onClose={handleCloseDialog}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>取消订单</DialogTitle>
              <DialogContent>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" gutterBottom>
                    确定要取消订单 {selectedItem?.orderNo} 吗？
                  </Typography>
                  <TextField
                    label="取消原因"
                    fullWidth
                    multiline
                    rows={3}
                    sx={{ mt: 2 }}
                    onChange={(e) => setSelectedItem({
                      ...selectedItem,
                      cancelReason: e.target.value
                    })}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>取消</Button>
                <Button 
                  variant="contained" 
                  color="error"
                  onClick={handleCancelOrder}
                >
                  确认取消
                </Button>
              </DialogActions>
            </Dialog>

            {/* 退款对话框 */}
            <Dialog 
              open={openDialog && dialogType === 'refundOrder'} 
              onClose={handleCloseDialog}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>退款处理</DialogTitle>
              <DialogContent>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" gutterBottom>
                    订单号：{selectedItem?.orderNo}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    退款金额：¥{selectedItem?.amount}
                  </Typography>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>退款方式</InputLabel>
                    <Select
                      value={selectedItem?.refundMethod || 'original'}
                      label="退款方式"
                      onChange={(e) => setSelectedItem({
                        ...selectedItem,
                        refundMethod: e.target.value
                      })}
                    >
                      <MenuItem value="original">原路退回</MenuItem>
                      <MenuItem value="cash">现金退款</MenuItem>
                      <MenuItem value="bank">银行转账</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label="退款原因"
                    fullWidth
                    multiline
                    rows={3}
                    sx={{ mt: 2 }}
                    onChange={(e) => setSelectedItem({
                      ...selectedItem,
                      refundReason: e.target.value
                    })}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>取消</Button>
                <Button 
                  variant="contained" 
                  color="error"
                  onClick={handleRefundOrder}
                >
                  确认退款
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
        );
      default:
        return null;
    }
  };

  const drawer = (
    <Box sx={{ overflow: 'auto', mt: 2 }}>
      <List>
        {user?.adminMenuItems.map((item) => (
          <ListItem
            button
            key={item.value}
            selected={selectedMenu === item.value}
            onClick={() => handleMenuItemClick(item.value)}
            sx={{
              '&.Mui-selected': {
                bgcolor: 'rgba(197,230,176,0.2)',
                '&:hover': {
                  bgcolor: 'rgba(197,230,176,0.3)'
                }
              },
              '&:hover': {
                bgcolor: 'rgba(197,230,176,0.1)'
              },
              borderRadius: '0 24px 24px 0',
              mr: 2,
              mb: 1,
              py: { xs: 2, sm: 1.5 }
            }}
          >
            <ListItemIcon 
              sx={{ 
                color: selectedMenu === item.value ? '#2D5A27' : 'inherit',
                minWidth: { xs: 40, sm: 45 }
              }}
            >
              {getMenuIcon(item.value)}
            </ListItemIcon>
            <ListItemText 
              primary={item.label} 
              sx={{ 
                '& .MuiTypography-root': { 
                  fontWeight: selectedMenu === item.value ? 600 : 400,
                  color: selectedMenu === item.value ? '#2D5A27' : 'inherit',
                  fontSize: { xs: '0.95rem', sm: '1rem' }
                } 
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // 模拟数据
  const stats = {
    totalStudents: 156,
    totalTeachers: 24,
    activeCourses: 45,
    totalRevenue: 128500,
    newStudents: 12,
    newTeachers: 3,
    pendingApprovals: 5,
    systemHealth: 'Good'
  };

  const recentActivities = [
    { type: 'student', action: '注册', name: '张小明', time: '10分钟前' },
    { type: 'teacher', action: '申请', name: '李老师', time: '30分钟前' },
    { type: 'course', action: '创建', name: '英语口语课程', time: '1小时前' },
    { type: 'payment', action: '完成', name: '王同学', time: '2小时前' },
    { type: 'system', action: '更新', name: '系统维护', time: '3小时前' }
  ];

  const pendingApprovals = [
    { type: 'teacher', name: '李老师', subject: '英语', experience: '5年' },
    { type: 'course', name: '数学提高班', teacher: '张老师', level: '高级' },
    { type: 'student', name: '王小明', grade: '三年级', parent: '王先生' }
  ];

  // 模拟课表数据
  const timeSlots = [
    '08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00',
    '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00'
  ];

  const classList = [
    { id: 1, name: '一年级一班' },
    { id: 2, name: '一年级二班' },
    { id: 3, name: '二年级一班' },
    { id: 4, name: '二年级二班' }
  ];

  const teacherList = [
    { id: 1, name: '张老师' },
    { id: 2, name: '李老师' },
    { id: 3, name: '王老师' }
  ];

  const subjectList = [
    { id: 1, name: '语文' },
    { id: 2, name: '数学' },
    { id: 3, name: '英语' },
    { id: 4, name: '物理' }
  ];

  const classroomList = [
    { id: 1, name: '教室101' },
    { id: 2, name: '教室102' },
    { id: 3, name: '教室201' },
    { id: 4, name: '教室202' }
  ];

  // 模拟课表数据
  const weeklySchedule = {
    '周一': {
      '08:00-09:00': { className: '一年级一班', teacher: '张老师', subject: '语文' },
      '09:00-10:00': { className: '一年级二班', teacher: '李老师', subject: '数学' }
    },
    '周二': {
      '10:00-11:00': { className: '二年级一班', teacher: '王老师', subject: '英语' }
    }
  };

  const classSchedule = {
    1: {
      '周一': {
        '08:00-09:00': { subject: '语文', teacher: '张老师' }
      }
    }
  };

  const teacherSchedule = {
    1: {
      '周一': {
        '08:00-09:00': { className: '一年级一班', subject: '语文' }
      }
    }
  };

  // 处理函数
  const handleOpenDialog = (type, item = null) => {
    console.log('Opening dialog:', type, item);
    setDialogType(type);
    setSelectedItem(item);
    if (type === 'editStudent' && item) {
      setStudentForm({
        name: item.name,
        username: item.username,
        grade: item.grade,
        parent: item.parent,
        parentPhone: item.parentPhone || '',
        email: item.email || '',
        password: '',
        totalHours: item.totalHours || 0,
        remainingHours: item.remainingHours || 0
      });
    } else if (type === 'addStudent') {
      setStudentForm({
        name: '',
        username: '',
        grade: '',
        parent: '',
        parentPhone: '',
        email: '',
        password: '',
        totalHours: 0,
        remainingHours: 0
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    console.log('Closing dialog');
    setOpenDialog(false);
    setDialogType('');
    setSelectedItem(null);
    setSelectedFile(null);
    setStaffForm({
      name: '',
      username: '',
      role: 'staff',
      email: '',
      phone: '',
      password: ''
    });
    setStudentForm({
      name: '',
      username: '',
      grade: '',
      parent: '',
      parentPhone: '',
      email: '',
      password: '',
      totalHours: 0,
      remainingHours: 0
    });
    setResetPasswordForm({
      password: '',
      confirmPassword: ''
    });
    setPurchaseHoursForm({
      hours: 0,
      amount: 0,
      paymentMethod: 'cash',
      notes: ''
    });
  };

  const handleApprove = (item) => {
    // 处理审批逻辑
    handleCloseDialog();
  };

  const handleReject = (item) => {
    // 处理拒绝逻辑
    handleCloseDialog();
  };

  const handleSaveStaff = () => {
    // 这里添加保存员工信息的逻辑
    if (dialogType === 'addStaff') {
      // 添加新员工
      const newStaff = {
        id: staffList.length + 1,
        ...staffForm,
        status: 'active',
        lastLogin: new Date().toLocaleString()
      };
      setStaffList([...staffList, newStaff]);
    } else if (dialogType === 'editStaff') {
      // 更新现有员工信息
      setStaffList(staffList.map(staff => 
        staff.id === selectedItem.id ? { ...staff, ...staffForm } : staff
      ));
    }
    handleCloseDialog();
  };

  const handleResetPassword = () => {
    if (resetPasswordForm.password !== resetPasswordForm.confirmPassword) {
      // 这里可以添加错误提示
      return;
    }
    // 这里添加重置密码的逻辑
    handleCloseDialog();
  };

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImportStaff = () => {
    if (!selectedFile) return;
    // 这里添加批量导入员工的逻辑
    handleCloseDialog();
  };

  const handleSaveStudent = () => {
    console.log('Saving student:', studentForm);
    if (dialogType === 'addStudent') {
      // 添加新学员
      const newStudent = {
        id: studentList.length + 1,
        ...studentForm,
        status: 'active',
        lastLogin: new Date().toLocaleString(),
        courses: [],
        totalHours: studentForm.totalHours || 0,
        remainingHours: studentForm.remainingHours || 0
      };
      setStudentList([...studentList, newStudent]);
      console.log('Added new student:', newStudent);
    } else if (dialogType === 'editStudent') {
      // 更新现有学员信息
      setStudentList(studentList.map(student => 
        student.id === selectedItem.id ? { ...student, ...studentForm } : student
      ));
      console.log('Updated student:', studentForm);
    }
    handleCloseDialog();
  };

  const handleResetStudentPassword = () => {
    if (resetPasswordForm.password !== resetPasswordForm.confirmPassword) {
      alert('两次输入的密码不一致');
      return;
    }
    // 这里添加重置密码的逻辑
    console.log('Resetting password for student:', selectedItem);
    handleCloseDialog();
  };

  const handleDeleteStudent = () => {
    if (window.confirm(`确定要删除学员 ${selectedItem.name} 吗？`)) {
      setStudentList(studentList.filter(student => student.id !== selectedItem.id));
      handleCloseDialog();
    }
  };

  const handleImportStudents = () => {
    if (!selectedFile) return;
    // 这里添加批量导入学员的逻辑
    handleCloseDialog();
  };

  // 课表管理相关函数
  const handleSaveSchedule = () => {
    // 这里添加保存课表的逻辑
    console.log('Saving schedule:', scheduleForm);
    handleCloseDialog();
  };

  const handleGenerateSchedule = () => {
    // 这里添加自动排课的逻辑
    console.log('Generating schedule for class:', selectedClassForGeneration);
    handleCloseDialog();
  };

  // 添加购买课时处理函数
  const handlePurchaseHours = () => {
    if (!selectedItem || !purchaseHoursForm.hours || !purchaseHoursForm.amount) return;

    // 更新学员课时信息
    setStudentList(studentList.map(student => {
      if (student.id === selectedItem.id) {
        return {
          ...student,
          totalHours: student.totalHours + purchaseHoursForm.hours,
          remainingHours: student.remainingHours + purchaseHoursForm.hours
        };
      }
      return student;
    }));

    // 记录购买记录
    console.log('Purchase record:', {
      studentId: selectedItem.id,
      studentName: selectedItem.name,
      hours: purchaseHoursForm.hours,
      amount: purchaseHoursForm.amount,
      paymentMethod: purchaseHoursForm.paymentMethod,
      notes: purchaseHoursForm.notes,
      purchaseDate: new Date().toLocaleString()
    });

    handleCloseDialog();
  };

  // 添加订单相关处理函数
  const handleConfirmPayment = () => {
    if (!selectedItem) return;

    setOrderList(orderList.map(order => {
      if (order.id === selectedItem.id) {
        return {
          ...order,
          status: 'paid',
          paymentTime: new Date().toLocaleString()
        };
      }
      return order;
    }));

    handleCloseDialog();
  };

  const handleCancelOrder = () => {
    if (!selectedItem) return;

    setOrderList(orderList.map(order => {
      if (order.id === selectedItem.id) {
        return {
          ...order,
          status: 'cancelled',
          cancelTime: new Date().toLocaleString(),
          cancelReason: selectedItem.cancelReason
        };
      }
      return order;
    }));

    handleCloseDialog();
  };

  const handleRefundOrder = () => {
    if (!selectedItem) return;

    setOrderList(orderList.map(order => {
      if (order.id === selectedItem.id) {
        return {
          ...order,
          status: 'refunded',
          refundTime: new Date().toLocaleString(),
          refundMethod: selectedItem.refundMethod,
          refundReason: selectedItem.refundReason
        };
      }
      return order;
    }));

    handleCloseDialog();
  };

  if (!user || !user.adminMenuItems) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <Typography>加载中...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'white',
          color: 'text.primary',
          boxShadow: 1,
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            flexGrow: 1 
          }}>
            <Avatar 
              src={user.avatar} 
              alt={user.username}
              sx={{ 
                width: { xs: 32, sm: 40 }, 
                height: { xs: 32, sm: 40 },
                mr: 2
              }}
            />
            <span style={{ 
              fontSize: '1rem',
              color: '#2D5A27',
              fontWeight: 600
            }}>
              {user.username}
            </span>
          </Box>
          <IconButton 
            onClick={handleLogout}
            sx={{ 
              color: '#2D5A27',
              '&:hover': {
                bgcolor: 'rgba(197,230,176,0.2)'
              }
            }}
          >
            <LogoutIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'white',
            borderRight: '1px solid rgba(0, 0, 0, 0.12)'
          }
        }}
      >
        <Toolbar />
        {drawer}
      </Drawer>

      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar />
        <Container maxWidth="lg">
          {renderContent()}
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard; 