import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserError } from "../../shared/errors/CreateUserError";
import { CreateUserService } from "../CreateUserService";

let createUserService: CreateUserService;
let userRepositoryInMemory: UserRepositoryInMemory;

describe("Create a new user", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserService = new CreateUserService(userRepositoryInMemory);
  });
  
  it("should be able to create a new user", async () => {
    const user = await createUserService.execute({
      name: "Name User",
      email: "user@email",
      password: "1234"
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create a duplicated user", async () => {
    expect(async () => {
      await createUserService.execute({
        name: "First User",
        email: "user@email.com",
        password: "1234"
      });

      await createUserService.execute({
        name: "Second User",
        email: "user@email.com",
        password: "4321"
      });
    }).rejects.toBeInstanceOf(CreateUserError);
  });
});