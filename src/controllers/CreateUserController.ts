import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      email,
      password
    });

    return response.status(201).json(user);
  }
}

export { CreateUserController };