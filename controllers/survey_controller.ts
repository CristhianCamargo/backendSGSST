import {Response, Request} from 'express';
import Survey from '../models/survey';

export const getSurvey = async (req: Request, res: Response) => {
    try {
        const survey = await Survey.findAll();

        return res.status(200).json({ message: "OK", survey });


    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }

}