import { LogErrorRepository } from '@/data/protocols/db';

import { MongoHelper } from '../utils';

export class LogMongoRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    const mongoHelper = MongoHelper.getInstance();

    const errorCollection = await mongoHelper.getCollection('errors');

    errorCollection?.insertOne({
      stack,
      date: new Date(),
    });
  }
}