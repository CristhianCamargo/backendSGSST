import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Answer from '../models/answer';
import Question from '../models/question';
import Survey from '../models/survey';

export const getQuestion = async (req: Request, res: Response) => {
    try {
        const question = await Question.findAll({
            order: [["question_id", "ASC"]]
        }
        );
        return res.status(200).json({ message: "OK", question });

    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
}

export const getOneQuestion = async (req: Request, res: Response) => {
    try {
        const {
            question_id
        } = req.params;

        const question = await Question.findByPk(question_id);

        if (!question) {
            return res.status(404).json({ message: "Pregunta no encontrada" });
        }

        return res.status(200).json({ message: "OK", question });
    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ message: "Ocurrion un error" })
    }
}
export const getQuestionBySurvey = async (req: Request, res: Response) => {
    try {
        const {
            survey_id
        } = req.query;
        const question = await Question.findAll({
            where: {
                surveyId: survey_id
            }
        });
        return res.status(200).json({ message: "OK", question });

    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
}
export const addQuestion = async (req: Request, res: Response) => {

    try {
        const {
            survey_id,
            question_content
        } = req.body;

        const questionValidate = await Question.findOne({
            where: {
                questionContent: question_content
            }
        });

        if (questionValidate) {
            return res.status(500).json({ message: "Esta pregunta ya existe" });
        }

        const resQuestions = await Question.create({
            surveyId: survey_id,
            questionContent: question_content
        });

        return res.status(200).json({ message: "OK", resQuestions });

    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ message: "Ocurrio un error" })
    }

}

export const updateQuestion = async (req: Request, res: Response) => {

    try {
        const {
            question_id

        } = req.params;

        const {
            survey_id,
            question_content
        } = req.body;

        const questionData: any = await Question.findByPk(question_id);

        if (survey_id !== "") {
            questionData.surveyId = 1;
        }

        if (question_content !== "") {

            const questionValidate = await Question.findAll({
                where: {
                    [Op.and]: [
                        { question_content },
                        {
                            question_id: {
                                [Op.ne]: question_id
                            }
                        }
                    ]
                }
            });

            if (questionValidate.length > 0) {
                return res.status(400).json({ ok: false, message: "Esta pregunta ya existe" });
            }

            questionData.questionContent = question_content;
        }

        await questionData.save();

        return res.status(200).json({ message: "OK", questionData });

    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ message: "Ocurrio un error" });
    }
}

export const deleteQuestion = async (req: Request, res: Response) => {

    try {

        const {
            question_id
        } = req.params;

        const question = await Question.findOne({
            where: {
                question_id
            }
        });

        if (!question) {
            return res.status(400).json({ message: "Esta intentando borrar una pregunta que no existe" });
        }

        await Question.destroy({
            where: {
                question_id
            }
        });

        return res.status(200).json({ message: "OK", question })

    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
}