import {
  AddAccountRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
} from '@/data/protocols/db';
import { AccountModel } from '@/domain/models';
import { AddAccountModel } from '@/domain/usecases';

import { MongoHelper } from '../utils';

const mongoHelper = MongoHelper.getInstance();

export class AccountMongoRepository
  implements
    AddAccountRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository
{
  async updateAccessToken(id: string, token: string): Promise<void> {
    const accountCollection = await mongoHelper.getCollection('accounts');

    if (!accountCollection) throw new Error('COLLECTION_NOT_FOUND');

    await accountCollection.updateOne(
      {
        _id: mongoHelper.objectId(id),
      },
      {
        $set: {
          accessToken: token,
        },
      }
    );
  }

  async loadByEmail(email: string): Promise<AccountModel | null> {
    const accountCollection = await mongoHelper.getCollection('accounts');

    if (!accountCollection) throw new Error('COLLECTION_NOT_FOUND');

    const loadedAccount = await accountCollection.findOne({ email });

    if (!loadedAccount) return null;

    const account = mongoHelper.map(loadedAccount);

    return account;
  }

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await mongoHelper.getCollection('accounts');

    if (!accountCollection) throw new Error('COLLECTION_NOT_FOUND');

    await accountCollection.insertOne(accountData);

    const account = mongoHelper.map(accountData);

    return account;
  }
}
