"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = require("../controllers/comment_controller");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const validar_rol_1 = require("../middlewares/validar-rol");
const router = (0, express_1.Router)();
router.get('/', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1)], comment_controller_1.getComment);
router.get('/:comment_id', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1)], comment_controller_1.getOneComment);
router.post('/', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1, 2)], comment_controller_1.addComment);
router.delete('/', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1)], comment_controller_1.deleteAllComment);
router.delete('/id/:comment_id', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1)], comment_controller_1.deleteComment);
exports.default = router;
//# sourceMappingURL=comment.routes.js.map