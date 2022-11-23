import { compare } from 'bcrypt';
import { Response, Request } from 'express';
import { generarJWT } from '../helpers/generar-jwt';
import Access from '../models/access';
import Customer from '../models/customer';
import Role from '../models/role';

export const login = async (req: Request, res: Response) => {

    try {

        const {
            access_email,
            access_pass
        } = req.body;

        const tmpAccess: any = await Access.findOne({
            where: {
                accessEmail: access_email
            }
        });

        if (access_email == "" && access_pass == "") {
            return res.status(412).json({message: 'Campos vacios'});
        }

        if (!tmpAccess) {
            return res.status(400).json({ message: 'Email no encontrado' });
        }

        const tmpPass = await compare(access_pass, tmpAccess.accessPass);

        if (!tmpPass) {
            return res.status(400).json({ message: 'Contraseña no coincide' });
        }

        const customer: any = await Customer.findOne({
            include: [
                {
                    model: Role,
                    attributes: ['role_name']
                }
            ],
            where: {
                customerId: tmpAccess.customerId
            }
        });

        const token = await generarJWT(customer.customerId);

        return res.status(200).json({ message: 'OK', user: customer, token: token});

    } catch (error) {
        return res.status(500).json({message: 'Error', error});

    }

}