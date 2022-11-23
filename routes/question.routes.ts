import { Router } from "express";
import {addQuestion, deleteQuestion, getOneQuestion, getQuestion, getQuestionBySurvey, updateQuestion} from '../controllers/question_controller';
import { validateJWT } from "../middlewares/validar-jwt";
import { validateRole } from "../middlewares/validar-rol";

const router = Router();

router.get('/:question_id', [validateJWT,validateRole(1)],getOneQuestion);
router.get('/survey_id', [validateJWT,validateRole(1)],getQuestionBySurvey);
router.post('/',[validateJWT,validateRole(1)], addQuestion);
router.put('/:question_id',[validateJWT,validateRole(1)], updateQuestion);
router.delete('/:question_id',[validateJWT,validateRole(1)], deleteQuestion);

router.get('/',[validateJWT,validateRole(1,2)], getQuestion);

export default router;