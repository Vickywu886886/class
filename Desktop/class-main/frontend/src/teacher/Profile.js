import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Avatar,
  TextField,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Edit as EditIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Language as LanguageIcon,
  Star as StarIcon,
  PhotoCamera as PhotoCameraIcon,
  Save as SaveIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import TeacherNav from '../components/TeacherNav';

const TeacherProfile = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Smith',
    title: 'Senior English Teacher',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    email: 'john.smith@example.com',
    phone: '+1 234 567 8900',
    experience: {
      years: 10,
      subjects: ['IELTS', 'Business English', 'General English'],
      levels: ['Beginner', 'Intermediate', 'Advanced']
    },
    education: [
      {
        degree: 'Master of Education',
        school: 'University of Cambridge',
        year: '2015'
      },
      {
        degree: 'Bachelor of Arts in English',
        school: 'University of Oxford',
        year: '2012'
      }
    ],
    certifications: [
      'CELTA',
      'DELTA',
      'TESOL'
    ],
    languages: [
      'English (Native)',
      'Spanish (Fluent)',
      'French (Intermediate)'
    ],
    ratings: {
      overall: 4.8,
      reviews: 156
    },
    bio: 'Experienced English teacher specializing in IELTS preparation and Business English. Passionate about helping students achieve their language learning goals through personalized instruction and engaging teaching methods.'
  });

  const handleEditOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  const handleProfileUpdate = () => {
    // Handle profile update logic here
    handleEditClose();
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({
          ...profile,
          avatar: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <TeacherNav />

      <Grid container spacing={3}>
        {/* Profile Overview */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ textAlign: 'center', position: 'relative' }}>
              <Avatar
                src={profile.avatar}
                sx={{
                  width: 150,
                  height: 150,
                  mx: 'auto',
                  mb: 2,
                  border: '4px solid',
                  borderColor: 'primary.main'
                }}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                sx={{
                  position: 'absolute',
                  right: 0,
                  bottom: 0
                }}
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handlePhotoUpload}
                />
                <PhotoCameraIcon />
              </IconButton>
            </Box>

            <Typography variant="h5" align="center" gutterBottom>
              {profile.name}
            </Typography>
            <Typography color="textSecondary" align="center" gutterBottom>
              {profile.title}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Chip
                icon={<StarIcon />}
                label={`${profile.ratings.overall} (${profile.ratings.reviews} reviews)`}
                color="primary"
              />
            </Box>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={handleEditOpen}
              sx={{ mb: 3 }}
            >
              Edit Profile
            </Button>

            <List>
              <ListItem>
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Teaching Experience"
                  secondary={`${profile.experience.years} years`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <WorkIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Specializations"
                  secondary={profile.experience.subjects.join(', ')}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LanguageIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Languages"
                  secondary={profile.languages.join(', ')}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Detailed Information */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              About Me
            </Typography>
            <Typography paragraph>
              {profile.bio}
            </Typography>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Education
            </Typography>
            <List>
              {profile.education.map((edu, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={edu.degree}
                      secondary={
                        <React.Fragment>
                          <Typography component="span" variant="body2">
                            {edu.school}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2" color="textSecondary">
                            {edu.year}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  {index < profile.education.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Certifications
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {profile.certifications.map((cert, index) => (
                <Chip
                  key={index}
                  label={cert}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Edit Profile Dialog */}
      <Dialog open={openEdit} onClose={handleEditClose} maxWidth="md" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  defaultValue={profile.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  defaultValue={profile.title}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  defaultValue={profile.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  variant="outlined"
                  defaultValue={profile.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  variant="outlined"
                  multiline
                  rows={4}
                  defaultValue={profile.bio}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Teaching Experience
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {profile.experience.subjects.map((subject, index) => (
                    <Chip
                      key={index}
                      label={subject}
                      onDelete={() => { }}
                      color="primary"
                    />
                  ))}
                  <Chip
                    icon={<AddIcon />}
                    label="Add Subject"
                    onClick={() => { }}
                    variant="outlined"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleProfileUpdate}
            color="primary"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TeacherProfile; 