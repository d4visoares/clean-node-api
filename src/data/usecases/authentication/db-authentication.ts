import { LoadAccountByEmailRepository } from '@/data/protocols/db';
import { Authentication, AuthenticationModel } from '@/domain/usecases';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async auth(authentication: AuthenticationModel): Promise<string | null> {
    await this.loadAccountByEmailRepository.loadByEmail(authentication.email);

    return null;
  }
}
