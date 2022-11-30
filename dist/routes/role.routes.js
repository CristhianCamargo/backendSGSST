"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_controller_1 = require("../controllers/role_controller");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const validar_rol_1 = require("../middlewares/validar-rol");
const router = (0, express_1.Router)();
router.get('/', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1)], role_controller_1.getRole);
router.get('/:role_id', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1)], role_controller_1.getOneRole);
router.post('/', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1)], role_controller_1.addRole);
router.put('/:role_id', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1)], role_controller_1.updateRole);
router.delete('/:role_id', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1)], role_controller_1.deleteRole);
exports.default = router;
//# sourceMappingURL=role.routes.js.map