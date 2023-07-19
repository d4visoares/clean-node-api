import config from './jest.config';

const jestIntegrationConfig = {
  ...config,
  testMatch: ['**/*.test.ts'],
};

export default jestIntegrationConfig;
