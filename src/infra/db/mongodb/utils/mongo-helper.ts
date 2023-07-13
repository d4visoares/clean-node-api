import { Collection, MongoClient } from 'mongodb';

import { MONGO } from '../../../../utils/constants';

export class MongoHelper {
  private static instance: MongoHelper;
  private uri: string | null;
  client: MongoClient | null;

  constructor() {
    this.client = null;
    this.uri = null;
  }

  static getInstance(): MongoHelper {
    if (!this.instance) {
      this.instance = new MongoHelper();
    }

    return this.instance;
  }

  clearConnection() {
    this.uri = null;
    this.client = null;
  }

  async connect(uri: string | null) {
    this.uri = uri;
    this.client = await MongoClient.connect(uri || MONGO.URL);
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
      this.clearConnection();
    }
  }

  async getCollection(name: string): Promise<Collection | undefined> {
    if (!this.client) {
      await this.connect(this.uri);
    }

    if (this.client) {
      return this.client.db().collection(name);
    }
  }

  map(collection: any): any {
    const { _id, ...collectionWithoutId } = collection;

    return {
      id: _id,
      ...collectionWithoutId,
    };
  }
}
