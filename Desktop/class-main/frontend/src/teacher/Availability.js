import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Chip,
  Alert,
  FormControl,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  Tooltip,
  Snackbar,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  DialogContentText,
  Avatar,
  Menu,
  Switch,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  CalendarToday as CalendarTodayIcon,
  ViewList as ViewListIcon,
  Event as EventIcon,
  AccessTime as AccessTimeIcon,
  Warning as WarningIcon,
  Repeat as RepeatIcon,
  PauseCircle as PauseCircleIcon,
  PlayCircle as PlayCircleIcon,
  Info as InfoIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
  Block as BlockIcon,
  Save as SaveIcon,
  CheckCircle as CheckCircleIcon,
  Undo as UndoIcon,
  WbSunny as WbSunnyIcon,
  Nightlight as NightlightIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Chat as ChatIcon,
  Close as CloseIcon,
  Person as PersonIcon,
  Message as MessageIcon,
  MoreVert as MoreVertIcon,
  Notifications as NotificationsIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { format, isAfter, isBefore, isEqual, addDays, isWeekend, isHoliday, startOfWeek, endOfWeek, eachDayOfInterval, addWeeks, subWeeks, startOfDay, endOfDay, addHours } from 'date-fns';
import zhCN from 'date-fns/locale/zh-CN';
import TeacherNav from '../components/TeacherNav';
import {
  getUserTimezone,
  formatTimeWithTimezone,
  getTimezoneDisplay,
  isTimeInValidRange,
  isNightTime,
  hasTimeConflict,
  getReminderTimes,
  generateTimeSlots,
} from '../utils/timezone';

const TeacherAvailability = () => {
  // State for view mode (calendar/list)
  const [viewMode, setViewMode] = useState('calendar');
  
  // State for availability slots
  const [availabilitySlots, setAvailabilitySlots] = useState([]);
  
  // State for dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  // State for new slot form
  const [newSlot, setNewSlot] = useState({
    dates: [],
    startTime: null,
    endTime: null,
    isRecurring: false,
    recurringDays: [],
    notes: '',
    status: 'active',
  });
  
  // State for notifications
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Add new state for booking details dialog
  const [bookingDetailsDialog, setBookingDetailsDialog] = useState({
    open: false,
    booking: null,
  });

  // Add new state variables
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookingRequests, setBookingRequests] = useState([]);

  // Add quick reply templates
  const quickReplies = [
    { id: 1, text: 'This time slot is full, please choose another time' },
    { id: 2, text: 'Sorry, I have other classes scheduled for this time' },
    { id: 3, text: 'I have received your booking request, will confirm shortly' },
  ];

  // Mock data for holidays
  const holidays = [
    { date: '2024-01-01', name: 'New Year' },
    { date: '2024-02-10', name: 'Chinese New Year' },
    // Add more holidays as needed
  ];

  // Time slot configuration (30-minute intervals)
  const TIME_SLOTS = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = (i % 2) * 30;
    return {
      start: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      end: minute === 0 
        ? `${String(hour).padStart(2, '0')}:30`
        : `${String(hour + 1).padStart(2, '0')}:00`
    };
  });

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [isRecurring, setIsRecurring] = useState(false);
  const [lastAction, setLastAction] = useState(null);
  const [isUndoable, setIsUndoable] = useState(false);
  const [clickTimeout, setClickTimeout] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [teacherTimezone, setTeacherTimezone] = useState(getUserTimezone());
  const [studentTimezone, setStudentTimezone] = useState('Asia/Shanghai'); // 默认学生时区
  const [showStudentTime, setShowStudentTime] = useState(true);

  // Add more mock booking data with different course types
  const mockBookings = [
    {
      id: 1,
      studentName: 'Zhang San',
      courseType: 'Speaking Class',
      duration: '60 minutes',
      date: '2024-03-20',
      time: '10:00',
      icon: <ChatIcon />,
    },
    {
      id: 2,
      studentName: 'Li Si',
      courseType: 'Exam Preparation',
      duration: '90 minutes',
      date: '2024-03-20',
      time: '14:00',
      icon: <AssignmentIcon />,
    },
    {
      id: 3,
      studentName: 'Wang Wu',
      courseType: 'Course Tutoring',
      duration: '60 minutes',
      date: '2024-03-20',
      time: '16:00',
      icon: <SchoolIcon />,
    },
  ];

  // Add new state for time slots
  const [timeSlots] = useState(generateTimeSlots());

  // Handle view mode change
  const handleViewModeChange = (event, newMode) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  // Handle dialog open for adding new slot
  const handleAddSlot = () => {
    setDialogMode('add');
    setSelectedSlot(null);
    setNewSlot({
      dates: [],
      startTime: null,
      endTime: null,
      isRecurring: false,
      recurringDays: [],
      notes: '',
      status: 'active',
    });
    setOpenDialog(true);
  };

  // Handle dialog open for editing slot
  const handleEditSlot = (slot) => {
    setDialogMode('edit');
    setSelectedSlot(slot);
    setNewSlot({
      ...slot,
    });
    setOpenDialog(true);
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedSlot(null);
  };

  // Handle save slot
  const handleSaveSlot = () => {
    // Validate time slots
    if (!newSlot.startTime || !newSlot.endTime) {
      setSnackbar({
        open: true,
        message: 'Please select start and end time',
        severity: 'error',
      });
      return;
    }

    // Validate dates
    if (newSlot.dates.length === 0 && !newSlot.isRecurring) {
      setSnackbar({
        open: true,
        message: 'Please select date',
        severity: 'error',
      });
      return;
    }

    // Check for conflicts
    const hasConflict = checkTimeConflicts(newSlot);
    if (hasConflict) {
      setSnackbar({
        open: true,
        message: 'Selected time conflicts with existing time slots',
        severity: 'error',
      });
      return;
    }

    // Check for holidays
    const holidayConflicts = checkHolidayConflicts(newSlot);
    if (holidayConflicts.length > 0) {
      setSnackbar({
        open: true,
        message: `Note: The following dates are holidays: ${holidayConflicts.join(', ')}`,
        severity: 'warning',
      });
    }

    if (dialogMode === 'add') {
      setAvailabilitySlots([...availabilitySlots, { ...newSlot, id: Date.now() }]);
    } else {
      setAvailabilitySlots(
        availabilitySlots.map((slot) =>
          slot.id === selectedSlot.id ? { ...newSlot, id: slot.id } : slot
        )
      );
    }

    setSnackbar({
      open: true,
      message: dialogMode === 'add' ? 'Time slot added successfully' : 'Time slot updated successfully',
      severity: 'success',
    });
    handleCloseDialog();
  };

  // Handle delete slot
  const handleDeleteSlot = (slotId) => {
    setAvailabilitySlots(availabilitySlots.filter((slot) => slot.id !== slotId));
    setSnackbar({
      open: true,
      message: 'Time slot deleted successfully',
      severity: 'success',
    });
  };

  // Handle toggle slot status
  const handleToggleStatus = (slotId) => {
    setAvailabilitySlots(
      availabilitySlots.map((slot) =>
        slot.id === slotId
          ? { ...slot, status: slot.status === 'active' ? 'paused' : 'active' }
          : slot
      )
    );
    setSnackbar({
      open: true,
      message: 'Status updated successfully',
      severity: 'success',
    });
  };

  // Check for time conflicts
  const checkTimeConflicts = (newSlot) => {
    return availabilitySlots.some((slot) => {
      if (slot.id === selectedSlot?.id) return false;
      
      const hasDateOverlap = newSlot.dates.some((date) =>
        slot.dates.includes(date)
      );
      
      if (!hasDateOverlap) return false;
      
      return (
        (isEqual(newSlot.startTime, slot.startTime) ||
          isAfter(newSlot.startTime, slot.startTime)) &&
        isBefore(newSlot.startTime, slot.endTime)
      );
    });
  };

  // Check for holiday conflicts
  const checkHolidayConflicts = (newSlot) => {
    return newSlot.dates
      .filter((date) =>
        holidays.some((holiday) => holiday.date === format(date, 'yyyy-MM-dd'))
      )
      .map((date) => format(date, 'yyyy-MM-dd'));
  };

  // 处理时间段选择（带防抖）
  const handleSlotClick = (dateTime) => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
    }

    const timeout = setTimeout(() => {
      const slotKey = format(dateTime, 'yyyy-MM-dd HH:mm');
      const newSelectedSlots = new Set(selectedSlots);
      
      if (newSelectedSlots.has(slotKey)) {
        newSelectedSlots.delete(slotKey);
        setLastAction({ type: 'remove', slotKey });
        // 从 availabilitySlots 中移除对应的时间段
        setAvailabilitySlots(availabilitySlots.filter(slot => 
          format(new Date(slot.startTime), 'yyyy-MM-dd HH:mm') !== slotKey
        ));
      } else {
        // 检查时间冲突
        const hasConflict = availabilitySlots.some(slot => {
          const slotStart = new Date(slot.startTime);
          const slotEnd = new Date(slot.endTime);
          return isEqual(dateTime, slotStart) || 
                 (isAfter(dateTime, slotStart) && isBefore(dateTime, slotEnd));
        });

        if (hasConflict) {
          setSnackbar({
            open: true,
            message: '⚠️ This time slot is already booked',
            severity: 'warning'
          });
          return;
        }

        newSelectedSlots.add(slotKey);
        setLastAction({ type: 'add', slotKey });
        
        // 添加到 availabilitySlots
        const newSlot = {
          id: Date.now(),
          startTime: dateTime,
          endTime: addHours(dateTime, 1),
          status: 'active',
          notes: '',
          isRecurring: false,
          dates: [dateTime]
        };
        setAvailabilitySlots([...availabilitySlots, newSlot]);
      }
      
      setSelectedSlots(newSelectedSlots);
      setIsUndoable(true);
      setSnackbar({
        open: true,
        message: '✅ Time slot updated successfully',
        severity: 'success'
      });
    }, 200);

    setClickTimeout(timeout);
  };

  // 处理撤销操作
  const handleUndo = () => {
    if (lastAction) {
      const newSelectedSlots = new Set(selectedSlots);
      if (lastAction.type === 'add') {
        newSelectedSlots.delete(lastAction.slotKey);
        // 从 availabilitySlots 中移除
        setAvailabilitySlots(availabilitySlots.filter(slot => 
          format(new Date(slot.startTime), 'yyyy-MM-dd HH:mm') !== lastAction.slotKey
        ));
      } else {
        newSelectedSlots.add(lastAction.slotKey);
        // 添加到 availabilitySlots
        const dateTime = new Date(lastAction.slotKey);
        const newSlot = {
          id: Date.now(),
          startTime: dateTime,
          endTime: addHours(dateTime, 1),
          status: 'active',
          notes: '',
          isRecurring: false,
          dates: [dateTime]
        };
        setAvailabilitySlots([...availabilitySlots, newSlot]);
      }
      setSelectedSlots(newSelectedSlots);
      setLastAction(null);
      setIsUndoable(false);
      setSnackbar({
        open: true,
        message: 'Last action undone',
        severity: 'info'
      });
    }
  };

  // 处理标记整天上午/下午
  const handleMarkHalfDay = (date, isMorning) => {
    const startHour = isMorning ? 9 : 14;
    const endHour = isMorning ? 12 : 18;
    const newSelectedSlots = new Set(selectedSlots);
    const newAvailabilitySlots = [...availabilitySlots];
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const dateTime = new Date(date);
        dateTime.setHours(hour, minute);
        const slotKey = format(dateTime, 'yyyy-MM-dd HH:mm');
        newSelectedSlots.add(slotKey);
        
        // 检查是否已存在该时间段
        const exists = newAvailabilitySlots.some(slot => 
          format(new Date(slot.startTime), 'yyyy-MM-dd HH:mm') === slotKey
        );
        
        if (!exists) {
          newAvailabilitySlots.push({
            id: Date.now() + Math.random(),
            startTime: dateTime,
            endTime: addHours(dateTime, 1),
            status: 'active',
            notes: '',
            isRecurring: false,
            dates: [dateTime]
          });
        }
      }
    }
    
    setSelectedSlots(newSelectedSlots);
    setAvailabilitySlots(newAvailabilitySlots);
    setSnackbar({
      open: true,
      message: `Marked ${isMorning ? 'morning' : 'afternoon'} time slot`,
      severity: 'success'
    });
  };

  // Add function to handle booking details dialog
  const handleBookingDetailsClick = (dateTime) => {
    const booking = mockBookings.find(b => 
      format(new Date(`${b.date}T${b.time}`), 'yyyy-MM-dd HH:mm') === 
      format(dateTime, 'yyyy-MM-dd HH:mm')
    );
    
    if (booking) {
      setBookingDetailsDialog({
        open: true,
        booking,
      });
    }
  };

  // Add function to handle booking details dialog close
  const handleBookingDetailsClose = () => {
    setBookingDetailsDialog({
      open: false,
      booking: null,
    });
  };

  // Add new handlers
  const handleMenuClick = (event, booking) => {
    setAnchorEl(event.currentTarget);
    setSelectedBooking(booking);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedBooking(null);
  };

  const handleQuickReply = (reply) => {
    console.log('Sending quick reply:', reply);
    setSnackbar({
      open: true,
      message: 'Quick reply sent',
      severity: 'success',
    });
    handleMenuClose();
  };

  const handleBookingResponse = (booking, accepted) => {
    if (!booking) return;
    
    const action = accepted ? 'accepted' : 'rejected';
    setSnackbar({
      open: true,
      message: `Booking request ${action} by ${booking.studentName}`,
      severity: 'success',
    });
    handleMenuClose();
  };

  // 渲染日历视图
  const renderCalendarView = useCallback(() => {
    // 获取当前周的日期范围
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekDates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    // 处理日期导航
    const handlePrevWeek = () => setCurrentDate(subWeeks(currentDate, 1));
    const handleNextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
    
    // 处理拖拽选择
    const handleDragStart = (dateTime) => {
      setIsDragging(true);
      setDragStart(dateTime);
      handleSlotClick(dateTime);
    };

    const handleDragEnter = (dateTime) => {
      if (isDragging && dragStart) {
        const startTime = dragStart < dateTime ? dragStart : dateTime;
        const endTime = dragStart < dateTime ? dateTime : dragStart;
        
        const newSelectedSlots = new Set();
        let current = startTime;
        
        while (current <= endTime) {
          const slotKey = format(current, 'yyyy-MM-dd HH:mm');
          newSelectedSlots.add(slotKey);
          current = addHours(current, 1);
        }
        
        setSelectedSlots(newSelectedSlots);
      }
    };

    const handleDragEnd = () => {
      setIsDragging(false);
      setDragStart(null);
    };

    // 处理清除选择
    const handleClearWeek = () => {
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
      const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
      
      // 清除 selectedSlots
      setSelectedSlots(new Set());
      
      // 清除 availabilitySlots 中本周的时间段
      setAvailabilitySlots(availabilitySlots.filter(slot => {
        const slotDate = new Date(slot.startTime);
        return slotDate < weekStart || slotDate > weekEnd;
      }));
      
      setSnackbar({
        open: true,
        message: 'All time slots cleared for this week',
        severity: 'success'
      });
    };

    return (
      <Box>
        {/* 工具栏 */}
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <IconButton onClick={handlePrevWeek}>
              <NavigateBeforeIcon />
            </IconButton>
            <Typography variant="h6" component="span" sx={{ mx: 2 }}>
              {format(weekStart, 'MMM dd, yyyy')} - {format(addDays(weekStart, 6), 'MMM dd')}
            </Typography>
            <IconButton onClick={handleNextWeek}>
              <NavigateNextIcon />
            </IconButton>
          </Box>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                />
              }
              label="Repeat weekly"
            />
            <Button
              variant="outlined"
              startIcon={<UndoIcon />}
              onClick={handleUndo}
              disabled={!isUndoable}
              sx={{ mr: 1 }}
            >
              Undo
            </Button>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={handleClearWeek}
              sx={{ mr: 1 }}
            >
              Clear week
            </Button>
          </Box>
        </Box>

        {/* 时间表格 */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell width={100}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="subtitle2">Time</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {getTimezoneDisplay(teacherTimezone)}
                    </Typography>
                  </Box>
                </TableCell>
                {weekDates.map((date) => (
                  <TableCell key={date.toISOString()} align="center">
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Typography variant="subtitle2">
                        {format(date, 'E')}
                      </Typography>
                      <Typography variant="caption" display="block">
                        {format(date, 'MM/dd')}
                      </Typography>
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {TIME_SLOTS.map((timeSlot) => (
                <TableRow key={timeSlot.start}>
                  <TableCell>
                    {timeSlot.start} - {timeSlot.end}
                  </TableCell>
                  {weekDates.map((date) => {
                    const dateTime = new Date(`${format(date, 'yyyy-MM-dd')}T${timeSlot.start}`);
                    const slotKey = format(dateTime, 'yyyy-MM-dd HH:mm');
                    
                    // 检查是否已预约
                    const booking = mockBookings.find(b => 
                      format(new Date(`${b.date}T${b.time}`), 'yyyy-MM-dd HH:mm') === format(dateTime, 'yyyy-MM-dd HH:mm')
                    );
                    const isBooked = Boolean(booking);
                    
                    // 只有未预约的时间段才能被选择为空闲
                    const isSelected = !isBooked && selectedSlots.has(slotKey);

                    return (
                      <TableCell
                        key={date.toISOString()}
                        align="center"
                        sx={{
                          cursor: 'pointer',
                          bgcolor: isBooked ? '#2196f3' : // 蓝色 = 已预约
                                  isSelected ? '#4caf50' : // 绿色 = 空闲时间
                                  'inherit',
                          '&:hover': {
                            bgcolor: isBooked ? '#1976d2' : 
                                     isSelected ? '#45a049' : 
                                     'action.hover',
                          },
                          transition: 'all 0.2s',
                          position: 'relative'
                        }}
                        onMouseDown={() => !isBooked && handleDragStart(dateTime)}
                        onMouseEnter={() => !isBooked && handleDragEnter(dateTime)}
                        onMouseUp={handleDragEnd}
                        onClick={() => isBooked ? handleBookingDetailsClick(dateTime) : handleSlotClick(dateTime)}
                      >
                        {isBooked ? (
                          <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            gap: 0.5,
                            color: 'white',
                            p: 0.5,
                            position: 'relative'
                          }}>
                            {booking.icon}
                            <Typography variant="caption" sx={{ 
                              fontSize: '0.7rem',
                              fontWeight: 'bold',
                              textAlign: 'center',
                              lineHeight: 1.2
                            }}>
                              {booking.studentName}
                            </Typography>
                            <Typography variant="caption" sx={{ 
                              fontSize: '0.65rem',
                              opacity: 0.9
                            }}>
                              {booking.courseType}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={(e) => handleMenuClick(e, booking)}
                              sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                color: 'white',
                                '&:hover': {
                                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                                }
                              }}
                            >
                              <MoreVertIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        ) : isSelected ? (
                          <CheckCircleIcon fontSize="small" sx={{ color: 'white' }} />
                        ) : null}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 首次使用提示 */}
        {!showTooltip && (
          <Snackbar
            open={true}
            autoHideDuration={6000}
            onClose={() => setShowTooltip(true)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert severity="info" sx={{ width: '100%' }}>
              Click on a time slot to mark it as available, supports dragging to select multiple time slots
            </Alert>
          </Snackbar>
        )}

        {/* Booking management menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleBookingDetailsClick(selectedBooking?.dateTime)}>
            <ListItemIcon>
              <InfoIcon fontSize="small" />
            </ListItemIcon>
            View Details
          </MenuItem>
          <MenuItem onClick={() => handleQuickReply(quickReplies[0])}>
            <ListItemIcon>
              <MessageIcon fontSize="small" />
            </ListItemIcon>
            Send Message
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleBookingResponse(selectedBooking, true)}>
            <ListItemIcon>
              <CheckIcon fontSize="small" color="success" />
            </ListItemIcon>
            Accept Booking
          </MenuItem>
          <MenuItem onClick={() => handleBookingResponse(selectedBooking, false)}>
            <ListItemIcon>
              <CloseIcon fontSize="small" color="error" />
            </ListItemIcon>
            Reject Booking
          </MenuItem>
        </Menu>

        {/* Booking requests section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Booking Requests
          </Typography>
          <List>
            {bookingRequests.map((request) => (
              <ListItem
                key={request.id}
                sx={{
                  mb: 1,
                  bgcolor: request.hasConflict ? 'error.light' : 'background.paper',
                  borderRadius: 1,
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                }}
              >
                <ListItemIcon>
                  <Avatar sx={{ bgcolor: request.hasConflict ? 'error.main' : 'primary.main' }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1">
                        {request.studentName}
                      </Typography>
                      <Chip
                        label={request.type}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(76, 175, 80, 0.1)',
                          color: '#2D5A27',
                        }}
                      />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        {request.date} {request.time}
                      </Typography>
                      {request.hasConflict && (
                        <Typography variant="body2" color="error">
                          Conflicts with {request.conflictWith.studentName}'s class time
                        </Typography>
                      )}
                    </Box>
                  }
                />
                <Box>
                  <Button
                    size="small"
                    color="success"
                    onClick={() => handleBookingResponse(request, true)}
                    sx={{ mr: 1 }}
                  >
                    Accept
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleBookingResponse(request, false)}
                  >
                    Reject
                  </Button>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    );
  }, [currentDate, selectedSlots, isDragging, dragStart, isRecurring, mockBookings]);

  // Render list view
  const renderListView = () => {
    return (
      <List>
        {availabilitySlots.map((slot) => (
          <ListItem
            key={slot.id}
            sx={{
              mb: 2,
              bgcolor: 'background.paper',
              borderRadius: 1,
              border: '1px solid rgba(0, 0, 0, 0.12)',
            }}
          >
            <ListItemIcon>
              <EventIcon color={slot.status === 'active' ? 'primary' : 'disabled'} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="subtitle1">
                    {format(slot.startTime, 'HH:mm')} - {format(slot.endTime, 'HH:mm')}
                  </Typography>
                  <Chip
                    label={slot.status === 'active' ? 'Available' : 'Paused'}
                    size="small"
                    color={slot.status === 'active' ? 'success' : 'default'}
                  />
                  {slot.isRecurring && (
                    <Chip
                      label="Recurring"
                      size="small"
                      icon={<RepeatIcon />}
                      sx={{ bgcolor: 'info.light', color: 'white' }}
                    />
                  )}
                </Box>
              }
              secondary={
                <Box sx={{ mt: 1 }}>
                  {slot.isRecurring ? (
                    <Typography variant="body2" color="textSecondary">
                      Recurring days: {slot.recurringDays.join(', ')}
                    </Typography>
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      Dates: {slot.dates.map((date) => format(date, 'yyyy-MM-dd')).join(', ')}
                    </Typography>
                  )}
                  {slot.notes && (
                    <Typography variant="body2" color="textSecondary">
                      Notes: {slot.notes}
                    </Typography>
                  )}
                </Box>
              }
            />
            <ListItemSecondaryAction>
              <Tooltip title={slot.status === 'active' ? 'Pause' : 'Enable'}>
                <IconButton
                  edge="end"
                  onClick={() => handleToggleStatus(slot.id)}
                  sx={{ mr: 1 }}
                >
                  {slot.status === 'active' ? <PauseCircleIcon /> : <PlayCircleIcon />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton
                  edge="end"
                  onClick={() => handleEditSlot(slot)}
                  sx={{ mr: 1 }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  edge="end"
                  onClick={() => handleDeleteSlot(slot.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <TeacherNav />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ color: '#2D5A27' }}>
            Availability Management
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={handleViewModeChange}
              size="small"
            >
              <ToggleButton value="calendar">
                <CalendarTodayIcon sx={{ mr: 1 }} />
                Calendar View
              </ToggleButton>
              <ToggleButton value="list">
                <ViewListIcon sx={{ mr: 1 }} />
                List View
              </ToggleButton>
            </ToggleButtonGroup>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddSlot}
              sx={{
                bgcolor: '#4caf50',
                '&:hover': { bgcolor: '#45a049' },
              }}
            >
              Add Time Slot
            </Button>
          </Box>
        </Box>

        {/* Time Zone Settings */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#2D5A27' }}>
            Time Zone Settings
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Your Time Zone</InputLabel>
                <Select
                  value={teacherTimezone}
                  label="Your Time Zone"
                  onChange={(e) => setTeacherTimezone(e.target.value)}
                >
                  <MenuItem value="Asia/Shanghai">Asia/Shanghai (GMT+8)</MenuItem>
                  <MenuItem value="Asia/Tokyo">Asia/Tokyo (GMT+9)</MenuItem>
                  <MenuItem value="Asia/Seoul">Asia/Seoul (GMT+9)</MenuItem>
                  <MenuItem value="Asia/Singapore">Asia/Singapore (GMT+8)</MenuItem>
                  <MenuItem value="Asia/Hong_Kong">Asia/Hong Kong (GMT+8)</MenuItem>
                  <MenuItem value="Asia/Taipei">Asia/Taipei (GMT+8)</MenuItem>
                  <MenuItem value="America/New_York">America/New York (GMT-4)</MenuItem>
                  <MenuItem value="America/Los_Angeles">America/Los Angeles (GMT-7)</MenuItem>
                  <MenuItem value="America/Chicago">America/Chicago (GMT-5)</MenuItem>
                  <MenuItem value="Europe/London">Europe/London (GMT+0)</MenuItem>
                  <MenuItem value="Europe/Paris">Europe/Paris (GMT+1)</MenuItem>
                  <MenuItem value="Europe/Berlin">Europe/Berlin (GMT+1)</MenuItem>
                  <MenuItem value="Europe/Rome">Europe/Rome (GMT+1)</MenuItem>
                  <MenuItem value="Europe/Madrid">Europe/Madrid (GMT+1)</MenuItem>
                  <MenuItem value="Australia/Sydney">Australia/Sydney (GMT+11)</MenuItem>
                  <MenuItem value="Australia/Melbourne">Australia/Melbourne (GMT+11)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Student Time Zone</InputLabel>
                <Select
                  value={studentTimezone}
                  label="Student Time Zone"
                  onChange={(e) => setStudentTimezone(e.target.value)}
                >
                  <MenuItem value="Asia/Shanghai">Asia/Shanghai (GMT+8)</MenuItem>
                  <MenuItem value="Asia/Tokyo">Asia/Tokyo (GMT+9)</MenuItem>
                  <MenuItem value="Asia/Seoul">Asia/Seoul (GMT+9)</MenuItem>
                  <MenuItem value="Asia/Singapore">Asia/Singapore (GMT+8)</MenuItem>
                  <MenuItem value="Asia/Hong_Kong">Asia/Hong Kong (GMT+8)</MenuItem>
                  <MenuItem value="Asia/Taipei">Asia/Taipei (GMT+8)</MenuItem>
                  <MenuItem value="America/New_York">America/New York (GMT-4)</MenuItem>
                  <MenuItem value="America/Los_Angeles">America/Los Angeles (GMT-7)</MenuItem>
                  <MenuItem value="America/Chicago">America/Chicago (GMT-5)</MenuItem>
                  <MenuItem value="Europe/London">Europe/London (GMT+0)</MenuItem>
                  <MenuItem value="Europe/Paris">Europe/Paris (GMT+1)</MenuItem>
                  <MenuItem value="Europe/Berlin">Europe/Berlin (GMT+1)</MenuItem>
                  <MenuItem value="Europe/Rome">Europe/Rome (GMT+1)</MenuItem>
                  <MenuItem value="Europe/Madrid">Europe/Madrid (GMT+1)</MenuItem>
                  <MenuItem value="Australia/Sydney">Australia/Sydney (GMT+11)</MenuItem>
                  <MenuItem value="Australia/Melbourne">Australia/Melbourne (GMT+11)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={showStudentTime}
                    onChange={(e) => setShowStudentTime(e.target.checked)}
                    color="primary"
                  />
                }
                label="Show student time zone"
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Main Content */}
        <Paper sx={{ p: 3 }}>
          {viewMode === 'calendar' ? renderCalendarView() : renderListView()}
        </Paper>

        {/* Add/Edit Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>
            {dialogMode === 'add' ? 'Add Time Slot' : 'Edit Time Slot'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                {/* 时区信息 */}
                <Grid item xs={12}>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Current time zone information:
                    </Typography>
                    <Typography variant="body2">
                      {getTimezoneDisplay(teacherTimezone)}
                    </Typography>
                  </Alert>
                </Grid>

                {/* Date Selection */}
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={newSlot.isRecurring}
                        onChange={(e) =>
                          setNewSlot({ ...newSlot, isRecurring: e.target.checked })
                        }
                      />
                    }
                    label="Set recurring time"
                  />
                </Grid>

                {newSlot.isRecurring ? (
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Select recurring days</InputLabel>
                      <Select
                        multiple
                        value={newSlot.recurringDays}
                        onChange={(e) =>
                          setNewSlot({ ...newSlot, recurringDays: e.target.value })
                        }
                        renderValue={(selected) => selected.join(', ')}
                      >
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
                          (day) => (
                            <MenuItem key={day} value={day}>
                              {day}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl>
                  </Grid>
                ) : (
                  <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={zhCN}>
                      <DatePicker
                        label="Select dates"
                        value={newSlot.dates}
                        onChange={(newValue) =>
                          setNewSlot({ ...newSlot, dates: Array.isArray(newValue) ? newValue : [newValue] })
                        }
                        slotProps={{ textField: { fullWidth: true } }}
                      />
                    </LocalizationProvider>
                  </Grid>
                )}

                {/* Time Selection */}
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns} locale={zhCN}>
                    <TimePicker
                      label="Start time"
                      value={newSlot.startTime}
                      onChange={(newValue) =>
                        setNewSlot({ ...newSlot, startTime: newValue })
                      }
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns} locale={zhCN}>
                    <TimePicker
                      label="End time"
                      value={newSlot.endTime}
                      onChange={(newValue) =>
                        setNewSlot({ ...newSlot, endTime: newValue })
                      }
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </LocalizationProvider>
                </Grid>

                {/* Notes */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Notes"
                    multiline
                    rows={3}
                    value={newSlot.notes}
                    onChange={(e) =>
                      setNewSlot({ ...newSlot, notes: e.target.value })
                    }
                    placeholder="Add notes (optional)"
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              onClick={handleSaveSlot}
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

        {/* Snackbar for notifications */}
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

        {/* Booking Details Dialog */}
        <Dialog
          open={bookingDetailsDialog.open}
          onClose={handleBookingDetailsClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Booking Details</Typography>
              <IconButton onClick={handleBookingDetailsClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            {bookingDetailsDialog.booking && (
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      {bookingDetailsDialog.booking.icon}
                      <Typography variant="h6" color="primary">
                        {bookingDetailsDialog.booking.studentName}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      bgcolor: 'primary.light',
                      color: 'white',
                      p: 1,
                      borderRadius: 1
                    }}>
                      <Typography variant="subtitle1">
                        {bookingDetailsDialog.booking.courseType}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Typography variant="body1" color="textSecondary">
                        <strong>Class Duration:</strong>{bookingDetailsDialog.booking.duration}
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        <strong>Booking Time:</strong>{bookingDetailsDialog.booking.date} {bookingDetailsDialog.booking.time}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleBookingDetailsClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default TeacherAvailability; 