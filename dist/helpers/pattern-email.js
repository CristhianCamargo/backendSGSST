"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailPatternValidate = void 0;
const emailPatternValidate = (correo) => {
    console.log(correo);
    const pattern = /^[a-z]+.[a-z]+@usantoto.edu.co$/;
    const esValido = correo.match(pattern);
    console.log(esValido);
    if (esValido) {
        return true;
    }
    else {
        return false;
    }
};
exports.emailPatternValidate = emailPatternValidate;
//# sourceMappingURL=pattern-email.js.map