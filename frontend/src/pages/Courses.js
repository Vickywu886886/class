import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  styled,
  Avatar,
  Rating,
  IconButton,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CelebrationIcon from '@mui/icons-material/Celebration';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const CategoryCard = styled(Paper)(({ active }) => ({
  padding: '15px',
  borderRadius: '20px',
  cursor: 'pointer',
  backgroundColor: active ? '#e8f5e9' : '#fff',
  transition: 'all 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  boxShadow: active ? '0 4px 15px rgba(76, 175, 80, 0.2)' : '0 2px 8px rgba(0,0,0,0.1)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
  }
}));

const CourseCard = styled(Card)({
  height: '100%',
  borderRadius: '20px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  }
});

const StyledChip = styled(Chip)({
  borderRadius: '15px',
  margin: '4px',
  '& .MuiChip-label': {
    fontWeight: 500,
  }
});

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

const categories = [
  {
    id: 'all',
    name: '全部课程',
    icon: <AutoStoriesIcon sx={{ fontSize: 32 }} />,
    color: '#4caf50',
    subCategories: []
  },
  {
    id: 'english',
    name: '英语课程',
    icon: <CelebrationIcon sx={{ fontSize: 32 }} />,
    color: '#2196f3',
    subCategories: [
      { id: 'english-basic', name: '基础英语' },
      { id: 'english-advanced', name: '进阶英语' },
      { id: 'english-ielts', name: '雅思课程' },
      { id: 'english-toefl', name: '托福课程' }
    ]
  },
  {
    id: 'spanish',
    name: '西班牙语',
    icon: <SportsEsportsIcon sx={{ fontSize: 32 }} />,
    color: '#f44336',
    subCategories: [
      { id: 'spanish-basic', name: '基础西语' },
      { id: 'spanish-advanced', name: '进阶西语' },
      { id: 'spanish-dele', name: 'DELE考试' }
    ]
  },
  {
    id: 'french',
    name: '法语课程',
    icon: <EmojiEventsIcon sx={{ fontSize: 32 }} />,
    color: '#9c27b0',
    subCategories: [
      { id: 'french-basic', name: '基础法语' },
      { id: 'french-advanced', name: '进阶法语' },
      { id: 'french-delf', name: 'DELF考试' }
    ]
  }
];

const courses = [
  {
    id: 1,
    title: "英语启蒙课程",
    teacher: "Sarah Johnson",
    teacherAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    category: "english",
    subCategory: "english-basic",
    level: "初级",
    duration: "45分钟",
    rating: 4.8,
    students: 120,
    price: "¥199",
    tags: ["趣味互动", "游戏教学", "语音识别"],
    description: "专为零基础小朋友设计的英语启蒙课程，通过游戏和互动激发学习兴趣！",
    image: "https://source.unsplash.com/random/400x300/?english,kids"
  },
  {
    id: 2,
    title: "国际象棋英语课",
    teacher: "Michael Brown",
    teacherAvatar: "https://randomuser.me/api/portraits/men/42.jpg",
    category: "english",
    subCategory: "english-chess",
    level: "初级到高级",
    duration: "45分钟",
    rating: 4.9,
    students: 85,
    price: "¥259",
    tags: ["国际象棋", "策略思维", "英语教学"],
    description: "将国际象棋与英语学习完美结合，培养战略思维同时提升英语水平！",
    image: "https://source.unsplash.com/random/400x300/?chess"
  },
  {
    id: 3,
    title: "趣味科学实验课",
    teacher: "David Wilson",
    teacherAvatar: "https://randomuser.me/api/portraits/men/33.jpg",
    category: "english",
    subCategory: "english-science",
    level: "初级到中级",
    duration: "60分钟",
    rating: 4.8,
    students: 95,
    price: "¥229",
    tags: ["科学实验", "互动教学", "STEM教育"],
    description: "通过有趣的科学实验，用英语探索科学奥秘，激发科学兴趣！",
    image: "https://source.unsplash.com/random/400x300/?science,experiment"
  },
  {
    id: 4,
    title: "牛津历史探索",
    teacher: "Elizabeth Taylor",
    teacherAvatar: "https://randomuser.me/api/portraits/women/32.jpg",
    category: "english",
    subCategory: "english-history",
    level: "中级到高级",
    duration: "45分钟",
    rating: 4.7,
    students: 75,
    price: "¥239",
    tags: ["历史探索", "文化理解", "批判思维"],
    description: "带领学生探索世界历史，培养历史思维，提升英语表达！",
    image: "https://source.unsplash.com/random/400x300/?oxford,history"
  },
  {
    id: 5,
    title: "IB数学英语课程",
    teacher: "Robert Chen",
    teacherAvatar: "https://randomuser.me/api/portraits/men/52.jpg",
    category: "english",
    subCategory: "english-math",
    level: "高级",
    duration: "60分钟",
    rating: 4.9,
    students: 65,
    price: "¥279",
    tags: ["IB课程", "数学思维", "英语教学"],
    description: "为IB考试做准备，用英语掌握高等数学概念，提升数理思维！",
    image: "https://source.unsplash.com/random/400x300/?math,study"
  },
  {
    id: 6,
    title: "西语绘本阅读",
    teacher: "Carlos Rodriguez",
    teacherAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    category: "spanish",
    subCategory: "spanish-reading",
    level: "初级",
    duration: "45分钟",
    rating: 4.9,
    students: 80,
    price: "¥199",
    tags: ["绘本教学", "互动阅读", "词汇积累"],
    description: "通过精选西语绘本，培养阅读兴趣，积累基础词汇！",
    image: "https://source.unsplash.com/random/400x300/?spanish,book"
  },
  {
    id: 7,
    title: "法语考级辅导",
    teacher: "Marie Dubois",
    teacherAvatar: "https://randomuser.me/api/portraits/women/22.jpg",
    category: "french",
    subCategory: "french-exam",
    level: "中级",
    duration: "45分钟",
    rating: 4.7,
    students: 90,
    price: "¥199",
    tags: ["考级辅导", "真题讲解", "技巧指导"],
    description: "针对性强的法语考级课程，助你轻松通过各类考试！",
    image: "https://source.unsplash.com/random/400x300/?french,study"
  }
];

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory('');
  };

  const handleSubCategoryClick = (subCategoryId) => {
    setSelectedSubCategory(subCategoryId);
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setOpenDialog(true);
  };

  const handleBookCourse = () => {
    setOpenDialog(false);
    setSnackbar({
      open: true,
      message: '课程预约成功！开始精彩的学习之旅吧 ✨',
      severity: 'success'
    });
  };

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSubCategory = !selectedSubCategory || course.subCategory === selectedSubCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSubCategory && matchesSearch;
  });

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
        ✨ 探索精彩课程 ✨
      </Typography>

      <Box sx={{ mb: 4 }}>
        <SearchField
          fullWidth
          placeholder="搜索课程或老师..."
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

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {categories.map((category) => (
          <Grid item xs={6} sm={4} md={3} key={category.id}>
            <CategoryCard
              active={selectedCategory === category.id}
              onClick={() => handleCategoryClick(category.id)}
            >
              <Box sx={{ color: category.color }}>
                {category.icon}
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#333' }}>
                {category.name}
              </Typography>
            </CategoryCard>
          </Grid>
        ))}
      </Grid>

      {selectedCategory !== 'all' && (
        <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {categories.find(c => c.id === selectedCategory)?.subCategories.map((subCategory) => (
            <Chip
              key={subCategory.id}
              label={subCategory.name}
              onClick={() => handleSubCategoryClick(subCategory.id)}
              sx={{
                bgcolor: selectedSubCategory === subCategory.id ? '#4caf50' : '#e8f5e9',
                color: selectedSubCategory === subCategory.id ? 'white' : '#2e7d32',
                '&:hover': {
                  bgcolor: selectedSubCategory === subCategory.id ? '#388e3c' : '#c8e6c9',
                }
              }}
            />
          ))}
        </Box>
      )}

      <Grid container spacing={3}>
        {filteredCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <CourseCard>
              <Box sx={{ position: 'relative' }}>
                <img
                  src={course.image}
                  alt={course.title}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '20px',
                    borderTopRightRadius: '20px',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    bgcolor: 'rgba(255,255,255,0.9)',
                    borderRadius: '15px',
                    padding: '4px 12px',
                  }}
                >
                  {course.price}
                </Box>
              </Box>

              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {course.title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    src={course.teacherAvatar}
                    sx={{ width: 32, height: 32, mr: 1 }}
                  />
                  <Typography variant="subtitle2">
                    {course.teacher}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTimeIcon sx={{ fontSize: 20, color: '#666', mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {course.duration}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PeopleIcon sx={{ fontSize: 20, color: '#666', mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {course.students}人
                    </Typography>
                  </Box>
                  <Rating value={course.rating} precision={0.1} size="small" readOnly />
                </Box>

                <Box sx={{ mb: 2 }}>
                  {course.tags.map((tag, index) => (
                    <StyledChip
                      key={index}
                      label={tag}
                      size="small"
                      sx={{
                        backgroundColor: '#e8f5e9',
                        color: '#2e7d32'
                      }}
                    />
                  ))}
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleCourseClick(course)}
                  sx={{
                    bgcolor: '#4caf50',
                    '&:hover': {
                      bgcolor: '#388e3c',
                    }
                  }}
                >
                  查看详情
                </Button>
              </CardContent>
            </CourseCard>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedCourse && (
          <>
            <DialogTitle sx={{
              textAlign: 'center',
              color: '#2e7d32',
              fontWeight: 'bold'
            }}>
              课程详情
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <img
                  src={selectedCourse.image}
                  alt={selectedCourse.title}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '15px',
                  }}
                />
              </Box>

              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                {selectedCourse.title}
              </Typography>

              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
                pb: 2,
                borderBottom: '1px dashed #e0e0e0'
              }}>
                <Avatar
                  src={selectedCourse.teacherAvatar}
                  sx={{ width: 48, height: 48, mr: 2 }}
                />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {selectedCourse.teacher}
                  </Typography>
                  <Rating value={selectedCourse.rating} precision={0.1} size="small" readOnly />
                </Box>
              </Box>

              <Typography variant="body1" sx={{ mb: 2 }}>
                {selectedCourse.description}
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  课程信息
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <AccessTimeIcon sx={{ mr: 1, color: '#666' }} />
                      <Typography variant="body2">
                        课程时长：{selectedCourse.duration}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PeopleIcon sx={{ mr: 1, color: '#666' }} />
                      <Typography variant="body2">
                        已报名：{selectedCourse.students}人
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <StarIcon sx={{ mr: 1, color: '#666' }} />
                      <Typography variant="body2">
                        课程评分：{selectedCourse.rating}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <FilterListIcon sx={{ mr: 1, color: '#666' }} />
                      <Typography variant="body2">
                        难度等级：{selectedCourse.level}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  课程特色
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {selectedCourse.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      sx={{
                        bgcolor: '#e8f5e9',
                        color: '#2e7d32',
                        '&:hover': {
                          bgcolor: '#c8e6c9',
                        }
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button
                onClick={() => setOpenDialog(false)}
                sx={{ color: '#666' }}
              >
                取消
              </Button>
              <Button
                variant="contained"
                onClick={handleBookCourse}
                sx={{
                  bgcolor: '#4caf50',
                  '&:hover': {
                    bgcolor: '#388e3c',
                  }
                }}
              >
                立即预约
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

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

export default Courses; 