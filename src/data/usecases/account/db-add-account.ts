import { Encrypter } from '@/data/protocols/cryptography';
import { AccountModel } from '@/domain/models';
import { AddAccount, AddAccountModel } from '@/domain/usecases';

export class DbAddAccount implements AddAccount {
  constructor(private readonly encrypter: Encrypter) {}

  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password);

    return {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    };
  }
}
