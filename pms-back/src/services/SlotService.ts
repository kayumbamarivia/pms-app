import { SlotRepository } from '../repositories/SlotRepository.ts';
import { Slot } from '../models/Slot.ts';

export class SlotService {
  async findAll(): Promise<Slot[]> {
    return SlotRepository.find();
  }

  async findById(id: number): Promise<Slot | null> {
    return SlotRepository.findOneBy({ id });
  }

  async create(slotData: Partial<Slot>): Promise<Slot> {
    const slot = SlotRepository.create(slotData);
    return SlotRepository.save(slot);
  }

  async update(id: number, slotData: Partial<Slot>): Promise<Slot | null> {
    await SlotRepository.update(id, slotData);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await SlotRepository.delete(id);
    return result.affected !== undefined && result.affected !== null && result.affected > 0;
  }
} 