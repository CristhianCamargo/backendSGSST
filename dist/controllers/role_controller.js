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
exports.deleteRole = exports.updateRole = exports.addRole = exports.getOneRole = exports.getRole = void 0;
const sequelize_1 = require("sequelize");
const role_1 = __importDefault(require("../models/role"));
const getRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield role_1.default.findAll();
        return res.status(200).json({ message: "OK", role });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
});
exports.getRole = getRole;
const getOneRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role_id } = req.params;
        const role = yield role_1.default.findByPk(role_id);
        if (!role) {
            return res.status(404).json({ message: "Este rol no existe" });
        }
        return res.status(200).json({ message: "OK", role });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
});
exports.getOneRole = getOneRole;
const addRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role_name } = req.body;
        const roleValidate = yield role_1.default.findOne({
            where: {
                roleName: role_name
            }
        });
        if (roleValidate) {
            return res.status(500).json({ message: "Este rol ya existe" });
        }
        const resRole = yield role_1.default.create({
            roleName: role_name
        });
        return res.status(200).json({ message: "OK", resRole });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
});
exports.addRole = addRole;
const updateRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role_id } = req.params;
        const { role_name } = req.body;
        const roleData = yield role_1.default.findByPk(role_id);
        if (role_name !== "") {
            const roleValidate = yield role_1.default.findAll({
                where: {
                    [sequelize_1.Op.and]: [
                        { role_name },
                        {
                            role_id: {
                                [sequelize_1.Op.ne]: role_id
                            }
                        }
                    ]
                }
            });
            if (roleValidate.length > 0) {
                return res.status(500).json({ message: "Este rol ya existe" });
            }
            roleData.roleName = role_name;
        }
        yield roleData.save();
        return res.status(200).json({ message: "OK", roleData });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ message: "Ocurrio un error" });
    }
});
exports.updateRole = updateRole;
const deleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { role_id } = req.params;
    const role = yield role_1.default.findOne({
        where: {
            role_id
        }
    });
    if (!role) {
        return res.status(400).json({ message: "Esta intentanto eliminar un rol que no existe" });
    }
    yield role_1.default.destroy({
        where: {
            role_id
        }
    });
    return res.status(200).json({ message: "OK", role });
});
exports.deleteRole = deleteRole;
//# sourceMappingURL=role_controller.js.map