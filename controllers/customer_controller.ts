import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { encryptPass } from '../helpers/encrypt-pass';
import { emailPatternValidate } from '../helpers/pattern-email';
import Access from '../models/access';
import Customer from '../models/customer';
import Role from '../models/role';

export const getCustomer = async (req: Request, res: Response) => {

    try {
        const resTmp = await Customer.findAll({
            order: [["customer_id", "ASC"]],
            include: [
                {
                    model: Access
                },
                {
                    model: Role,
                    attributes: [
                        "roleName"
                    ]
                }
            ],

        });
        return res.status(200).json({ message: "OK", resTmp });

    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
}

export const getOneCustomer = async (req: Request, res: Response) => {

    try {
        const {
            customer_id
        } = req.params;

        const resTmp = await Customer.findOne({
            where: {
                customerId: customer_id
            },
            include: {
                model: Access,
                attributes: ["accessEmail"]
            }
        });


        if (!resTmp) {
            return res.status(500).json({ message: 'Este usuario no existe' })
        }
        return res.status(200).json({ message: "OK", resTmp });

    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
}

export const getCustomerByState = async (req: Request, res: Response) => {
    try {
        const {
            customer_state
        } = req.params;

        const customerByState = await Customer.findAll({
            order: [["customer_id", "ASC"]],
            where: {
                customerState: customer_state
            }
        });

        return res.status(200).json({ message: "OK", customerByState });

    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
}

export const addCustomer = async (req: Request, res: Response) => {

    try {
        const {
            role_id,
            survey_id,
            customer_document,
            customer_firstname,
            customer_lastname,
            customer_phone,
            customer_state,
            access_email,
            access_pass,
        } = req.body;


        const customerValidate = await Customer.findOne({
            where: {
                customerDocument: customer_document
            }
        });

        if (customerValidate) {
            return res.status(500).json({ message: 'Ya existe un usuario con este numero de documento' });
        }

        const emailValidate = await Access.findOne({
            where: {
                accessEmail: access_email
            }
        });

        if (emailValidate) {
            return res.status(500).json({ message: 'Este email ya existe' });

        } else if (!emailPatternValidate(access_email)) {
            return res.status(500).json({ message: 'Solamente correos institucionales' });
        }

        const resTmp: any = await Customer.create({
            roleId: role_id,
            surveyId: survey_id,
            customerDocument: customer_document,
            customerFirstname: customer_firstname,
            customerLastname: customer_lastname,
            customerPhone: customer_phone,
            customerState: customer_state
        });

        const hashPassword = await encryptPass(access_pass);

        const accessTmp = await Access.create({
            customerId: resTmp.customerId,
            accessEmail: access_email,
            accessPass: hashPassword
        });
        return res.status(200).json({ message: "OK", resTmp, accessTmp });

    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error", error });
    }
}

export const updateCustomer = async (req: Request, res: Response) => {

    try {
        const {
            customer_id
        } = req.params;

        const {
            role_id,
            survey_id,
            customer_document,
            customer_firstname,
            customer_lastname,
            customer_phone,
            access_email,
            access_pass
        } = req.body;

        const resTmp: any = await Customer.findByPk(customer_id);
        const accessTmp: any = await Access.findByPk(customer_id);

        const usu = await Customer.findAll({
            where: {
                [Op.and]: [
                    { customer_document },
                    {
                        customer_id: {
                            [Op.ne]: customer_id,
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

        await resTmp.save();

        if (access_pass !== "") {
            const hashPassword = await encryptPass(access_pass);
            accessTmp.accessPass = hashPassword;
        }

        if (access_email !== "") {
            if (!emailPatternValidate(access_email)) {
                return res.status(500).json({ message: 'Solamente correos institucionales' });
            }
            const emailValidate = await Access.findAll({
                where: {
                    [Op.and]: [
                        { access_email },
                        {
                            customer_id: {
                                [Op.ne]: customer_id,
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

        await accessTmp.save();

        return res.status(200).json({ message: "OK", resTmp, accessTmp });

    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
}

export const deleteCustomer = async (req: Request, res: Response) => {
    try {
        const {
            customer_id
        } = req.params;

        const customer = await Customer.findOne({
            where: {
                customer_id
            }
        });

        if (!customer) {
            return res.status(500).json({ message: 'Esta intentando eliminar un usuario que no existe' });
        }

        await Customer.destroy({
            where: {
                customer_id
            }
        });

        return res.status(200).json({ message: "OK", customer });

    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }

}

export const updateCustomerStateLocalStorage = async (req: Request, res: Response) => {

    try {
        const resTmp: any = await Customer.findByPk(req.customer.customerId);

        if (resTmp.customerState) {
            resTmp.customerState = false
        } else {
            resTmp.customerState = true
        }

        await resTmp.save();

        return res.status(200).json({ message: "OK", resTmp });

    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
}

export const updateCustomerStateFalse = async (req: Request, res: Response) => {
    try {
        const resTmp: any = await Customer.update({ customerState: false }, {
            where: {
                customerState: true
            }
        });

        return res.status(200).json({ message: "OK", resTmp });

    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
}

export const updateCustomerStateTrue = async (req: Request, res: Response) => {
    try {

        const {
            customer_id
        } = req.params;

        const resTmp: any = await Customer.update({ customerState: true }, {
            where: {
                customerId: customer_id,
                customerState: false
            }
        });

        return res.status(200).json({ message: "OK", resTmp });

    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
}