import { OperationType } from "../../entities/Statement";
import { StatementRepositoryInMemory } from "../../repositories/in-memory/StatementRepositoryInMemory";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { GetBalanceError } from "../../shared/errors/GetBalanceError";
import { CreateStatementService } from "../CreateStatementService";
import { CreateUserService } from "../CreateUserService";
import { GetBalanceService } from "../GetBalanceService";

let getBalanceService: GetBalanceService;
let userRepositoryInMemory: UserRepositoryInMemory;
let statementRepositoryInMemory: StatementRepositoryInMemory;
let createUserService: CreateUserService;
let createStatementService: CreateStatementService;

describe("Get the user balance", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    statementRepositoryInMemory = new StatementRepositoryInMemory();
    createUserService = new CreateUserService(userRepositoryInMemory);
    createStatementService = new CreateStatementService(userRepositoryInMemory, statementRepositoryInMemory);
    getBalanceService = new GetBalanceService(userRepositoryInMemory, statementRepositoryInMemory);
  });

  it("should be able to get the user account balance", async () => {
    const user = await createUserService.execute({
      name: "Name User",
      email: "user@email",
      password: "1234"
    });

    await createStatementService.execute({
      user_id: user.id,
      amount: 1000,
      type: OperationType.DEPOSIT
    });

    await createStatementService.execute({
      user_id: user.id,
      amount: 700,
      type: OperationType.WITHDRAW
    });

    const balance = await getBalanceService.execute(user.id);

    expect(balance).toEqual(300);
  });

  it("should not be able to get the account balance from an inexistent user", () => {
    expect(async () => {
      await getBalanceService.execute("inexistent_user")
    }).rejects.toBeInstanceOf(GetBalanceError);
  });
});