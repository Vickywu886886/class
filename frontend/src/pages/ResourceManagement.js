import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Chip,
  Divider,
  LinearProgress,
  IconButton,
  Tooltip,
  Avatar,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tab,
  Tabs,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from '@mui/material';
import {
  LibraryBooks as LibraryBooksIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Upload as UploadIcon,
  Category as CategoryIcon,
  Star as StarIcon,
  EmojiEvents as EmojiEventsIcon,
  Book as BookIcon,
} from '@mui/icons-material';

// Mock data
const resources = [
  {
    id: 1,
    title: '英语口语练习材料',
    type: 'pdf',
    category: '口语',
    level: '中级',
    uploadDate: '2024-03-19',
    downloads: 120,
    isRecommended: true,
    description: '包含日常对话、商务英语等实用口语练习材料',
  },
  {
    id: 2,
    title: '阅读理解技巧视频',
    type: 'video',
    category: '阅读',
    level: '高级',
    uploadDate: '2024-03-18',
    downloads: 85,
    isRecommended: true,
    description: '详细讲解阅读理解解题技巧和策略',
  },
  {
    id: 3,
    title: '写作范文集',
    type: 'pdf',
    category: '写作',
    level: '中级',
    uploadDate: '2024-03-17',
    downloads: 65,
    isRecommended: false,
    description: '精选各类写作范文，包含详细点评',
  },
];

const ResourceManagement = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [selectedResource, setSelectedResource] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    category: '',
    level: '',
    description: '',
    isRecommended: false,
  });

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleOpenDialog = (type, resource = null) => {
    setDialogType(type);
    if (resource) {
      setSelectedResource(resource);
      setFormData({
        title: resource.title,
        type: resource.type,
        category: resource.category,
        level: resource.level,
        description: resource.description,
        isRecommended: resource.isRecommended,
      });
    } else {
      setSelectedResource(null);
      setFormData({
        title: '',
        type: '',
        category: '',
        level: '',
        description: '',
        isRecommended: false,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogType('');
    setSelectedResource(null);
  };

  const handleFormChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const getResourceTypeIcon = (type) => {
    switch (type) {
      case 'pdf':
        return '📄';
      case 'video':
        return '🎥';
      case 'audio':
        return '🎵';
      default:
        return '📁';
    }
  };

  const renderResourceCard = (resource) => (
    <Card key={resource.id} sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" sx={{ mr: 2 }}>
            {getResourceTypeIcon(resource.type)}
          </Typography>
          <Box>
            <Typography variant="h6">{resource.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {resource.category} | {resource.level}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {resource.description}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              上传日期
            </Typography>
            <Typography variant="body2">
              {resource.uploadDate}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              下载次数
            </Typography>
            <Typography variant="body2">
              {resource.downloads}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {resource.isRecommended && (
                <Chip
                  icon={<StarIcon />}
                  label="推荐资源"
                  color="primary"
                  size="small"
                />
              )}
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Button
            size="small"
            startIcon={<EditIcon />}
            onClick={() => handleOpenDialog('edit', resource)}
          >
            编辑
          </Button>
          <Button
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleOpenDialog('delete', resource)}
          >
            删除
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* 左侧导航 */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <List>
                <ListItem button selected={selectedTab === 0} onClick={() => setSelectedTab(0)}>
                  <ListItemIcon><LibraryBooksIcon /></ListItemIcon>
                  <ListItemText primary="资源列表" />
                </ListItem>
                <ListItem button selected={selectedTab === 1} onClick={() => setSelectedTab(1)}>
                  <ListItemIcon><CategoryIcon /></ListItemIcon>
                  <ListItemText primary="分类管理" />
                </ListItem>
                <ListItem button selected={selectedTab === 2} onClick={() => setSelectedTab(2)}>
                  <ListItemIcon><StarIcon /></ListItemIcon>
                  <ListItemText primary="推荐资源" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* 右侧内容 */}
        <Grid item xs={12} md={9}>
          <Card>
            <CardContent>
              {/* 资源列表 */}
              {selectedTab === 0 && (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6">资源列表</Typography>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => handleOpenDialog('add')}
                    >
                      添加资源
                    </Button>
                  </Box>
                  <Grid container spacing={2}>
                    {resources.map(renderResourceCard)}
                  </Grid>
                </>
              )}

              {/* 分类管理 */}
              {selectedTab === 1 && (
                <Typography variant="h6" color="text.secondary">
                  分类管理功能开发中...
                </Typography>
              )}

              {/* 推荐资源 */}
              {selectedTab === 2 && (
                <Typography variant="h6" color="text.secondary">
                  推荐资源功能开发中...
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 添加/编辑资源对话框 */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'add' ? '添加资源' : dialogType === 'edit' ? '编辑资源' : '删除资源'}
        </DialogTitle>
        <DialogContent>
          {dialogType !== 'delete' ? (
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="资源标题"
                value={formData.title}
                onChange={handleFormChange('title')}
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>资源类型</InputLabel>
                <Select
                  value={formData.type}
                  onChange={handleFormChange('type')}
                  label="资源类型"
                >
                  <MenuItem value="pdf">PDF文档</MenuItem>
                  <MenuItem value="video">视频</MenuItem>
                  <MenuItem value="audio">音频</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>分类</InputLabel>
                <Select
                  value={formData.category}
                  onChange={handleFormChange('category')}
                  label="分类"
                >
                  <MenuItem value="口语">口语</MenuItem>
                  <MenuItem value="阅读">阅读</MenuItem>
                  <MenuItem value="写作">写作</MenuItem>
                  <MenuItem value="听力">听力</MenuItem>
                  <MenuItem value="语法">语法</MenuItem>
                  <MenuItem value="词汇">词汇</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>难度等级</InputLabel>
                <Select
                  value={formData.level}
                  onChange={handleFormChange('level')}
                  label="难度等级"
                >
                  <MenuItem value="初级">初级</MenuItem>
                  <MenuItem value="中级">中级</MenuItem>
                  <MenuItem value="高级">高级</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="资源描述"
                value={formData.description}
                onChange={handleFormChange('description')}
                margin="normal"
                multiline
                rows={4}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>推荐设置</InputLabel>
                <Select
                  value={formData.isRecommended}
                  onChange={handleFormChange('isRecommended')}
                  label="推荐设置"
                >
                  <MenuItem value={true}>推荐</MenuItem>
                  <MenuItem value={false}>不推荐</MenuItem>
                </Select>
              </FormControl>
            </Box>
          ) : (
            <Typography>
              确定要删除资源 {selectedResource?.title} 吗？此操作不可撤销。
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button
            variant="contained"
            color={dialogType === 'delete' ? 'error' : 'primary'}
            onClick={handleCloseDialog}
          >
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ResourceManagement; 