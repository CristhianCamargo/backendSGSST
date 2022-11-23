import { Request, Response } from 'express';
import Comment from '../models/comment';

export const getComment = async (req: Request, res: Response) => {

    try {

        const comment = await Comment.findAll();

        return res.status(200).json({ message: "OK", comment })

    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
}

export const getOneComment = async (req: Request, res: Response) => {

    try {

        const {
            comment_id
        } = req.params;

        const comment = await Comment.findByPk(comment_id);

        if (!comment) {
            return res.status(404).json({ message: "Este comentario no existe" });
        }

        return res.status(200).json({ message: "OK", comment });

    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ message: "Ocurrio un error" });
    }

}

export const addComment = async (req: Request, res: Response) => {
    try {
        const {
            survey_id,
            comment_content
        } = req.body;

        const comment = await Comment.create({
            surveyId: survey_id,
            commentContent: comment_content
        });

        return res.status(200).json({message: "OK", comment});

    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ message: "Ocurrio un error" });
    }
}

export const deleteComment = async (req: Request, res: Response) => {
    try {

        const {
            comment_id
        } = req.params;

        const comment = await Comment.destroy({
            where: {
                comment_id
            }
        });

        if (!comment) {
            return res.status(404).json({message: "Esta intentando eliminar un comentario que no existe"});
        }

        return res.status(200).json({message: "OK", comment});
        
    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ message: "Ocurrio un error" });
    }
}

export const deleteAllComment = async (req: Request, res: Response) => {
    try {
        
        const comment = await Comment.destroy({
            truncate: true
        });

        return res.status(200).json({message: "OK"});

    } catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ message: "Ocurrio un error" });
    }
}