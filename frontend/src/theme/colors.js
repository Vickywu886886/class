// 全局主题配色方案
export const childFriendlyColors = {
  primary: '#C5E6B0',     // 清新的浅绿色
  secondary: '#9DC88D',   // 深一点的绿色
  accent: '#E6D7B0',      // 温暖的米色
  text: '#2D5A27',        // 更深的绿色文字
  lightText: '#3A7434',   // 深绿色次要文字
  success: '#B8E6B0',     // 柔和的绿色
  error: '#E6B0B0',       // 柔和的红色
  background: '#F7FAF5',  // 浅绿色背景
  buttonHover: '#B8D9A3', // 按钮悬停色
  secondaryHover: '#8CB87D', // 次要按钮悬停色
  cardBackground: 'white',
  border: 'rgba(197,230,176,0.3)',
  shadow: 'rgba(197,230,176,0.2)'
};

// 通用样式配置
export const commonStyles = {
  // 卡片样式
  card: {
    borderRadius: '24px',
    bgcolor: 'white',
    boxShadow: '0 8px 32px ' + childFriendlyColors.shadow,
    border: '1px solid ' + childFriendlyColors.border
  },

  // 按钮样式
  button: {
    primary: {
      bgcolor: childFriendlyColors.primary,
      color: childFriendlyColors.text,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      '&:hover': {
        bgcolor: childFriendlyColors.buttonHover,
      }
    },
    secondary: {
      color: childFriendlyColors.secondary,
      borderColor: childFriendlyColors.secondary,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      '&:hover': {
        borderColor: childFriendlyColors.secondaryHover,
        bgcolor: `${childFriendlyColors.secondary}10`,
      }
    }
  },

  // 文本样式
  text: {
    primary: {
      color: childFriendlyColors.text,
      fontWeight: 600,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    },
    secondary: {
      color: childFriendlyColors.text,
      fontWeight: 500,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    }
  },

  // 全局 Typography 样式覆盖
  typography: {
    allVariants: {
      color: childFriendlyColors.text,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    },
    body1: {
      color: childFriendlyColors.text,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    },
    body2: {
      color: childFriendlyColors.text,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    },
    subtitle1: {
      color: childFriendlyColors.text,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    },
    subtitle2: {
      color: childFriendlyColors.text,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    }
  },

  // 输入框样式
  input: {
    '& .MuiInputLabel-root': {
      color: childFriendlyColors.lightText,
      fontWeight: 500,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    },
    '& .MuiOutlinedInput-root': {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      '&.Mui-focused fieldset': {
        borderColor: childFriendlyColors.primary
      }
    },
    '& .MuiInputBase-input': {
      color: childFriendlyColors.text,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    },
    '& .MuiInputAdornment-root .MuiSvgIcon-root': {
      color: childFriendlyColors.text
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: childFriendlyColors.secondary
    }
  }
}; 