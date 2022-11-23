
export const emailPatternValidate = (correo: string) => {
    console.log(correo);
    const pattern = /^[a-z]+.[a-z]+@usantoto.edu.co$/;
    const esValido = correo.match(pattern);
    console.log(esValido);
    if (esValido) {
        return true;
    } else {
        return false;
    }
}