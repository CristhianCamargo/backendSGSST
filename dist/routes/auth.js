"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validar_json_1 = require("../middlewares/validar-json");
const auth_1 = require("../schemas/auth");
const auth_2 = require("./../controllers/auth");
const router = (0, express_1.Router)();
router.get('/', (0, validar_json_1.validarJSON)(auth_1.AuthLoginSchema), auth_2.login);
exports.default = router;
//# sourceMappingURL=auth.js.map