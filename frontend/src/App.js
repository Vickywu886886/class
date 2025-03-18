import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Profile from './pages/Profile';
import TeacherProfile from './pages/TeacherProfile';
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
  if (!user || !user.isTeacher) {
    return <Navigate to="/" />;
  }
  return children;
};

// 学生路由保护
const StudentRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.isTeacher) {
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <StudentRoute>
                  <Profile />
                </StudentRoute>
              </PrivateRoute>
            }
          />
          <Route
            path="/teacher-profile"
            element={
              <PrivateRoute>
                <TeacherRoute>
                  <TeacherProfile />
                </TeacherRoute>
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
