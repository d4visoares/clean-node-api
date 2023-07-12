import { MONGO } from '../../../../utils/constants';
import { MongoHelper } from './mongo-helper';

const makeSut = () => MongoHelper.getInstance();

describe('MongoHelper', () => {
  test('Should calls connect with correct uri', async () => {
    const mongoHelper = makeSut();

    const connectSpy = jest.spyOn(mongoHelper, 'connect');

    await mongoHelper.connect(MONGO.URL);

    expect(connectSpy).toHaveBeenCalledWith(MONGO.URL);

    await mongoHelper.disconnect();
  });

  test('Should throws when call disconnect before connect ', () => {
    const mongoHelper = makeSut();

    const promise = mongoHelper.disconnect();

    expect(promise).rejects.toThrow();
  });

  test('Should throws when call getCollection before connect ', async () => {
    const mongoHelper = makeSut();

    const promise = mongoHelper.getCollection('any_collection');

    expect(promise).rejects.toThrow();
  });

  test('', () => {});
});
