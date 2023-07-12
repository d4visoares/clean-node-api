import request from 'supertest';

import { MongoHelper } from '../../infra/db/mongodb/utils';
import { MONGO } from '../../utils/constants';
import app from '../config/app';

describe('SignUp Routes', () => {
  const mongoHelper = MongoHelper.getInstance();

  beforeAll(async () => {
    await mongoHelper.connect(MONGO.URL);
  });

  afterAll(async () => {
    await mongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollection = await mongoHelper.getCollection('accounts');

    await accountCollection?.deleteMany({});
  });

  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Davi',
        email: 'davi@mail.com',
        password: '123',
        passwordConfirmation: '123',
      })
      .expect(200);
  });
});
