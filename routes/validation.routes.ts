import { Router } from "express";
import { validateDocument, validateEmail, validateUpdateDocument } from "../helpers/validation";

const router = Router();

router.get('/document/:customer_document', validateDocument);
router.get('/email/:access_email', validateEmail);
router.post('/documentUp', validateUpdateDocument);

export default router;