"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwError = exports.deleteNewspost = exports.putNewspost = exports.addNewspost = exports.getNewspost = exports.getNewsposts = void 0;
const newspostsService_1 = require("../services/newspostsService");
const newspostSchema_1 = require("../validation/newspostSchema");
const validationError_1 = require("../errors/validationError");
const newspostsServiceError_1 = require("../errors/newspostsServiceError");
const getNewsposts = async (req, res, next) => {
    try {
        const { page = "1", size = "10" } = req.query;
        const pageNum = Math.max(1, parseInt(page, 10));
        const sizeNum = Math.max(1, parseInt(size, 10));
        const { data, total } = await newspostsService_1.NewspostsService.getAll({
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
    }
    catch (error) {
        next(error);
    }
};
exports.getNewsposts = getNewsposts;
const getNewspost = async (req, res, next) => {
    try {
        const newspost = await newspostsService_1.NewspostsService.getById(Number(req.params.key));
        if (!newspost) {
            return res.status(404).json({ error: "Новину не знайдено" });
        }
        res.json(newspost);
    }
    catch (error) {
        next(error);
    }
};
exports.getNewspost = getNewspost;
const addNewspost = async (req, res, next) => {
    try {
        const valid = (0, newspostSchema_1.validateNewspost)(req.body);
        if (!valid) {
            throw new validationError_1.ValidationError(JSON.stringify(newspostSchema_1.validateNewspost.errors));
        }
        const user = req.user;
        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const payload = { ...req.body, authorId: user.id };
        const newPost = await newspostsService_1.NewspostsService.create(payload);
        const loaded = await newspostsService_1.NewspostsService.getById(newPost.id);
        res.status(201).json(loaded);
    }
    catch (error) {
        next(error);
    }
};
exports.addNewspost = addNewspost;
const putNewspost = async (req, res, next) => {
    try {
        const valid = (0, newspostSchema_1.validateNewspost)(req.body);
        if (!valid) {
            throw new validationError_1.ValidationError(JSON.stringify(newspostSchema_1.validateNewspost.errors));
        }
        const updated = await newspostsService_1.NewspostsService.update(Number(req.params.key), req.body);
        if (!updated) {
            return res.status(404).json({ message: "Новину не знайдено" });
        }
        res.json(updated);
    }
    catch (error) {
        next(error);
    }
};
exports.putNewspost = putNewspost;
const deleteNewspost = async (req, res, next) => {
    try {
        const deletedId = await newspostsService_1.NewspostsService.delete(Number(req.params.key));
        if (!deletedId) {
            return res.status(404).json({ message: "Not found" });
        }
        res.json({ message: `Deleted ID ${deletedId}` });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteNewspost = deleteNewspost;
const throwError = () => {
    throw new newspostsServiceError_1.NewspostsServiceError("Тестова помилка сервісу");
};
exports.throwError = throwError;
