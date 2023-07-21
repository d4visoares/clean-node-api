import { HashComparer } from '@/data/protocols/cryptography';
import { LoadAccountByEmailRepository } from '@/data/protocols/db';
import { Authentication, AuthenticationModel } from '@/domain/usecases';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth(authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      authentication.email
    );

    if (!account) return null;

    this.hashComparer.compare(authentication.password, account.password);

    return null;
  }
}
