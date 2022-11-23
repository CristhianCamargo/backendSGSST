import { Router } from "express";
import { getSurvey } from "../controllers/survey_controller";
import { validateJWT } from "../middlewares/validar-jwt";
import { validateRole } from "../middlewares/validar-rol";

const router = Router();

router.get('/',[validateJWT,validateRole(1)], getSurvey);

export default router;