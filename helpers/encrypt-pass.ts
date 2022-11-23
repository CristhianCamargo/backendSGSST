import bcrypt, { compare } from 'bcrypt';

export const encryptPass = async (pass: string)=> {

    const hash = bcrypt.hashSync(pass, 10);
    return hash;

}

export const checkPass = async (pass: string, passHash: string) => {

    return await bcrypt.compare(pass, passHash);

}

