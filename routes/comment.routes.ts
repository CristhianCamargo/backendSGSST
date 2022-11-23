import { Router } from "express";
import { addComment, deleteAllComment, deleteComment, getComment, getOneComment } from "../controllers/comment_controller";
import { validateJWT } from "../middlewares/validar-jwt";
import { validateRole } from "../middlewares/validar-rol";

const router = Router();

router.get('/',[validateJWT,validateRole(1)], getComment);
router.get('/:comment_id',[validateJWT,validateRole(1)], getOneComment);
router.post('/',[validateJWT,validateRole(1,2)], addComment);
router.delete('/',[validateJWT,validateRole(1)], deleteAllComment);
router.delete('/id/:comment_id',[validateJWT,validateRole(1)], deleteComment);

export default router;