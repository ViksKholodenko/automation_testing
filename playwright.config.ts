import { defineConfig, devices } from '@playwright/test';

//require('dotenv').config();

export default defineConfig({
  timeout: 40000,
  globalTimeout: 60000,

  expect:{
    timeout: 2000,
  },
  retries: 1,
  reporter: 'html',
  
  use: {
    //globalQaURL: '',
    baseURL: process.env.DEV === '1' ? 'https://automationexercise.com'
            : process.env.STG == '1' ? 'https://automationexercise.com'
            : 'https://automationexercise.com',
    trace: 'on-first-retry',
    actionTimeout: 20000,
    navigationTimeout: 25000,
    video: {
      mode: 'off',
      size: {width: 1920, height: 1080}
    },
    testIdAttribute: 'data-qa'
  },

  projects: [
    {
      name: 'dev',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://automationexercise.com'
      },
    },
    
    //{
    //  name: 'chromium',
    //},
    
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },

    {
      name: 'webkit',
      use: { browserName:'webkit' },
    },
  ],
});
