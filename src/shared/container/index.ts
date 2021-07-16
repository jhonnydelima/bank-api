import { container } from "tsyringe";

import { IStatementRepository } from "../../repositories/IStatementRepository";
import { IUserRepository } from "../../repositories/IUserRepository";
import { StatementRepository } from "../../repositories/StatementRepository";
import { UserRepository } from "../../repositories/UserRepository";

container.registerSingleton<IUserRepository>(
  "UserRepository",
  UserRepository
);

container.registerSingleton<IStatementRepository>(
  "StatementRepository",
  StatementRepository
);