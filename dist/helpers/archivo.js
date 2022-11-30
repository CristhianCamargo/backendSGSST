"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subirArchivo = void 0;
const path = __importStar(require("path"));
const uuid_1 = require("uuid");
const subirArchivo = (files, carpeta = '') => {
    return new Promise((resolve, reject) => {
        const { uploadFile } = files;
        const nombreCortado = uploadFile.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];
        const nombreTemp = (0, uuid_1.v4)() + '.' + extension;
        const uploadPath = path.join(__dirname, '../', carpeta, nombreTemp);
        uploadFile.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            const partesRuta = uploadPath.split('/');
            resolve(`${partesRuta[partesRuta.length - 2]}/${partesRuta[partesRuta.length - 1]}`);
        });
    });
};
exports.subirArchivo = subirArchivo;
//# sourceMappingURL=archivo.js.map