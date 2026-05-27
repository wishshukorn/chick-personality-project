/**
 * Base Service Interface
 * Defines common business operations for all services
 */

import { PaginationParams, PaginatedResult } from '../types/entities';

export interface IService<T, CreateDTO, UpdateDTO> {
  /**
   * Create a new entity with business logic
   * @param data - Data for creating the entity
   * @returns Created entity
   */
  create(data: CreateDTO): Promise<T>;

  /**
   * Get entity by ID with business logic
   * @param id - Entity UUID
   * @returns Entity or null if not found
   */
  getById(id: string): Promise<T | null>;

  /**
   * Get all entities with business logic
   * @param filter - Optional filter criteria
   * @param pagination - Optional pagination parameters
   * @returns Array of entities
   */
  getMany(
    filter?: Record<string, any>,
    pagination?: PaginationParams
  ): Promise<T[]>;

  /**
   * Get entities with pagination and business logic
   * @param filter - Optional filter criteria
   * @param pagination - Pagination parameters
   * @returns Paginated result with metadata
   */
  getManyPaginated(
    filter?: Record<string, any>,
    pagination?: PaginationParams
  ): Promise<PaginatedResult<T>>;

  /**
   * Update entity with business logic
   * @param id - Entity UUID
   * @param data - Data for updating the entity
   * @returns Updated entity
   */
  update(id: string, data: UpdateDTO): Promise<T>;

  /**
   * Delete entity with business logic
   * @param id - Entity UUID
   * @returns void
   */
  delete(id: string): Promise<void>;
}
