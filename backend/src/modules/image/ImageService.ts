/**
 * Image Service
 * Business logic for generating shareable image cards
 */

import sharp from 'sharp';
import { IStorage } from '../../infrastructure/storage/S3Storage';
import { TestResultRepository } from '../result/TestResultRepository';
import { PersonalityTypeRepository } from '../personality/PersonalityTypeRepository';
import { NotFoundError } from '../../shared/types/errors';

export class ImageService {
  constructor(
    private storage: IStorage,
    private testResultRepository: TestResultRepository,
    private personalityTypeRepository: PersonalityTypeRepository
  ) {}

  async generateShareCard(shareToken: string): Promise<{ image_url: string; generated_at: Date; expires_at: Date }> {
    // Get test result by share token
    const testResult = await this.testResultRepository.findByShareToken(shareToken);
    if (!testResult) {
      throw new NotFoundError('Test result', shareToken);
    }

    // Get personality type
    const personalityType = await this.personalityTypeRepository.findById(testResult.primary_personality_id);
    if (!personalityType) {
      throw new NotFoundError('Personality type', testResult.primary_personality_id);
    }

    // Generate image
    const imageBuffer = await this.createPersonalityCard(personalityType, testResult);

    // Upload to S3
    const key = this.storage.generateKey('share-cards', 'png');
    const imageUrl = await this.storage.uploadFile(key, imageBuffer, 'image/png');

    // Calculate expiry (30 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    return {
      image_url: imageUrl,
      generated_at: new Date(),
      expires_at: expiresAt,
    };
  }

  private async createPersonalityCard(personalityType: any, testResult: any): Promise<Buffer> {
    const width = 1200;
    const height = 630;
    const backgroundColor = personalityType.color_palette.primary || '#FF6B35';
    const secondaryColor = personalityType.color_palette.secondary || '#F7931E';

    // Create a gradient background
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${backgroundColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${secondaryColor};stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#gradient)" />
        <text x="50%" y="40%" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle">
          ${personalityType.name}
        </text>
        <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle">
          ${personalityType.theme}
        </text>
        <text x="50%" y="75%" font-family="Arial, sans-serif" font-size="20" fill="white" text-anchor="middle">
          Take the test at chickpersonality.com
        </text>
      </svg>
    `;

    const svgBuffer = Buffer.from(svg);

    return await sharp(svgBuffer)
      .png()
      .toBuffer();
  }
}
