import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
} from '@mui/material';
import TeacherManagement from './components/TeacherManagement';
import SystemSettings from './components/SystemSettings';
import UserManagement from './components/UserManagement';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const AdminDashboard = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            管理员控制台
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="教师管理" />
          <Tab label="系统设置" />
          <Tab label="用户管理" />
          <Tab label="日志查看" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <TeacherManagement />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <SystemSettings />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <UserManagement />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <Typography>日志查看功能开发中...</Typography>
      </TabPanel>
    </Box>
  );
};

export default AdminDashboard; 