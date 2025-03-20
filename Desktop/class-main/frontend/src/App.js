import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';

// 导入学生端页面
import Home from './pages/Home';
import Courses from './pages/Courses';
import StudentProfile from './pages/StudentProfile';
import StudentDashboard from './pages/StudentDashboard';

// 导入教师端页面
import TeacherDashboard from './teacher/Dashboard';
import TeacherHome from './teacher/Home';

// 导入管理端页面
import AdminDashboard from './admin/Dashboard';

// 导入公共页面
import Login from './pages/Login';
import Teachers from './pages/Teachers';

// 路由保护组件
const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

// 教师路由保护
const TeacherRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.role !== 'teacher') {
    return <Navigate to="/" />;
  }
  return children;
};

// 学生路由保护
const StudentRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.role !== 'student') {
    return <Navigate to="/" />;
  }
  return children;
};

// 管理员路由保护
const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Layout>
        <Routes>
          {/* 公共路由 */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/login" element={<Login />} />

          {/* 学生端路由 */}
          <Route
            path="/student/dashboard"
            element={
              <PrivateRoute>
                <StudentRoute>
                  <StudentDashboard />
                </StudentRoute>
              </PrivateRoute>
            }
          />
          <Route
            path="/student/profile"
            element={
              <PrivateRoute>
                <StudentRoute>
                  <StudentProfile />
                </StudentRoute>
              </PrivateRoute>
            }
          />

          {/* 教师端路由 */}
          <Route
            path="/teacher"
            element={
              <PrivateRoute>
                <TeacherRoute>
                  <TeacherHome />
                </TeacherRoute>
              </PrivateRoute>
            }
          />
          <Route
            path="/teacher/dashboard"
            element={
              <PrivateRoute>
                <TeacherRoute>
                  <TeacherDashboard />
                </TeacherRoute>
              </PrivateRoute>
            }
          />
          <Route
            path="/teacher-profile"
            element={
              <PrivateRoute>
                <TeacherRoute>
                  <TeacherDashboard />
                </TeacherRoute>
              </PrivateRoute>
            }
          />

          {/* 管理端路由 */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
