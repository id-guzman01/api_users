import { Router } from "express";
import { method as usersController } from "../controllers/users.controller";
import UsersValidator from "../validators/users.validator";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.get('/',authMiddleware.isLogged,authMiddleware.permissionRoleAdmin,usersController.getUsers);
router.get("/:id",authMiddleware.isLogged,authMiddleware.permissionRoleAdmin,usersController.getUser);
router.post('/',UsersValidator.validateCreate,usersController.addUser);
router.put("/:id",UsersValidator.validateCreate,authMiddleware.isLogged,authMiddleware.permissionRoleAdmin,usersController.updateUser);
router.delete("/:id",authMiddleware.isLogged,authMiddleware.permissionRoleAdmin,usersController.deleteUser);

export default router;

