import { Router } from "express";
import {addRole, deleteRole, getOneRole, getRole, updateRole} from "../controllers/role_controller";
import { validateJWT } from "../middlewares/validar-jwt";
import { validateRole } from "../middlewares/validar-rol";

const router = Router();

router.get('/',[validateJWT,validateRole(1)], getRole);
router.get('/:role_id',[validateJWT,validateRole(1)], getOneRole);
router.post('/',[validateJWT,validateRole(1)], addRole);
router.put('/:role_id',[validateJWT,validateRole(1)], updateRole);
router.delete('/:role_id',[validateJWT,validateRole(1)], deleteRole);

export default router;