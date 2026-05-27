/**
 * Analytics Service
 * Business logic for analytics event operations
 */

import { AnalyticsEventRepository } from './AnalyticsEventRepository';
import {
  CreateAnalyticsEventDTO,
  AnalyticsEventResponseDTO,
  AnalyticsAggregationDTO,
  EventType,
  PersonalityTypeSlug,
  DeviceType,
} from '../../shared/types/entities';

export class AnalyticsService {
  constructor(private repository: AnalyticsEventRepository) {}

  async trackEvent(dto: CreateAnalyticsEventDTO): Promise<AnalyticsEventResponseDTO> {
    const event = await this.repository.create(dto);
    return this.repository.toResponseDTO(event);
  }

  async trackPageView(
    personalityTypeSlug?: PersonalityTypeSlug,
    deviceType?: DeviceType,
    sessionId?: string,
    ipAddressHash?: string
  ): Promise<AnalyticsEventResponseDTO> {
    const dto: CreateAnalyticsEventDTO = {
      event_type: EventType.PAGE_VIEW,
      personality_type_slug: personalityTypeSlug,
      device_type: deviceType,
      session_id: sessionId,
      ip_address_hash: ipAddressHash,
    };
    return await this.trackEvent(dto);
  }

  async trackTestStarted(
    personalityTypeSlug?: PersonalityTypeSlug,
    deviceType?: DeviceType,
    sessionId?: string,
    ipAddressHash?: string
  ): Promise<AnalyticsEventResponseDTO> {
    const dto: CreateAnalyticsEventDTO = {
      event_type: EventType.TEST_STARTED,
      personality_type_slug: personalityTypeSlug,
      device_type: deviceType,
      session_id: sessionId,
      ip_address_hash: ipAddressHash,
    };
    return await this.trackEvent(dto);
  }

  async trackTestCompleted(
    personalityTypeSlug: PersonalityTypeSlug,
    deviceType?: DeviceType,
    sessionId?: string,
    ipAddressHash?: string,
    eventData?: Record<string, any>
  ): Promise<AnalyticsEventResponseDTO> {
    const dto: CreateAnalyticsEventDTO = {
      event_type: EventType.TEST_COMPLETED,
      event_data: eventData,
      personality_type_slug: personalityTypeSlug,
      device_type: deviceType,
      session_id: sessionId,
      ip_address_hash: ipAddressHash,
    };
    return await this.trackEvent(dto);
  }

  async trackShareClicked(
    personalityTypeSlug: PersonalityTypeSlug,
    deviceType?: DeviceType,
    sessionId?: string,
    ipAddressHash?: string,
    eventData?: Record<string, any>
  ): Promise<AnalyticsEventResponseDTO> {
    const dto: CreateAnalyticsEventDTO = {
      event_type: EventType.SHARE_CLICKED,
      event_data: eventData,
      personality_type_slug: personalityTypeSlug,
      device_type: deviceType,
      session_id: sessionId,
      ip_address_hash: ipAddressHash,
    };
    return await this.trackEvent(dto);
  }

  async getAggregatedData(
    startDate: Date,
    endDate: Date
  ): Promise<AnalyticsAggregationDTO[]> {
    return await this.repository.aggregateByEventType(startDate, endDate);
  }

  async getEventsByType(
    eventType: EventType,
    limit: number = 100
  ): Promise<AnalyticsEventResponseDTO[]> {
    const events = await this.repository.findByEventType(eventType, limit);
    return events.map(e => this.repository.toResponseDTO(e));
  }

  async getEventsBySession(sessionId: string, limit: number = 100): Promise<AnalyticsEventResponseDTO[]> {
    const events = await this.repository.findBySessionId(sessionId, limit);
    return events.map(e => this.repository.toResponseDTO(e));
  }

  async deleteOldEvents(daysOld: number = 365): Promise<number> {
    return await this.repository.deleteOldEvents(daysOld);
  }

  async getEventCount(eventType?: EventType): Promise<number> {
    if (eventType) {
      return await this.repository.countByEventType(eventType);
    }
    return await this.repository.count();
  }
}
