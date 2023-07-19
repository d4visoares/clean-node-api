import config from './jest.config';

const jestUnitConfig = { ...config, testMatch: ['**/*.spec.ts'] };

export default jestUnitConfig;
