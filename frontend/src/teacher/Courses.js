import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  School as SchoolIcon,
  AccessTime as AccessTimeIcon,
  Group as GroupIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import TeacherNav from '../components/TeacherNav';

const TeacherCourses = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: 'English Speaking Course',
      code: 'ENG101',
      students: 30,
      status: 'In Progress',
      category: 'Speaking',
      duration: '60 minutes',
      level: 'Intermediate',
    },
    {
      id: 2,
      name: 'Reading Comprehension',
      code: 'ENG102',
      students: 25,
      status: 'Not Started',
      category: 'Reading',
      duration: '90 minutes',
      level: 'Advanced',
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    category: '',
    duration: '',
    level: '',
    description: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleOpenDialog = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        name: course.name,
        code: course.code,
        category: course.category,
        duration: course.duration,
        level: course.level,
        description: course.description || '',
      });
    } else {
      setEditingCourse(null);
      setFormData({
        name: '',
        code: '',
        category: '',
        duration: '',
        level: '',
        description: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
      setSnackbar({
        open: true,
        message: 'Course updated successfully',
        severity: 'success',
      });
    } else {
      // 添加新课程
      setCourses([
        ...courses,
        {
          id: courses.length + 1,
          ...formData,
          students: 0,
          status: 'Not Started',
        },
      ]);
      setSnackbar({
        open: true,
        message: 'Course added successfully',
        severity: 'success',
      });
    }
    handleCloseDialog();
  };

  const handleDelete = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId));
    setSnackbar({
      open: true,
      message: 'Course deleted successfully',
      severity: 'success',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return 'success';
      case 'Not Started':
        return 'warning';
      case 'Completed':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <TeacherNav />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ color: '#2D5A27' }}>
            Course Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              bgcolor: '#4caf50',
              '&:hover': { bgcolor: '#45a049' },
            }}
          >
            Add Course
          </Button>
        </Box>

        <Paper sx={{ p: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Course Name</TableCell>
                  <TableCell>Course Code</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Level</TableCell>
                  <TableCell>Student Count</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.code}</TableCell>
                    <TableCell>
                      <Chip
                        icon={<CategoryIcon />}
                        label={course.category}
                        size="small"
                        sx={{ bgcolor: '#e8f5e9', color: '#2e7d32' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccessTimeIcon sx={{ mr: 1, fontSize: 20, color: '#666' }} />
                        {course.duration}
                      </Box>
                    </TableCell>
                    <TableCell>{course.level}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <GroupIcon sx={{ mr: 1, fontSize: 20, color: '#666' }} />
                        {course.students}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={course.status}
                        color={getStatusColor(course.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenDialog(course)}>
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
        </Paper>

        {/* 添加/编辑课程对话框 */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingCourse ? 'Edit Course' : 'Add Course'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Course Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Course Code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Course Category</InputLabel>
                    <Select
                      value={formData.category}
                      label="Course Category"
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <MenuItem value="Speaking">Speaking</MenuItem>
                      <MenuItem value="Reading">Reading</MenuItem>
                      <MenuItem value="Writing">Writing</MenuItem>
                      <MenuItem value="Listening">Listening</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Course Duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Course Level</InputLabel>
                    <Select
                      value={formData.level}
                      label="Course Level"
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    >
                      <MenuItem value="Beginner">Beginner</MenuItem>
                      <MenuItem value="Intermediate">Intermediate</MenuItem>
                      <MenuItem value="Advanced">Advanced</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Course Description"
                    multiline
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                bgcolor: '#4caf50',
                '&:hover': { bgcolor: '#45a049' },
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* 提示消息 */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default TeacherCourses; 