import { Request, Response } from "express";
import { Op } from "sequelize";
import Role from "../models/role";

export const getRole = async (req: Request, res: Response) => {
    try {
        const role = await Role.findAll();

        return res.status(200).json({ message: "OK", role });


    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }

}

export const getOneRole = async (req: Request, res: Response) => {
    try {

        const {
            role_id
        } = req.params;

        const role = await Role.findByPk(role_id);

        if (!role) {
            return res.status(404).json({ message: "Este rol no existe" });
        }

        return res.status(200).json({ message: "OK", role });

    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
}

export const addRole = async (req: Request, res: Response) => {
    try {
        const {
            role_name
        } = req.body;

        const roleValidate = await Role.findOne({
            where: {
                roleName: role_name
            }
        });

        if (roleValidate) {
            return res.status(500).json({ message: "Este rol ya existe" });

        }

        const resRole = await Role.create({
            roleName: role_name
        });

        return res.status(200).json({ message: "OK", resRole });

    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
}

export const updateRole = async (req: Request, res: Response) => {
    try {

        const {
            role_id
        } = req.params;

        const {
            role_name

        } = req.body;

        const roleData: any = await Role.findByPk(role_id);

        if (role_name !== "") {
            const roleValidate = await Role.findAll({
                where: {
                    [Op.and]: [
                        { role_name},
                        {
                            role_id: {
                                [Op.ne]: role_id
                            }
                        }
                    ]
                }
            });
            if (roleValidate.length >0) {
                return res.status(500).json({message: "Este rol ya existe"});
            }

            roleData.roleName = role_name;
        }

        await roleData.save();

        return res.status(200).json({message: "OK", roleData});

    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ message: "Ocurrio un error" });
    }
}

export const deleteRole = async (req: Request, res: Response) => {
    const {
        role_id
    } = req.params;

    const role = await Role.findOne({
        where: {
            role_id
        }
    });

    if (!role) {
        return res.status(400).json({ message: "Esta intentanto eliminar un rol que no existe" });
    }

    await Role.destroy({
        where: {
            role_id
        }
    });

    return res.status(200).json({ message: "OK", role });
}