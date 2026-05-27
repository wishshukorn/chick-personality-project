/**
 * Configuration Service
 * Business logic for configuration operations
 */

import { ConfigurationRepository } from './ConfigurationRepository';
import {
  Configuration,
  CreateConfigurationDTO,
  UpdateConfigurationDTO,
  ConfigurationResponseDTO,
  PublicConfigurationDTO,
} from '../../shared/types/entities';
import { IService } from '../../shared/interfaces/IService';
import { NotFoundError } from '../../shared/types/errors';

export class ConfigurationService implements IService<ConfigurationResponseDTO, CreateConfigurationDTO, UpdateConfigurationDTO> {
  constructor(private repository: ConfigurationRepository) {}

  async getMany(
    filter?: Record<string, any>,
    pagination?: { page?: number; page_size?: number }
  ): Promise<ConfigurationResponseDTO[]> {
    const configs = await this.repository.findMany();
    return configs.map(c => this.repository.toResponseDTO(c));
  }

  async getManyPaginated(
    filter?: Record<string, any>,
    pagination?: { page?: number; page_size?: number }
  ): Promise<{ data: ConfigurationResponseDTO[]; pagination: { page: number; page_size: number; total: number } }> {
    const page = pagination?.page || 1;
    const pageSize = pagination?.page_size || 10;
    
    const result = await this.repository.findManyPaginated(filter, pagination);
    
    return {
      data: result.data.map(c => this.repository.toResponseDTO(c)),
      pagination: result.pagination,
    };
  }

  async getAll(): Promise<ConfigurationResponseDTO[]> {
    const configs = await this.repository.findMany();
    return configs.map(c => this.repository.toResponseDTO(c));
  }

  async getById(id: string): Promise<ConfigurationResponseDTO | null> {
    const config = await this.repository.findById(id);
    if (!config) {
      return null;
    }
    return this.repository.toResponseDTO(config);
  }

  async getByKey(configKey: string): Promise<ConfigurationResponseDTO | null> {
    const config = await this.repository.findByKey(configKey);
    if (!config) {
      return null;
    }
    return this.repository.toResponseDTO(config);
  }

  async getPublicConfig(): Promise<Record<string, string>> {
    const configs = await this.repository.getPublicConfigurations();
    const publicConfig: Record<string, string> = {};
    
    for (const config of configs) {
      publicConfig[config.config_key] = config.config_value;
    }
    
    return publicConfig;
  }

  async create(dto: CreateConfigurationDTO): Promise<ConfigurationResponseDTO> {
    const config = await this.repository.create(dto);
    return this.repository.toResponseDTO(config);
  }

  async update(id: string, dto: UpdateConfigurationDTO): Promise<ConfigurationResponseDTO> {
    const config = await this.repository.update(id, dto);
    return this.repository.toResponseDTO(config);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
