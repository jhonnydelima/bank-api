import { Request, Response } from "express";
import { container } from "tsyringe";
import { ShowUserProfileService } from "../services/ShowUserProfileService";


class ShowUserProfileController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const showUserProfileService = container.resolve(ShowUserProfileService);

    const user = await showUserProfileService.execute(id);

    return response.json(user);
  }
}

export { ShowUserProfileController };