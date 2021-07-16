import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetBalanceService } from "../services/GetBalanceService";

class GetBalanceController {
  async handle(request: Request, response: Response) {
    const { user_id } = request.params;

    const getBalanceService = container.resolve(GetBalanceService);

    const balance = await getBalanceService.execute(user_id);

    return response.json(balance);
  }
}

export { GetBalanceController };