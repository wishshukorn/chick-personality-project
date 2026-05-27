/**
 * Personality Type Service
 * Business logic for personality type operations
 */

import { PersonalityTypeRepository } from './PersonalityTypeRepository';
import {
  PersonalityType,
  CreatePersonalityTypeDTO,
  UpdatePersonalityTypeDTO,
  PersonalityTypeResponseDTO,
  PersonalityTypeSlug,
} from '../../shared/types/entities';
import { IService } from '../../shared/interfaces/IService';
import { NotFoundError } from '../../shared/types/errors';

export class PersonalityService implements IService<PersonalityTypeResponseDTO, CreatePersonalityTypeDTO, UpdatePersonalityTypeDTO> {
  constructor(private repository: PersonalityTypeRepository) {}

  async getMany(
    filter?: Record<string, any>,
    pagination?: { page?: number; page_size?: number }
  ): Promise<PersonalityTypeResponseDTO[]> {
    const personalities = await this.repository.findAll();
    return personalities.map(p => this.repository.toResponseDTO(p));
  }

  async getManyPaginated(
    filter?: Record<string, any>,
    pagination?: { page?: number; page_size?: number }
  ): Promise<{ data: PersonalityTypeResponseDTO[]; pagination: { page: number; page_size: number; total: number } }> {
    const page = pagination?.page || 1;
    const pageSize = pagination?.page_size || 10;
    
    const personalities = await this.repository.findAll();
    const total = personalities.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginated = personalities.slice(start, end);
    
    return {
      data: paginated.map(p => this.repository.toResponseDTO(p)),
      pagination: { page, page_size: pageSize, total },
    };
  }

  async getAll(): Promise<PersonalityTypeResponseDTO[]> {
    const personalities = await this.repository.findAll();
    return personalities.map(p => this.repository.toResponseDTO(p));
  }

  async getById(id: string): Promise<PersonalityTypeResponseDTO | null> {
    const personality = await this.repository.findById(id);
    if (!personality) {
      return null;
    }
    return this.repository.toResponseDTO(personality);
  }

  async getBySlug(slug: PersonalityTypeSlug): Promise<PersonalityTypeResponseDTO> {
    const personality = await this.repository.findBySlug(slug);
    if (!personality) {
      throw new NotFoundError('Personality type', slug);
    }
    return this.repository.toResponseDTO(personality);
  }

  async create(dto: CreatePersonalityTypeDTO): Promise<PersonalityTypeResponseDTO> {
    const personality = await this.repository.create(dto);
    return this.repository.toResponseDTO(personality);
  }

  async update(id: string, dto: UpdatePersonalityTypeDTO): Promise<PersonalityTypeResponseDTO> {
    const personality = await this.repository.update(id, dto);
    return this.repository.toResponseDTO(personality);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async getCompatibilityMatrix(slug: PersonalityTypeSlug): Promise<any> {
    const personality = await this.repository.findBySlug(slug);
    if (!personality) {
      throw new NotFoundError('Personality type', slug);
    }
    
    const colorPalette = typeof personality.color_palette === 'string' 
      ? JSON.parse(personality.color_palette) 
      : personality.color_palette;
    const compatibilityMatrix = typeof personality.compatibility_matrix === 'string' 
      ? JSON.parse(personality.compatibility_matrix) 
      : personality.compatibility_matrix;
    
    return {
      personality: {
        id: personality.id,
        name: personality.name,
        slug: personality.slug,
        theme: personality.theme,
        color_palette: colorPalette,
      },
      compatibility_matrix: compatibilityMatrix,
    };
  }
}
