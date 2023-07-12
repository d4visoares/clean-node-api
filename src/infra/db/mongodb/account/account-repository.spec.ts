import { MONGO } from '../../../../utils/constants';
import { MongoHelper } from '../utils';
import { AccountMongoRepository } from './account-repository';

describe('Account Mongo Repository', () => {
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

  const makeSut = () => {
    return new AccountMongoRepository();
  };

  test('Should return an account on success', async () => {
    const sut = makeSut();

    const account = await sut.add({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    });

    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe('valid_name');
    expect(account.email).toBe('valid_email@mail.com');
    expect(account.password).toBe('valid_password');
  });
});
