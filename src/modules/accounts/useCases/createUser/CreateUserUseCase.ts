import { inject, injectable } from 'tsyringe';

import { ICreateUsersDTO } from '../../dtos/ICreateUsersDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class CreateUsersUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute({
    name, username, email, password, driver_license,
  }: ICreateUsersDTO): Promise<void> {
    await this.userRepository.create({
      name,
      username,
      email,
      password,
      driver_license,
    });
  }
}

export { CreateUsersUseCase };
