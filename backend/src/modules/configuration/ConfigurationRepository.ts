/**
 * Configuration Repository
 * Handles database operations for configuration
 */

import { IDatabase } from '../../shared/interfaces/IDatabase';
import { IRepository } from '../../shared/interfaces/IRepository';
import {
  Configuration,
  CreateConfigurationDTO,
  UpdateConfigurationDTO,
  ConfigurationResponseDTO,
} from '../../shared/types/entities';

export class ConfigurationRepository implements IRepository<Configuration, CreateConfigurationDTO, UpdateConfigurationDTO> {
  constructor(private db: IDatabase) {}

  async create(dto: CreateConfigurationDTO): Promise<Configuration> {
    const query = `
      INSERT INTO configurations (id, config_key, config_value, description, is_public)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const { v4: uuidv4 } = require('uuid');
    const id = uuidv4();
    
    const values = [
      id,
      dto.config_key,
      dto.config_value,
      dto.description || null,
      dto.is_public !== undefined ? dto.is_public : false,
    ];

    const result = await this.db.query<any>(query, values);
    return result.rows[0];
  }

  async findById(id: string): Promise<Configuration | null> {
    const query = `
      SELECT * FROM configurations
      WHERE id = $1
    `;
    const result = await this.db.query<any>(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  async findByKey(configKey: string): Promise<Configuration | null> {
    const query = `
      SELECT * FROM configurations
      WHERE config_key = $1
    `;
    const result = await this.db.query<any>(query, [configKey]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  async findMany(
    filter?: Record<string, any>,
    pagination?: { page?: number; page_size?: number }
  ): Promise<Configuration[]> {
    const query = `
      SELECT * FROM configurations
      ORDER BY config_key ASC
    `;
    const result = await this.db.query<any>(query, []);
    return result.rows;
  }

  async findManyPaginated(
    filter?: Record<string, any>,
    pagination?: { page?: number; page_size?: number }
  ): Promise<{ data: Configuration[]; pagination: { page: number; page_size: number; total: number } }> {
    const page = pagination?.page || 1;
    const pageSize = pagination?.page_size || 10;
    const offset = (page - 1) * pageSize;

    const countQuery = `SELECT COUNT(*) as count FROM configurations`;
    const countResult = await this.db.query<any>(countQuery, []);
    const total = parseInt(countResult.rows[0].count, 10);

    const query = `
      SELECT * FROM configurations
      ORDER BY config_key ASC
      LIMIT $1 OFFSET $2
    `;
    const result = await this.db.query<any>(query, [pageSize, offset]);

    return {
      data: result.rows,
      pagination: { page, page_size: pageSize, total },
    };
  }

  async update(id: string, dto: UpdateConfigurationDTO): Promise<Configuration> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (dto.config_value !== undefined) {
      updates.push(`config_value = $${paramIndex++}`);
      values.push(dto.config_value);
    }
    if (dto.description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(dto.description);
    }
    if (dto.is_public !== undefined) {
      updates.push(`is_public = $${paramIndex++}`);
      values.push(dto.is_public);
    }

    if (updates.length === 0) {
      const existing = await this.findById(id);
      if (!existing) {
        throw new Error('Configuration not found');
      }
      return existing;
    }

    values.push(id);
    const query = `
      UPDATE configurations
      SET ${updates.join(', ')}, updated_at = NOW()
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const result = await this.db.query<any>(query, values);
    if (result.rows.length === 0) {
      throw new Error('Configuration not found');
    }
    return result.rows[0];
  }

  async delete(id: string): Promise<void> {
    const query = `
      DELETE FROM configurations
      WHERE id = $1
    `;
    await this.db.query<any>(query, [id]);
  }

  async count(filter?: Record<string, any>): Promise<number> {
    const query = `SELECT COUNT(*) as count FROM configurations`;
    const result = await this.db.query<any>(query, []);
    return parseInt(result.rows[0].count, 10);
  }

  async exists(id: string): Promise<boolean> {
    const query = `SELECT EXISTS(SELECT 1 FROM configurations WHERE id = $1)`;
    const result = await this.db.query<any>(query, [id]);
    return result.rows[0].exists;
  }

  async getPublicConfigurations(): Promise<Configuration[]> {
    const query = `
      SELECT * FROM configurations
      WHERE is_public = true
      ORDER BY config_key ASC
    `;
    const result = await this.db.query<any>(query, []);
    return result.rows;
  }

  toResponseDTO(entity: Configuration): ConfigurationResponseDTO {
    return {
      id: entity.id,
      config_key: entity.config_key,
      config_value: entity.config_value,
      description: entity.description,
      is_public: entity.is_public,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    };
  }
}
