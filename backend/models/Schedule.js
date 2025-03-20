const mongoose = require('mongoose');

const TimeSlotSchema = new mongoose.Schema({
  start: {
    type: String,
    required: true
  },
  end: {
    type: String,
    required: true
  },
  enabled: {
    type: Boolean,
    default: true
  }
});

const ScheduleSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  timeSlots: [TimeSlotSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 确保每个教师在同一天只有一个课程表
ScheduleSchema.index({ teacher: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Schedule', ScheduleSchema); 