# 趣味学习平台

一个现代化的在线语言学习平台，提供多语言课程和互动教学体验。

## 功能特点

- 用户认证（账号密码登录 + 微信登录）
- 基于年级的课程筛选
- 多语言课程支持（英语、西班牙语、法语）
- 课程预约系统
- 实时课程评分
- 响应式设计

## 技术栈

- React
- Material-UI
- React Router
- RESTful API

## 开始使用

1. 克隆项目
```bash
git clone [your-repository-url]
```

2. 安装依赖
```bash
npm install
```

3. 运行开发服务器
```bash
npm start
```

4. 构建生产版本
```bash
npm run build
```

## 项目结构

```
src/
  ├── components/     # 可重用组件
  ├── pages/         # 页面组件
  ├── assets/        # 静态资源
  ├── utils/         # 工具函数
  └── App.js         # 根组件
```

## 环境变量

创建 `.env` 文件并设置以下变量：

```
REACT_APP_API_URL=your_api_url
REACT_APP_WECHAT_APP_ID=your_wechat_app_id
```

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情 