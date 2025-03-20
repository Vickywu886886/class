import { format, formatInTimeZone } from 'date-fns-tz';

// 时区信息映射
export const TIMEZONE_INFO = {
  'America/New_York': {
    name: 'New York',
    flag: '🇺🇸',
    offset: 'GMT-5',
  },
  'Asia/Shanghai': {
    name: 'Beijing',
    flag: '🇨🇳',
    offset: 'GMT+8',
  },
  // 可以添加更多时区
};

// 获取用户时区
export const getUserTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

// 格式化时间（24小时制，带时区信息）
export const formatTimeWithTimezone = (date, timezone, formatStr = 'HH:mm') => {
  return formatInTimeZone(date, timezone, formatStr);
};

// 获取时区显示文本
export const getTimezoneDisplay = (timezone) => {
  const info = TIMEZONE_INFO[timezone];
  if (!info) return timezone;
  return `${info.flag} ${info.name} (${info.offset})`;
};

// 检查时间是否在合理范围内
export const isTimeInValidRange = (date, daysAhead = 30) => {
  const now = new Date();
  const maxDate = new Date();
  maxDate.setDate(now.getDate() + daysAhead);
  return date >= now && date <= maxDate;
};

// 检查时间是否在深夜时段（22:00 - 06:00）
export const isNightTime = (date, timezone) => {
  const hour = parseInt(formatInTimeZone(date, timezone, 'HH'));
  return hour >= 22 || hour < 6;
};

// 转换时间到目标时区
export const convertToTimezone = (date, fromTimezone, toTimezone) => {
  return new Date(formatInTimeZone(date, fromTimezone, "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone: toTimezone }));
};

// 检查时间冲突
export const hasTimeConflict = (newSlot, existingSlots, timezone) => {
  return existingSlots.some(slot => {
    const slotStart = new Date(slot.startTime);
    const slotEnd = new Date(slot.endTime);
    const newStart = new Date(newSlot.startTime);
    const newEnd = new Date(newSlot.endTime);
    
    return (newStart >= slotStart && newStart < slotEnd) ||
           (newEnd > slotStart && newEnd <= slotEnd) ||
           (newStart <= slotStart && newEnd >= slotEnd);
  });
};

// 获取提醒时间
export const getReminderTimes = (appointmentTime) => {
  const time = new Date(appointmentTime);
  return {
    dayBefore: new Date(time.getTime() - 24 * 60 * 60 * 1000),
    oneHour: new Date(time.getTime() - 60 * 60 * 1000),
    fifteenMinutes: new Date(time.getTime() - 15 * 60 * 1000),
  };
};

// 生成24小时制的时间槽
export const generateTimeSlots = () => {
  return Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = (i % 2) * 30;
    return {
      start: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      end: minute === 0 
        ? `${String(hour).padStart(2, '0')}:30`
        : `${String(hour + 1).padStart(2, '0')}:00`
    };
  });
};

// 获取时区偏移量
export const getTimezoneOffset = (timezone) => {
  const date = new Date();
  const timeString = formatInTimeZone(date, timezone, 'xxx');
  return timeString;
};

// 检查时间是否在教师的工作时间内
export const isWithinWorkingHours = (date, timezone) => {
  const hour = parseInt(formatInTimeZone(date, timezone, 'HH'));
  return hour >= 9 && hour < 22; // 假设工作时间为 9:00-22:00
}; 