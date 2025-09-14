import { Request, Response, NextFunction } from "express";
import { NewspostsService } from "../services/newspostsService";
import { validateNewspost } from "../validation/newspostSchema";
import { ValidationError } from "../errors/validationError";
import { NewspostsServiceError } from "../errors/newspostsServiceError";


export const getNewsposts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = "1", size = "10" } = req.query;

    const pageNum = Math.max(1, parseInt(page as string, 10));
    const sizeNum = Math.max(1, parseInt(size as string, 10));

    const { data, total } = await NewspostsService.getAll({
      page: pageNum - 1,
      size: sizeNum,
    });

    res.json({
      message: "Newsposts fetched successfully",
      page: pageNum,
      size: sizeNum,
      total,
      data,
    });
  } catch (error) {
    next(error);
  }
};


export const getNewspost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newspost = await NewspostsService.getById(Number(req.params.key));

    if (!newspost) {
      return res.status(404).json({ error: "Новину не знайдено" });
    }

    res.json(newspost);
  } catch (error) {
    next(error);
  }
};


export const addNewspost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const valid = validateNewspost(req.body);
    if (!valid) {
      throw new ValidationError(JSON.stringify(validateNewspost.errors));
    }

    const user: any = req.user; 
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const payload = { ...req.body, authorId: user.id };
    const newPost = await NewspostsService.create(payload);
    const loaded = await NewspostsService.getById(newPost.id);

    res.status(201).json(loaded);
  } catch (error) {
    next(error);
  }
};


export const putNewspost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const valid = validateNewspost(req.body);
    if (!valid) {
      throw new ValidationError(JSON.stringify(validateNewspost.errors));
    }

    const updated = await NewspostsService.update(Number(req.params.key), req.body);

    if (!updated) {
      return res.status(404).json({ message: "Новину не знайдено" });
    }

    res.json(updated);
  } catch (error) {
    next(error);
  }
};


export const deleteNewspost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedId = await NewspostsService.delete(Number(req.params.key));

    if (!deletedId) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: `Deleted ID ${deletedId}` });
  } catch (error) {
    next(error);
  }
};


export const throwError = () => {
  throw new NewspostsServiceError("Тестова помилка сервісу");
};
