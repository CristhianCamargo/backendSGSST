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
exports.login = void 0;
const bcrypt_1 = require("bcrypt");
const generar_jwt_1 = require("../helpers/generar-jwt");
const access_1 = __importDefault(require("../models/access"));
const customer_1 = __importDefault(require("../models/customer"));
const role_1 = __importDefault(require("../models/role"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { access_email, access_pass } = req.body;
        const tmpAccess = yield access_1.default.findOne({
            where: {
                accessEmail: access_email
            }
        });
        if (access_email == "" && access_pass == "") {
            return res.status(412).json({ message: 'Campos vacios' });
        }
        if (!tmpAccess) {
            return res.status(400).json({ message: 'Email no encontrado' });
        }
        const tmpPass = yield (0, bcrypt_1.compare)(access_pass, tmpAccess.accessPass);
        if (!tmpPass) {
            return res.status(400).json({ message: 'Contraseña no coincide' });
        }
        const customer = yield customer_1.default.findOne({
            include: [
                {
                    model: role_1.default,
                    attributes: ['role_name']
                }
            ],
            where: {
                customerId: tmpAccess.customerId
            }
        });
        const token = yield (0, generar_jwt_1.generarJWT)(customer.customerId);
        return res.status(200).json({ message: 'OK', user: customer, token: token });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error', error });
    }
});
exports.login = login;
//# sourceMappingURL=auth_controller.js.map