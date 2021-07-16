import { Statement } from "../entities/Statement";
import { ICreateStatementDTO } from "../services/dtos/ICreateStatementDTO";

export interface IStatementRepository {
  create: (data: ICreateStatementDTO) => Promise<Statement>;
  getUserBalance: (user_id: string) => Promise<{ balance: number }>;
}