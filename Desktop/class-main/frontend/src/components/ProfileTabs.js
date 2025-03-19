import React from 'react';
import {
  Grid,
  Typography,
  Box,
  Button,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Rating,
  IconButton,
} from '@mui/material';
import {
  VideoCall,
  Book,
  Grade,
  CloudDownload,
  CalendarToday,
  AccessTime,
  Assignment,
  Lock,
  Person as PersonIcon,
  CheckCircle,
  Cancel,
  Warning,
} from '@mui/icons-material';

// Bookings Tab Panel
export const BookingsPanel = ({ bookings, onCancelBooking }) => (
  <List>
    {bookings.map((booking) => (
      <Paper
        key={booking.id}
        elevation={1}
        sx={{ mb: 2, p: 2, borderRadius: 2 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">
              {booking.courseType}课
            </Typography>
            <Typography variant="body2" color="text.secondary">
              教师：{booking.teacherName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              时间：{booking.date} {booking.time}
            </Typography>
          </Box>
          <Chip
            label={
              booking.status === 'confirmed' ? '已确认' :
              booking.status === 'pending' ? '待确认' : '已取消'
            }
            color={
              booking.status === 'confirmed' ? 'success' :
              booking.status === 'pending' ? 'warning' : 'error'
            }
            size="small"
          />
        </Box>
        {booking.status !== 'cancelled' && (
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => onCancelBooking(booking.id)}
            sx={{ mt: 1 }}
          >
            取消预约
          </Button>
        )}
      </Paper>
    ))}
  </List>
);

// Learning Materials Tab Panel
export const MaterialsPanel = ({ materials, homework }) => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        推荐学习资料
      </Typography>
      <List>
        {materials.map((material) => (
          <ListItem
            key={material.id}
            sx={{
              mb: 2,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 1
            }}
          >
            <ListItemIcon>
              {material.type === 'vocabulary' ? <Book /> :
               material.type === 'audio' ? <Grade /> : <Assignment />}
            </ListItemIcon>
            <ListItemText
              primary={material.title}
              secondary={`上传日期：${material.date}`}
            />
            <IconButton href={material.downloadUrl}>
              <CloudDownload />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Grid>
    <Grid item xs={12} md={4}>
      <Typography variant="h6" gutterBottom>
        作业提交记录
      </Typography>
      <List>
        {homework.map((item) => (
          <ListItem
            key={item.id}
            sx={{
              mb: 2,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 1
            }}
          >
            <ListItemText
              primary={item.title}
              secondary={`提交日期：${item.submitDate}`}
            />
            <Chip
              label={item.status === 'submitted' ? '已提交' : `得分：${item.score}`}
              color={item.status === 'submitted' ? 'primary' : 'success'}
              size="small"
            />
          </ListItem>
        ))}
      </List>
    </Grid>
  </Grid>
);

// Feedback Tab Panel
export const FeedbackPanel = ({ feedback }) => (
  <List>
    {feedback.map((item) => (
      <Paper
        key={item.id}
        elevation={1}
        sx={{ mb: 2, p: 2, borderRadius: 2 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" sx={{ flex: 1 }}>
            {item.courseType}课 - {item.teacherName}
          </Typography>
          <Rating value={item.rating} readOnly size="small" />
        </Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {item.date}
        </Typography>
        <Typography variant="body1">
          {item.content}
        </Typography>
      </Paper>
    ))}
  </List>
);

// Notifications Tab Panel
export const NotificationsPanel = ({ notifications, onNotificationRead }) => (
  <List>
    {notifications.map((notification) => (
      <ListItem
        key={notification.id}
        sx={{
          mb: 2,
          bgcolor: notification.read ? 'background.paper' : 'action.hover',
          borderRadius: 2,
          boxShadow: 1
        }}
      >
        <ListItemIcon>
          {notification.type === 'schedule_change' ? <CalendarToday /> : <Assignment />}
        </ListItemIcon>
        <ListItemText
          primary={notification.message}
          secondary={notification.date}
        />
        {!notification.read && (
          <Button
            size="small"
            onClick={() => onNotificationRead(notification.id)}
          >
            标记已读
          </Button>
        )}
      </ListItem>
    ))}
  </List>
);

// Account Management Tab Panel
export const AccountPanel = ({ onEditProfile, onChangePassword }) => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={6}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          账户安全
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Lock />}
          onClick={onChangePassword}
          fullWidth
          sx={{ mb: 2 }}
        >
          修改密码
        </Button>
        <Button
          variant="outlined"
          startIcon={<PersonIcon />}
          onClick={onEditProfile}
          fullWidth
        >
          修改个人资料
        </Button>
      </Paper>
    </Grid>
  </Grid>
); 