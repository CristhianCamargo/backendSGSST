"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./../controllers/auth_controller");
const router = (0, express_1.Router)();
router.post('/', auth_controller_1.login);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map