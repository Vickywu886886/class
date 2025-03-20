const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');
const Schedule = require('../models/Schedule');
const auth = require('../middleware/auth');

// 获取教师个人信息
router.get('/profile', auth, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.user.id).select('-password');
    res.json(teacher);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// 更新教师个人信息
router.put('/profile', auth, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.user.id);
    if (!teacher) {
      return res.status(404).json({ msg: 'Teacher not found' });
    }

    const { firstName, lastName, email, phone, introduction, teachingPhilosophy } = req.body;
    teacher.firstName = firstName || teacher.firstName;
    teacher.lastName = lastName || teacher.lastName;
    teacher.email = email || teacher.email;
    teacher.phone = phone || teacher.phone;
    teacher.introduction = introduction || teacher.introduction;
    teacher.teachingPhilosophy = teachingPhilosophy || teacher.teachingPhilosophy;

    await teacher.save();
    res.json(teacher);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// 设置教师可用时间
router.post('/schedule', auth, async (req, res) => {
  try {
    const { date, timeSlots } = req.body;
    let schedule = await Schedule.findOne({ teacher: req.user.id, date });
    
    if (!schedule) {
      schedule = new Schedule({
        teacher: req.user.id,
        date,
        timeSlots
      });
    } else {
      schedule.timeSlots = timeSlots;
    }

    await schedule.save();
    res.json(schedule);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// 获取教师可用时间
router.get('/schedule', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const schedules = await Schedule.find({
      teacher: req.user.id,
      date: { $gte: startDate, $lte: endDate }
    });
    res.json(schedules);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// 获取预约请求
router.get('/booking-requests', auth, async (req, res) => {
  try {
    const requests = await BookingRequest.find({
      teacher: req.user.id,
      status: 'pending'
    }).populate('student', 'name email');
    res.json(requests);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// 处理预约请求
router.put('/booking-requests/:id', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const request = await BookingRequest.findById(req.params.id);
    
    if (!request) {
      return res.status(404).json({ msg: 'Request not found' });
    }

    if (request.teacher.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    request.status = status;
    await request.save();

    if (status === 'accepted') {
      // 创建课程
      const course = new Course({
        teacher: req.user.id,
        student: request.student,
        date: request.date,
        timeSlot: request.timeSlot,
        status: 'scheduled'
      });
      await course.save();
    }

    res.json(request);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router; 