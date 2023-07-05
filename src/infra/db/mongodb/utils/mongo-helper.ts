import { Collection, MongoClient } from 'mongodb';

export class MongoHelper {
  private static instance: MongoHelper;
  private client: MongoClient | null;

  constructor() {
    this.client = null;
  }

  public static getInstance(): MongoHelper {
    if (!this.instance) {
      this.instance = new MongoHelper();
      this.instance.connect(process.env.MONGO_URL || '');
    }

    return this.instance;
  }

  async connect(uri: string) {
    this.client = await MongoClient.connect(uri || '');
  }

  async disconnect() {
    if (!this.client) return;

    await this.client.close();
  }

  async getCollection(name: string): Promise<Collection | undefined> {
    if (!this.client) return;

    return this.client.db().collection(name);
  }
}
