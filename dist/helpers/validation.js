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
exports.validateUpdateDocument = exports.validateEmail = exports.validateDocument = void 0;
const sequelize_1 = require("sequelize");
const access_1 = __importDefault(require("../models/access"));
const customer_1 = __importDefault(require("../models/customer"));
const pattern_email_1 = require("./pattern-email");
const validateDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customer_document, } = req.params;
    const customerValidate = yield customer_1.default.findOne({
        where: {
            customerDocument: customer_document
        }
    });
    if (customerValidate) {
        return res.status(500).json({ ok: true, message: 'Ya existe' });
    }
    return res.status(200).json({ ok: false, message: "OK" });
});
exports.validateDocument = validateDocument;
const validateEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { access_email, } = req.params;
    const emailValidate = yield access_1.default.findOne({
        where: {
            accessEmail: access_email
        }
    });
    if (emailValidate) {
        return res.status(500).json({ ok: true, message: 'Este email ya existe' });
    }
    else if (!(0, pattern_email_1.emailPatternValidate)(access_email)) {
        return res.status(500).json({ ok: true, message: 'Solamente correos institucionales' });
    }
    return res.status(200).json({ ok: false, message: "OK" });
});
exports.validateEmail = validateEmail;
const validateUpdateDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId, customerDocument } = req.body;
    const customerTmp = yield customer_1.default.findAll({
        where: {
            [sequelize_1.Op.and]: [
                { customerDocument },
                {
                    customerId: {
                        [sequelize_1.Op.ne]: customerId,
                    },
                },
            ],
        },
    });
    if (customerTmp.length > 0) {
        return res.status(400).json({
            ok: false,
            document: true,
            message: "Ya existe",
        });
    }
    return res.status(200).json({
        ok: true,
    });
});
exports.validateUpdateDocument = validateUpdateDocument;
//# sourceMappingURL=validation.js.map