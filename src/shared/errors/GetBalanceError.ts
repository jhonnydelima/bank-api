import { AppError } from "./AppError";

export class GetBalanceError extends AppError {
  constructor() {
    super("User not found", 404);
  }
}