import { HistoryRepository } from '../repositories/HistoryRepository.ts';
import { History } from '../models/History.ts';

export class HistoryService {
  async findAll(): Promise<History[]> {
    return HistoryRepository.find();
  }

  async findById(id: number): Promise<History | null> {
    return HistoryRepository.findOneBy({ id });
  }

  async create(historyData: Partial<History>): Promise<History> {
    const history = HistoryRepository.create(historyData);
    return HistoryRepository.save(history);
  }

  async update(id: number, historyData: Partial<History>): Promise<History | null> {
    await HistoryRepository.update(id, historyData);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await HistoryRepository.delete(id);
    return result.affected !== undefined && result.affected !== null && result.affected > 0;
  }
} 