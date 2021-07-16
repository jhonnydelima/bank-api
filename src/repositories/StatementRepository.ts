import { getRepository, Repository } from "typeorm";

import { OperationType, Statement } from "../entities/Statement";
import { ICreateStatementDTO } from "../services/dtos/ICreateStatementDTO";
import { IStatementRepository } from "./IStatementRepository";

class StatementRepository implements IStatementRepository {
  private repository: Repository<Statement>;

  constructor() {
    this.repository = getRepository(Statement);
  }

  async create({ user_id, amount, type }: ICreateStatementDTO): Promise<Statement> {
    const statement = this.repository.create({
      user_id,
      amount,
      type
    });

    return this.repository.save(statement);
  }

  async getUserBalance(user_id: string): Promise<{ balance: number; }> {
    const statements = await this.repository.find({ user_id });

    const balance = statements.reduce((acc, operation) => {
      if (operation.type === OperationType.DEPOSIT) {
        return acc + Number(operation.amount);
      } else {
        return acc - Number(operation.amount);
      }
    }, 0);

    return { balance };
  }

}

export { StatementRepository };