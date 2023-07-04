import { MongoClient } from 'mongodb';

export class MongoHelper {
  private client: MongoClient | null;

  constructor() {
    this.client = null;
  }

  async connect(uri: string) {
    this.client = await MongoClient.connect(uri || '');
  }

  async disconnect() {
    if (!this.client) return;

    await this.client.close();
  }
}
