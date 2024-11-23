// Application-wide constants and configuration

export const API_BASE_URL = 'http://localhost:8000';

export const DEFAULT_PAGINATION_LIMIT = 10;
export const MAX_UPLOAD_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager', 
  USER: 'user',
  GUEST: 'guest'
};

export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

export const DATE_FORMATS = {
  SHORT: 'MM/DD/YYYY',
  LONG: 'MMMM Do, YYYY',
  TIME: 'HH:mm:ss'
};

export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  USERNAME: /^[a-zA-Z0-9_]{3,16}$/
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection error. Please try again.',
  UNAUTHORIZED_ACCESS: 'You are not authorized to access this resource.',
  INVALID_INPUT: 'Invalid input. Please check your data.'
};