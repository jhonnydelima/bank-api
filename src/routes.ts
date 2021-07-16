import { Router } from "express";

import { CreateStatementController } from "./controllers/CreateStatementController";
import { CreateUserController } from "./controllers/CreateUserController";
import { GetBalanceController } from "./controllers/GetBalanceController";
import { ShowUserProfileController } from "./controllers/ShowUserProfileController";

const router = Router();

const createUserController = new CreateUserController();
const showUserProfileController = new ShowUserProfileController();
const createStatementController = new CreateStatementController();
const getBalanceController = new GetBalanceController();

// USERS
router.post("/users", createUserController.handle);
router.get("/users/:id", showUserProfileController.handle); // #swagger.consumes = ['application/xml']

// STATEMENTS
router.post("/statements/deposit", createStatementController.handle);
router.post("/statements/withdraw", createStatementController.handle);
router.get("/statements/balance/:user_id", getBalanceController.handle); // #swagger.consumes = ['application/xml']

export { router };