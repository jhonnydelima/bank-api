import { inject, injectable } from "tsyringe";

import { IStatementRepository } from "../repositories/IStatementRepository";
import { IUserRepository } from "../repositories/IUserRepository";
import { GetBalanceError } from "../shared/errors/GetBalanceError";

@injectable()
class GetBalanceService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,

    @inject("StatementRepository")
    private statementRepository: IStatementRepository
  ) {}
  
  async execute(user_id: string) {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new GetBalanceError();
    }

    const balance = await this.statementRepository.getUserBalance(user_id);

    return balance;
  }
}

export { GetBalanceService };