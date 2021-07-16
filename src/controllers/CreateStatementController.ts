import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateStatementService } from "../services/CreateStatementService";

enum OperationType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw"
}

class CreateStatementController {
  async handle(request: Request, response: Response) {
    const { user_id, amount } = request.body;
    const splittedPath = request.originalUrl.split("/");
    
    const type = splittedPath[splittedPath.length - 1] as OperationType;

    const createStatementService = container.resolve(CreateStatementService);

    const operationResponse = await createStatementService.execute({
      user_id,
      amount,
      type
    });

    return response.status(201).json(operationResponse);
  }
}

export { CreateStatementController };