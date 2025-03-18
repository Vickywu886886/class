import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Chip,
  Divider,
} from '@mui/material';
import { Mic } from '@mui/icons-material';

const TeacherCard = ({ teacher }) => {
  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: 'center' }}>
            <Avatar
              src={teacher.avatar}
              sx={{ width: 150, height: 150, mx: 'auto', mb: 2 }}
            />
            <Typography variant="h6">{teacher.firstName} {teacher.lastName}</Typography>
            <Typography color="textSecondary" gutterBottom>
              {teacher.experience.years} years of teaching experience
            </Typography>
            {teacher.audioIntroduction && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Audio Introduction</Typography>
                <audio controls src={teacher.audioIntroduction} style={{ width: '100%' }} />
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="subtitle1" gutterBottom>Introduction</Typography>
          <Typography paragraph>{teacher.introduction}</Typography>
          
          <Typography variant="subtitle1" gutterBottom>Teaching Philosophy</Typography>
          <Typography paragraph>{teacher.teachingPhilosophy}</Typography>
          
          <Typography variant="subtitle1" gutterBottom>Specialties</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {teacher.teachingStyle.specialties.map((specialty, index) => (
              <Chip key={index} label={specialty} color="primary" variant="outlined" />
            ))}
          </Box>
          
          <Typography variant="subtitle1" gutterBottom>Teaching Methods</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {teacher.teachingStyle.methods.map((method, index) => (
              <Chip key={index} label={method} color="secondary" variant="outlined" />
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" gutterBottom>Education</Typography>
          {teacher.education.map((edu, index) => (
            <Typography key={index} variant="body2" paragraph>
              {edu.degree} - {edu.university} ({edu.year})
            </Typography>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
};

const TeacherTeam = () => {
  // Mock data for teachers
  const teachers = [
    {
      firstName: 'Wendy',
      lastName: 'Wang',
      avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
      experience: {
        years: 20,
        ageGroups: ['High School', 'University', 'Adult'],
        courseTypes: ['Programming', 'Data Structures', 'Algorithms']
      },
      teachingStyle: {
        methods: ['Interactive Learning', 'Project-Based', 'Flipped Classroom'],
        specialties: ['KET Preparation', 'Speaking Practice', 'Grammar']
      },
      introduction: 'Teaching computer science for 20 years, with expertise in algorithm and data structure teaching.',
      teachingPhilosophy: 'Learning through practice and real-world applications',
      education: [
        {
          degree: 'Ph.D. in Computer Science',
          university: 'Stanford University',
          year: '2010-2015'
        },
        {
          degree: 'M.S. in Computer Science',
          university: 'Tsinghua University',
          year: '2008-2010'
        }
      ],
      audioIntroduction: null
    },
    // Add more teachers here
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Our Teaching Team
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Meet our experienced and dedicated teachers who are committed to providing quality education.
      </Typography>
      
      <Grid container spacing={3}>
        {teachers.map((teacher, index) => (
          <Grid item xs={12} key={index}>
            <TeacherCard teacher={teacher} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TeacherTeam; 