import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { classToPlain } from "class-transformer";

import { IUserRepository } from "../repositories/IUserRepository";
import { CreateUserError } from "../shared/errors/CreateUserError";
import { ICreateUserDTO } from "./dtos/ICreateUserDTO";

@injectable()
class CreateUserService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ name, email, password }: ICreateUserDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new CreateUserError();
    }

    const passwordHash = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return user;
  }
}

export { CreateUserService };