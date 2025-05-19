import { AppDataSource } from '../data_source.ts';
import { Slot } from '../models/Slot.ts';

export const SlotRepository = AppDataSource.getRepository(Slot);
