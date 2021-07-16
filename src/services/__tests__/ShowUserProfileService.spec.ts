import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { ShowUserProfileError } from "../../shared/errors/ShowUserProfileError";
import { CreateUserService } from "../CreateUserService";
import { ShowUserProfileService } from "../ShowUserProfileService";

let showUserProfileService: ShowUserProfileService;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserService: CreateUserService;

describe("Show user profile", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserService = new CreateUserService(userRepositoryInMemory);
    showUserProfileService = new ShowUserProfileService(userRepositoryInMemory);
  });

  it("should be able to show the user profile", async () => {
    const user = await createUserService.execute({
      name: "Name User",
      email: "user@email",
      password: "1234"
    });

    const userProfile = await showUserProfileService.execute(user.id);

    expect(userProfile).toHaveProperty("id");
  });

  it("should not be able to show the profile when user does not exist", () => {
    expect(async () => {
      await showUserProfileService.execute("inexistentId");
    }).rejects.toBeInstanceOf(ShowUserProfileError);
  });
});