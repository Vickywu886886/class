import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Typography,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([
    { id: 1, name: '王老师', teacherId: 'T001', email: 'wang@example.com', department: '数学系', status: '在职' },
    { id: 2, name: '李老师', teacherId: 'T002', email: 'li@example.com', department: '物理系', status: '在职' },
  ]);
  const [open, setOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    teacherId: '',
    email: '',
    department: '',
    status: '在职',
  });

  const departments = ['数学系', '物理系', '化学系', '生物系', '计算机系', '外语系'];

  const handleOpen = (teacher = null) => {
    if (teacher) {
      setEditingTeacher(teacher);
      setFormData({
        name: teacher.name,
        teacherId: teacher.teacherId,
        email: teacher.email,
        department: teacher.department,
        status: teacher.status,
      });
    } else {
      setEditingTeacher(null);
      setFormData({
        name: '',
        teacherId: '',
        email: '',
        department: '',
        status: '在职',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingTeacher(null);
  };

  const handleSubmit = () => {
    if (editingTeacher) {
      // 更新教师信息
      setTeachers(teachers.map(teacher =>
        teacher.id === editingTeacher.id
          ? { ...teacher, ...formData }
          : teacher
      ));
    } else {
      // 添加新教师
      setTeachers([
        ...teachers,
        {
          id: teachers.length + 1,
          ...formData,
        },
      ]);
    }
    handleClose();
  };

  const handleDelete = (teacherId) => {
    setTeachers(teachers.filter(teacher => teacher.id !== teacherId));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case '在职':
        return 'success';
      case '请假':
        return 'warning';
      case '离职':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">教师管理</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          添加教师
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>姓名</TableCell>
              <TableCell>工号</TableCell>
              <TableCell>邮箱</TableCell>
              <TableCell>所属院系</TableCell>
              <TableCell>状态</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.teacherId}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>{teacher.department}</TableCell>
                <TableCell>
                  <Chip
                    label={teacher.status}
                    color={getStatusColor(teacher.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(teacher)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(teacher.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editingTeacher ? '编辑教师信息' : '添加教师'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="姓名"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="工号"
            fullWidth
            value={formData.teacherId}
            onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
          />
          <TextField
            margin="dense"
            label="邮箱"
            fullWidth
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>所属院系</InputLabel>
            <Select
              value={formData.department}
              label="所属院系"
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            >
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>状态</InputLabel>
            <Select
              value={formData.status}
              label="状态"
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <MenuItem value="在职">在职</MenuItem>
              <MenuItem value="请假">请假</MenuItem>
              <MenuItem value="离职">离职</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleSubmit} variant="contained">
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeacherManagement; 