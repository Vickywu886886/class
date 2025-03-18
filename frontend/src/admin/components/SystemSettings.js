import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
} from '@mui/material';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    siteName: '教务管理系统',
    siteDescription: '高校教务管理系统',
    contactEmail: 'admin@example.com',
    contactPhone: '123-456-7890',
    maintenanceMode: false,
    allowRegistration: true,
    maxFileSize: '10',
    sessionTimeout: '30',
    backupFrequency: 'daily',
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // 这里应该调用API保存设置
    setMessage({
      type: 'success',
      text: '设置已保存'
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        系统设置
      </Typography>

      {message.text && (
        <Alert severity={message.type} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              基本设置
            </Typography>
            <TextField
              fullWidth
              label="系统名称"
              value={settings.siteName}
              onChange={handleChange('siteName')}
              margin="normal"
            />
            <TextField
              fullWidth
              label="系统描述"
              value={settings.siteDescription}
              onChange={handleChange('siteDescription')}
              margin="normal"
            />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              联系信息
            </Typography>
            <TextField
              fullWidth
              label="联系邮箱"
              value={settings.contactEmail}
              onChange={handleChange('contactEmail')}
              margin="normal"
            />
            <TextField
              fullWidth
              label="联系电话"
              value={settings.contactPhone}
              onChange={handleChange('contactPhone')}
              margin="normal"
            />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              系统选项
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.maintenanceMode}
                  onChange={handleChange('maintenanceMode')}
                />
              }
              label="维护模式"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.allowRegistration}
                  onChange={handleChange('allowRegistration')}
                />
              }
              label="允许注册"
            />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              系统限制
            </Typography>
            <TextField
              fullWidth
              label="最大文件上传大小 (MB)"
              type="number"
              value={settings.maxFileSize}
              onChange={handleChange('maxFileSize')}
              margin="normal"
            />
            <TextField
              fullWidth
              label="会话超时时间 (分钟)"
              type="number"
              value={settings.sessionTimeout}
              onChange={handleChange('sessionTimeout')}
              margin="normal"
            />
            <TextField
              fullWidth
              label="备份频率"
              value={settings.backupFrequency}
              onChange={handleChange('backupFrequency')}
              margin="normal"
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                保存设置
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default SystemSettings; 