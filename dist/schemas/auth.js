"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthLoginSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.AuthLoginSchema = typebox_1.Type.Object({
    usuario: typebox_1.Type.String(),
    contrasena: typebox_1.Type.String()
}, {
    additionalProperties: false
});
//# sourceMappingURL=auth.js.map