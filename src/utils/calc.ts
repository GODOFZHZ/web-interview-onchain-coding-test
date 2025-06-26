// src/utils/precisionCalc.js
import Big from 'big.js';

// 配置全局参数：保留小数点后2位（适合金额计算）
Big.DP = 18;
Big.RM = Big.roundHalfUp; // 四舍五入

/**
 * 精确加法
 * @param {number|string} a - 第一个数
 * @param {number|string} b - 第二个数
 * @returns {string} 计算结果
 */
export const add = (a, b) => {
  return new Big(a).plus(new Big(b)).toString();
};

/**
 * 精确减法
 * @param {number|string} a - 第一个数
 * @param {number|string} b - 第二个数
 * @returns {string} 计算结果
 */
export const subtract = (a, b) => {
  return new Big(a).minus(new Big(b)).toString();
};

/**
 * 精确乘法
 * @param {number|string} a - 第一个数
 * @param {number|string} b - 第二个数
 * @returns {string} 计算结果
 */
export const multiply = (a, b) => {
  return new Big(a).times(new Big(b)).toString();
};

/**
 * 精确除法
 * @param {number|string} a - 第一个数
 * @param {number|string} b - 第二个数
 * @returns {string} 计算结果
 * @throws {Error} 除数为0时抛出错误
 */
export const divide = (a, b) => {
  if (Number(b) === 0) throw new Error('除数不能为零');
  return new Big(a).div(new Big(b)).toString();
};

/**
 * 格式化金额（千分位分隔）
 * @param {string|number} num - 要格式化的数字
 * @returns {string} 格式化后的金额字符串
 */
export const formatCurrency = (num) => {
  const bigNum = new Big(num);
  // 处理负数
  const isNegative = bigNum.lt(0);
  const absNum = bigNum.abs().toString();
  
  // 分割整数和小数部分
  const [integerPart, decimalPart] = absNum.split('.');
  
  // 整数部分千分位格式化
  const formattedInteger = integerPart
    .split('')
    .reverse()
    .reduce((acc, digit, idx) => {
      return idx > 0 && idx % 3 === 0 ? digit + ',' + acc : digit + acc;
    }, '');
  
  // 组合整数和小数部分
  let formatted = decimalPart 
    ? `${formattedInteger}.${decimalPart}` 
    : formattedInteger;
  
  return isNegative ? `-${formatted}` : formatted;
};
export const roundDecimal = (value, options = {}) => {
  // 默认配置
  const defaultOptions = {
    decimalPlaces: 2,      // 保留小数位数
    roundingMode: Big.roundHalfUp, // 舍入模式：四舍五入
    keepTrailingZeros: false, // 是否保留末尾的零（如1.00）
    trimIntegerPartZero: true, // 是否去除整数部分多余的零（如001.23 → 1.23）
    separator: ''          // 千分位分隔符（默认不使用）
  };

  // 合并选项
  const {
    decimalPlaces,
    roundingMode,
    keepTrailingZeros,
    trimIntegerPartZero,
    separator
  } = { ...defaultOptions, ...options };

  try {
    // 创建Big对象（使用字符串以避免初始精度丢失）
    let bigValue = new Big(String(value));
    
    // 应用舍入模式
    bigValue = bigValue.round(decimalPlaces, roundingMode);
    
    // 转换为字符串表示
    let result = keepTrailingZeros 
      ? bigValue.toFixed(decimalPlaces)  // 保留尾随零
      : bigValue.toString();            // 去除尾随零
    
    // 处理整数部分前导零
    if (trimIntegerPartZero) {
      // 处理格式：去掉整数部分多余的0
      if (result.includes('.')) {
        const [integerPart, decimalPart] = result.split('.');
        const cleanInteger = integerPart.replace(/^0+/, '') || '0';
        result = `${cleanInteger}.${decimalPart}`;
      } else {
        result = result.replace(/^0+/, '') || '0';
      }
    }
    
    // 应用千分位分隔符
    if (separator) {
      const parts = result.split('.');
      const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      const decimalPart = parts.length > 1 ? `.${parts[1]}` : '';
      result = `${integerPart}${decimalPart}`;
    }
    
    return result;
  } catch (error) {
    console.error(`roundDecimal error with value: ${value}`, error);
    return 'Invalid input';
  }
};

// 舍入模式常量（方便外部使用）
export const  ROUNDING_MODES = {
  /** 向上舍入 (1.1 → 2) */
  ROUND_UP: Big.roundUp,
  
  /** 向下舍入 (1.9 → 1) */
  ROUND_DOWN: Big.roundDown,
  
  /** 四舍五入 (1.5 → 2) */
  ROUND_HALF_UP: Big.roundHalfUp,
  
  /** 五舍六入 (1.5 → 1, 1.6 → 2) */
  ROUND_HALF_DOWN: Big.roundHalfDown,
  
  /** 银行家舍入法 (1.5 → 2, 2.5 → 2) */
  ROUND_HALF_EVEN: Big.roundHalfEven,
};