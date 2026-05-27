/**
 * Share Service
 * Business logic for share link operations
 */

import { ShareLinkRepository } from './ShareLinkRepository';
import { TestResultRepository } from '../result/TestResultRepository';
import {
  CreateShareLinkDTO,
  ShareLinkResponseDTO,
} from '../../shared/types/entities';
import { NotFoundError } from '../../shared/types/errors';

export class ShareService {
  constructor(
    private shareLinkRepository: ShareLinkRepository,
    private testResultRepository: TestResultRepository,
  ) {}

  async createShareLink(testResultId: string, baseUrl: string): Promise<ShareLinkResponseDTO> {
    // Verify test result exists
    const testResult = await this.testResultRepository.findById(testResultId);
    if (!testResult) {
      throw new NotFoundError('Test result', testResultId);
    }

    // Check if share link already exists
    const existingLink = await this.shareLinkRepository.findByTestResultId(testResultId);
    if (existingLink) {
      // Update expiration if expired
      if (existingLink.expires_at < new Date()) {
        const crypto = require('crypto');
        const newShareToken = crypto.randomBytes(16).toString('hex');
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30); // 30 days expiration

        const updateDTO: CreateShareLinkDTO = {
          test_result_id: testResultId,
          share_url: `${baseUrl}/results/${newShareToken}`,
          share_token: newShareToken,
          expires_at: expiresAt,
        };

        const updatedLink = await this.shareLinkRepository.create(updateDTO);
        return this.shareLinkRepository.toResponseDTO(updatedLink);
      }

      return this.shareLinkRepository.toResponseDTO(existingLink);
    }

    // Create new share link
    const crypto = require('crypto');
    const shareToken = crypto.randomBytes(16).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days expiration

    const createDTO: CreateShareLinkDTO = {
      test_result_id: testResultId,
      share_url: `${baseUrl}/results/${shareToken}`,
      share_token: shareToken,
      expires_at: expiresAt,
    };

    const shareLink = await this.shareLinkRepository.create(createDTO);
    return this.shareLinkRepository.toResponseDTO(shareLink);
  }

  async incrementClickCount(shareToken: string): Promise<void> {
    await this.shareLinkRepository.incrementClickCount(shareToken);
  }

  async getShareLink(shareToken: string): Promise<ShareLinkResponseDTO | null> {
    const shareLink = await this.shareLinkRepository.findByShareToken(shareToken);
    if (!shareLink) {
      return null;
    }
    return this.shareLinkRepository.toResponseDTO(shareLink);
  }

  async deleteExpiredLinks(): Promise<number> {
    return await this.shareLinkRepository.deleteExpired();
  }
}
