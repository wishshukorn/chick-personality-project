/**
 * AWS S3 Storage Service
 * Handles file storage operations using AWS S3
 */

import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

export interface IStorage {
  uploadFile(key: string, buffer: Buffer, contentType: string): Promise<string>;
  deleteFile(key: string): Promise<void>;
  getFileUrl(key: string, expiresIn?: number): Promise<string>;
  fileExists(key: string): Promise<boolean>;
}

export class S3Storage implements IStorage {
  private s3: AWS.S3;
  private bucketName: string;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION || 'us-east-1',
    });
    this.bucketName = process.env.AWS_S3_BUCKET_NAME || 'chickpersonality-share-cards';
  }

  async uploadFile(key: string, buffer: Buffer, contentType: string): Promise<string> {
    const params: AWS.S3.PutObjectRequest = {
      Bucket: this.bucketName,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      ACL: 'public-read',
    };

    try {
      await this.s3.upload(params).promise();
      return this.getFileUrl(key);
    } catch (error) {
      throw new Error(`Failed to upload file to S3: ${error}`);
    }
  }

  async deleteFile(key: string): Promise<void> {
    const params: AWS.S3.DeleteObjectRequest = {
      Bucket: this.bucketName,
      Key: key,
    };

    try {
      await this.s3.deleteObject(params).promise();
    } catch (error) {
      throw new Error(`Failed to delete file from S3: ${error}`);
    }
  }

  async getFileUrl(key: string, expiresIn: number = 3600): Promise<string> {
    const params: AWS.S3.GetSignedUrlRequest = {
      Bucket: this.bucketName,
      Key: key,
      Expires: expiresIn,
    };

    try {
      return this.s3.getSignedUrlPromise('getObject', params);
    } catch (error) {
      // If signed URL fails, return public URL
      return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
    }
  }

  async fileExists(key: string): Promise<boolean> {
    const params: AWS.S3.HeadObjectRequest = {
      Bucket: this.bucketName,
      Key: key,
    };

    try {
      await this.s3.headObject(params).promise();
      return true;
    } catch (error) {
      return false;
    }
  }

  generateKey(prefix: string, extension: string): string {
    const uuid = uuidv4();
    return `${prefix}/${uuid}.${extension}`;
  }
}
