export const API_URL = import.meta.env.DEV
  ? import.meta.env.VITE_APP_SERVER_DEV
  : import.meta.env.VITE_APP_SERVER_PROD;
