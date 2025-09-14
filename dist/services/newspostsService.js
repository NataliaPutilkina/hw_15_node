"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewspostsService = void 0;
const NewspostsRepository_1 = require("../repositories/NewspostsRepository");
class NewspostsService {
    static async getAll(params) {
        return NewspostsRepository_1.NewspostsRepository.getAll(params);
    }
    static async getById(id) {
        return NewspostsRepository_1.NewspostsRepository.getById(id);
    }
    static async create(data) {
        return NewspostsRepository_1.NewspostsRepository.create(data);
    }
    static async update(id, updates) {
        return NewspostsRepository_1.NewspostsRepository.update(id, updates);
    }
    static async delete(id) {
        return NewspostsRepository_1.NewspostsRepository.delete(id);
    }
}
exports.NewspostsService = NewspostsService;
