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

    const account = await this.addAccountRepository.add({
      email: accountData.email,
      name: accountData.name,
      password: encryptedPassword,
    });

    return account;
  }
}
