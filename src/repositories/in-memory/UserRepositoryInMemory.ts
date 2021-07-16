import { User } from "../../entities/User";
import { ICreateUserDTO } from "../../services/dtos/ICreateUserDTO";
import { IUserRepository } from "../IUserRepository";

class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = [];

  async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, data);
    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async findById(user_id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === user_id);
  }
}

export { UserRepositoryInMemory };