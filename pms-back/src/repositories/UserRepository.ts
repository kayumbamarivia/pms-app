import { AppDataSource } from "../data_source.ts";
import { User } from "../models/User.ts";

export const UserRepository = AppDataSource.getRepository(User).extend({
  findByEmail(email: string) {
    return this.findOne({ where: { email } });
  },
  
  findByRole(role: string) {
    return this.find({ where: { role } });
  },
  
  findByNameContaining(searchTerm: string) {
    return this.createQueryBuilder("user")
      .where("user.firstName LIKE :term OR user.lastName LIKE :term", 
        { term: `%${searchTerm}%` })
      .getMany();
  }
});