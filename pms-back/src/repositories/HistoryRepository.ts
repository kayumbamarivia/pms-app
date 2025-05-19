import { AppDataSource } from '../data_source.ts';
import { History } from '../models/History.ts';

export const HistoryRepository = AppDataSource.getRepository(History); 