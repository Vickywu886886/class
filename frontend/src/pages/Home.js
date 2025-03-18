import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  useTheme,
  alpha
} from '@mui/material';
import {
  School,
  Grade,
  Timer,
  Star,
  Language,
  AutoStories,
  EmojiEvents
} from '@mui/icons-material';

// 模拟课程数据
const coursesData = {
  english: [
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

const grades = [
  "小学三年级",
  "小学四年级",
  "小学五年级",
  "小学六年级",
  "初中一年级",
  "初中二年级",
  "初中三年级"
];

const Home = () => {
  const theme = useTheme();
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const languages = ['全部课程', '英语课程', '西班牙语课程', '法语课程'];

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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 欢迎标语 */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            mb: 2
          }}
        >
          探索精彩课程
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          根据年级选择适合的语言课程，开启学习之旅
        </Typography>
      </Box>

      {/* 年级选择 */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          borderRadius: 4
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Grade color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" component="h2">
            选择年级
          </Typography>
        </Box>
        <FormControl fullWidth>
          <InputLabel>年级</InputLabel>
          <Select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            label="年级"
          >
            <MenuItem value="">全部年级</MenuItem>
            {grades.map((grade) => (
              <MenuItem key={grade} value={grade}>{grade}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      {/* 语言类型选项卡 */}
      <Box sx={{ mb: 4 }}>
        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              minWidth: 120,
              fontWeight: 500
            }
          }}
        >
          {languages.map((lang, index) => (
            <Tab
              key={lang}
              label={lang}
              icon={<Language />}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Box>

      {/* 课程列表 */}
      <Grid container spacing={3}>
        {getFilteredCourses().map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card
              elevation={2}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                }
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={course.image}
                alt={course.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h3">
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {course.description}
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  {course.features.map((feature, index) => (
                    <Chip
                      key={index}
                      label={feature}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Timer sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {course.duration}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <School sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    适合：{course.grades.join('、')}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating value={course.rating} precision={0.1} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({course.rating})
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h6" color="primary">
                    {course.price}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none'
                    }}
                  >
                    立即预约
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 无课程提示 */}
      {getFilteredCourses().length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <AutoStories sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            暂无符合条件的课程
          </Typography>
          <Typography variant="body2" color="text.secondary">
            请尝试选择其他年级或语言类型
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Home; 