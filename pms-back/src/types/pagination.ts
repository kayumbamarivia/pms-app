/**
 * Types and utility files for pagination, validation, etc.
 */

// types/pagination.ts
export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  findOptions?: any;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}

// // utils/validation.ts
// import { validate } from "class-validator";
// import { ValidationError } from "../errors/ValidationError";

// /**
//  * Validates an object against its class validator constraints
//  * @param object Object to validate
//  * @throws ValidationError if validation fails
//  */
// export async function validateOrThrow(object: any): Promise<void> {
//   const errors = await validate(object);
  
//   if (errors.length > 0) {
//     const validationErrors = errors.reduce((acc: Record<string, string[]>, error) => {
//       const property = error.property;
//       const constraints = error.constraints ? Object.values(error.constraints) : ["Invalid value"];
//       acc[property] = constraints;
//       return acc;
//     }, {});
    
//     throw new ValidationError("Validation failed", validationErrors);
//   }
// }