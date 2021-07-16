import { inject, injectable } from "tsyringe";
import { classToPlain } from "class-transformer";

import { IUserRepository } from "../repositories/IUserRepository";
import { ShowUserProfileError } from "../shared/errors/ShowUserProfileError";

@injectable()
class ShowUserProfileService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(user_id: string) {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new ShowUserProfileError();
    }

    return classToPlain(user);
  }
}

export { ShowUserProfileService };