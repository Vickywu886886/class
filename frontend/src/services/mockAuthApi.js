// Mock user data
const mockUsers = {
  'teacher@example.com': {
    id: 1,
    email: 'teacher@example.com',
    password: 'teacher123',
    role: 'teacher',
    name: 'John Smith',
    title: 'Senior English Teacher',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  'student@example.com': {
    id: 2,
    email: 'student@example.com',
    password: 'student123',
    role: 'student',
    name: 'Jane Doe',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  'admin@example.com': {
    id: 3,
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User',
    username: 'admin',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    adminMenuItems: [
      { label: '员工管理', value: 'staff' },
      { label: '学员管理', value: 'students' },
      { label: '班级管理', value: 'classes' },
      { label: '课表管理', value: 'schedule' },
      { label: '课程订单', value: 'orders' }
    ]
  }
};

export const login = async (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers[credentials.email];
      if (user && user.password === credentials.password) {
        const { password, ...userWithoutPassword } = user;
        resolve({
          user: userWithoutPassword,
          token: 'mock-jwt-token'
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000); // Simulate network delay
  });
};

export const register = async (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mockUsers[userData.email]) {
        reject(new Error('User already exists'));
      } else {
        const newUser = {
          id: Object.keys(mockUsers).length + 1,
          ...userData,
          avatar: `https://randomuser.me/api/portraits/${userData.gender === 'female' ? 'women' : 'men'}/${Object.keys(mockUsers).length + 1}.jpg`
        };
        mockUsers[userData.email] = newUser;
        const { password, ...userWithoutPassword } = newUser;
        resolve({
          user: userWithoutPassword,
          token: 'mock-jwt-token'
        });
      }
    }, 1000);
  });
};

export const updateAvatar = async (avatarData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, avatar: avatarData });
    }, 1000);
  });
};

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}; 