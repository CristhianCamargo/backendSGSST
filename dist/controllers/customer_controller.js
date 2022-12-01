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
exports.updateCustomerStateTrue = exports.updateCustomerStateFalse = exports.updateCustomerStateLocalStorage = exports.deleteCustomer = exports.updateCustomer = exports.addCustomer = exports.getCustomerByState = exports.getOneCustomer = exports.getCustomer = void 0;
const sequelize_1 = require("sequelize");
const encrypt_pass_1 = require("../helpers/encrypt-pass");
const pattern_email_1 = require("../helpers/pattern-email");
const access_1 = __importDefault(require("../models/access"));
const customer_1 = __importDefault(require("../models/customer"));
const role_1 = __importDefault(require("../models/role"));
const getCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resTmp = yield customer_1.default.findAll({
            order: [["customer_id", "ASC"]],
            include: [
                {
                    model: access_1.default
                },
                {
                    model: role_1.default,
                    attributes: [
                        "roleName"
                    ]
                }
            ],
        });
        return res.status(200).json({ message: "OK", resTmp });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
});
exports.getCustomer = getCustomer;
const getOneCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customer_id } = req.params;
        const resTmp = yield customer_1.default.findOne({
            where: {
                customerId: customer_id
            },
            include: {
                model: access_1.default,
                attributes: ["accessEmail"]
            }
        });
        if (!resTmp) {
            return res.status(500).json({ message: 'Este usuario no existe' });
        }
        return res.status(200).json({ message: "OK", resTmp });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
});
exports.getOneCustomer = getOneCustomer;
const getCustomerByState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customer_state } = req.params;
        const customerByState = yield customer_1.default.findAll({
            order: [["customer_id", "ASC"]],
            where: {
                customerState: customer_state
            }
        });
        return res.status(200).json({ message: "OK", customerByState });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
});
exports.getCustomerByState = getCustomerByState;
const addCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role_id, survey_id, customer_document, customer_firstname, customer_lastname, customer_phone, customer_state, access_email, access_pass, } = req.body;
        const customerValidate = yield customer_1.default.findOne({
            where: {
                customerDocument: customer_document
            }
        });
        if (customerValidate) {
            return res.status(500).json({ message: 'Ya existe un usuario con este numero de documento' });
        }
        const emailValidate = yield access_1.default.findOne({
            where: {
                accessEmail: access_email
            }
        });
        if (emailValidate) {
            return res.status(500).json({ message: 'Este email ya existe' });
        }
        else if (!(0, pattern_email_1.emailPatternValidate)(access_email)) {
            return res.status(500).json({ message: 'Solamente correos institucionales' });
        }
        const resTmp = yield customer_1.default.create({
            roleId: role_id,
            surveyId: survey_id,
            customerDocument: customer_document,
            customerFirstname: customer_firstname,
            customerLastname: customer_lastname,
            customerPhone: customer_phone,
            customerState: customer_state
        });
        const hashPassword = yield (0, encrypt_pass_1.encryptPass)(access_pass);
        const accessTmp = yield access_1.default.create({
            customerId: resTmp.customerId,
            accessEmail: access_email,
            accessPass: hashPassword
        });
        return res.status(200).json({ message: "OK", resTmp, accessTmp });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error", error });
    }
});
exports.addCustomer = addCustomer;
const updateCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customer_id } = req.params;
        const { role_id, survey_id, customer_document, customer_firstname, customer_lastname, customer_phone, access_email, access_pass } = req.body;
        const resTmp = yield customer_1.default.findByPk(customer_id);
        const accessTmp = yield access_1.default.findByPk(customer_id);
        const usu = yield customer_1.default.findAll({
            where: {
                [sequelize_1.Op.and]: [
                    { customer_document },
                    {
                        customer_id: {
                            [sequelize_1.Op.ne]: customer_id,
                        },
                    },
                ],
            },
        });
        if (usu.length > 0) {
            return res.status(400).json({
                ok: false,
                message: "Ya existe un usuario con este numero de documento",
            });
        }
        resTmp.roleId = role_id;
        resTmp.surveyId = survey_id;
        resTmp.customerDocument = customer_document;
        resTmp.customerFirstname = customer_firstname;
        resTmp.customerLastname = customer_lastname;
        resTmp.customerPhone = customer_phone;
        yield resTmp.save();
        if (access_pass !== "") {
            const hashPassword = yield (0, encrypt_pass_1.encryptPass)(access_pass);
            accessTmp.accessPass = hashPassword;
        }
        if (access_email !== "") {
            if (!(0, pattern_email_1.emailPatternValidate)(access_email)) {
                return res.status(500).json({ message: 'Solamente correos institucionales' });
            }
            const emailValidate = yield access_1.default.findAll({
                where: {
                    [sequelize_1.Op.and]: [
                        { access_email },
                        {
                            customer_id: {
                                [sequelize_1.Op.ne]: customer_id,
                            },
                        },
                    ],
                },
            });
            if (emailValidate.length > 0) {
                return res.status(400).json({
                    ok: false,
                    message: "Este email ya existe",
                });
            }
            accessTmp.accessEmail = access_email;
        }
        yield accessTmp.save();
        return res.status(200).json({ message: "OK", resTmp, accessTmp });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
});
exports.updateCustomer = updateCustomer;
const deleteCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customer_id } = req.params;
        const customer = yield customer_1.default.findOne({
            where: {
                customer_id
            }
        });
        if (!customer) {
            return res.status(500).json({ message: 'Esta intentando eliminar un usuario que no existe' });
        }
        yield customer_1.default.destroy({
            where: {
                customer_id
            }
        });
        return res.status(200).json({ message: "OK", customer });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
});
exports.deleteCustomer = deleteCustomer;
const updateCustomerStateLocalStorage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resTmp = yield customer_1.default.findByPk(req.customer.customerId);
        if (resTmp.customerState) {
            resTmp.customerState = false;
        }
        else {
            resTmp.customerState = true;
        }
        yield resTmp.save();
        return res.status(200).json({ message: "OK", resTmp });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
});
exports.updateCustomerStateLocalStorage = updateCustomerStateLocalStorage;
const updateCustomerStateFalse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resTmp = yield customer_1.default.update({ customerState: false }, {
            where: {
                customerState: true
            }
        });
        return res.status(200).json({ message: "OK", resTmp });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
});
exports.updateCustomerStateFalse = updateCustomerStateFalse;
const updateCustomerStateTrue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customer_id } = req.params;
        const resTmp = yield customer_1.default.update({ customerState: true }, {
            where: {
                customerId: req.customer.customerId,
                customerState: false
            }
        });
        return res.status(200).json({ message: "OK", resTmp });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
});
exports.updateCustomerStateTrue = updateCustomerStateTrue;
//# sourceMappingURL=customer_controller.js.map