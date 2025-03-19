const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5001;

// 中间件
app.use(cors());
app.use(express.json());

// 内存存储用户数据
let users = [
  {
    id: '1',
    username: 'teacher',  // 简化账号
    email: 'teacher@test.com',
    password: 'teacher123',
    role: 'teacher'
  },
  {
    id: '2',
    username: 'student',  // 简化账号
    email: 'student@test.com',
    password: 'student123',
    role: 'student'
  },
  {
    id: '3',
    username: 'admin',  // 简化账号
    email: 'admin@test.com',
    password: 'admin123',
    role: 'admin'
  }
];

// 登录路由
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // 支持使用用户名或邮箱登录
    const user = users.find(u => u.username === email || u.email === email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// 注册路由
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = users.find(u => u.email === email || u.username === username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const newUser = {
      id: String(users.length + 1),
      username,
      email,
      password: password,
      role: role || 'student'
    };

    users.push(newUser);

    const token = jwt.sign(
      { userId: newUser.id, role: newUser.role },
      'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 