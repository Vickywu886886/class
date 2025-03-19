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
  Schedule as ScheduleIcon,
  Assignment as AssignmentIcon,
  Star as StarIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  EmojiEvents as EmojiEventsIcon,
} from '@mui/icons-material';

// Mock data
const teachers = [
  {
    id: 1,
    name: '李老师',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    subjects: ['英语口语', '阅读理解'],
    status: 'active',
    experience: '5年',
    rating: 4.8,
    students: 120,
    classes: 450,
  },
  {
    id: 2,
    name: '王老师',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    subjects: ['写作', '听力'],
    status: 'active',
    experience: '3年',
    rating: 4.6,
    students: 85,
    classes: 320,
  },
  {
    id: 3,
    name: '张老师',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    subjects: ['语法', '词汇'],
    status: 'inactive',
    experience: '2年',
    rating: 4.7,
    students: 65,
    classes: 280,
  },
];

const TeacherManagement = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    subjects: [],
    experience: '',
    status: 'active',
  });

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleOpenDialog = (type, teacher = null) => {
    setDialogType(type);
    if (teacher) {
      setSelectedTeacher(teacher);
      setFormData({
        name: teacher.name,
        subjects: teacher.subjects,
        experience: teacher.experience,
        status: teacher.status,
      });
    } else {
      setSelectedTeacher(null);
      setFormData({
        name: '',
        subjects: [],
        experience: '',
        status: 'active',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogType('');
    setSelectedTeacher(null);
  };

  const handleFormChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const renderTeacherCard = (teacher) => (
    <Card key={teacher.id} sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={teacher.avatar}
            sx={{ width: 60, height: 60, mr: 2 }}
          />
          <Box>
            <Typography variant="h6">{teacher.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {teacher.experience} 教学经验
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              评分
            </Typography>
            <Typography variant="h6" color="primary">
              {teacher.rating}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              学生数
            </Typography>
            <Typography variant="h6" color="primary">
              {teacher.students}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {teacher.subjects.map((subject) => (
                <Chip
                  key={subject}
                  label={subject}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Button
            size="small"
            startIcon={<EditIcon />}
            onClick={() => handleOpenDialog('edit', teacher)}
          >
            编辑
          </Button>
          <Button
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleOpenDialog('delete', teacher)}
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
                  <ListItemText primary="教师列表" />
                </ListItem>
                <ListItem button selected={selectedTab === 1} onClick={() => setSelectedTab(1)}>
                  <ListItemIcon><ScheduleIcon /></ListItemIcon>
                  <ListItemText primary="课程安排" />
                </ListItem>
                <ListItem button selected={selectedTab === 2} onClick={() => setSelectedTab(2)}>
                  <ListItemIcon><AssignmentIcon /></ListItemIcon>
                  <ListItemText primary="预约审批" />
                </ListItem>
                <ListItem button selected={selectedTab === 3} onClick={() => setSelectedTab(3)}>
                  <ListItemIcon><StarIcon /></ListItemIcon>
                  <ListItemText primary="教学评价" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* 右侧内容 */}
        <Grid item xs={12} md={9}>
          <Card>
            <CardContent>
              {/* 教师列表 */}
              {selectedTab === 0 && (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6">教师列表</Typography>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => handleOpenDialog('add')}
                    >
                      添加教师
                    </Button>
                  </Box>
                  <Grid container spacing={2}>
                    {teachers.map(renderTeacherCard)}
                  </Grid>
                </>
              )}

              {/* 课程安排 */}
              {selectedTab === 1 && (
                <Typography variant="h6" color="text.secondary">
                  课程安排功能开发中...
                </Typography>
              )}

              {/* 预约审批 */}
              {selectedTab === 2 && (
                <Typography variant="h6" color="text.secondary">
                  预约审批功能开发中...
                </Typography>
              )}

              {/* 教学评价 */}
              {selectedTab === 3 && (
                <Typography variant="h6" color="text.secondary">
                  教学评价功能开发中...
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 添加/编辑教师对话框 */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'add' ? '添加教师' : dialogType === 'edit' ? '编辑教师' : '删除教师'}
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
                <InputLabel>科目</InputLabel>
                <Select
                  multiple
                  value={formData.subjects}
                  onChange={handleFormChange('subjects')}
                  label="科目"
                >
                  <MenuItem value="英语口语">英语口语</MenuItem>
                  <MenuItem value="阅读理解">阅读理解</MenuItem>
                  <MenuItem value="写作">写作</MenuItem>
                  <MenuItem value="听力">听力</MenuItem>
                  <MenuItem value="语法">语法</MenuItem>
                  <MenuItem value="词汇">词汇</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="教学经验"
                value={formData.experience}
                onChange={handleFormChange('experience')}
                margin="normal"
              />
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
          ) : (
            <Typography>
              确定要删除教师 {selectedTeacher?.name} 吗？此操作不可撤销。
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

export default TeacherManagement; 