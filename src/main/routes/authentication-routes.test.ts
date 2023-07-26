import { hash } from 'bcrypt';
import { Collection } from 'mongodb';
import request from 'supertest';

import { MongoHelper } from '../../infra/db/mongodb/utils';
import { MONGO } from '../../utils/constants';
import app from '../config/app';

describe('Authentication Routes', () => {
  const mongoHelper = MongoHelper.getInstance();
  let accountCollection: Collection | null = null;

  beforeAll(async () => {
    await mongoHelper.connect(MONGO.URL);
  });

  afterAll(async () => {
    await mongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = await mongoHelper.getCollection('accounts');

    await accountCollection?.deleteMany({});
  });

  describe('POST /signup', () => {
    it('Should return 200 on signup', async () => {
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

  describe('POST /login', () => {
    it('Should return 200 on login', async () => {
      const SALT = 12;

      const password = await hash('123', SALT);

      await accountCollection?.insertOne({
        name: 'Davi',
        email: 'davi@mail.com',
        password,
      });

      await request(app)
        .post('/api/login')
        .send({
          email: 'davi@mail.com',
          password: '123',
        })
        .expect(200);
    });

    it('Should return 401 on login fails', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'davi@mail.com',
          password: '123',
        })
        .expect(401);
    });
  });
});
