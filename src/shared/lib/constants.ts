export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  DOCUMENTS: '/documents',
  REFERENCES: '/references',
  ADMIN: '/admin',
  REPORTS: '/reports',
} as const

export const API_ENDPOINTS = {
  USERS: '/users',
  PROJECTS: '/projects',
  DOCUMENTS: '/documents',
} as const

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const

export const PAGE_SIZES = [10, 20, 50, 100, 200, 500] as const

export const COLORS = {
  ROW_COLORS: {
    green: '#d9f7be',
    yellow: '#fff1b8',
    blue: '#e6f7ff',
    red: '#ffa39e',
  },
} as const

export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 250 * 1024 * 1024, // 250MB
  ACCEPTED_TYPES: [
    '.xlsx',
    '.xls',
    '.csv',
    '.pdf',
    '.doc',
    '.docx',
    '.png',
    '.jpg',
    '.jpeg',
  ],
} as const