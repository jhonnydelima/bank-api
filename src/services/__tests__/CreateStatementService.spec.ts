import { OperationType } from "../../entities/Statement";
import { StatementRepositoryInMemory } from "../../repositories/in-memory/StatementRepositoryInMemory";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateStatementError } from "../../shared/errors/CreateStatementError";
import { CreateStatementService } from "../CreateStatementService";
import { CreateUserService } from "../CreateUserService";

let userRepositoryInMemory: UserRepositoryInMemory;
let statementRepositoryInMemory: StatementRepositoryInMemory;
let createUserService: CreateUserService;
let createStatementService: CreateStatementService;

describe("Create a new statement", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    statementRepositoryInMemory = new StatementRepositoryInMemory();
    createUserService = new CreateUserService(userRepositoryInMemory);
    createStatementService = new CreateStatementService(userRepositoryInMemory, statementRepositoryInMemory);
  });

  it("should be able to create a new deposit", async () => {
    const user = await createUserService.execute({
      name: "Name User",
      email: "user@email",
      password: "1234"
    });

    const statement = await createStatementService.execute({
      user_id: user.id,
      amount: 1000,
      type: OperationType.DEPOSIT
    });

    expect(statement.balance).toEqual(1000);
  });

  it("should be able to create a withdraw", async () => {
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

    const withdraw = await createStatementService.execute({
      user_id: user.id,
      amount: 400,
      type: OperationType.WITHDRAW
    });

    expect(withdraw.balance).toEqual(600);
  });

  it("should not be able to create a statement (deposit/withdraw) for an inexistent user", () => {
    expect(async () => {
      await createStatementService.execute({
        user_id: "inexistent_user",
        amount: 500,
        type: OperationType.DEPOSIT
      })
    }).rejects.toBeInstanceOf(CreateStatementError.UserNotFound);
  });

  it("should not be able to create a withdraw when user has insufficient funds", async () => {
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

    await expect(createStatementService.execute({
      user_id: user.id,
      amount: 2000,
      type: OperationType.WITHDRAW
    })).rejects.toBeInstanceOf(CreateStatementError.InsufficientFunds);
  });
});