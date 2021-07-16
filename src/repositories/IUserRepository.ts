import { User } from "../entities/User";
import { ICreateUserDTO } from "../services/dtos/ICreateUserDTO";

export interface IUserRepository {
  create: (data: ICreateUserDTO) => Promise<User>;
  findByEmail: (email: string) => Promise<User | undefined>;
  findById: (user_id: string) => Promise<User | undefined>;
}