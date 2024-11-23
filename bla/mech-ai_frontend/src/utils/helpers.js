import { parseISO, format, differenceInDays, isAfter, isBefore } from 'date-fns';

/**
 * Format currency value
 * @param {number} value - Monetary amount
 * @param {string} [locale='en-US'] - Locale for formatting
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, locale = 'en-US') => 
  new Intl.NumberFormat(locale, { 
    style: 'currency', 
    currency: 'USD' 
  }).format(value);

/**
 * Safely parse JSON with error handling
 * @param {string} jsonString - JSON string to parse
 * @returns {object|null} Parsed object or null
 */
export const safeJsonParse = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('JSON Parse Error:', error);
    return null;
  }
};

/**
 * Debounce function to limit execution frequency
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Generate unique ID
 * @returns {string} Unique identifier
 */
export const generateUniqueId = () => 
  `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

/**
 * Deep clone an object
 * @param {object} obj - Object to clone
 * @returns {object} Deep cloned object
 */
export const deepClone = (obj) => 
  JSON.parse(JSON.stringify(obj));

/**
 * Format date with options
 * @param {string|Date} date - Date to format
 * @param {string} [formatString='PP'] - Date format
 * @returns {string} Formatted date
 */
export const formatDate = (date, formatString = 'PP') => 
  format(parseISO(date), formatString);

/**
 * Calculate days between dates
 * @param {string|Date} startDate - Start date
 * @param {string|Date} endDate - End date
 * @returns {number} Number of days between dates
 */
export const daysBetween = (startDate, endDate) => 
  differenceInDays(parseISO(endDate), parseISO(startDate));

/**
 * Check if a date is within a range
 * @param {string|Date} date - Date to check
 * @param {string|Date} start - Start of range
 * @param {string|Date} end - End of range
 * @returns {boolean} Whether date is in range
 */
export const isDateInRange = (date, start, end) => 
  isAfter(parseISO(date), parseISO(start)) && 
  isBefore(parseISO(date), parseISO(end));

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Max length
 * @param {string} [suffix='...'] - Suffix for truncated text
 * @returns {string} Truncated text
 */
export const truncateText = (text, length, suffix = '...') => 
  text.length > length 
    ? text.substring(0, length) + suffix 
    : text;