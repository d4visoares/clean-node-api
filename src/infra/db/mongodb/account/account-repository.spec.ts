import { Collection } from 'mongodb';

import { MONGO } from '../../../../utils/constants';
import { MongoHelper } from '../utils';
import { AccountMongoRepository } from './account-repository';

describe('Account Mongo Repository', () => {
  const mongoHelper = MongoHelper.getInstance();
  let accountCollection: Collection | undefined;

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

  const makeSut = () => {
    return new AccountMongoRepository();
  };

  test('Should return an account on add success', async () => {
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

  test('Should return an account on loadByEmail success', async () => {
    const sut = makeSut();

    accountCollection?.insertOne({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    });

    const account = await sut.loadByEmail('valid_email@mail.com');

    expect(account).toBeTruthy();
    expect(account?.id).toBeTruthy();
    expect(account?.name).toBe('valid_name');
    expect(account?.email).toBe('valid_email@mail.com');
    expect(account?.password).toBe('valid_password');
  });

  test('Should return null if loadByEmail fail', async () => {
    const sut = makeSut();

    const account = await sut.loadByEmail('valid_email@mail.com');

    expect(account).toBeFalsy();
  });

  test('Should throws if mongoHelper get collection returns undefined', async () => {
    const sut = makeSut();

    jest
      .spyOn(mongoHelper, 'getCollection')
      .mockReturnValueOnce(new Promise((resolve) => resolve(undefined)));

    const promise = sut.add({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    });

    expect(promise).rejects.toThrow();
  });
});
