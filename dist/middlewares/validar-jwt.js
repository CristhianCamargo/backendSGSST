"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const customer_1 = __importDefault(require("../models/customer"));
const validateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('tokenAccess');
    if (!token) {
        return res.status(401).json({ message: 'No hay token en la petición' });
    }
    try {
        const { id } = jsonwebtoken_1.default.verify(token, process.env.SECRETORPRIVATEKEY);
        // Comprobar si el uid es diferente de 0 para invitado
        if (id != 0) {
            // Leer el usuario que corresponde al uid
            const customer = yield customer_1.default.findByPk(id, {
                attributes: ['customerId', 'roleId', 'customerState']
            });
            if (!customer) {
                return res.status(401).json({ message: 'Por favor inicie sesión nuevamente.' });
            }
            // Verificar si el id es activo
            /*
            if (usuario?.getDataValue('customer_state') != true) {
              return res.status(401).json({ message: 'Por favor inicie sesión nuevamente.' });
            }
            */
            req.customer = customer;
        }
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Por favor inicie sesión nuevamente.' });
    }
});
exports.validateJWT = validateJWT;
//# sourceMappingURL=validar-jwt.js.map