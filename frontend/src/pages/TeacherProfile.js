import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  styled,
  Chip,
  Avatar,
  Switch,
  FormControlLabel,
  Tabs,
  Tab
} from '@mui/material';
import { format, addDays, startOfWeek } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import TranslateIcon from '@mui/icons-material/Translate';
import SchoolIcon from '@mui/icons-material/School';
import VerifiedIcon from '@mui/icons-material/Verified';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import GradeIcon from '@mui/icons-material/Grade';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '20px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  overflow: 'visible',
  position: 'relative',
  marginTop: '40px'
}));

const TeacherTypeChip = styled(Chip)(({ type }) => ({
  position: 'absolute',
  top: -20,
  left: 20,
  padding: '0 10px',
  height: '40px',
  borderRadius: '20px',
  backgroundColor: type === 'foreign' ? '#2196f3' : '#4caf50',
  color: 'white',
  '& .MuiChip-label': {
    fontSize: '1.1rem',
    fontWeight: 'bold'
  }
}));

const TimeSlotCell = styled(TableCell)(({ theme, isAvailable }) => ({
  cursor: 'pointer',
  backgroundColor: isAvailable ? '#c8e6c9' : '#f5f5f5',
  '&:hover': {
    backgroundColor: isAvailable ? '#a5d6a7' : '#f5f5f5',
  },
  border: '1px solid #e0e0e0',
  padding: '8px',
  textAlign: 'center',
}));

const TeacherProfile = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [teacherType, setTeacherType] = useState('foreign'); // 'foreign' or 'chinese'
  const [profile, setProfile] = useState({
    name: '',
    nativeLanguage: '',
    teachingLanguages: [],
    education: '',
    experience: '',
    introduction: '',
    certificates: [],
    specialties: [],
    videoUrl: '',
    hourlyRate: '',
  });

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const endHour = minute === 30 ? (hour + 1) % 24 : hour;
        const endMinute = minute === 30 ? '00' : '30';
        const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute}`;
        slots.push(`${startTime}-${endTime}`);
      }
    }
    return slots;
  };

  const defaultTimeSlots = generateTimeSlots();

  useEffect(() => {
    // 从本地存储加载教师信息
    const savedData = localStorage.getItem('teacherData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setTimeSlots(data.timeSlots || []);
      setTeacherType(data.teacherType || 'foreign');
      setProfile(data.profile || {});
    }
  }, []);

  const handleSave = () => {
    const teacherData = {
      timeSlots,
      teacherType,
      profile
    };
    localStorage.setItem('teacherData', JSON.stringify(teacherData));
    setSnackbar({
      open: true,
      message: '保存成功！',
      severity: 'success'
    });
  };

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTimeSlotClick = (day, timeSlot) => {
    const slotKey = `${format(day, 'yyyy-MM-dd')}_${timeSlot}`;
    setTimeSlots(prev => {
      const newSlots = new Set(prev);
      if (newSlots.has(slotKey)) {
        newSlots.delete(slotKey);
      } else {
        newSlots.add(slotKey);
      }
      return Array.from(newSlots);
    });
  };

  const isTimeSlotAvailable = (day, timeSlot) => {
    const slotKey = `${format(day, 'yyyy-MM-dd')}_${timeSlot}`;
    return timeSlots.includes(slotKey);
  };

  const generateWeekDays = () => {
    const today = startOfWeek(new Date(), { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(today, i));
  };

  const weekDays = generateWeekDays();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{
        color: '#2e7d32',
        textAlign: 'center',
        mb: 4
      }}>
        教师中心
      </Typography>

      <FormControlLabel
        control={
          <Switch
            checked={teacherType === 'foreign'}
            onChange={(e) => setTeacherType(e.target.checked ? 'foreign' : 'chinese')}
            color="primary"
          />
        }
        label={teacherType === 'foreign' ? '外教身份' : '中教身份'}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={3}>
        {/* 基本信息卡片 */}
        <Grid item xs={12}>
          <StyledCard>
            <TeacherTypeChip
              type={teacherType}
              icon={teacherType === 'foreign' ? <TranslateIcon /> : <SchoolIcon />}
              label={teacherType === 'foreign' ? '外教教师' : '中教教师'}
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Avatar
                      src={profile.avatar}
                      sx={{
                        width: 120,
                        height: 120,
                        margin: '0 auto',
                        border: '3px solid',
                        borderColor: teacherType === 'foreign' ? '#2196f3' : '#4caf50'
                      }}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="avatar-upload"
                    />
                    <label htmlFor="avatar-upload">
                      <Button
                        component="span"
                        variant="outlined"
                        sx={{ mt: 2 }}
                      >
                        更换头像
                      </Button>
                    </label>
                  </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="姓名"
                        value={profile.name}
                        onChange={(e) => handleProfileChange('name', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="母语"
                        value={profile.nativeLanguage}
                        onChange={(e) => handleProfileChange('nativeLanguage', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="教育背景"
                        value={profile.education}
                        onChange={(e) => handleProfileChange('education', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="课时费率"
                        value={profile.hourlyRate}
                        onChange={(e) => handleProfileChange('hourlyRate', e.target.value)}
                        placeholder="例如：¥200/课时"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <VerifiedIcon color="primary" /> 资质认证
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="教师资质"
                  value={profile.certificates}
                  onChange={(e) => handleProfileChange('certificates', e.target.value)}
                  placeholder={teacherType === 'foreign' ? "TESOL, CELTA等国际教师资格证" : "教师资格证等相关资质"}
                  sx={{ mb: 2 }}
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WorkHistoryIcon color="primary" /> 教学经验
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="教学经历"
                  value={profile.experience}
                  onChange={(e) => handleProfileChange('experience', e.target.value)}
                  placeholder="请详细描述您的教学经验..."
                  sx={{ mb: 2 }}
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <GradeIcon color="primary" /> 教学特长
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="个人介绍"
                  value={profile.introduction}
                  onChange={(e) => handleProfileChange('introduction', e.target.value)}
                  placeholder="请介绍您的教学风格和特长..."
                  sx={{ mb: 2 }}
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  可用时间设置
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>时间段</TableCell>
                        {weekDays.map((day) => (
                          <TableCell key={day.toString()} align="center">
                            {format(day, 'MM/dd EEE', { locale: zhCN })}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {defaultTimeSlots.map((timeSlot) => (
                        <TableRow key={timeSlot}>
                          <TableCell component="th" scope="row" sx={{ whiteSpace: 'nowrap' }}>
                            {timeSlot}
                          </TableCell>
                          {weekDays.map((day) => {
                            const isAvailable = isTimeSlotAvailable(day, timeSlot);
                            return (
                              <TimeSlotCell
                                key={day.toString()}
                                isAvailable={isAvailable}
                                onClick={() => handleTimeSlotClick(day, timeSlot)}
                                sx={{
                                  backgroundColor: isAvailable ? '#c8e6c9' : '#f5f5f5',
                                  '&:hover': {
                                    backgroundColor: isAvailable ? '#a5d6a7' : '#e0e0e0',
                                  },
                                }}
                              >
                                {isAvailable ? '可用' : ''}
                              </TimeSlotCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  sx={{
                    bgcolor: teacherType === 'foreign' ? '#2196f3' : '#4caf50',
                    '&:hover': {
                      bgcolor: teacherType === 'foreign' ? '#1976d2' : '#388e3c'
                    }
                  }}
                >
                  保存设置
                </Button>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%', borderRadius: '15px' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TeacherProfile; 