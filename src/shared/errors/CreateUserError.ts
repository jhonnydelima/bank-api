import { AppError } from "./AppError";

export class CreateUserError extends AppError {
  constructor() {
    super("User already exists");
  }
}
