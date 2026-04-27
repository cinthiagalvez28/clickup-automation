import * as dotenv from 'dotenv';

dotenv.config();

export const ROUTES = {
  BASE_URL: process.env.BASE_URL as string,
  LOGIN: '/login',
  BOARD_PAGE: '/90141183202/v/l/2kydak72-514',
  HOME_PAGE: '/90141183202/v'
};

export const USERS = {
  USERNAME: process.env.USERNAME as string,
  PASSWORD: process.env.PASSWORD as string
};

export const DEFAULT_TIMEOUT = 15000;
export const EXTENDED_DEFAULT_TIMEOUT = 30000;
