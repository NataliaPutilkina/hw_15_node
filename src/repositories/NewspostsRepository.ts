import { AppDataSource } from "../typeORM/data-source";
import { Newspost } from "../entities/newspost";

type GetAllParams = {
  page: number;
  size: number;
};

export class NewspostsRepository {
  static async getAll({ page, size }: GetAllParams) {
    const repo = AppDataSource.getRepository(Newspost);
    const [data, total] = await repo.findAndCount({
      relations: ["author"],
      skip: page * size,
      take: size,
      order: { createDate: "DESC" },
    });
    return { data, total };
  }

  static async getById(id: number) {
    const repo = AppDataSource.getRepository(Newspost);
    return repo.findOne({ where: { id }, relations: ["author"] });
  }

  static async create(data: Omit<Newspost, "id" | "createDate">) {
    const repo = AppDataSource.getRepository(Newspost);
    const entity = repo.create(data);
    return repo.save(entity);
  }

  static async update(id: number, updates: Partial<Omit<Newspost, "id" | "createDate">>) {
    const repo = AppDataSource.getRepository(Newspost);
    const post = await repo.findOne({ where: { id } });
    if (!post) return null;
    Object.assign(post, updates);
    return repo.save(post);
  }

  static async delete(id: number) {
    const repo = AppDataSource.getRepository(Newspost);
    const post = await repo.findOne({ where: { id } });
    if (!post) return null;
    await repo.remove(post);
    return id;
  }
}
