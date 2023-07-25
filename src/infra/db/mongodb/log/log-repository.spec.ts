import { Collection } from 'mongodb';

import { MONGO } from '../../../../utils/constants';
import { MongoHelper } from '../utils';
import { LogMongoRepository } from './log-repository';

const makeSut = () => new LogMongoRepository();

describe('Log Mongo Repository', () => {
  let errorsCollection: Collection | undefined;

  const mongoHelper = MongoHelper.getInstance();

  beforeAll(async () => {
    await mongoHelper.connect(MONGO.URL);
  });

  afterAll(async () => {
    await mongoHelper.disconnect();
  });

  beforeEach(async () => {
    errorsCollection = await mongoHelper.getCollection('errors');
    await errorsCollection?.deleteMany({});
  });

  test('Should create an error log on success', async () => {
    const sut = makeSut();

    await sut.logError('any_error');

    const count = await errorsCollection?.countDocuments();

    expect(count).toBe(1);
  });

  test('Should throw if error getColletion throws', () => {
    const sut = makeSut();

    jest
      .spyOn(mongoHelper, 'getCollection')
      .mockReturnValueOnce(
        new Promise((_, reject) => reject(new Error('MISSING_COLLECTION')))
      );

    const promise = sut.logError('any_error');

    expect(promise).rejects.toThrow();
  });
});
