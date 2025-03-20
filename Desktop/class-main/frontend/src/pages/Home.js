import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Card,
  CardContent,
  IconButton,
  Snackbar,
  Alert,
  useTheme,
  alpha,
  Tabs,
  Tab,
  CircularProgress,
  Rating,
  Tooltip,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  AppBar,
  Toolbar,
  ToggleButton,
  Paper,
  Badge
} from '@mui/material';
import {
  Language,
  School,
  AutoStories,
  EmojiEvents,
  Edit,
  MenuBook,
  Grade,
  Person,
  Close,
  Favorite,
  FavoriteBorder,
  CalendarToday,
  AccessTime,
  LocationOn,
  Phone,
  Email,
  WbSunny,
  Brightness7,
  Brightness5,
  Brightness4,
  Brightness2,
  Class,
  ArrowForward,
  ArrowBack,
  PersonOutline,
  VideoCall,
  People,
  SupportAgent,
  Pause,
  PlayArrow,
  VerifiedUser,
  Comment,
  PersonAdd
} from '@mui/icons-material';
import StudentNav from '../components/StudentNav';

// 教师数据
const teachersData = {
  english: [
    {
      id: 1,
      name: "Emma White",
      country: "英国",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      rating: 4.9,
      experience: 5,
      materials: ["剑桥教材", "牛津教材"],
      tags: ["幼儿英语", "自然拼读", "趣味教学"],
      gender: "female",
      timeSlots: ["morning", "afternoon", "evening"],
      introduction: "来自英国的专业幼儿英语教师，拥有5年教学经验。擅长通过游戏和互动方式激发幼儿学习兴趣。",
      audioIntro: "https://example.com/audio/emma.mp3",
      certificates: [
        { name: "TEFL证书", issuer: "剑桥大学", year: "2018" },
        { name: "幼儿教育证书", issuer: "英国教育协会", year: "2019" }
      ],
      reviews: [
        {
          id: 1,
          student: "小明",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
          rating: 5,
          comment: "Emma老师非常耐心，孩子很喜欢上她的课。",
          date: "2024-03-15"
        }
      ]
    }
  ],
  spanish: [
    {
      id: 2,
      name: "Maria Garcia",
      country: "西班牙",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      rating: 4.8,
      experience: 4,
      materials: ["培生教材"],
      tags: ["西班牙语", "文化教学", "口语训练"],
      gender: "female",
      timeSlots: ["afternoon", "evening"],
      introduction: "来自西班牙的资深西班牙语教师，专注于青少年西班牙语教学。",
      audioIntro: "https://example.com/audio/maria.mp3",
      certificates: [
        { name: "DELE证书", issuer: "塞万提斯学院", year: "2019" }
      ],
      reviews: []
    }
  ],
  french: [
    {
      id: 3,
      name: "Pierre Dubois",
      country: "法国",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      rating: 4.7,
      experience: 6,
      materials: ["培生教材", "牛津教材"],
      tags: ["法语", "商务法语", "文化教学"],
      gender: "male",
      timeSlots: ["morning", "evening"],
      introduction: "来自法国的专业法语教师，拥有丰富的商务法语教学经验。",
      audioIntro: "https://example.com/audio/pierre.mp3",
      certificates: [
        { name: "DELF证书", issuer: "法国教育部", year: "2018" }
      ],
      reviews: []
    }
  ]
};

// 更新课程数据，添加更多幼儿园课程
const coursesData = {
  english: [
    {
      id: 0,
      title: "趣味英语启蒙",
      description: "专为幼儿设计的英语启蒙课程，通过游戏和儿歌激发学习兴趣",
      image: "https://source.unsplash.com/random/800x600/?kindergarten",
      level: "启蒙",
      grades: ["幼儿园小班", "幼儿园中班"],
      duration: "25分钟/课",
      price: "￥120/课",
      rating: 4.9,
      language: "英语",
      features: ["游戏教学", "儿歌学习", "互动故事", "趣味活动"],
      teacherName: "Emma White",
      teacherAvatar: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    {
      id: 5,
      title: "自然拼读启蒙",
      description: "通过自然拼读法掌握英语发音规则，建立语音意识",
      image: "https://source.unsplash.com/random/800x600/?phonics",
      level: "启蒙",
      grades: ["幼儿园中班", "幼儿园大班"],
      duration: "30分钟/课",
      price: "￥130/课",
      rating: 4.8,
      language: "英语",
      features: ["字母发音", "音素意识", "拼读规则", "趣味练习"],
      teacherName: "Lisa Brown",
      teacherAvatar: "https://randomuser.me/api/portraits/women/4.jpg"
    },
    {
      id: 6,
      title: "趣味绘本阅读",
      description: "精选英语绘本，培养阅读兴趣，提升语言理解能力",
      image: "https://source.unsplash.com/random/800x600/?storybook",
      level: "启蒙",
      grades: ["幼儿园中班", "幼儿园大班"],
      duration: "30分钟/课",
      price: "￥130/课",
      rating: 4.9,
      language: "英语",
      features: ["绘本导读", "词汇积累", "阅读理解", "故事表演"],
      teacherName: "Rachel Green",
      teacherAvatar: "https://randomuser.me/api/portraits/women/5.jpg"
    },
    {
      id: 7,
      title: "幼儿英语进阶",
      description: "为即将升入小学的孩子打造的英语过渡课程",
      image: "https://source.unsplash.com/random/800x600/?learning",
      level: "基础",
      grades: ["幼儿园大班"],
      duration: "35分钟/课",
      price: "￥140/课",
      rating: 4.7,
      language: "英语",
      features: ["主题会话", "语音强化", "词汇扩展", "课堂互动"],
      teacherName: "Kate Wilson",
      teacherAvatar: "https://randomuser.me/api/portraits/women/6.jpg"
    },
    {
      id: 1,
      title: "初级英语会话",
      description: "适合初学者的日常英语对话课程",
      image: "https://source.unsplash.com/random/800x600/?english",
      level: "初级",
      grades: ["小学三年级", "小学四年级"],
      duration: "40分钟/课",
      price: "￥150/课",
      rating: 4.5,
      language: "英语",
      features: ["互动对话", "情景教学", "趣味游戏"],
      teacherName: "Sarah Wilson",
      teacherAvatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: 2,
      title: "中级英语写作",
      description: "提升英语写作能力的专业课程",
      image: "https://source.unsplash.com/random/800x600/?writing",
      level: "中级",
      grades: ["小学五年级", "小学六年级"],
      duration: "45分钟/课",
      price: "￥180/课",
      rating: 4.7,
      language: "英语",
      features: ["作文指导", "语法训练", "词汇扩充"],
      teacherName: "John Smith",
      teacherAvatar: "https://randomuser.me/api/portraits/men/1.jpg"
    }
  ],
  spanish: [
    {
      id: 3,
      title: "西班牙语入门",
      description: "零基础西班牙语学习课程",
      image: "https://source.unsplash.com/random/800x600/?spain",
      level: "初级",
      grades: ["初中一年级", "初中二年级"],
      duration: "40分钟/课",
      price: "￥160/课",
      rating: 4.6,
      language: "西班牙语",
      features: ["发音训练", "基础会话", "文化了解"],
      teacherName: "Maria Garcia",
      teacherAvatar: "https://randomuser.me/api/portraits/women/2.jpg"
    }
  ],
  french: [
    {
      id: 4,
      title: "法语基础会话",
      description: "生动有趣的法语会话课程",
      image: "https://source.unsplash.com/random/800x600/?france",
      level: "初级",
      grades: ["初中二年级", "初中三年级"],
      duration: "45分钟/课",
      price: "￥170/课",
      rating: 4.8,
      language: "法语",
      features: ["日常对话", "文化体验", "发音纠正"],
      teacherName: "Pierre Dubois",
      teacherAvatar: "https://randomuser.me/api/portraits/men/2.jpg"
    }
  ]
};

// 更新年级数据，添加幼儿园
const gradeGroups = {
  kindergarten: {
    title: "幼儿园",
    grades: [
      "幼儿园小班",
      "幼儿园中班",
      "幼儿园大班"
    ]
  },
  elementary: {
    title: "小学",
    grades: [
      "小学一年级",
      "小学二年级",
      "小学三年级",
      "小学四年级",
      "小学五年级",
      "小学六年级"
    ]
  },
  junior: {
    title: "初中",
    grades: [
      "初中一年级",
      "初中二年级",
      "初中三年级"
    ]
  },
  senior: {
    title: "高中",
    grades: [
      "高中一年级",
      "高中二年级",
      "高中三年级"
    ]
  }
};

// 获取所有年级的平铺数组
const allGrades = Object.values(gradeGroups).reduce(
  (acc, group) => [...acc, ...group.grades],
  []
);

const Home = () => {
  const theme = useTheme();
  const [selectedGrade, setSelectedGrade] = useState(() => {
    // 从 localStorage 获取已保存的年级选择
    return localStorage.getItem('selectedGrade') || '';
  });
  const [selectedTab, setSelectedTab] = useState(0);
  const [showCourses, setShowCourses] = useState(() => {
    // 如果有保存的年级，则显示课程
    return !!localStorage.getItem('selectedGrade');
  });
  const [gradeDialogOpen, setGradeDialogOpen] = useState(() => {
    // 只有在没有保存的年级时才显示对话框
    return !localStorage.getItem('selectedGrade');
  });
  const languages = ['全部课程', '英语课程', '西班牙语课程', '法语课程'];
  const [selectedLevel, setSelectedLevel] = useState('');
  const [showGradeDetails, setShowGradeDetails] = useState(false);
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('all');
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [followedTeachers, setFollowedTeachers] = useState(() => {
    // 从localStorage获取已关注的教师列表
    const saved = localStorage.getItem('followedTeachers');
    return saved ? JSON.parse(saved) : [];
  });
  const [followedTeachersDialogOpen, setFollowedTeachersDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [bookingDialog, setBookingDialog] = useState(false);
  const [selectedBookingTeacher, setSelectedBookingTeacher] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [studentBookings, setStudentBookings] = useState(() => {
    // 从localStorage获取学生已预约的课程
    const saved = localStorage.getItem('studentBookings');
    return saved ? JSON.parse(saved) : [];
  });
  const [bookingError, setBookingError] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 定义新的配色方案
  const colors = {
    primary: '#9FE2BF', // Seafoam Green
    secondary: '#B0E0E6', // Powder Blue
    accent: '#F08080', // Light Coral
    hover: alpha('#9FE2BF', 0.15),
    border: alpha('#9FE2BF', 0.3)
  };

  // 处理年级选择
  const handleGradeSelect = (grade) => {
    setSelectedGrade(grade);
    setGradeDialogOpen(false);
    setShowCourses(true);
    // 保存选择到 localStorage
    localStorage.setItem('selectedGrade', grade);
  };

  // 处理重新选择年级
  const handleChangeGrade = () => {
    setGradeDialogOpen(true);
    setShowCourses(false);
    // 清除保存的年级
    localStorage.removeItem('selectedGrade');
  };

  // 处理教育阶段选择
  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setShowGradeDetails(true);
  };

  // 返回教育阶段选择
  const handleBackToLevels = () => {
    setShowGradeDetails(false);
    setSelectedLevel('');
  };

  // 根据年级和语言筛选课程
  const getFilteredCourses = () => {
    let courses = [];
    if (selectedTab === 0) {
      courses = [...coursesData.english, ...coursesData.spanish, ...coursesData.french];
    } else if (selectedTab === 1) {
      courses = coursesData.english;
    } else if (selectedTab === 2) {
      courses = coursesData.spanish;
    } else {
      courses = coursesData.french;
    }

    if (selectedGrade) {
      courses = courses.filter(course => course.grades.includes(selectedGrade));
    }

    return courses;
  };

  // 处理教师关注
  const handleFollowTeacher = (teacherId) => {
    setFollowedTeachers(prev => {
      const newList = prev.includes(teacherId)
        ? prev.filter(id => id !== teacherId)
        : [...prev, teacherId];

      // 保存到localStorage
      localStorage.setItem('followedTeachers', JSON.stringify(newList));

      // 显示提示消息
      setSnackbarMessage(prev.includes(teacherId) ? '已取消关注' : '关注成功');
      setSnackbarOpen(true);

      return newList;
    });
  };

  // 根据选择的语言和筛选条件获取教师列表
  const getFilteredTeachers = () => {
    if (!teachers.length) return [];

    let filteredTeachers = [...teachers];

    // 根据选择的语言筛选
    if (selectedTab === 1) {
      filteredTeachers = teachers.filter(teacher => teacher.language === 'english');
    } else if (selectedTab === 2) {
      filteredTeachers = teachers.filter(teacher => teacher.language === 'spanish');
    } else if (selectedTab === 3) {
      filteredTeachers = teachers.filter(teacher => teacher.language === 'french');
    }

    // 应用其他筛选条件
    return filteredTeachers.filter(teacher => {
      const genderMatch = selectedGender === 'all' || teacher.gender === selectedGender;
      const materialMatch = selectedMaterial === 'all' || teacher.materials.includes(selectedMaterial);
      const timeSlotMatch = selectedTimeSlot === 'all' || teacher.timeSlots.includes(selectedTimeSlot);

      return genderMatch && materialMatch && timeSlotMatch;
    });
  };

  // 处理教师卡片点击
  const handleTeacherClick = (teacher) => {
    setSelectedTeacher(teacher);
  };

  // 处理音频播放
  const handleAudioPlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 处理对话框关闭
  const handleCloseDialog = () => {
    setSelectedTeacher(null);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // 获取关注的教师列表
  const getFollowedTeachersList = () => {
    const allTeachers = [...teachersData.english, ...teachersData.spanish, ...teachersData.french];
    return allTeachers.filter(teacher => followedTeachers.includes(teacher.id));
  };

  // 获取未来7天的日期
  const getWeekDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  // 检查时间段是否可约（12小时限制）
  const isTimeSlotBookable = (date, timeSlot) => {
    const now = new Date();
    const [hours, minutes] = timeSlot.split(':');
    const slotTime = new Date(date);
    slotTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    const diffHours = (slotTime - now) / (1000 * 60 * 60);
    return diffHours >= 12;
  };

  // 格式化日期显示
  const formatDate = (date) => {
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return {
      day: days[date.getDay()],
      date: `${date.getMonth() + 1}月${date.getDate()}日`
    };
  };

  // 处理预约按钮点击
  const handleBookingClick = (teacher, event) => {
    event.stopPropagation();
    setSelectedBookingTeacher(teacher);
    setBookingDialog(true);
  };

  // 处理日期选择
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  // 处理时间段选择
  const handleTimeSlotSelect = (slot) => {
    setSelectedTimeSlot(slot);
  };

  // 关闭预约对话框
  const handleCloseBooking = () => {
    setBookingDialog(false);
    setSelectedBookingTeacher(null);
    setSelectedDate(null);
    setSelectedTimeSlot(null);
  };

  // 检查时间段是否已被预约
  const isTimeSlotBooked = (date, timeSlot) => {
    return studentBookings.some(booking => {
      const bookingDate = new Date(booking.date);
      return bookingDate.getDate() === date.getDate() &&
        bookingDate.getMonth() === date.getMonth() &&
        bookingDate.getFullYear() === date.getFullYear() &&
        booking.timeSlot === timeSlot;
    });
  };

  // 获取教师可用时间段
  const getTeacherAvailableTimeSlots = (teacher, date) => {
    // 定义全天24小时的时间段
    const timeSlots = [];
    for (let hour = 0; hour < 24; hour++) {
      timeSlots.push(
        `${hour.toString().padStart(2, '0')}:00`,
        `${hour.toString().padStart(2, '0')}:30`
      );
    }
    return timeSlots;
  };

  // 获取时间段标注
  const getTimeSlotPeriod = (timeSlot) => {
    const hour = parseInt(timeSlot.split(':')[0]);
    if (hour >= 5 && hour < 12) {
      return { label: '早上', color: '#FFB74D', icon: <WbSunny sx={{ fontSize: 16 }} /> };
    } else if (hour >= 12 && hour < 14) {
      return { label: '中午', color: '#FF9800', icon: <Brightness7 sx={{ fontSize: 16 }} /> };
    } else if (hour >= 14 && hour < 18) {
      return { label: '下午', color: '#4CAF50', icon: <Brightness5 sx={{ fontSize: 16 }} /> };
    } else if (hour >= 18 && hour < 22) {
      return { label: '晚上', color: '#2196F3', icon: <Brightness4 sx={{ fontSize: 16 }} /> };
    } else {
      return { label: '凌晨', color: '#9E9E9E', icon: <Brightness2 sx={{ fontSize: 16 }} /> };
    }
  };

  // 处理预约确认
  const handleBookingConfirm = () => {
    if (!selectedDate || !selectedTimeSlot) return;

    // 检查是否重复预约
    if (isTimeSlotBooked(selectedDate, selectedTimeSlot)) {
      setBookingError('您在该时间段已有预约课程，请选择其他时间');
      return;
    }

    // 添加新预约
    const newBooking = {
      teacherId: selectedBookingTeacher.id,
      teacherName: selectedBookingTeacher.name,
      date: selectedDate.toISOString(),
      timeSlot: selectedTimeSlot
    };

    setStudentBookings(prev => {
      const updated = [...prev, newBooking];
      localStorage.setItem('studentBookings', JSON.stringify(updated));
      return updated;
    });

    // 显示预约成功提示
    setSnackbarMessage('预约成功');
    setSnackbarOpen(true);
    handleCloseBooking();
  };

  useEffect(() => {
    // 初始化教师数据
    const initTeachers = async () => {
      try {
        setIsLoading(true);
        // 这里使用我们之前定义的 teachersData
        const allTeachers = [...teachersData.english, ...teachersData.spanish, ...teachersData.french];
        setTeachers(allTeachers);
      } catch (error) {
        console.error('Failed to load teachers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initTeachers();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <StudentNav />
      {/* 年级选择对话框 */}
      <Dialog
        open={gradeDialogOpen}
        fullScreen
        PaperProps={{
          sx: {
            bgcolor: '#FAFAFA'
          }
        }}
      >
        <Box sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 8,
          pb: 4,
          px: 4
        }}>
          {/* 标题区域 */}
          <Box sx={{
            width: '100%',
            maxWidth: 1200,
            textAlign: 'center',
            mb: 8
          }}>
            <School sx={{
              fontSize: 60,
              mb: 3,
              color: '#2D5A27'
            }} />
            <Typography
              variant="h3"
              component="div"
              sx={{
                fontWeight: 'bold',
                color: '#2D5A27',
                mb: 2
              }}
            >
              {showGradeDetails ? '选择具体年级' : '选择教育阶段'}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#2D5A27',
                opacity: 0.9,
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              {showGradeDetails ? `选择${selectedLevel}具体年级` : '选择你当前的教育阶段'}
            </Typography>
          </Box>

          {/* 教育阶段选择 */}
          {!showGradeDetails && (
            <Container maxWidth="md">
              <Grid container spacing={4}>
                {Object.entries(gradeGroups).map(([key, group]) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <Card
                      onClick={() => handleLevelSelect(group.title)}
                      sx={{
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 24px rgba(197, 230, 176, 0.3)',
                          bgcolor: 'rgba(197, 230, 176, 0.1)'
                        },
                        display: 'flex',
                        alignItems: 'center',
                        p: 4,
                        border: '1px solid',
                        borderColor: '#C5E6B0',
                        bgcolor: 'white',
                        borderRadius: 3,
                        height: '160px'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <Class sx={{ fontSize: 50, color: '#2D5A27', mr: 3 }} />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h4" component="div" color="#2D5A27" sx={{ fontWeight: 500 }}>
                            {group.title}
                          </Typography>
                          <Typography variant="subtitle1" color="#3A7434" sx={{ mt: 1 }}>
                            {group.grades.length}个年级可选
                          </Typography>
                        </Box>
                        <ArrowForward sx={{
                          color: '#2D5A27',
                          opacity: 0.5,
                          fontSize: 35
                        }} />
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          )}

          {/* 具体年级选择 */}
          {showGradeDetails && (
            <Container maxWidth="lg">
              <Box sx={{ mb: 4 }}>
                <Button
                  onClick={handleBackToLevels}
                  startIcon={<ArrowBack />}
                  sx={{
                    color: '#2D5A27',
                    mb: 4,
                    '&:hover': {
                      bgcolor: 'rgba(197, 230, 176, 0.1)'
                    }
                  }}
                >
                  返回教育阶段选择
                </Button>
                <Grid container spacing={3}>
                  {Object.entries(gradeGroups).find(([_, group]) => group.title === selectedLevel)?.[1].grades.map((grade) => (
                    <Grid item xs={12} sm={6} md={4} key={grade}>
                      <Card
                        onClick={() => handleGradeSelect(grade)}
                        sx={{
                          cursor: 'pointer',
                          transition: 'all 0.3s',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 24px rgba(197, 230, 176, 0.3)',
                            bgcolor: 'rgba(197, 230, 176, 0.1)'
                          },
                          display: 'flex',
                          alignItems: 'center',
                          p: 3,
                          border: '1px solid',
                          borderColor: '#C5E6B0',
                          height: '100%',
                          bgcolor: 'white',
                          borderRadius: 3
                        }}
                      >
                        <Class sx={{ fontSize: 40, color: '#2D5A27', mr: 3 }} />
                        <Box>
                          <Typography variant="h5" component="div" color="#2D5A27" sx={{ fontWeight: 500 }}>
                            {grade}
                          </Typography>
                          <Typography variant="subtitle1" color="#3A7434" sx={{ mt: 1 }}>
                            点击选择
                          </Typography>
                        </Box>
                        <ArrowForward sx={{
                          ml: 'auto',
                          color: '#2D5A27',
                          opacity: 0.5,
                          fontSize: 28
                        }} />
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Container>
          )}
        </Box>
      </Dialog>

      {/* 课程展示界面 */}
      {showCourses && (
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* 欢迎标语 */}
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 'bold',
                color: '#2D5A27',
                mb: 2
              }}
            >
              探索精彩课程
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              为{selectedGrade}同学推荐的精品课程
            </Typography>
            <Button
              variant="outlined"
              sx={{
                mt: 2,
                color: '#2D5A27',
                borderColor: '#C5E6B0',
                '&:hover': {
                  borderColor: '#9DC88D',
                  bgcolor: 'rgba(197, 230, 176, 0.1)'
                }
              }}
              startIcon={<Grade sx={{ color: '#2D5A27' }} />}
              onClick={handleChangeGrade}
            >
              重新选择年级
            </Button>
          </Box>

          {/* 四个主要功能模块 */}
          <Box sx={{ mb: 6 }}>
            <Grid container spacing={4}>
              {[
                {
                  title: '1v1课程',
                  description: '专属定制的一对一外语课程',
                  icon: <PersonOutline sx={{ fontSize: 40, color: '#2D5A27' }} />,
                  action: '查看课程'
                },
                {
                  title: '如何上课',
                  description: '简单几步开始在线学习',
                  icon: <VideoCall sx={{ fontSize: 40, color: '#2D5A27' }} />,
                  action: '了解详情'
                },
                {
                  title: '预约课程',
                  description: '灵活选择上课时间',
                  icon: <CalendarToday sx={{ fontSize: 40, color: '#2D5A27' }} />,
                  action: '立即预约'
                },
                {
                  title: '我的关注',
                  description: '查看已关注的老师',
                  icon: (
                    <Badge badgeContent={followedTeachers.length} color="error" sx={{ '& .MuiBadge-badge': { bgcolor: '#FF6B6B' } }}>
                      <People sx={{ fontSize: 40, color: '#2D5A27' }} />
                    </Badge>
                  ),
                  action: '查看列表',
                  onClick: () => setFollowedTeachersDialogOpen(true)
                }
              ].map((module, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    onClick={module.onClick}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      p: 2,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      border: '1px solid',
                      borderColor: '#C5E6B0',
                      bgcolor: 'white',
                      borderRadius: 3,
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(197, 230, 176, 0.3)',
                        bgcolor: 'rgba(197, 230, 176, 0.1)'
                      }
                    }}
                  >
                    <Box sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      bgcolor: 'rgba(197, 230, 176, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 1.5
                    }}>
                      {module.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        color: '#2D5A27',
                        fontWeight: 'bold',
                        mb: 0.5,
                        textAlign: 'center',
                        fontSize: '1.1rem'
                      }}
                    >
                      {module.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#3A7434',
                        mb: 1.5,
                        textAlign: 'center',
                        fontSize: '0.875rem',
                        lineHeight: 1.4
                      }}
                    >
                      {module.description}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        color: '#2D5A27',
                        borderColor: '#C5E6B0',
                        '&:hover': {
                          borderColor: '#9DC88D',
                          bgcolor: 'rgba(197, 230, 176, 0.1)'
                        }
                      }}
                    >
                      {module.action}
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* 促销 Banner 区域 */}
          <Box sx={{ mb: 8 }}>
            <Grid container spacing={4}>
              {/* 免费体验课程 Banner */}
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 3,
                    height: 200,
                    bgcolor: '#C5E6B0',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(197, 230, 176, 0.3)',
                    }
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, rgba(45, 90, 39, 0.9) 0%, rgba(45, 90, 39, 0.6) 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      p: 4,
                    }}
                  >
                    <Typography variant="h4" sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
                      免费体验课程
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'white', mb: 3 }}>
                      零基础也能轻松开始 · 专业外教1v1授课
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: 'white',
                        color: '#2D5A27',
                        width: 'fit-content',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.9)',
                        }
                      }}
                    >
                      立即预约
                    </Button>
                  </Box>
                </Card>
              </Grid>

              {/* 30分钟1v1课程 Banner */}
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 3,
                    height: 200,
                    bgcolor: '#9DC88D',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(197, 230, 176, 0.3)',
                    }
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, rgba(45, 90, 39, 0.9) 0%, rgba(45, 90, 39, 0.6) 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      p: 4,
                    }}
                  >
                    <Typography variant="h4" sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
                      30分钟1v1课程
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'white', mb: 3 }}>
                      量身定制学习计划 · 灵活选择上课时间
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: 'white',
                        color: '#2D5A27',
                        width: 'fit-content',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.9)',
                        }
                      }}
                    >
                      了解更多
                    </Button>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* 课程分类模块 */}
          <Box sx={{ mb: 8, mt: 8 }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                color: '#2D5A27',
                fontWeight: 'bold',
                mb: 1,
                textAlign: 'center'
              }}
            >
              精品课程分类
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#3A7434',
                mb: 4,
                textAlign: 'center',
                opacity: 0.9
              }}
            >
              为你推荐适合的特色课程
            </Typography>

            {/* 语言切换器 */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <Tabs
                value={selectedTab}
                onChange={(e, newValue) => setSelectedTab(newValue)}
                sx={{
                  bgcolor: 'rgba(197, 230, 176, 0.2)',
                  borderRadius: 3,
                  '& .MuiTab-root': {
                    minWidth: 120,
                    fontWeight: 500,
                    color: '#3A7434',
                    '&.Mui-selected': {
                      color: '#2D5A27'
                    }
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#2D5A27'
                  }
                }}
              >
                <Tab label="英语课程" />
                <Tab label="西班牙语课程" />
                <Tab label="法语课程" />
              </Tabs>
            </Box>

            {/* 课程分类卡片 */}
            <Grid container spacing={3} justifyContent="center">
              {(selectedTab === 0 ? [
                {
                  title: '外教课程',
                  description: '纯正外语环境，提升口语交际能力',
                  icon: <Language sx={{ fontSize: 32 }} />,
                  courses: '20门课程'
                },
                {
                  title: '中教课程',
                  description: '系统讲解语法，提高应试能力',
                  icon: <School sx={{ fontSize: 32 }} />,
                  courses: '15门课程'
                },
                {
                  title: '零基础入门',
                  description: '从零开始，打造坚实英语基础',
                  icon: <AutoStories sx={{ fontSize: 32 }} />,
                  courses: '12门课程'
                },
                {
                  title: '剑桥考级课程',
                  description: '系统备考，提高通过率',
                  icon: <EmojiEvents sx={{ fontSize: 32 }} />,
                  courses: '8门课程'
                },
                {
                  title: '口语课程',
                  description: '提升英语口语表达能力',
                  icon: <Language sx={{ fontSize: 32 }} />,
                  courses: '10门课程'
                },
                {
                  title: '阅读提升',
                  description: '培养英语阅读理解能力',
                  icon: <AutoStories sx={{ fontSize: 32 }} />,
                  courses: '6门课程'
                },
                {
                  title: '写作提升',
                  description: '培养英语写作表达能力',
                  icon: <Edit sx={{ fontSize: 32 }} />,
                  courses: '6门课程'
                },
                {
                  title: 'STEM课程',
                  description: '培养STEM思考能力',
                  icon: <MenuBook sx={{ fontSize: 32 }} />,
                  courses: '6门课程'
                }
              ] : selectedTab === 1 ? [
                {
                  title: '外教课程',
                  description: '纯正西语环境，地道口语交际',
                  icon: <Language sx={{ fontSize: 32 }} />,
                  courses: '8门课程'
                },
                {
                  title: '中教课程',
                  description: '系统语法讲解，快速入门西语',
                  icon: <School sx={{ fontSize: 32 }} />,
                  courses: '6门课程'
                },
                {
                  title: '零基础入门',
                  description: '从零开始学习西班牙语',
                  icon: <AutoStories sx={{ fontSize: 32 }} />,
                  courses: '6门课程'
                },
                {
                  title: '口语会话',
                  description: '西班牙语日常交际能力',
                  icon: <Language sx={{ fontSize: 32 }} />,
                  courses: '4门课程'
                },
                {
                  title: '文化课程',
                  description: '了解西班牙语国家文化',
                  icon: <MenuBook sx={{ fontSize: 32 }} />,
                  courses: '3门课程'
                }
              ] : [
                {
                  title: '外教课程',
                  description: '纯正法语环境，地道发音教学',
                  icon: <Language sx={{ fontSize: 32 }} />,
                  courses: '7门课程'
                },
                {
                  title: '中教课程',
                  description: '系统语法讲解，快速入门法语',
                  icon: <School sx={{ fontSize: 32 }} />,
                  courses: '5门课程'
                },
                {
                  title: '零基础入门',
                  description: '从零开始学习法语',
                  icon: <AutoStories sx={{ fontSize: 32 }} />,
                  courses: '5门课程'
                },
                {
                  title: '口语会话',
                  description: '法语日常交际能力',
                  icon: <Language sx={{ fontSize: 32 }} />,
                  courses: '4门课程'
                },
                {
                  title: '文化课程',
                  description: '了解法语国家文化',
                  icon: <MenuBook sx={{ fontSize: 32 }} />,
                  courses: '3门课程'
                }
              ]).map((category, index) => (
                <Grid item xs={12} sm={6} md={selectedTab === 0 ? 3 : 4} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      border: '1px solid',
                      borderColor: '#C5E6B0',
                      bgcolor: 'white',
                      borderRadius: 3,
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(197, 230, 176, 0.3)',
                        '& .category-icon': {
                          transform: 'scale(1.1)',
                        }
                      }
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: 'rgba(197, 230, 176, 0.2)',
                        p: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottom: '1px solid',
                        borderColor: '#C5E6B0'
                      }}
                    >
                      <Box
                        className="category-icon"
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          bgcolor: '#C5E6B0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#2D5A27',
                          transition: 'transform 0.3s'
                        }}
                      >
                        {category.icon}
                      </Box>
                    </Box>
                    <Box sx={{ p: 1.5, flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#2D5A27',
                          fontWeight: 'bold',
                          mb: 0.5,
                          textAlign: 'center',
                          fontSize: '1rem'
                        }}
                      >
                        {category.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#3A7434',
                          mb: 0.5,
                          textAlign: 'center',
                          fontSize: '0.875rem',
                          lineHeight: 1.4
                        }}
                      >
                        {category.description}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'block',
                          textAlign: 'center',
                          color: '#2D5A27',
                          opacity: 0.8,
                          fontSize: '0.75rem'
                        }}
                      >
                        {category.courses}
                      </Typography>
                    </Box>
                    <Button
                      variant="text"
                      sx={{
                        color: '#2D5A27',
                        borderTop: '1px solid',
                        borderColor: '#C5E6B0',
                        borderRadius: 0,
                        py: 1,
                        '&:hover': {
                          bgcolor: 'rgba(197, 230, 176, 0.1)'
                        }
                      }}
                    >
                      查看课程 →
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* 教师简介部分 */}
          <Box sx={{ mb: 8 }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                color: '#2D5A27',
                fontWeight: 'bold',
                mb: 1,
                textAlign: 'center'
              }}
            >
              优秀教师团队
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#3A7434',
                mb: 4,
                textAlign: 'center',
                opacity: 0.9
              }}
            >
              专业外教一对一授课
            </Typography>

            {/* 语言选择和筛选条件 */}
            <Box sx={{ mb: 4, p: 3, bgcolor: 'rgba(197, 230, 176, 0.1)', borderRadius: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>课程语言</InputLabel>
                    <Select
                      value={selectedTab}
                      onChange={(e) => setSelectedTab(e.target.value)}
                      sx={{
                        bgcolor: 'white',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#C5E6B0'
                        }
                      }}
                    >
                      <MenuItem value={0}>全部课程</MenuItem>
                      <MenuItem value={1}>英语课程</MenuItem>
                      <MenuItem value={2}>西班牙语课程</MenuItem>
                      <MenuItem value={3}>法语课程</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>教师性别</InputLabel>
                    <Select
                      value={selectedGender}
                      onChange={(e) => setSelectedGender(e.target.value)}
                      sx={{
                        bgcolor: 'white',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#C5E6B0'
                        }
                      }}
                    >
                      <MenuItem value="all">全部</MenuItem>
                      <MenuItem value="female">女教师</MenuItem>
                      <MenuItem value="male">男教师</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>擅长教材</InputLabel>
                    <Select
                      value={selectedMaterial}
                      onChange={(e) => setSelectedMaterial(e.target.value)}
                      sx={{
                        bgcolor: 'white',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#C5E6B0'
                        }
                      }}
                    >
                      <MenuItem value="all">全部教材</MenuItem>
                      <MenuItem value="cambridge">剑桥教材</MenuItem>
                      <MenuItem value="oxford">牛津教材</MenuItem>
                      <MenuItem value="pearson">培生教材</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>可约时段</InputLabel>
                    <Select
                      value={selectedTimeSlot}
                      onChange={(e) => setSelectedTimeSlot(e.target.value)}
                      sx={{
                        bgcolor: 'white',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#C5E6B0'
                        }
                      }}
                    >
                      <MenuItem value="all">全部时段</MenuItem>
                      <MenuItem value="morning">上午</MenuItem>
                      <MenuItem value="afternoon">下午</MenuItem>
                      <MenuItem value="evening">晚上</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            {/* 教师卡片列表 */}
            <Grid container spacing={3}>
              {isLoading ? (
                <Box sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  py: 4
                }}>
                  <CircularProgress sx={{ color: '#2D5A27' }} />
                </Box>
              ) : getFilteredTeachers().length > 0 ? (
                getFilteredTeachers().map((teacher) => (
                  <Grid item xs={12} sm={6} md={4} key={teacher.id}>
                    <Card
                      onClick={() => handleTeacherClick(teacher)}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        border: '1px solid',
                        borderColor: '#C5E6B0',
                        borderRadius: 3,
                        transition: 'all 0.3s',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 24px rgba(197, 230, 176, 0.3)',
                        }
                      }}
                    >
                      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', position: 'relative' }}>
                        <Box
                          component="img"
                          src={teacher.avatar}
                          alt={teacher.name}
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            mr: 2
                          }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" sx={{ color: '#2D5A27', fontWeight: 'bold' }}>
                            {teacher.name}
                          </Typography>
                          <Rating value={teacher.rating} readOnly size="small" sx={{ mb: 0.5 }} />
                          <Typography variant="body2" sx={{ color: '#3A7434' }}>
                            {teacher.country}
                          </Typography>
                        </Box>
                        <Tooltip title={followedTeachers.includes(teacher.id) ? "取消关注" : "关注老师"}>
                          <IconButton
                            onClick={(e) => handleFollowTeacher(teacher.id, e)}
                            sx={{
                              position: 'absolute',
                              top: 16,
                              right: 16,
                              color: followedTeachers.includes(teacher.id) ? '#FF6B6B' : '#2D5A27',
                              '&:hover': {
                                bgcolor: 'rgba(197, 230, 176, 0.2)'
                              }
                            }}
                          >
                            {followedTeachers.includes(teacher.id) ? <Favorite /> : <FavoriteBorder />}
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Divider sx={{ borderColor: '#C5E6B0' }} />
                      <Box sx={{ p: 2, flexGrow: 1 }}>
                        <Typography variant="body2" sx={{ mb: 1.5, color: '#2D5A27' }}>
                          教学经验：{teacher.experience}年
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1.5, color: '#2D5A27' }}>
                          擅长教材：{teacher.materials.join('、')}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                          {teacher.tags.map((tag, index) => (
                            <Chip
                              key={index}
                              label={tag}
                              size="small"
                              sx={{
                                bgcolor: 'rgba(197, 230, 176, 0.2)',
                                color: '#2D5A27',
                                border: '1px solid',
                                borderColor: '#C5E6B0'
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                      <Button
                        variant="contained"
                        onClick={(e) => handleBookingClick(teacher, e)}
                        sx={{
                          m: 2,
                          bgcolor: '#2D5A27',
                          '&:hover': {
                            bgcolor: '#1F3F1C'
                          }
                        }}
                      >
                        预约课程
                      </Button>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Box sx={{
                  width: '100%',
                  textAlign: 'center',
                  py: 8
                }}>
                  <SupportAgent sx={{ fontSize: 60, color: '#2D5A27', mb: 2 }} />
                  <Typography variant="h6" sx={{ color: '#2D5A27' }}>
                    暂无符合条件的教师
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#3A7434' }}>
                    请尝试调整筛选条件
                  </Typography>
                </Box>
              )}
            </Grid>
          </Box>

          {/* 无教师提示 */}
          {getFilteredTeachers().length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <SupportAgent sx={{ fontSize: 60, color: '#2D5A27', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#2D5A27' }}>
                暂无符合条件的教师
              </Typography>
              <Typography variant="body2" sx={{ color: '#3A7434' }}>
                请尝试调整筛选条件
              </Typography>
            </Box>
          )}
        </Container>
      )}

      {/* 教师详情对话框 */}
      <Dialog
        open={Boolean(selectedTeacher)}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            bgcolor: '#FAFAFA'
          }
        }}
      >
        {selectedTeacher && (
          <>
            <DialogTitle sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              bgcolor: 'white',
              borderBottom: '1px solid',
              borderColor: '#C5E6B0'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  src={selectedTeacher.avatar}
                  sx={{ width: 56, height: 56, mr: 2 }}
                />
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h6" sx={{ color: '#2D5A27', fontWeight: 'bold' }}>
                      {selectedTeacher.name}
                    </Typography>
                    <Tooltip title={followedTeachers.includes(selectedTeacher.id) ? "取消关注" : "关注老师"}>
                      <IconButton
                        onClick={(e) => handleFollowTeacher(selectedTeacher.id, e)}
                        size="small"
                        sx={{
                          color: followedTeachers.includes(selectedTeacher.id) ? '#FF6B6B' : '#2D5A27',
                          '&:hover': {
                            bgcolor: 'rgba(197, 230, 176, 0.2)'
                          }
                        }}
                      >
                        {followedTeachers.includes(selectedTeacher.id) ? <Favorite /> : <FavoriteBorder />}
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Typography variant="subtitle1" sx={{ color: '#3A7434' }}>
                    {selectedTeacher.country}
                  </Typography>
                </Box>
              </Box>
              <IconButton onClick={handleCloseDialog}>
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 0 }}>
              <Box sx={{ p: 3, bgcolor: 'white' }}>
                {/* 音频简介 */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ color: '#2D5A27', mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Language sx={{ mr: 1 }} /> 教师简介
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#3A7434', mb: 2 }}>
                    {selectedTeacher.introduction}
                  </Typography>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    bgcolor: 'rgba(197, 230, 176, 0.2)',
                    borderRadius: 2
                  }}>
                    <IconButton
                      onClick={handleAudioPlay}
                      sx={{
                        mr: 2,
                        color: '#2D5A27',
                        bgcolor: 'rgba(45, 90, 39, 0.1)',
                        '&:hover': {
                          bgcolor: 'rgba(45, 90, 39, 0.2)'
                        }
                      }}
                    >
                      {isPlaying ? <Pause /> : <PlayArrow />}
                    </IconButton>
                    <Typography variant="body2" color="#2D5A27">
                      点击收听教师语音介绍
                    </Typography>
                    <audio
                      ref={audioRef}
                      src={selectedTeacher.audioIntro}
                      onEnded={() => setIsPlaying(false)}
                    />
                  </Box>
                </Box>

                {/* 资格证书 */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ color: '#2D5A27', mb: 2, display: 'flex', alignItems: 'center' }}>
                    <VerifiedUser sx={{ mr: 1 }} /> 资格证书
                  </Typography>
                  <Grid container spacing={2}>
                    {(selectedTeacher.certificates || []).map((cert, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Card sx={{
                          p: 2,
                          border: '1px solid',
                          borderColor: '#C5E6B0',
                          bgcolor: 'white',
                          borderRadius: 2
                        }}>
                          <Typography variant="subtitle1" sx={{ color: '#2D5A27', fontWeight: 'bold' }}>
                            {cert.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#3A7434' }}>
                            颁发机构：{cert.issuer}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#3A7434' }}>
                            获得年份：{cert.year}
                          </Typography>
                        </Card>
                      </Grid>
                    ))}
                    {(!selectedTeacher.certificates || selectedTeacher.certificates.length === 0) && (
                      <Grid item xs={12}>
                        <Typography variant="body2" sx={{ color: '#3A7434', textAlign: 'center' }}>
                          暂无资格证书信息
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Box>

                {/* 学生评价 */}
                <Box>
                  <Typography variant="h6" sx={{ color: '#2D5A27', mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Comment sx={{ mr: 1 }} /> 学生评价
                  </Typography>
                  <List>
                    {(selectedTeacher.reviews || []).map((review) => (
                      <ListItem
                        key={review.id}
                        sx={{
                          mb: 2,
                          bgcolor: 'white',
                          border: '1px solid',
                          borderColor: '#C5E6B0',
                          borderRadius: 2,
                          p: 2
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar src={review.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <Typography variant="subtitle1" sx={{ color: '#2D5A27', fontWeight: 'bold', mr: 1 }}>
                                {review.student}
                              </Typography>
                              <Rating value={review.rating} readOnly size="small" />
                            </Box>
                          }
                          secondary={
                            <>
                              <Typography variant="body2" sx={{ color: '#3A7434', mb: 0.5 }}>
                                {review.comment}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {review.date}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                    {(!selectedTeacher.reviews || selectedTeacher.reviews.length === 0) && (
                      <Typography variant="body2" sx={{ color: '#3A7434', textAlign: 'center' }}>
                        暂无学生评价
                      </Typography>
                    )}
                  </List>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3, bgcolor: 'white', borderTop: '1px solid', borderColor: '#C5E6B0' }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#2D5A27',
                  '&:hover': {
                    bgcolor: '#1F3F1C'
                  }
                }}
              >
                预约课程
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* 关注教师列表对话框 */}
      <Dialog
        open={followedTeachersDialogOpen}
        onClose={() => setFollowedTeachersDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            bgcolor: '#FAFAFA'
          }
        }}
      >
        <DialogTitle sx={{
          bgcolor: 'white',
          borderBottom: '1px solid',
          borderColor: '#C5E6B0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <People sx={{ color: '#2D5A27', mr: 2, fontSize: 28 }} />
            <Typography variant="h6" sx={{ color: '#2D5A27', fontWeight: 'bold' }}>
              我关注的老师
            </Typography>
          </Box>
          <IconButton onClick={() => setFollowedTeachersDialogOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3, bgcolor: 'white' }}>
          {getFollowedTeachersList().length > 0 ? (
            <Grid container spacing={3}>
              {getFollowedTeachersList().map((teacher) => (
                <Grid item xs={12} sm={6} key={teacher.id}>
                  <Card sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    border: '1px solid',
                    borderColor: '#C5E6B0',
                    borderRadius: 2,
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(197, 230, 176, 0.3)',
                    }
                  }}>
                    <Avatar src={teacher.avatar} sx={{ width: 56, height: 56, mr: 2 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ color: '#2D5A27', fontWeight: 'bold', mb: 0.5 }}>
                        {teacher.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#3A7434', mb: 0.5 }}>
                        {teacher.country}
                      </Typography>
                      <Rating value={teacher.rating} readOnly size="small" />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          bgcolor: '#2D5A27',
                          '&:hover': { bgcolor: '#1F3F1C' }
                        }}
                      >
                        预约课程
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={(e) => handleFollowTeacher(teacher.id, e)}
                        sx={{
                          color: '#FF6B6B',
                          borderColor: '#FF6B6B',
                          '&:hover': {
                            borderColor: '#FF6B6B',
                            bgcolor: 'rgba(255, 107, 107, 0.1)'
                          }
                        }}
                      >
                        取消关注
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{
              textAlign: 'center',
              py: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <PersonAdd sx={{ fontSize: 60, color: '#2D5A27', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#2D5A27', mb: 1 }}>
                暂未关注任何老师
              </Typography>
              <Typography variant="body2" sx={{ color: '#3A7434', mb: 3 }}>
                去发现更多优秀的外语老师吧
              </Typography>
              <Button
                variant="contained"
                onClick={() => setFollowedTeachersDialogOpen(false)}
                sx={{
                  bgcolor: '#2D5A27',
                  '&:hover': { bgcolor: '#1F3F1C' }
                }}
              >
                浏览教师
              </Button>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* 修改预约对话框为全屏 */}
      <Dialog
        open={bookingDialog}
        onClose={handleCloseBooking}
        fullScreen
        PaperProps={{
          sx: {
            bgcolor: '#FAFAFA'
          }
        }}
      >
        {selectedBookingTeacher && (
          <>
            <AppBar position="sticky" sx={{ bgcolor: 'white', boxShadow: 1 }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleCloseBooking}
                  sx={{ color: '#2D5A27' }}
                >
                  <Close />
                </IconButton>
                <Typography variant="h6" sx={{ ml: 2, flex: 1, color: '#2D5A27' }}>
                  预约课程
                </Typography>
                <Button
                  variant="contained"
                  disabled={!selectedDate || !selectedTimeSlot}
                  onClick={handleBookingConfirm}
                  sx={{
                    bgcolor: '#2D5A27',
                    '&:hover': { bgcolor: '#1F3F1C' },
                    '&.Mui-disabled': {
                      bgcolor: '#C5E6B0',
                    }
                  }}
                >
                  确认预约
                </Button>
              </Toolbar>
            </AppBar>

            <Container maxWidth="md" sx={{ py: 3 }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 3,
                pb: 2,
                borderBottom: '1px solid #C5E6B0'
              }}>
                <Avatar
                  src={selectedBookingTeacher.avatar}
                  sx={{ width: 64, height: 64, mr: 2 }}
                />
                <Box>
                  <Typography variant="h6" sx={{ color: '#2D5A27', fontWeight: 'bold' }}>
                    {selectedBookingTeacher.name}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#3A7434' }}>
                    {selectedBookingTeacher.country}
                  </Typography>
                </Box>
              </Box>

              {/* 日期选择 */}
              <Typography variant="h6" sx={{ mb: 2, color: '#2D5A27', fontWeight: 'bold' }}>
                选择上课日期
              </Typography>
              <Box sx={{
                mb: 4,
                display: 'flex',
                gap: 1,
                overflowX: 'auto',
                pb: 1,
                '&::-webkit-scrollbar': {
                  height: '8px'
                },
                '&::-webkit-scrollbar-track': {
                  bgcolor: 'rgba(0,0,0,0.1)',
                  borderRadius: '4px'
                },
                '&::-webkit-scrollbar-thumb': {
                  bgcolor: 'rgba(45, 90, 39, 0.2)',
                  borderRadius: '4px',
                  '&:hover': {
                    bgcolor: 'rgba(45, 90, 39, 0.3)'
                  }
                }
              }}>
                {getWeekDates().map((date) => {
                  const formattedDate = formatDate(date);
                  return (
                    <ToggleButton
                      key={date.toISOString()}
                      value={date}
                      selected={selectedDate && selectedDate.getDate() === date.getDate()}
                      onChange={() => {
                        handleDateSelect(date);
                        setBookingError('');
                      }}
                      sx={{
                        minWidth: 100,
                        height: 80,
                        borderRadius: 2,
                        border: '1px solid #C5E6B0',
                        '&.Mui-selected': {
                          bgcolor: 'rgba(45, 90, 39, 0.1)',
                          borderColor: '#2D5A27',
                          color: '#2D5A27',
                        },
                        flexDirection: 'column',
                        p: 1
                      }}
                    >
                      <Typography variant="h6" sx={{ mb: 0.5 }}>
                        {formattedDate.day}
                      </Typography>
                      <Typography variant="body2">
                        {formattedDate.date}
                      </Typography>
                    </ToggleButton>
                  );
                })}
              </Box>

              {/* 时间段选择 */}
              {selectedDate && (
                <>
                  <Typography variant="h6" sx={{ mb: 2, color: '#2D5A27', fontWeight: 'bold' }}>
                    选择上课时间
                  </Typography>
                  {/* 时间段标注说明 */}
                  <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: 'repeat(3, 1fr)', // 手机端一行3个
                      sm: 'repeat(5, 1fr)'  // 其他屏幕一行5个
                    },
                    gap: 1,
                    mb: 3,
                    bgcolor: 'rgba(197, 230, 176, 0.1)',
                    p: 2,
                    borderRadius: 2
                  }}>
                    {[
                      { label: '凌晨', color: '#9E9E9E', icon: <Brightness2 /> },
                      { label: '早上', color: '#FFB74D', icon: <WbSunny /> },
                      { label: '中午', color: '#FF9800', icon: <Brightness7 /> },
                      { label: '下午', color: '#4CAF50', icon: <Brightness5 /> },
                      { label: '晚上', color: '#2196F3', icon: <Brightness4 /> }
                    ].map((period) => (
                      <Box
                        key={period.label}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 1,
                          bgcolor: `${period.color}10`,
                          borderRadius: 2,
                          py: 1,
                          px: {
                            xs: 1,
                            sm: 2
                          }
                        }}
                      >
                        {React.cloneElement(period.icon, {
                          sx: {
                            fontSize: {
                              xs: '20px',
                              sm: '16px'
                            },
                            color: period.color
                          }
                        })}
                        <Typography
                          variant="body2"
                          sx={{
                            color: period.color,
                            fontSize: {
                              xs: '14px',
                              sm: '12px'
                            }
                          }}
                        >
                          {period.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: 'repeat(3, 1fr)', // 手机端一行显示3个
                      sm: 'repeat(4, 1fr)', // 平板端一行显示4个
                      md: 'repeat(6, 1fr)'  // 桌面端一行显示6个
                    },
                    gap: {
                      xs: 1.5, // 手机端间距更大
                      sm: 2
                    },
                    mb: 3,
                    px: {
                      xs: 1, // 手机端添加内边距
                      sm: 0
                    }
                  }}>
                    {getTeacherAvailableTimeSlots(selectedBookingTeacher, selectedDate).map((slot) => {
                      const isBookable = isTimeSlotBookable(selectedDate, slot);
                      const isBooked = isTimeSlotBooked(selectedDate, slot);
                      const period = getTimeSlotPeriod(slot);
                      return (
                        <Tooltip
                          title={isBooked ? "该时间段您已有预约" : period.label}
                          key={slot}
                        >
                          <Box>
                            <ToggleButton
                              value={slot}
                              selected={selectedTimeSlot === slot}
                              onChange={() => {
                                handleTimeSlotSelect(slot);
                                setBookingError('');
                              }}
                              disabled={!isBookable || isBooked}
                              sx={{
                                width: '100%',
                                height: {
                                  xs: '72px', // 手机端按钮更高
                                  sm: '64px'
                                },
                                borderRadius: 2,
                                border: '1px solid',
                                borderColor: period.color,
                                '&.Mui-selected': {
                                  bgcolor: `${period.color}20`,
                                  borderColor: period.color,
                                  color: period.color,
                                  '& .MuiSvgIcon-root': {
                                    color: period.color,
                                    transform: 'scale(1.2)'
                                  }
                                },
                                '&:hover': {
                                  bgcolor: `${period.color}10`,
                                },
                                '&.Mui-disabled': {
                                  bgcolor: isBooked ? '#ffebee' : '#f5f5f5',
                                  color: '#bdbdbd',
                                },
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1,
                                p: {
                                  xs: 1.5, // 手机端内边距更大
                                  sm: 1
                                },
                                transition: 'all 0.2s'
                              }}
                            >
                              {React.cloneElement(period.icon, {
                                sx: {
                                  fontSize: {
                                    xs: '24px', // 手机端图标更大
                                    sm: '20px'
                                  },
                                  color: period.color,
                                  transition: 'transform 0.2s'
                                }
                              })}
                              <Typography
                                variant="body2"
                                sx={{
                                  fontSize: {
                                    xs: '16px', // 手机端文字更大
                                    sm: '14px'
                                  },
                                  fontWeight: 'medium'
                                }}
                              >
                                {slot}
                              </Typography>
                            </ToggleButton>
                          </Box>
                        </Tooltip>
                      );
                    })}
                  </Box>
                </>
              )}

              {bookingError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {bookingError}
                </Alert>
              )}

              <Paper sx={{ p: 2, bgcolor: 'rgba(197, 230, 176, 0.1)', borderRadius: 2 }}>
                <Typography variant="subtitle1" sx={{ color: '#2D5A27', fontWeight: 'bold', mb: 1 }}>
                  温馨提示：
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  1. 课程需要提前12小时预约
                  <br />
                  2. 如需取消课程，请提前24小时操作
                  <br />
                  3. 请准时参加课程，迟到超过10分钟将被视为缺课
                </Typography>
              </Paper>
            </Container>
          </>
        )}
      </Dialog>

      {/* 关注成功提示 */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{
            bgcolor: '#2D5A27',
            color: 'white',
            '& .MuiAlert-icon': { color: 'white' }
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Home; 