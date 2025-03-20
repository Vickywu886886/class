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
  Person as PersonIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  TrendingUp as TrendingUpIcon,
  EmojiEvents as EmojiEventsIcon,
  Book as BookIcon,
} from '@mui/icons-material';

// Mock data
const students = [
  {
    id: 1,
    name: '张三',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    grade: '高一',
    level: '中级',
    progress: 75,
    totalHours: 120,
    completedHours: 90,
    averageScore: 85,
    teacher: '李老师',
    status: 'active',
  },
  {
    id: 2,
    name: '李四',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    grade: '高二',
    level: '高级',
    progress: 60,
    totalHours: 150,
    completedHours: 90,
    averageScore: 92,
    teacher: '王老师',
    status: 'active',
  },
  {
    id: 3,
    name: '王五',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    grade: '高三',
    level: '初级',
    progress: 30,
    totalHours: 100,
    completedHours: 30,
    averageScore: 78,
    teacher: '张老师',
    status: 'inactive',
  },
];

const StudentManagement = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    level: '',
    totalHours: '',
    teacher: '',
    status: 'active',
  });

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleOpenDialog = (type, student = null) => {
    setDialogType(type);
    if (student) {
      setSelectedStudent(student);
      setFormData({
        name: student.name,
        grade: student.grade,
        level: student.level,
        totalHours: student.totalHours,
        teacher: student.teacher,
        status: student.status,
      });
    } else {
      setSelectedStudent(null);
      setFormData({
        name: '',
        grade: '',
        level: '',
        totalHours: '',
        teacher: '',
        status: 'active',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogType('');
    setSelectedStudent(null);
  };

  const handleFormChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const renderStudentCard = (student) => (
    <Card key={student.id} sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={student.avatar}
            sx={{ width: 60, height: 60, mr: 2 }}
          />
          <Box>
            <Typography variant="h6">{student.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {student.grade} | {student.level}
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              学习进度
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ flexGrow: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={student.progress}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {student.progress}%
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              平均成绩
            </Typography>
            <Typography variant="h6" color="primary">
              {student.averageScore}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              课时完成情况
            </Typography>
            <Typography variant="body2">
              {student.completedHours}/{student.totalHours} 课时
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              负责教师
            </Typography>
            <Typography variant="body2">
              {student.teacher}
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Button
            size="small"
            startIcon={<EditIcon />}
            onClick={() => handleOpenDialog('edit', student)}
          >
            编辑
          </Button>
          <Button
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleOpenDialog('delete', student)}
          >
            删除
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* 左侧导航 */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <List>
                <ListItem button selected={selectedTab === 0} onClick={() => setSelectedTab(0)}>
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="学生列表" />
                </ListItem>
                <ListItem button selected={selectedTab === 1} onClick={() => setSelectedTab(1)}>
                  <ListItemIcon><SchoolIcon /></ListItemIcon>
                  <ListItemText primary="学习进度" />
                </ListItem>
                <ListItem button selected={selectedTab === 2} onClick={() => setSelectedTab(2)}>
                  <ListItemIcon><AssignmentIcon /></ListItemIcon>
                  <ListItemText primary="作业管理" />
                </ListItem>
                <ListItem button selected={selectedTab === 3} onClick={() => setSelectedTab(3)}>
                  <ListItemIcon><TrendingUpIcon /></ListItemIcon>
                  <ListItemText primary="成绩分析" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* 右侧内容 */}
        <Grid item xs={12} md={9}>
          <Card>
            <CardContent>
              {/* 学生列表 */}
              {selectedTab === 0 && (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6">学生列表</Typography>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => handleOpenDialog('add')}
                    >
                      添加学生
                    </Button>
                  </Box>
                  <Grid container spacing={2}>
                    {students.map(renderStudentCard)}
                  </Grid>
                </>
              )}

              {/* 学习进度 */}
              {selectedTab === 1 && (
                <Typography variant="h6" color="text.secondary">
                  学习进度功能开发中...
                </Typography>
              )}

              {/* 作业管理 */}
              {selectedTab === 2 && (
                <Typography variant="h6" color="text.secondary">
                  作业管理功能开发中...
                </Typography>
              )}

              {/* 成绩分析 */}
              {selectedTab === 3 && (
                <Typography variant="h6" color="text.secondary">
                  成绩分析功能开发中...
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 添加/编辑学生对话框 */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'add' ? '添加学生' : dialogType === 'edit' ? '编辑学生' : '删除学生'}
        </DialogTitle>
        <DialogContent>
          {dialogType !== 'delete' ? (
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="姓名"
                value={formData.name}
                onChange={handleFormChange('name')}
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>年级</InputLabel>
                <Select
                  value={formData.grade}
                  onChange={handleFormChange('grade')}
                  label="年级"
                >
                  <MenuItem value="高一">高一</MenuItem>
                  <MenuItem value="高二">高二</MenuItem>
                  <MenuItem value="高三">高三</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>水平</InputLabel>
                <Select
                  value={formData.level}
                  onChange={handleFormChange('level')}
                  label="水平"
                >
                  <MenuItem value="初级">初级</MenuItem>
                  <MenuItem value="中级">中级</MenuItem>
                  <MenuItem value="高级">高级</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="总课时"
                type="number"
                value={formData.totalHours}
                onChange={handleFormChange('totalHours')}
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>负责教师</InputLabel>
                <Select
                  value={formData.teacher}
                  onChange={handleFormChange('teacher')}
                  label="负责教师"
                >
                  <MenuItem value="李老师">李老师</MenuItem>
                  <MenuItem value="王老师">王老师</MenuItem>
                  <MenuItem value="张老师">张老师</MenuItem>
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
                  <MenuItem value="inactive">停课</MenuItem>
                </Select>
              </FormControl>
            </Box>
          ) : (
            <Typography>
              确定要删除学生 {selectedStudent?.name} 吗？此操作不可撤销。
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

export default StudentManagement; 