import React, { useState } from 'react';
import {
  Box,
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
  Group as GroupIcon,
  Assignment as AssignmentIcon,
  Grade as GradeIcon,
} from '@mui/icons-material';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: '王老师',
    title: '副教授',
    department: '计算机科学与技术',
    email: 'wang@example.com',
    phone: '13800138000',
    office: '计算机楼 301',
    avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
    courses: 5,
    students: 120,
    assignments: 8,
    publications: 3,
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
    <Box>
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
              {profile.title} | {profile.department}
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
                <ListItemText primary="办公室" secondary={profile.office} />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <BookIcon />
                </ListItemIcon>
                <ListItemText primary="开设课程" secondary={profile.courses} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="学生人数" secondary={profile.students} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="作业数量" secondary={profile.assignments} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <GradeIcon />
                </ListItemIcon>
                <ListItemText primary="发表论文" secondary={profile.publications} />
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
            name="title"
            label="职称"
            fullWidth
            value={editForm.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="department"
            label="所属院系"
            fullWidth
            value={editForm.department}
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
            name="office"
            label="办公室"
            fullWidth
            value={editForm.office}
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
    </Box>
  );
};

export default Profile; 