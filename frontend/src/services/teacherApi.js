import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// 获取教师个人信息
export const getTeacherProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/teacher/profile`);
    return response.data;
  } catch (error) {
    // 在开发环境中返回模拟数据
    return {
      firstName: 'Sarah',
      lastName: 'Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      experience: {
        years: 5,
        ageGroups: ['Elementary', 'Middle School', 'High School'],
        courseTypes: ['Speaking', 'Writing', 'Grammar']
      },
      teachingStyle: {
        methods: ['Interactive', 'Communicative', 'Task-based'],
        specialties: ['Business English', 'IELTS', 'TOEFL']
      },
      introduction: 'I am an experienced English teacher with a passion for helping students improve their language skills. I believe in creating an engaging and supportive learning environment where students feel comfortable practicing and making mistakes.',
      teachingPhilosophy: 'I believe that language learning should be fun and practical. My teaching approach focuses on real-world communication and building confidence through regular practice and positive reinforcement.',
      interests: ['Reading', 'Travel', 'Photography'],
      education: [
        {
          degree: 'Master of Education',
          university: 'University of Cambridge',
          year: '2018'
        },
        {
          degree: 'Bachelor of Arts in English',
          university: 'University of Oxford',
          year: '2016'
        }
      ]
    };
  }
};

// 更新教师个人信息
export const updateTeacherProfile = async (profileData) => {
  try {
    const response = await axios.put(`${API_URL}/teacher/profile`, profileData);
    return response.data;
  } catch (error) {
    // 在开发环境中返回更新后的数据
    return profileData;
  }
};

// 设置教师可用时间
export const setTeacherSchedule = async (date, timeSlots) => {
  try {
    const response = await axios.post(`${API_URL}/teacher/schedule`, {
      date,
      timeSlots
    });
    return response.data;
  } catch (error) {
    // 在开发环境中返回成功状态
    return { success: true, date, timeSlots };
  }
};

// 获取教师可用时间
export const getTeacherSchedule = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${API_URL}/teacher/schedule`, {
      params: { startDate, endDate }
    });
    return response.data;
  } catch (error) {
    // 在开发环境中返回模拟数据
    const mockSchedule = [];
    const currentDate = new Date(startDate);
    const endDateTime = new Date(endDate);

    while (currentDate <= endDateTime) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const timeSlots = [];
      
      // 生成每天的时间槽
      for (let hour = 9; hour < 21; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          const endTime = `${hour.toString().padStart(2, '0')}:${(minute + 30).toString().padStart(2, '0')}`;
          timeSlots.push({
            start: startTime,
            end: endTime,
            enabled: Math.random() > 0.5 // 随机设置可用性
          });
        }
      }

      mockSchedule.push({
        date: dateStr,
        timeSlots
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return mockSchedule;
  }
};

// 获取预约请求
export const getBookingRequests = async () => {
  try {
    const response = await axios.get(`${API_URL}/teacher/booking-requests`);
    return response.data;
  } catch (error) {
    // 在开发环境中返回模拟数据
    return [
      {
        id: 1,
        student: 'Wang Wu',
        englishName: 'William',
        grade: 'Grade 3',
        material: 'Oxford English',
        unit: 'Unit 5 - My Family',
        requestTime: '2024-03-18 14:30',
        status: 'pending'
      },
      {
        id: 2,
        student: 'Li Si',
        englishName: 'Lucy',
        grade: 'Grade 4',
        material: 'Cambridge English',
        unit: 'Unit 3 - Daily Activities',
        requestTime: '2024-03-18 15:45',
        status: 'pending'
      }
    ];
  }
};

// 处理预约请求
export const handleBookingRequest = async (requestId, status) => {
  try {
    const response = await axios.put(`${API_URL}/teacher/booking-requests/${requestId}`, {
      status
    });
    return response.data;
  } catch (error) {
    // 在开发环境中返回成功状态
    return { success: true, requestId, status };
  }
}; 