import { NewspostsRepository } from "../repositories/NewspostsRepository";
import { Newspost } from "../entities/newspost";

export class NewspostsService {
  static async getAll(params: { page: number; size: number }) {
    return NewspostsRepository.getAll(params);
  }

  static async getById(id: number) {
    return NewspostsRepository.getById(id);
  }

  static async create(data: Partial<Newspost>) {
    return NewspostsRepository.create(data as any);
  }

  static async update(id: number, updates: Partial<Newspost>) {
    return NewspostsRepository.update(id, updates);
  }

  static async delete(id: number) {
    return NewspostsRepository.delete(id);
  }
}
