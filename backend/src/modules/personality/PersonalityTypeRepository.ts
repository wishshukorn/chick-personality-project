/**
 * Personality Type Repository
 * Handles database operations for personality types
 */

import { IDatabase } from '../../shared/interfaces/IDatabase';
import { IRepository } from '../../shared/interfaces/IRepository';
import {
  PersonalityType,
  CreatePersonalityTypeDTO,
  UpdatePersonalityTypeDTO,
  PersonalityTypeResponseDTO,
} from '../../shared/types/entities';
import { PersonalityTypeSlug } from '../../shared/types/entities';

export class PersonalityTypeRepository implements IRepository<PersonalityType, CreatePersonalityTypeDTO, UpdatePersonalityTypeDTO> {
  constructor(private db: IDatabase) {}

  async findAll(): Promise<PersonalityType[]> {
    const query = `
      SELECT * FROM personality_types
      WHERE is_active = true
      ORDER BY priority_order ASC
    `;
    const result = await this.db.query<any>(query, []);
    return result.rows;
  }

  async findById(id: string): Promise<PersonalityType | null> {
    const query = `
      SELECT * FROM personality_types
      WHERE id = $1 AND is_active = true
    `;
    const result = await this.db.query<any>(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  async findBySlug(slug: PersonalityTypeSlug): Promise<PersonalityType | null> {
    const query = `
      SELECT * FROM personality_types
      WHERE slug = $1 AND is_active = true
    `;
    const result = await this.db.query<any>(query, [slug]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  async create(dto: CreatePersonalityTypeDTO): Promise<PersonalityType> {
    const query = `
      INSERT INTO personality_types (
        id, name, slug, theme, color_palette, icon_url, traits,
        description, strengths, weaknesses, compatibility_matrix,
        priority_order, is_active
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *
    `;
    const { v4: uuidv4 } = require('uuid');
    const id = uuidv4();
    
    const values = [
      id,
      dto.name,
      dto.slug,
      dto.theme,
      JSON.stringify(dto.color_palette),
      dto.icon_url || null,
      dto.traits.join(','),
      dto.description,
      dto.strengths.join(','),
      dto.weaknesses.join(','),
      JSON.stringify(dto.compatibility_matrix),
      dto.priority_order,
      dto.is_active !== undefined ? dto.is_active : true,
    ];

    const result = await this.db.query<any>(query, values);
    return result.rows[0];
  }

  async update(id: string, dto: UpdatePersonalityTypeDTO): Promise<PersonalityType> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (dto.name !== undefined) {
      updates.push(`name = $${paramIndex++}`);
      values.push(dto.name);
    }
    if (dto.theme !== undefined) {
      updates.push(`theme = $${paramIndex++}`);
      values.push(dto.theme);
    }
    if (dto.color_palette !== undefined) {
      updates.push(`color_palette = $${paramIndex++}`);
      values.push(JSON.stringify(dto.color_palette));
    }
    if (dto.icon_url !== undefined) {
      updates.push(`icon_url = $${paramIndex++}`);
      values.push(dto.icon_url);
    }
    if (dto.traits !== undefined) {
      updates.push(`traits = $${paramIndex++}`);
      values.push(dto.traits.join(','));
    }
    if (dto.description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(dto.description);
    }
    if (dto.strengths !== undefined) {
      updates.push(`strengths = $${paramIndex++}`);
      values.push(dto.strengths.join(','));
    }
    if (dto.weaknesses !== undefined) {
      updates.push(`weaknesses = $${paramIndex++}`);
      values.push(dto.weaknesses.join(','));
    }
    if (dto.compatibility_matrix !== undefined) {
      updates.push(`compatibility_matrix = $${paramIndex++}`);
      values.push(JSON.stringify(dto.compatibility_matrix));
    }
    if (dto.is_active !== undefined) {
      updates.push(`is_active = $${paramIndex++}`);
      values.push(dto.is_active);
    }

    if (updates.length === 0) {
      const existing = await this.findById(id);
      if (!existing) {
        throw new Error('Personality type not found');
      }
      return existing;
    }

    values.push(id);
    const query = `
      UPDATE personality_types
      SET ${updates.join(', ')}, updated_at = NOW()
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const result = await this.db.query<any>(query, values);
    if (result.rows.length === 0) {
      throw new Error('Personality type not found');
    }
    return result.rows[0];
  }

  async delete(id: string): Promise<void> {
    const query = `
      UPDATE personality_types
      SET is_active = false, updated_at = NOW()
      WHERE id = $1
    `;
    await this.db.query<any>(query, [id]);
  }

  async findMany(
    filter?: Record<string, any>,
    pagination?: { page?: number; page_size?: number }
  ): Promise<PersonalityType[]> {
    const query = `
      SELECT * FROM personality_types
      WHERE is_active = true
      ORDER BY priority_order ASC
    `;
    const result = await this.db.query<any>(query, []);
    return result.rows;
  }

  async findManyPaginated(
    filter?: Record<string, any>,
    pagination?: { page?: number; page_size?: number }
  ): Promise<{ data: PersonalityType[]; pagination: { page: number; page_size: number; total: number } }> {
    const page = pagination?.page || 1;
    const pageSize = pagination?.page_size || 10;
    const offset = (page - 1) * pageSize;

    const countQuery = `SELECT COUNT(*) as count FROM personality_types WHERE is_active = true`;
    const countResult = await this.db.query<any>(countQuery, []);
    const total = parseInt(countResult.rows[0].count, 10);

    const query = `
      SELECT * FROM personality_types
      WHERE is_active = true
      ORDER BY priority_order ASC
      LIMIT $1 OFFSET $2
    `;
    const result = await this.db.query<any>(query, [pageSize, offset]);

    return {
      data: result.rows,
      pagination: { page, page_size: pageSize, total },
    };
  }

  async count(filter?: Record<string, any>): Promise<number> {
    const query = `
      SELECT COUNT(*) as count FROM personality_types
      WHERE is_active = true
    `;
    const result = await this.db.query<any>(query, []);
    return parseInt(result.rows[0].count, 10);
  }

  async exists(id: string): Promise<boolean> {
    const query = `SELECT EXISTS(SELECT 1 FROM personality_types WHERE id = $1 AND is_active = true)`;
    const result = await this.db.query<any>(query, [id]);
    return result.rows[0].exists;
  }

  toResponseDTO(entity: PersonalityType): PersonalityTypeResponseDTO {
    return {
      id: entity.id,
      name: entity.name,
      slug: entity.slug,
      theme: entity.theme,
      color_palette: typeof entity.color_palette === 'string' 
        ? JSON.parse(entity.color_palette) 
        : entity.color_palette,
      icon_url: entity.icon_url,
      traits: typeof entity.traits === 'string' 
        ? (entity.traits as string).split(',') 
        : entity.traits,
      description: entity.description,
      strengths: typeof entity.strengths === 'string' 
        ? (entity.strengths as string).split(',') 
        : entity.strengths,
      weaknesses: typeof entity.weaknesses === 'string' 
        ? (entity.weaknesses as string).split(',') 
        : entity.weaknesses,
      compatibility_matrix: typeof entity.compatibility_matrix === 'string' 
        ? JSON.parse(entity.compatibility_matrix) 
        : entity.compatibility_matrix,
      priority_order: entity.priority_order,
      is_active: entity.is_active,
    };
  }
}
