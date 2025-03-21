import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';

// 导入学生端页面
import Home from './pages/Home';
import Courses from './pages/Courses';
<<<<<<< HEAD
import StudentProfile from './pages/StudentProfile';
=======
import Profile from './pages/Profile';
>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc
import StudentDashboard from './pages/StudentDashboard';

// 导入教师端页面
import TeacherDashboard from './teacher/Dashboard';
<<<<<<< HEAD
import TeacherStudents from './teacher/Students';
import TeacherAssignments from './teacher/Assignments';
import TeacherProfile from './teacher/Profile';
import TeacherAvailability from './teacher/Availability';
import TeacherCourses from './teacher/Courses';
import TeacherSettings from './teacher/Settings';
=======
import TeacherHome from './teacher/Home';
>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc

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
<<<<<<< HEAD
                  <StudentProfile />
=======
                  <Profile />
>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc
                </StudentRoute>
              </PrivateRoute>
            }
          />

          {/* 教师端路由 */}
          <Route
            path="/teacher"
<<<<<<< HEAD
            element={<Navigate to="/teacher/dashboard" replace />}
=======
            element={
              <PrivateRoute>
                <TeacherRoute>
                  <TeacherHome />
                </TeacherRoute>
              </PrivateRoute>
            }
>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc
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
<<<<<<< HEAD
            path="/teacher/students"
            element={
              <PrivateRoute>
                <TeacherRoute>
                  <TeacherStudents />
                </TeacherRoute>
              </PrivateRoute>
            }
          />
          <Route
            path="/teacher/assignments"
            element={
              <PrivateRoute>
                <TeacherRoute>
                  <TeacherAssignments />
                </TeacherRoute>
              </PrivateRoute>
            }
          />
          <Route
            path="/teacher/profile"
            element={
              <PrivateRoute>
                <TeacherRoute>
                  <TeacherProfile />
                </TeacherRoute>
              </PrivateRoute>
            }
          />
          <Route
            path="/teacher/availability"
            element={
              <PrivateRoute>
                <TeacherRoute>
                  <TeacherAvailability />
                </TeacherRoute>
              </PrivateRoute>
            }
          />
          <Route
            path="/teacher/courses"
            element={
              <PrivateRoute>
                <TeacherRoute>
                  <TeacherCourses />
                </TeacherRoute>
              </PrivateRoute>
            }
          />
          <Route
            path="/teacher/settings"
            element={
              <PrivateRoute>
                <TeacherRoute>
                  <TeacherSettings />
=======
            path="/teacher-profile"
            element={
              <PrivateRoute>
                <TeacherRoute>
                  <TeacherDashboard />
>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc
                </TeacherRoute>
              </PrivateRoute>
            }
          />

          {/* 管理端路由 */}
          <Route
<<<<<<< HEAD
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />
          <Route
=======
>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc
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
