import { Router } from "express";

import { CreateUserController } from "./controllers/CreateUserController";

const router = Router();

const createUserController = new CreateUserController();

// USERS
router.post("/users", createUserController.handle);

// STATEMENTS

export { router };