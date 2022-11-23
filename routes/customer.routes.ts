import { Router } from "express";
import { addCustomer, deleteCustomer, getCustomer, getCustomerByState, getOneCustomer, updateCustomer, updateCustomerStateFalse, updateCustomerStateLocalStorage } from "../controllers/customer_controller";
import { validateJWT } from "../middlewares/validar-jwt";
import { validateRole } from "../middlewares/validar-rol";

const router = Router();

router.get('/stateFalse/',[validateJWT,validateRole(1)], updateCustomerStateFalse);
router.get('/state/:customer_state',[validateJWT,validateRole(1)], getCustomerByState);
router.get('/:customer_id',[validateJWT,validateRole(1)], getOneCustomer);
router.get('/',[validateJWT,validateRole(1)], getCustomer);
router.post('/',[validateJWT,validateRole(1)], addCustomer);
router.put('/state',[validateJWT,validateRole(1,2)], updateCustomerStateLocalStorage);
router.put('/:customer_id',[validateJWT,validateRole(1)], updateCustomer);
router.delete('/:customer_id',[validateJWT,validateRole(1)], deleteCustomer);

export default router;