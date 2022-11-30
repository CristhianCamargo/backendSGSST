"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_1 = require("../helpers/validation");
const router = (0, express_1.Router)();
router.get('/document/:customer_document', validation_1.validateDocument);
router.get('/email/:access_email', validation_1.validateEmail);
router.post('/documentUp', validation_1.validateUpdateDocument);
exports.default = router;
//# sourceMappingURL=validation.routes.js.map