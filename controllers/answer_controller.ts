import { Request, Response } from 'express';
import Answer from '../models/answer';
import AnswerOption from '../models/answer_option';
import Question from '../models/question';


export const getAnswer = async (req: Request, res: Response) => {
    try {

        const answer = await Answer.findAll({
            include: [
                {
                    model: Question

                }, {
                    model: AnswerOption
                }]
        });

        return res.status(200).json({ message: "OK", answer });

    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
}

export const getOneAnswer = async (req: Request, res: Response) => {
    try {
        const {
            answer_id
        } = req.query;

        let answerId: any = answer_id;

        const answer = await Answer.findByPk(answerId);

        if (!answer) {
            return res.status(400).json({ message: "No existe respuesta" });
        }

        return res.status(200).json({ message: "OK", answer });

    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
}

export const getAnswerByCustomer = async (req: Request, res: Response) => {
    try {

        const {
            customer_id
        } = req.query;

        const answerByCustomer = await Answer.findAll({
            order: [["answer_id", "ASC"]],
            where: {
                //customerId: req.customer.customerId
                customerId: customer_id
            },
            include: [{
                model: Question,
                attributes: ["question_content"]
            },
            {
                model: AnswerOption,
                attributes: ["option_name"]
            }]

        });

        return res.status(200).json({ message: "OK", answerByCustomer });

    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
}

export const getAnswerByOption = async (req: Request, res: Response) => {
    try {
        const {
            option_id
        } = req.query;

        const answerByOption = await Answer.findAll({
            order: [["answer_id", "ASC"]],
            where: {
                optionId: option_id
            },
            include: [
                {
                    model: AnswerOption,
                    attributes: ["option_name"]
                }]

        });

        if (answerByOption.length == 0) {
            return res.status(400).json({ message: "Esta opcion no ha sido seleccionada", answerByOption });
        }

        return res.status(200).json({ message: "OK", answerByOption });


    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
}

export const getAnswerByOptionAndQuestion = async (req: Request, res: Response) => {
    try {
        const {
            option_id,
            question_id
        } = req.query;

        const answerByOpAndQues = await Answer.findAll({
            order: [["answer_id", "ASC"]],
            where: {
                optionId: option_id,
                questionId: question_id
            },
            include: [
                {
                    model: AnswerOption,
                    attributes: ["option_name"]
                }]

        });

        if (answerByOpAndQues.length == 0) {
            return res.status(400).json({ message: "Esta opcion no ha sido seleccionada", answerByOpAndQues });
        }

        return res.status(200).json({ message: "OK", answerByOpAndQues });


    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
}

export const getAnswerByQuestion = async (req: Request, res: Response) => {
    try {
        const {
            question_id
        } = req.query;

        const answerByQuestion = await Answer.findAll({
            order: [["answer_id", "ASC"]],
            where: {
                questionId: question_id
            },
            include: [
                {
                    model: AnswerOption,
                    attributes: ["option_name"]
                }]

        });

        if (answerByQuestion.length == 0) {
            return res.status(400).json({ message: "Esta pregunta no tiene respuestas", answerByQuestion });
        }

        return res.status(200).json({ message: "OK", answerByQuestion });


    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
}

export const getAnswerByQuestionAndCustomer = async (req: Request, res: Response) => {
    try {
        const {
            question_id
        } = req.query;

        const answerByQuestionCustomer = await Answer.findAll({
            where: {
                questionId: question_id,
                customerId: req.customer.customerId
            },
            include: [
                {
                    model: AnswerOption,
                    attributes: ["option_name"]
                }]

        });

        if (answerByQuestionCustomer.length == 0) {
            return res.status(400).json({ message: "Esta pregunta no tiene respuestas de este usuario", answerByQuestionCustomer });
        }

        return res.status(200).json({ message: "OK", answerByQuestionCustomer });


    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
}

export const addAnswer = async (req: Request, res: Response) => {

    try {
        const {
            option_id,
            question_id,
        } = req.body;

        const answer = await Answer.create({
            optionId: option_id,
            questionId: question_id,
            customerId: req.customer.customerId
        });

        await answer.save();

        return res.status(200).json({ message: "OK", answer });

    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
}

export const deleteAllAnswer = async (req: Request, res: Response) => {
    try {
        const answer = await Answer.destroy({
            truncate: true
        });

        return res.status(200).json({ message: "OK" })
    } catch (error) {

    }
}