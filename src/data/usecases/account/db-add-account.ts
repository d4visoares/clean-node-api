import {
  Encrypter,
  AccountModel,
  AddAccount,
  AddAccountModel,
  AddAccountRepository,
} from './db-add-account-protocols';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const encryptedPassword = await this.encrypter.encrypt(
      accountData.password
    );

    await this.addAccountRepository.add({
      email: accountData.email,
      name: accountData.name,
      password: encryptedPassword,
    });

    return {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    };
  }
}
