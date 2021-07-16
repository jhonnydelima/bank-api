import { OperationType, Statement } from "../../entities/Statement";
import { ICreateStatementDTO } from "../../services/dtos/ICreateStatementDTO";
import { IStatementRepository } from "../IStatementRepository";

class StatementRepositoryInMemory implements IStatementRepository {
  private statements: Statement[] = [];

  async create(data: ICreateStatementDTO): Promise<Statement> {
    const statement = new Statement();

    Object.assign(statement, data);
    this.statements.push(statement);

    return statement;
  }

  async getUserBalance(user_id: string): Promise<{ balance: number; }> {
    const statementsList = this.statements.filter(operation => operation.user_id === user_id);

    const balance = statementsList.reduce((acc, operation) => {
      if (operation.type === OperationType.DEPOSIT) {
        return acc + Number(operation.amount);
      } else {
        return acc - Number(operation.amount);
      }
    }, 0);

    return { balance };
  }
}

export { StatementRepositoryInMemory };