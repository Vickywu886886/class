import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Button,
  Chip,
  Rating,
  Tab,
  Tabs,
  Paper,
  styled,
  IconButton,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TranslateIcon from '@mui/icons-material/Translate';
import SchoolIcon from '@mui/icons-material/School';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';
import VideocamIcon from '@mui/icons-material/Videocam';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const TeacherCard = styled(Card)(({ type }) => ({
  borderRadius: '20px',
  overflow: 'visible',
  position: 'relative',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  }
}));

const TeacherTypeChip = styled(Chip)(({ type }) => ({
  position: 'absolute',
  top: -15,
  right: 20,
  height: '30px',
  borderRadius: '15px',
  backgroundColor: type === 'foreign' ? '#2196f3' : '#4caf50',
  color: 'white',
  '& .MuiChip-label': {
    fontWeight: 'bold'
  }
}));

const SearchField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '20px',
    backgroundColor: '#fff',
    '&:hover fieldset': {
      borderColor: '#4caf50',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#4caf50',
    }
  }
});

// 更新时间表数据为半小时间隔
const timeSlots = [
  "00:00-00:30", "00:30-01:00",
  "01:00-01:30", "01:30-02:00",
  "02:00-02:30", "02:30-03:00",
  "03:00-03:30", "03:30-04:00",
  "04:00-04:30", "04:30-05:00",
  "05:00-05:30", "05:30-06:00",
  "06:00-06:30", "06:30-07:00",
  "07:00-07:30", "07:30-08:00",
  "08:00-08:30", "08:30-09:00",
  "09:00-09:30", "09:30-10:00",
  "10:00-10:30", "10:30-11:00",
  "11:00-11:30", "11:30-12:00",
  "12:00-12:30", "12:30-13:00",
  "13:00-13:30", "13:30-14:00",
  "14:00-14:30", "14:30-15:00",
  "15:00-15:30", "15:30-16:00",
  "16:00-16:30", "16:30-17:00",
  "17:00-17:30", "17:30-18:00",
  "18:00-18:30", "18:30-19:00",
  "19:00-19:30", "19:30-20:00",
  "20:00-20:30", "20:30-21:00",
  "21:00-21:30", "21:30-22:00",
  "22:00-22:30", "22:30-23:00",
  "23:00-23:30", "23:30-00:00"
];

const weekDays = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

// 添加获取本周日期的函数
const getWeekDates = () => {
  const today = new Date();
  const currentDay = today.getDay() || 7; // 将周日的0转换为7
  const monday = new Date(today);
  monday.setDate(today.getDate() - currentDay + 1);

  return weekDays.map((day, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return {
      weekDay: day,
      date: date,
      formatted: `${date.getMonth() + 1}月${date.getDate()}日`
    };
  });
};

// 生成随机课程状态
const generateSchedule = () => {
  const schedule = {};
  weekDays.forEach(day => {
    schedule[day] = {};
    timeSlots.forEach(slot => {
      schedule[day][slot] = Math.random() < 0.3; // 30%的概率时间段被占用
    });
  });
  return schedule;
};

// 更新教材数据
const textbooks = {
  english: [
    {
      id: 1,
      name: "Power Up",
      level: "初级",
      publisher: "Cambridge University Press",
      category: "综合英语",
      description: "剑桥少儿英语课程，通过游戏和互动活动培养英语兴趣，适合英语初学者。",
      features: ["互动性强", "趣味性高", "循序渐进"],
      order: 1
    },
    {
      id: 2,
      name: "Speaking Time",
      level: "中级",
      publisher: "Oxford University Press",
      category: "口语",
      description: "专注口语训练的教材，通过日常对话场景提升口语能力，适合有基础的学习者。",
      features: ["实用对话", "地道表达", "场景丰富"],
      order: 2
    },
    {
      id: 3,
      name: "Reading Explorer",
      level: "中高级",
      publisher: "National Geographic Learning",
      category: "阅读",
      description: "国家地理出品的阅读教材，涵盖科学、文化、历史等主题，提升阅读理解能力。",
      features: ["主题丰富", "知识性强", "图文并茂"],
      order: 3
    },
    {
      id: 4,
      name: "Wonders",
      level: "高级",
      publisher: "McGraw-Hill Education",
      category: "综合英语",
      description: "美国原版教材，全面提升听说读写能力，适合进阶学习者。",
      features: ["全面提升", "原版内容", "系统性强"],
      order: 4
    },
    {
      id: 5,
      name: "Oxford Discover",
      level: "综合",
      publisher: "Oxford University Press",
      category: "综合英语",
      description: "牛津探索系列教材，培养批判性思维和语言运用能力，适合各级别学习者。",
      features: ["思维训练", "技能整合", "探究学习"],
      order: 5
    }
  ],
  spanish: [
    { id: 1, name: "走遍西班牙第一册", level: "初级", publisher: "外语教学与研究出版社" },
    { id: 2, name: "走遍西班牙第二册", level: "中级", publisher: "外语教学与研究出版社" },
    { id: 3, name: "现代西班牙语第一册", level: "初级", publisher: "外语教学与研究出版社" },
    { id: 4, name: "现代西班牙语第二册", level: "中级", publisher: "外语教学与研究出版社" }
  ],
  french: [
    { id: 1, name: "法语综合教程第一册", level: "初级", publisher: "外语教学与研究出版社" },
    { id: 2, name: "法语综合教程第二册", level: "中级", publisher: "外语教学与研究出版社" },
    { id: 3, name: "简明法语教程", level: "入门", publisher: "上海外语教育出版社" },
    { id: 4, name: "商务法语", level: "商务法语", publisher: "外语教学与研究出版社" }
  ]
};

// 更新教师数据，添加时间表
const teachers = [
  {
    id: 1,
    name: "Sarah Johnson",
    type: "english",
    teacherType: "foreign",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    subjects: ["英语会话", "英语语法", "托福备考"],
    rating: 4.8,
    students: 120,
    experience: "8年教学经验",
    education: "剑桥大学教育学硕士",
    introduction: "大家好！我是Sarah，有8年英语教学经验。我擅长通过游戏和互动方式让孩子们爱上英语学习。",
    languages: ["英语（母语）", "中文（流利）"],
    certificates: ["TESOL", "CELTA"],
    videoUrl: "https://example.com/teacher1",
    schedule: generateSchedule()
  },
  {
    id: 2,
    name: "李明",
    type: "english",
    teacherType: "chinese",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    subjects: ["英语语法", "雅思备考", "商务英语"],
    rating: 4.9,
    students: 150,
    experience: "10年教学经验",
    education: "北京外国语大学英语教育硕士",
    introduction: "大家好！我是李明，擅长英语考试辅导和商务英语教学，注重实用性和考试技巧的培养。",
    languages: ["中文（母语）", "英语（专业八级）"],
    certificates: ["教师资格证", "雅思考官资格"],
    videoUrl: "https://example.com/teacher2",
    schedule: generateSchedule()
  },
  {
    id: 3,
    name: "Carlos Rodriguez",
    type: "spanish",
    teacherType: "foreign",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    subjects: ["西班牙语基础", "西语会话", "西语文化"],
    rating: 4.9,
    students: 80,
    experience: "6年教学经验",
    education: "马德里大学语言学硕士",
    introduction: "¡Hola! 我是Carlos，致力于让孩子们在快乐中学习西班牙语，了解西语文化。",
    languages: ["西班牙语（母语）", "英语（流利）", "中文（良好）"],
    certificates: ["ELE", "DELE考官资格"],
    videoUrl: "https://example.com/teacher3",
    schedule: generateSchedule()
  },
  {
    id: 4,
    name: "王芳",
    type: "spanish",
    teacherType: "chinese",
    avatar: "https://randomuser.me/api/portraits/women/42.jpg",
    subjects: ["西语入门", "西语考级", "拉美文化"],
    rating: 4.8,
    students: 90,
    experience: "8年教学经验",
    education: "上海外国语大学西班牙语系硕士",
    introduction: "你好！我是王芳，专注西班牙语教学，让学习更轻松有趣！",
    languages: ["中文（母语）", "西班牙语（专业八级）", "英语（流利）"],
    certificates: ["教师资格证", "DELE C2"],
    videoUrl: "https://example.com/teacher4",
    schedule: generateSchedule()
  },
  {
    id: 5,
    name: "Sophie Martin",
    type: "french",
    teacherType: "foreign",
    avatar: "https://randomuser.me/api/portraits/women/46.jpg",
    subjects: ["法语基础", "法语会话", "法国文化"],
    rating: 4.8,
    students: 85,
    experience: "5年教学经验",
    education: "巴黎索邦大学法语教育专业",
    introduction: "Bonjour! 我是Sophie，让我们一起探索法语的优雅与魅力！",
    languages: ["法语（母语）", "英语（流利）", "中文（良好）"],
    certificates: ["DALF C2", "法语教师资格证"],
    videoUrl: "https://example.com/teacher5",
    schedule: generateSchedule()
  },
  {
    id: 6,
    name: "张雪",
    type: "french",
    teacherType: "chinese",
    avatar: "https://randomuser.me/api/portraits/women/43.jpg",
    subjects: ["法语入门", "法语考级", "法国文学"],
    rating: 4.7,
    students: 75,
    experience: "7年教学经验",
    education: "法国里昂大学法语教育硕士",
    introduction: "大家好！我是张雪，致力于让每个学生都能掌握法语的精髓。",
    languages: ["中文（母语）", "法语（专业八级）", "英语（流利）"],
    certificates: ["教师资格证", "DALF C2"],
    videoUrl: "https://example.com/teacher6",
    schedule: generateSchedule()
  }
];

const languageColors = {
  english: '#2196f3',    // 蓝色
  spanish: '#ff9800',    // 橙色
  french: '#9c27b0'      // 紫色
};

const languageIcons = {
  english: '🇬🇧',
  spanish: '🇪🇸',
  french: '🇫🇷'
};

const languageNames = {
  english: '英语教师',
  spanish: '西语教师',
  french: '法语教师'
};

// 添加英文翻译
const translations = {
  chinese: {
    pageTitle: "✨ 优秀教师团队 ✨",
    searchPlaceholder: "搜索教师或课程...",
    tabs: {
      allTeachers: "全部教师",
      englishTeachers: "英语教师",
      spanishTeachers: "西语教师",
      frenchTeachers: "法语教师"
    },
    teacherTypes: {
      all: "全部",
      chinese: "中教",
      foreign: "外教"
    },
    courseInfo: "课程信息：",
    selectTextbook: "选择教材",
    bookingStatus: {
      booked: "已预约",
      unavailable: "不可预约",
      clickToBook: "点击预约"
    },
    notifications: {
      loginRequired: "请先登录后再预约课程",
      selectTextbook: "请选择教材后再预约课程",
      timeSlotBooked: "该时间段已被预约",
      bookingSuccess: "预约成功！课程教室号已生成，可在个人中心查看详情。系统将在课程开始前2小时和30分钟发送提醒通知。",
      cannotBookPast: "只能预约明天及以后的课程"
    },
    classroomInfo: "预约成功后，系统会自动生成 ClassIn 教室号和链接，可在个人中心查看。",
    onlineClassroom: "在线教室",
    reminders: {
      classReminder: "上课提醒：系统将在课程开始前2小时和30分钟发送通知提醒",
      cancellationNote: "温馨提示：课程开始前8小时内不可取消预约"
    },
    close: "关闭"
  },
  english: {
    pageTitle: "✨ Outstanding Teaching Team ✨",
    searchPlaceholder: "Search teachers or courses...",
    tabs: {
      allTeachers: "All Teachers",
      englishTeachers: "English Teachers",
      spanishTeachers: "Spanish Teachers",
      frenchTeachers: "French Teachers"
    },
    teacherTypes: {
      all: "All",
      chinese: "Chinese",
      foreign: "Foreign"
    },
    courseInfo: "Course Information:",
    selectTextbook: "Select Textbook",
    bookingStatus: {
      booked: "Booked",
      unavailable: "Unavailable",
      clickToBook: "Click to Book"
    },
    notifications: {
      loginRequired: "Please login first to book a course",
      selectTextbook: "Please select a textbook before booking",
      timeSlotBooked: "This time slot is already booked",
      bookingSuccess: "Booking successful! ClassIn room number has been generated. You can check the details in your profile. You will receive reminders 2 hours and 30 minutes before the class.",
      cannotBookPast: "You can only book courses for tomorrow and later"
    },
    classroomInfo: "After successful booking, the system will generate a ClassIn room number and link, which can be viewed in your profile.",
    onlineClassroom: "Online Classroom",
    reminders: {
      classReminder: "Class Reminder: You will receive notifications 2 hours and 30 minutes before class",
      cancellationNote: "Note: Cancellation is not allowed within 8 hours before class"
    },
    close: "Close"
  }
};

const Teachers = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTeacherType, setSelectedTeacherType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [scheduleDialog, setScheduleDialog] = useState({
    open: false,
    teacher: null
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [selectedTextbook, setSelectedTextbook] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [language, setLanguage] = useState('chinese');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setSelectedTeacherType('all');
  };

  const handleOpenSchedule = (teacher) => {
    setScheduleDialog({
      open: true,
      teacher: teacher
    });
  };

  const handleCloseSchedule = () => {
    setScheduleDialog({
      open: false,
      teacher: null
    });
  };

  // 添加生成 ClassIn 教室信息的函数
  const generateClassInInfo = () => {
    const roomNumber = Math.floor(100000 + Math.random() * 900000); // 6位数教室号
    return {
      roomNumber,
      link: `https://www.classin.com/classroom/${roomNumber}`
    };
  };

  // 添加课程提醒检查函数
  const checkAndSendNotifications = () => {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const now = new Date();

    appointments.forEach(appointment => {
      // 解析课程时间
      const [year, month, day] = appointment.day.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/).slice(1);
      const [startTime] = appointment.timeSlot.split('-');
      const [hours, minutes] = startTime.split(':');

      // 创建课程开始时间的Date对象
      const classTime = new Date(year, month - 1, day, parseInt(hours), parseInt(minutes));

      // 计算距离课程开始还有多少分钟
      const minutesUntilClass = (classTime - now) / (1000 * 60);

      // 检查是否需要发送通知
      if (minutesUntilClass > 0) {
        if (Math.abs(minutesUntilClass - 120) < 1) { // 2小时提醒
          showNotification(
            '课程提醒',
            `您预约的${appointment.teacherName}老师的${appointment.subject}课程将在2小时后开始，请提前做好准备。\n课程教室号：${appointment.classInRoomNumber}`
          );
        } else if (Math.abs(minutesUntilClass - 30) < 1) { // 30分钟提醒
          showNotification(
            '课程提醒',
            `您预约的${appointment.teacherName}老师的${appointment.subject}课程将在30分钟后开始，请及时进入教室。\n课程教室号：${appointment.classInRoomNumber}\n点击进入：${appointment.classInLink}`
          );
        }
      }
    });
  };

  // 添加显示通知的函数
  const showNotification = (title, body) => {
    // 检查浏览器是否支持通知
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications");
      return;
    }

    // 检查通知权限
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    } else if (Notification.permission !== "denied") {
      // 请求权限
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification(title, { body });
        }
      });
    }

    // 同时显示站内通知
    setSnackbar({
      open: true,
      message: body,
      severity: 'info'
    });
  };

  // 在组件中添加定时器
  useEffect(() => {
    // 请求通知权限
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    // 每分钟检查一次是否需要发送通知
    const notificationTimer = setInterval(checkAndSendNotifications, 60000);

    // 组件卸载时清除定时器
    return () => clearInterval(notificationTimer);
  }, []);

  // 在组件加载时检查用户类型并设置语言
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'teacher') {
      setLanguage('english');
    }
  }, []);

  // 获取当前语言的翻译
  const t = translations[language];

  // 更新预约处理函数
  const handleBooking = (teacher, day, timeSlot) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      setSnackbar({
        open: true,
        message: t.notifications.loginRequired,
        severity: 'warning'
      });
      return;
    }

    if (!selectedTextbook) {
      setSnackbar({
        open: true,
        message: t.notifications.selectTextbook,
        severity: 'warning'
      });
      return;
    }

    // 获取当前选择日期的完整信息
    const selectedDayInfo = getWeekDates().find(d => d.weekDay === day);
    const selectedDate = selectedDayInfo.date;
    const today = new Date();

    // 设置今天的日期，去除时间部分
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // 去除选中日期的时间部分
    const selectedDateOnly = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());

    // 检查是否是今天或之前的日期
    if (selectedDateOnly <= todayDate) {
      setSnackbar({
        open: true,
        message: t.notifications.cannotBookPast,
        severity: 'error'
      });
      return;
    }

    const dateStr = `${selectedDayInfo.date.getFullYear()}年${selectedDayInfo.formatted}`;

    // 获取现有预约
    const existingAppointments = JSON.parse(localStorage.getItem('appointments')) || [];

    // 检查是否已经预约过这个时间段
    const isTimeSlotBooked = existingAppointments.some(
      app => app.day === dateStr && app.timeSlot === timeSlot
    );

    if (isTimeSlotBooked) {
      setSnackbar({
        open: true,
        message: t.notifications.timeSlotBooked,
        severity: 'error'
      });
      return;
    }

    // 生成 ClassIn 教室信息
    const classInInfo = generateClassInInfo();

    // 创建新预约
    const newAppointment = {
      id: Date.now(),
      teacherId: teacher.id,
      teacherName: teacher.name,
      teacherAvatar: teacher.avatar,
      teacherType: teacher.type,
      subject: teacher.subjects[0],
      textbook: selectedTextbook,
      day: dateStr,
      timeSlot,
      status: 'pending',
      bookingDate: new Date().toISOString(),
      classInRoomNumber: classInInfo.roomNumber,
      classInLink: classInInfo.link
    };

    // 保存预约
    localStorage.setItem(
      'appointments',
      JSON.stringify([...existingAppointments, newAppointment])
    );

    // 更新教师时间表
    teacher.schedule[day][timeSlot] = true;

    setSnackbar({
      open: true,
      message: t.notifications.bookingSuccess,
      severity: 'success'
    });

    // 重置选中的教材
    setSelectedTextbook(null);

    // 延迟关闭对话框
    setTimeout(() => {
      handleCloseSchedule();
    }, 1500);
  };

  const filteredTeachers = teachers.filter(teacher => {
    const languages = ['english', 'spanish', 'french'];
    const matchesLanguage = selectedTab === 0 || teacher.type === languages[selectedTab - 1];
    const matchesTeacherType = selectedTeacherType === 'all' || teacher.teacherType === selectedTeacherType;
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesLanguage && matchesTeacherType && matchesSearch;
  });

  // 添加时间段类型判断函数
  const getTimeSlotType = (timeSlot) => {
    const hour = parseInt(timeSlot.split(':')[0]);
    if (hour >= 6 && hour < 18) {
      return 'day';
    }
    return 'night';
  };

  // 更新 TimeSlotGroup 组件
  const TimeSlotGroup = ({ slots, dayInfo, teacher, handleBooking }) => {
    const today = new Date();
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const cellDate = new Date(dayInfo.date.getFullYear(), dayInfo.date.getMonth(), dayInfo.date.getDate());
    const isDisabled = cellDate <= todayDate;

    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
        p: 1,
        borderBottom: '1px solid #eee'
      }}>
        {slots.map((slot) => {
          const timeType = getTimeSlotType(slot);
          const isBooked = teacher.schedule[dayInfo.weekDay][slot];

          return (
            <Box
              key={slot}
              onClick={() => !isDisabled && !isBooked &&
                handleBooking(teacher, dayInfo.weekDay, slot)}
              sx={{
                p: 0.5,
                textAlign: 'center',
                borderRadius: '4px',
                bgcolor: isBooked ?
                  `${languageColors[teacher.type]}15` :
                  isDisabled ? '#f5f5f5' :
                    timeType === 'day' ? 'rgba(255, 244, 229, 0.6)' : 'rgba(25, 32, 71, 0.04)',
                color: isDisabled ? '#bdbdbd' :
                  isBooked ? languageColors[teacher.type] :
                    timeType === 'day' ? '#2e7d32' : '#5c6bc0',
                fontWeight: isBooked ? 'bold' : 'normal',
                cursor: isDisabled || isBooked ? 'not-allowed' : 'pointer',
                border: `1px solid ${isDisabled ? '#f5f5f5' :
                    isBooked ? `${languageColors[teacher.type]}30` :
                      timeType === 'day' ? 'rgba(255, 167, 38, 0.1)' : 'rgba(63, 81, 181, 0.1)'
                  }`,
                '&:hover': {
                  bgcolor: !isDisabled && !isBooked ?
                    timeType === 'day' ?
                      'rgba(255, 244, 229, 0.9)' :
                      'rgba(25, 32, 71, 0.08)' :
                    undefined,
                  boxShadow: !isDisabled && !isBooked ?
                    timeType === 'day' ?
                      '0 2px 4px rgba(255, 167, 38, 0.1)' :
                      '0 2px 4px rgba(63, 81, 181, 0.1)' :
                    'none'
                },
                position: 'relative',
                '&::before': timeType === 'day' ? {
                  content: '""',
                  position: 'absolute',
                  left: -8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 16,
                  height: 16,
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%23ffa726\'%3E%3Cpath d=\'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z\'/%3E%3C/svg%3E")',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
                  opacity: 0.6
                } : timeType === 'night' ? {
                  content: '""',
                  position: 'absolute',
                  left: -8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 16,
                  height: 16,
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%233f51b5\'%3E%3Cpath d=\'M12.34 2.02C6.59 1.82 2 6.42 2 12c0 5.52 4.48 10 10 10 3.71 0 6.93-2.02 8.66-5.02-7.51-.25-12.09-8.43-8.32-14.96z\'/%3E%3C/svg%3E")',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
                  opacity: 0.6
                } : {}
              }}
            >
              <Typography variant="body2" sx={{
                fontWeight: timeType === 'day' ? 500 : 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1
              }}>
                {slot}
              </Typography>
              <Typography variant="caption" display="block" sx={{
                color: isDisabled ? '#bdbdbd' :
                  isBooked ? languageColors[teacher.type] :
                    timeType === 'day' ? '#66bb6a' : '#7986cb'
              }}>
                {isBooked ? t.bookingStatus.booked :
                  isDisabled ? t.bookingStatus.unavailable : t.bookingStatus.clickToBook}
              </Typography>
            </Box>
          );
        })}
      </Box>
    );
  };

  // 更新取消预约的时间检查函数
  const canCancelAppointment = (appointment) => {
    // 解析预约日期和时间
    const [year, month, day] = appointment.day.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/).slice(1);
    const [startTime] = appointment.timeSlot.split('-');
    const [hours, minutes] = startTime.split(':');

    // 创建课程开始时间的Date对象
    const classTime = new Date(year, month - 1, day, parseInt(hours), parseInt(minutes));
    const now = new Date();

    // 计算距离课程开始还有多少小时
    const hoursUntilClass = (classTime - now) / (1000 * 60 * 60);

    return hoursUntilClass >= 8; // 改为8小时
  };

  // 更新取消预约处理函数
  const handleCancelAppointment = (appointmentId) => {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const appointment = appointments.find(app => app.id === appointmentId);

    if (!appointment) {
      setSnackbar({
        open: true,
        message: '未找到预约记录',
        severity: 'error'
      });
      return;
    }

    if (!canCancelAppointment(appointment)) {
      setSnackbar({
        open: true,
        message: '只能在课程开始前8小时取消预约',
        severity: 'error'
      });
      return;
    }

    // 更新预约状态
    const updatedAppointments = appointments.filter(app => app.id !== appointmentId);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

    setSnackbar({
      open: true,
      message: '预约已成功取消',
      severity: 'success'
    });
  };

  // 更新预约状态检查函数
  const getAppointmentStatus = (appointment) => {
    const canCancel = canCancelAppointment(appointment);
    return {
      text: canCancel ? '取消课程' : '不可取消',
      color: canCancel ? 'primary' : 'error',
      disabled: !canCancel,
      tooltip: canCancel ? '点击取消预约' : '课程开始前8小时内不可取消'
    };
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: 'center',
          color: '#2e7d32',
          fontWeight: 'bold',
          mb: 4
        }}
      >
        {t.pageTitle}
      </Typography>

      <Box sx={{ mb: 4 }}>
        <SearchField
          fullWidth
          placeholder={t.searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Paper sx={{ mb: 4, borderRadius: '20px' }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          centered
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              minWidth: 120,
              fontWeight: 'bold',
            },
            '& .Mui-selected': {
              color: '#2e7d32',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#2e7d32',
            },
          }}
        >
          <Tab
            icon={<StarIcon />}
            label={t.tabs.allTeachers}
            iconPosition="start"
          />
          <Tab
            icon={<Typography variant="body2">{languageIcons.english}</Typography>}
            label={t.tabs.englishTeachers}
            iconPosition="start"
          />
          <Tab
            icon={<Typography variant="body2">{languageIcons.spanish}</Typography>}
            label={t.tabs.spanishTeachers}
            iconPosition="start"
          />
          <Tab
            icon={<Typography variant="body2">{languageIcons.french}</Typography>}
            label={t.tabs.frenchTeachers}
            iconPosition="start"
          />
        </Tabs>
      </Paper>

      {selectedTab !== 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4, gap: 2 }}>
          <Button
            variant={selectedTeacherType === 'all' ? 'contained' : 'outlined'}
            onClick={() => setSelectedTeacherType('all')}
            sx={{
              borderRadius: '20px',
              bgcolor: selectedTeacherType === 'all' ? '#4caf50' : 'transparent',
              '&:hover': {
                bgcolor: selectedTeacherType === 'all' ? '#388e3c' : 'rgba(76, 175, 80, 0.08)',
              }
            }}
          >
            {t.teacherTypes.all}
          </Button>
          <Button
            variant={selectedTeacherType === 'chinese' ? 'contained' : 'outlined'}
            onClick={() => setSelectedTeacherType('chinese')}
            sx={{
              borderRadius: '20px',
              bgcolor: selectedTeacherType === 'chinese' ? '#4caf50' : 'transparent',
              '&:hover': {
                bgcolor: selectedTeacherType === 'chinese' ? '#388e3c' : 'rgba(76, 175, 80, 0.08)',
              }
            }}
          >
            {t.teacherTypes.chinese}
          </Button>
          <Button
            variant={selectedTeacherType === 'foreign' ? 'contained' : 'outlined'}
            onClick={() => setSelectedTeacherType('foreign')}
            sx={{
              borderRadius: '20px',
              bgcolor: selectedTeacherType === 'foreign' ? '#4caf50' : 'transparent',
              '&:hover': {
                bgcolor: selectedTeacherType === 'foreign' ? '#388e3c' : 'rgba(76, 175, 80, 0.08)',
              }
            }}
          >
            {t.teacherTypes.foreign}
          </Button>
        </Box>
      )}

      <Grid container spacing={3}>
        {filteredTeachers.map((teacher) => (
          <Grid item xs={12} sm={6} md={4} key={teacher.id}>
            <TeacherCard type={teacher.type}>
              <TeacherTypeChip
                type={teacher.type}
                icon={<Typography variant="body2">{languageIcons[teacher.type]}</Typography>}
                label={`${languageNames[teacher.type].slice(0, -2)}${teacher.teacherType === 'foreign' ? '外教' : '中教'}`}
                sx={{
                  backgroundColor: languageColors[teacher.type],
                }}
              />
              <CardContent>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <Avatar
                    src={teacher.avatar}
                    sx={{
                      width: 100,
                      height: 100,
                      margin: '0 auto',
                      border: '3px solid',
                      borderColor: languageColors[teacher.type],
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                    {teacher.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 1 }}>
                    <Rating value={teacher.rating} precision={0.1} size="small" readOnly />
                    <Typography variant="body2" color="text.secondary">
                      ({teacher.students}名学生)
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    教授课程
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {teacher.subjects.map((subject, index) => (
                      <Chip
                        key={index}
                        label={subject}
                        size="small"
                        sx={{
                          bgcolor: `${languageColors[teacher.type]}15`,
                          color: languageColors[teacher.type]
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    资质认证
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <VerifiedIcon sx={{ color: languageColors[teacher.type] }} />
                    <Typography variant="body2">
                      {teacher.certificates.join(' | ')}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {teacher.introduction}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <IconButton
                    sx={{ mr: 1 }}
                    onClick={() => window.open(teacher.videoUrl, '_blank')}
                  >
                    <VideocamIcon sx={{ color: languageColors[teacher.type] }} />
                  </IconButton>
                  <Button
                    variant="contained"
                    onClick={() => handleOpenSchedule(teacher)}
                    sx={{
                      borderRadius: '20px',
                      bgcolor: languageColors[teacher.type],
                      '&:hover': {
                        bgcolor: languageColors[teacher.type],
                        filter: 'brightness(0.9)'
                      }
                    }}
                  >
                    查看课程
                  </Button>
                </Box>
              </CardContent>
            </TeacherCard>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={scheduleDialog.open}
        onClose={handleCloseSchedule}
        maxWidth="lg"
        fullWidth
      >
        {scheduleDialog.teacher && (
          <>
            <DialogTitle sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              bgcolor: scheduleDialog.teacher ? languageColors[scheduleDialog.teacher.type] : '#4caf50',
              color: 'white'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  src={scheduleDialog.teacher.avatar}
                  sx={{ width: 40, height: 40, border: '2px solid white' }}
                />
                <Typography variant="h6">
                  {scheduleDialog.teacher.name} 的课程表
                </Typography>
              </Box>
              <IconButton
                onClick={handleCloseSchedule}
                sx={{ color: 'white' }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  {t.courseInfo}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {scheduleDialog.teacher.subjects.map((subject, index) => (
                    <Chip
                      key={index}
                      label={subject}
                      size="small"
                      sx={{
                        bgcolor: `${languageColors[scheduleDialog.teacher.type]}15`,
                        color: languageColors[scheduleDialog.teacher.type]
                      }}
                    />
                  ))}
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SchoolIcon color="primary" />
                  {t.selectTextbook}
                </Typography>

                {/* 添加教材分类筛选 */}
                <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label="全部"
                    onClick={() => setSelectedCategory('all')}
                    color={selectedCategory === 'all' ? 'primary' : 'default'}
                    variant={selectedCategory === 'all' ? 'filled' : 'outlined'}
                    sx={{ borderRadius: '15px' }}
                  />
                  {Array.from(new Set(textbooks[scheduleDialog.teacher.type].map(t => t.category))).map((category) => (
                    <Chip
                      key={category}
                      label={category}
                      onClick={() => setSelectedCategory(category)}
                      color={selectedCategory === category ? 'primary' : 'default'}
                      variant={selectedCategory === category ? 'filled' : 'outlined'}
                      sx={{ borderRadius: '15px' }}
                    />
                  ))}
                </Box>

                <Grid container spacing={2}>
                  {textbooks[scheduleDialog.teacher.type]
                    .filter(textbook => selectedCategory === 'all' || textbook.category === selectedCategory)
                    .sort((a, b) => a.order - b.order)
                    .map((textbook) => (
                      <Grid item xs={12} sm={6} md={4} key={textbook.id}>
                        <Card
                          onClick={() => setSelectedTextbook(textbook)}
                          sx={{
                            cursor: 'pointer',
                            borderRadius: '15px',
                            border: selectedTextbook?.id === textbook.id ?
                              `2px solid ${languageColors[scheduleDialog.teacher.type]}` :
                              '2px solid transparent',
                            '&:hover': {
                              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                              transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.3s ease',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          <CardContent sx={{ flex: 1 }}>
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="h6" gutterBottom sx={{ color: languageColors[scheduleDialog.teacher.type] }}>
                                {textbook.name}
                              </Typography>
                              <Chip
                                label={textbook.category}
                                size="small"
                                sx={{
                                  bgcolor: `${languageColors[scheduleDialog.teacher.type]}15`,
                                  color: languageColors[scheduleDialog.teacher.type],
                                  mb: 1
                                }}
                              />
                            </Box>

                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                              {textbook.description}
                            </Typography>

                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                              {textbook.features.map((feature, index) => (
                                <Chip
                                  key={index}
                                  label={feature}
                                  size="small"
                                  variant="outlined"
                                  sx={{ borderColor: `${languageColors[scheduleDialog.teacher.type]}30` }}
                                />
                              ))}
                            </Box>

                            <Box sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              mt: 'auto'
                            }}>
                              <Typography variant="body2" color="text.secondary">
                                难度：{textbook.level}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {textbook.publisher}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                </Grid>
              </Box>

              <TableContainer component={Paper} sx={{ borderRadius: '10px' }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                      {getWeekDates().map((dayInfo) => (
                        <TableCell key={dayInfo.weekDay} align="center">
                          <Box>
                            <Typography variant="body2" color="textSecondary">
                              {dayInfo.weekDay}
                            </Typography>
                            <Typography variant="body2">
                              {dayInfo.formatted}
                            </Typography>
                          </Box>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      {getWeekDates().map((dayInfo) => (
                        <TableCell key={dayInfo.weekDay} sx={{ p: 0 }}>
                          <TimeSlotGroup
                            slots={timeSlots}
                            dayInfo={dayInfo}
                            teacher={scheduleDialog.teacher}
                            handleBooking={handleBooking}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {t.classroomInfo}
                </Typography>
                <Chip
                  icon={<VideocamIcon />}
                  label={t.onlineClassroom}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span>{t.reminders.classReminder}</span>
                </Typography>
                <Typography variant="body2" color="error" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <span>{t.reminders.cancellationNote}</span>
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button
                onClick={handleCloseSchedule}
                variant="outlined"
                sx={{ borderRadius: '20px' }}
              >
                {t.close}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
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
  );
};

export default Teachers; 