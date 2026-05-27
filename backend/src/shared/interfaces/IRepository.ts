/**
 * Base Repository Interface
 * Defines common CRUD operations for all repositories
 */

import { PaginationParams, PaginatedResult } from '../types/entities';

export interface IRepository<T, CreateDTO, UpdateDTO> {
  /**
   * Create a new entity
   * @param data - Data for creating the entity
   * @returns Created entity
   */
  create(data: CreateDTO): Promise<T>;

  /**
   * Find entity by ID
   * @param id - Entity UUID
   * @returns Entity or null if not found
   */
  findById(id: string): Promise<T | null>;

  /**
   * Find all entities matching filter
   * @param filter - Optional filter criteria
   * @param pagination - Optional pagination parameters
   * @returns Array of entities
   */
  findMany(
    filter?: Record<string, any>,
    pagination?: PaginationParams
  ): Promise<T[]>;

  /**
   * Find entities with pagination
   * @param filter - Optional filter criteria
   * @param pagination - Pagination parameters
   * @returns Paginated result with metadata
   */
  findManyPaginated(
    filter?: Record<string, any>,
    pagination?: PaginationParams
  ): Promise<PaginatedResult<T>>;

  /**
   * Update entity by ID
   * @param id - Entity UUID
   * @param data - Data for updating the entity
   * @returns Updated entity
   */
  update(id: string, data: UpdateDTO): Promise<T>;

  /**
   * Delete entity by ID
   * @param id - Entity UUID
   * @returns void
   */
  delete(id: string): Promise<void>;

  /**
   * Count entities matching filter
   * @param filter - Optional filter criteria
   * @returns Count of entities
   */
  count(filter?: Record<string, any>): Promise<number>;

  /**
   * Check if entity exists
   * @param id - Entity UUID
   * @returns true if entity exists, false otherwise
   */
  exists(id: string): Promise<boolean>;
}
