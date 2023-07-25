import { LogErrorRepository } from '@/data/protocols/db';

import { MongoHelper } from '../utils';

const mongoHelper = MongoHelper.getInstance();

export class LogMongoRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    const errorCollection = await mongoHelper.getCollection('errors');

    errorCollection.insertOne({
      stack,
      date: new Date(),
    });
  }
}
