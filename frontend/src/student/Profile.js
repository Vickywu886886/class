import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Grid,
  Typography,
  Avatar,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Edit as EditIcon,
  School as SchoolIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Book as BookIcon,
  Grade as GradeIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: '张三',
    studentId: '2024001',
    major: '计算机科学与技术',
    grade: '2024级',
    email: 'zhangsan@example.com',
    phone: '13800138000',
    dormitory: '1号楼 101室',
    avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
    courses: 6,
    averageScore: 85,
    completedAssignments: 12,
    attendance: 95,
  });

  const [editForm, setEditForm] = useState({ ...profile });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setProfile(editForm);
    handleClose();
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            src={profile.avatar}
            sx={{ width: 100, height: 100, mr: 3 }}
          />
          <Box>
            <Typography variant="h4" gutterBottom>
              {profile.name}
              <IconButton onClick={handleOpen} sx={{ ml: 1 }}>
                <EditIcon />
              </IconButton>
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {profile.studentId} | {profile.major} | {profile.grade}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText primary="邮箱" secondary={profile.email} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText primary="电话" secondary={profile.phone} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocationIcon />
                </ListItemIcon>
                <ListItemText primary="宿舍" secondary={profile.dormitory} />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <BookIcon />
                </ListItemIcon>
                <ListItemText primary="选修课程" secondary={profile.courses} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <GradeIcon />
                </ListItemIcon>
                <ListItemText primary="平均成绩" secondary={`${profile.averageScore}分`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="已完成作业" secondary={profile.completedAssignments} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText primary="出勤率" secondary={`${profile.attendance}%`} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>编辑个人信息</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="姓名"
            fullWidth
            value={editForm.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="studentId"
            label="学号"
            fullWidth
            value={editForm.studentId}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="major"
            label="专业"
            fullWidth
            value={editForm.major}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="grade"
            label="年级"
            fullWidth
            value={editForm.grade}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="邮箱"
            fullWidth
            value={editForm.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="phone"
            label="电话"
            fullWidth
            value={editForm.phone}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="dormitory"
            label="宿舍"
            fullWidth
            value={editForm.dormitory}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleSubmit} variant="contained">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile; 