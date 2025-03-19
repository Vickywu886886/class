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
  Typography
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

const CourseManagement = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: '高等数学', code: 'MATH101', students: 30, status: '进行中' },
    { id: 2, name: '大学物理', code: 'PHYS101', students: 25, status: '未开始' },
  ]);
  const [open, setOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
  });

  const handleOpen = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        name: course.name,
        code: course.code,
        description: course.description || '',
      });
    } else {
      setEditingCourse(null);
      setFormData({
        name: '',
        code: '',
        description: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCourse(null);
  };

  const handleSubmit = () => {
    if (editingCourse) {
      // 更新课程
      setCourses(courses.map(course =>
        course.id === editingCourse.id
          ? { ...course, ...formData }
          : course
      ));
    } else {
      // 添加新课程
      setCourses([
        ...courses,
        {
          id: courses.length + 1,
          ...formData,
          students: 0,
          status: '未开始',
        },
      ]);
    }
    handleClose();
  };

  const handleDelete = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">课程管理</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          添加课程
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>课程名称</TableCell>
              <TableCell>课程代码</TableCell>
              <TableCell>学生人数</TableCell>
              <TableCell>状态</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.code}</TableCell>
                <TableCell>{course.students}</TableCell>
                <TableCell>{course.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(course)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(course.id)}>
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
          {editingCourse ? '编辑课程' : '添加课程'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="课程名称"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="课程代码"
            fullWidth
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          />
          <TextField
            margin="dense"
            label="课程描述"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
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

export default CourseManagement; 