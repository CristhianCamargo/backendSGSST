"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRole = void 0;
const validateRole = (...role) => {
    return (req, res, next) => {
        if (!role.includes(req.customer.getDataValue('roleId'))) {
            return res.status(401).json({ message: 'No tiene permisos para ejecutar esta acción.' });
        }
        next();
    };
};
exports.validateRole = validateRole;
//# sourceMappingURL=validar-rol.js.map