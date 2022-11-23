import { Router } from "express";
import { addAnswer, deleteAllAnswer, getAnswer, getAnswerByCustomer, getAnswerByOption, getAnswerByOptionAndQuestion, getAnswerByQuestion, getAnswerByQuestionAndCustomer, getOneAnswer } from "../controllers/answer_controller";
import { validateJWT } from "../middlewares/validar-jwt";
import { validateRole } from "../middlewares/validar-rol";

const router = Router();

router.get('/answerId',[validateJWT,validateRole(1)], getOneAnswer);
router.get('/customer',[validateJWT,validateRole(1,2)], getAnswerByCustomer);
router.get('/option', [validateJWT,validateRole(1,2)], getAnswerByOption);
router.get('/quesOption', [validateJWT,validateRole(1,2)], getAnswerByOptionAndQuestion);
router.get('/quesCustomer', [validateJWT,validateRole(1,2)], getAnswerByQuestionAndCustomer);
router.get('/question',[validateJWT,validateRole(1)], getAnswerByQuestion);
router.post('/',[validateJWT,validateRole(1,2)], addAnswer);
router.delete('/',[validateJWT,validateRole(1)], deleteAllAnswer);

router.get('/',[validateJWT,validateRole(1,2)], getAnswer);

export default router;