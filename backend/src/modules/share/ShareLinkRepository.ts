/**
 * Share Link Repository
 * Handles database operations for share links
 */

import { IDatabase } from '../../shared/interfaces/IDatabase';
import { IRepository } from '../../shared/interfaces/IRepository';
import {
  ShareLink,
  CreateShareLinkDTO,
  ShareLinkResponseDTO,
} from '../../shared/types/entities';

export class ShareLinkRepository implements IRepository<ShareLink, CreateShareLinkDTO, any> {
  constructor(private db: IDatabase) {}

  async findById(id: string): Promise<ShareLink | null> {
    const query = `
      SELECT * FROM share_links
      WHERE id = $1
    `;
    const result = await this.db.query<any>(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  async findByShareToken(shareToken: string): Promise<ShareLink | null> {
    const query = `
      SELECT * FROM share_links
      WHERE share_token = $1 AND expires_at > NOW()
    `;
    const result = await this.db.query<any>(query, [shareToken]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  async findByTestResultId(testResultId: string): Promise<ShareLink | null> {
    const query = `
      SELECT * FROM share_links
      WHERE test_result_id = $1
    `;
    const result = await this.db.query<any>(query, [testResultId]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  async create(dto: CreateShareLinkDTO): Promise<ShareLink> {
    const query = `
      INSERT INTO share_links (id, test_result_id, share_url, share_token, expires_at)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const { v4: uuidv4 } = require('uuid');
    const id = uuidv4();
    
    const values = [
      id,
      dto.test_result_id,
      dto.share_url,
      dto.share_token,
      dto.expires_at,
    ];

    const result = await this.db.query<any>(query, values);
    return result.rows[0];
  }

  async incrementClickCount(shareToken: string): Promise<ShareLink | null> {
    const query = `
      UPDATE share_links
      SET click_count = click_count + 1,
          last_clicked_at = NOW()
      WHERE share_token = $1 AND expires_at > NOW()
      RETURNING *
    `;
    const result = await this.db.query<any>(query, [shareToken]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  async findMany(
    filter?: Record<string, any>,
    pagination?: { page?: number; page_size?: number }
  ): Promise<ShareLink[]> {
    const query = `SELECT * FROM share_links ORDER BY created_at DESC LIMIT 100`;
    const result = await this.db.query<any>(query, []);
    return result.rows;
  }

  async findManyPaginated(
    filter?: Record<string, any>,
    pagination?: { page?: number; page_size?: number }
  ): Promise<{ data: ShareLink[]; pagination: { page: number; page_size: number; total: number } }> {
    const page = pagination?.page || 1;
    const pageSize = pagination?.page_size || 10;
    const offset = (page - 1) * pageSize;

    const countQuery = `SELECT COUNT(*) as count FROM share_links`;
    const countResult = await this.db.query<any>(countQuery, []);
    const total = parseInt(countResult.rows[0].count, 10);

    const query = `
      SELECT * FROM share_links
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;
    const result = await this.db.query<any>(query, [pageSize, offset]);

    return {
      data: result.rows,
      pagination: { page, page_size: pageSize, total },
    };
  }

  async update(id: string, dto: any): Promise<ShareLink> {
    throw new Error('Update not implemented for ShareLink');
  }

  async delete(id: string): Promise<void> {
    const query = `DELETE FROM share_links WHERE id = $1`;
    await this.db.query<any>(query, [id]);
  }

  async deleteExpired(): Promise<number> {
    const query = `
      DELETE FROM share_links
      WHERE expires_at < NOW()
      RETURNING id
    `;
    const result = await this.db.query<any>(query, []);
    return result.rowCount || 0;
  }

  async count(filter?: Record<string, any>): Promise<number> {
    const query = `SELECT COUNT(*) as count FROM share_links`;
    const result = await this.db.query<any>(query, []);
    return parseInt(result.rows[0].count, 10);
  }

  async exists(id: string): Promise<boolean> {
    const query = `SELECT EXISTS(SELECT 1 FROM share_links WHERE id = $1)`;
    const result = await this.db.query<any>(query, [id]);
    return result.rows[0].exists;
  }

  async countExpired(): Promise<number> {
    const query = `
      SELECT COUNT(*) as count FROM share_links
      WHERE expires_at < NOW()
    `;
    const result = await this.db.query<any>(query, []);
    return parseInt(result.rows[0].count, 10);
  }

  toResponseDTO(entity: ShareLink): ShareLinkResponseDTO {
    return {
      id: entity.id,
      share_url: entity.share_url,
      share_token: entity.share_token,
      click_count: entity.click_count,
      last_clicked_at: entity.last_clicked_at,
      expires_at: entity.expires_at,
      created_at: entity.created_at,
    };
  }
}
