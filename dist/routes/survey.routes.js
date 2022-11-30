"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const survey_controller_1 = require("../controllers/survey_controller");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const validar_rol_1 = require("../middlewares/validar-rol");
const router = (0, express_1.Router)();
router.get('/', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1)], survey_controller_1.getSurvey);
exports.default = router;
//# sourceMappingURL=survey.routes.js.map