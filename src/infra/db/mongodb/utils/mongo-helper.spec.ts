import { MONGO } from '../../../../utils/constants';
import { MongoHelper } from './mongo-helper';

const sut = MongoHelper.getInstance();

describe('MongoHelper', () => {
  beforeAll(async () => {
    await sut.connect(MONGO.URL);
  });

  afterAll(async () => {
    await sut.disconnect();
  });

  test('Should reconnect if mongodb is down', async () => {
    const anyCollection = await sut.getCollection('any_collection');
    expect(anyCollection).toBeTruthy();

    await sut.disconnect();

    const otherCollection = await sut.getCollection('other_collection');
    expect(otherCollection).toBeTruthy();
  });
});
