"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewspostsRepository = void 0;
const data_source_1 = require("../typeORM/data-source");
const newspost_1 = require("../entities/newspost");
class NewspostsRepository {
    static async getAll({ page, size }) {
        const repo = data_source_1.AppDataSource.getRepository(newspost_1.Newspost);
        const [data, total] = await repo.findAndCount({
            relations: ["author"],
            skip: page * size,
            take: size,
            order: { createDate: "DESC" },
        });
        return { data, total };
    }
    static async getById(id) {
        const repo = data_source_1.AppDataSource.getRepository(newspost_1.Newspost);
        return repo.findOne({ where: { id }, relations: ["author"] });
    }
    static async create(data) {
        const repo = data_source_1.AppDataSource.getRepository(newspost_1.Newspost);
        const entity = repo.create(data);
        return repo.save(entity);
    }
    static async update(id, updates) {
        const repo = data_source_1.AppDataSource.getRepository(newspost_1.Newspost);
        const post = await repo.findOne({ where: { id } });
        if (!post)
            return null;
        Object.assign(post, updates);
        return repo.save(post);
    }
    static async delete(id) {
        const repo = data_source_1.AppDataSource.getRepository(newspost_1.Newspost);
        const post = await repo.findOne({ where: { id } });
        if (!post)
            return null;
        await repo.remove(post);
        return id;
    }
}
exports.NewspostsRepository = NewspostsRepository;
