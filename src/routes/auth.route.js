import {Router} from "express";
import {method as authController} from "../controllers/auth.controller";
import authValidator from "../validators/auth.validator"
import authMiddleware from "../middleware/auth.middleware"

const router = Router();

router.post("/",authMiddleware.validateExiststoken,authValidator.validateCreate,authController.login);

export default router;