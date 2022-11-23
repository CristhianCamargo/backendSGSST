import { Request, Response } from 'express'
import { Op } from 'sequelize';
import Access from '../models/access';
import Customer from '../models/customer';
import { emailPatternValidate } from './pattern-email';
export const validateDocument = async (req: Request, res: Response) => {
    const {
        customer_document,
    } = req.params;


    const customerValidate = await Customer.findOne({
        where: {
            customerDocument: customer_document
        }
    });

    if (customerValidate) {
        return res.status(500).json({ ok: true, message: 'Ya existe' });
    }

    return res.status(200).json({ ok: false, message: "OK" });

}
export const validateEmail = async (req: Request, res: Response) => {
    const {
        access_email,
    } = req.params;


    const emailValidate = await Access.findOne({
        where: {
            accessEmail: access_email
        }
    });

    if (emailValidate) {
        return res.status(500).json({ ok: true, message: 'Este email ya existe' });

    } else if (!emailPatternValidate(access_email)) {
        return res.status(500).json({ ok: true, message: 'Solamente correos institucionales' });
    }

    return res.status(200).json({ ok: false, message: "OK" });

}

export const validateUpdateDocument = async (req: Request, res: Response) => { 
    const { customerId, customerDocument } = req.body; 
    const customerTmp = await Customer.findAll({ 
      where: { 
        [Op.and]: [ 
          { customerDocument }, 
          { 
            customerId: { 
              [Op.ne]: customerId, 
            }, 
          }, 
        ], 
      }, 
    }); 
    if (customerTmp.length > 0) { 
      return res.status(400).json({ 
        ok: false, 
        document: true, 
        message: "Ya existe", 
      }); 
    } 
   
    return res.status(200).json({ 
      ok: true, 
    }); 
  };