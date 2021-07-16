import { inject, injectable } from "tsyringe";

import { OperationType } from "../entities/Statement";
import { IStatementRepository } from "../repositories/IStatementRepository";
import { IUserRepository } from "../repositories/IUserRepository";
import { CreateStatementError } from "../shared/errors/CreateStatementError";
import { ICreateStatementDTO } from "./dtos/ICreateStatementDTO";


@injectable()
class CreateStatementService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,

    @inject("StatementRepository")
    private statementRepository: IStatementRepository
  ) {}

  async execute({ user_id, amount, type }: ICreateStatementDTO) {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new CreateStatementError.UserNotFound();
    }

    if (type === OperationType.WITHDRAW) {
      const { balance } = await this.statementRepository.getUserBalance(user_id);

      if (balance < amount) {
        throw new CreateStatementError.InsufficientFunds();
      }
    }

    await this.statementRepository.create({
      user_id,
      amount,
      type
    });

    const { balance } = await this.statementRepository.getUserBalance(user_id);

    return { user_id, balance };
  }
}

export { CreateStatementService };