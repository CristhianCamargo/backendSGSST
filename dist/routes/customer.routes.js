"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_controller_1 = require("../controllers/customer_controller");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const validar_rol_1 = require("../middlewares/validar-rol");
const router = (0, express_1.Router)();
router.get('/stateFalse/', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1)], customer_controller_1.updateCustomerStateFalse);
router.get('/stateTrue/', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1)], customer_controller_1.updateCustomerStateTrue);
router.get('/state/:customer_state', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1)], customer_controller_1.getCustomerByState);
router.get('/:customer_id', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1)], customer_controller_1.getOneCustomer);
router.get('/', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1)], customer_controller_1.getCustomer);
router.post('/', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1)], customer_controller_1.addCustomer);
router.put('/state', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1, 2)], customer_controller_1.updateCustomerStateLocalStorage);
router.put('/:customer_id', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1)], customer_controller_1.updateCustomer);
router.delete('/:customer_id', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1)], customer_controller_1.deleteCustomer);
exports.default = router;
//# sourceMappingURL=customer.routes.js.map