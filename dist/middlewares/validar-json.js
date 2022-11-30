"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJSON = void 0;
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const ajv_errors_1 = __importDefault(require("ajv-errors"));
const ajv_i18n_1 = __importDefault(require("ajv-i18n"));
const validarJSON = (schema) => {
    return (req, res, next) => {
        const ajv = new ajv_1.default({ allErrors: true, messages: false });
        (0, ajv_formats_1.default)(ajv).addKeyword('kind').addKeyword('modyfier');
        (0, ajv_errors_1.default)(ajv);
        const validate = ajv.compile(schema);
        const isValid = validate(req.body);
        if (!isValid) {
            ajv_i18n_1.default.es(validate.errors);
            return res.status(400).send(ajv.errorsText(validate.errors, { separator: '\n' }));
        }
        ;
        next();
    };
};
exports.validarJSON = validarJSON;
//# sourceMappingURL=validar-json.js.map