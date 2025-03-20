import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Assignment as AssignmentIcon,
  Group as GroupIcon,
  Grade as GradeIcon,
} from '@mui/icons-material';
import TeacherNav from '../components/TeacherNav';

const TeacherAssignments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [dialogMode, setDialogMode] = useState('create'); // 'create' or 'edit'

  // Mock assignments data
  const assignments = [
    {
      id: 1,
      title: 'IELTS Writing Task 2 Practice',
      description: 'Write an essay discussing the advantages and disadvantages of remote work.',
      dueDate: '2024-03-30',
      type: 'Writing',
      status: 'active',
      totalStudents: 15,
      submittedCount: 10,
      gradedCount: 8
    },
    {
      id: 2,
      title: 'Business English Presentation',
      description: 'Prepare a 5-minute presentation about your company.',
      dueDate: '2024-04-05',
      type: 'Speaking',
      status: 'active',
      totalStudents: 12,
      submittedCount: 5,
      gradedCount: 3
    },
    // Add more mock assignments as needed
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenCreateDialog = () => {
    setDialogMode('create');
    setSelectedAssignment(null);
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (assignment) => {
    setDialogMode('edit');
    setSelectedAssignment(assignment);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAssignment(null);
  };

  const handleSaveAssignment = () => {
    // Handle save logic here
    handleCloseDialog();
  };

  const filteredAssignments = assignments.filter(assignment =>
    assignment.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <TeacherNav />

      <Grid container spacing={3}>
        {/* Header */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search assignments..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenCreateDialog}
                  >
                    Create Assignment
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Statistics */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="primary">
              {assignments.length}
            </Typography>
            <Typography color="textSecondary">
              Total Assignments
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="primary">
              {assignments.reduce((acc, curr) => acc + (curr.submittedCount - curr.gradedCount), 0)}
            </Typography>
            <Typography color="textSecondary">
              Pending Reviews
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="primary">
              {Math.round(assignments.reduce((acc, curr) => acc + (curr.gradedCount / curr.totalStudents) * 100, 0) / assignments.length)}%
            </Typography>
            <Typography color="textSecondary">
              Grading Progress
            </Typography>
          </Paper>
        </Grid>

        {/* Assignments List */}
        <Grid item xs={12}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <List>
              {filteredAssignments.map((assignment) => (
                <React.Fragment key={assignment.id}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AssignmentIcon sx={{ mr: 1 }} />
                          <Typography variant="h6">
                            {assignment.title}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {assignment.description}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <Chip
                              label={assignment.type}
                              color="primary"
                              size="small"
                            />
                            <Typography variant="body2" color="text.secondary">
                              Due: {assignment.dueDate}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                              <GroupIcon fontSize="small" sx={{ mr: 0.5 }} />
                              <Typography variant="body2">
                                {assignment.submittedCount}/{assignment.totalStudents} Submitted
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                              <GradeIcon fontSize="small" sx={{ mr: 0.5 }} />
                              <Typography variant="body2">
                                {assignment.gradedCount} Graded
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleOpenEditDialog(assignment)}
                        sx={{ mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Create/Edit Assignment Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {dialogMode === 'create' ? 'Create New Assignment' : 'Edit Assignment'}
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  defaultValue={selectedAssignment?.title}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  defaultValue={selectedAssignment?.description}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Due Date"
                  type="date"
                  variant="outlined"
                  defaultValue={selectedAssignment?.dueDate}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Type</InputLabel>
                  <Select
                    label="Type"
                    defaultValue={selectedAssignment?.type || ''}
                  >
                    <MenuItem value="Writing">Writing</MenuItem>
                    <MenuItem value="Speaking">Speaking</MenuItem>
                    <MenuItem value="Reading">Reading</MenuItem>
                    <MenuItem value="Listening">Listening</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSaveAssignment}>
            {dialogMode === 'create' ? 'Create' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TeacherAssignments; 