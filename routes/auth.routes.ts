import { Router } from "express";
import { getCustomer } from "../controllers/customer_controller";
import { validarJSON } from "../middlewares/validar-json";
import { AuthLoginSchema } from "../schemas/auth";
import { login } from './../controllers/auth_controller';

const router = Router();

router.post( '/',login );

export default router;