/**
 * Seed Data for Personality Types
 * Based on Project Spec Description (Step 1)
 */

import { v4 as uuidv4 } from 'uuid';
import { PersonalityTypeSlug } from '../../shared/types/entities';

export const personalityTypesSeedData = [
  {
    id: uuidv4(),
    name: 'The Bold Explorer',
    slug: PersonalityTypeSlug.BOLD_EXPLORER,
    theme: 'Adventure, curiosity, spontaneity',
    color_palette: {
      primary: '#FF6B35',
      secondary: '#F7C59F',
      accent: '#FF9F1C',
      background: '#FFF8F0',
      text: '#2D2D2D'
    },
    icon_url: null,
    traits: ['Energetic', 'Optimistic', 'Risk-taker', 'Adaptable'],
    description: 'The Bold Explorer thrives on adventure and new experiences. You approach life with enthusiasm and are always ready to try something new. Your optimism is contagious, and you inspire others to step out of their comfort zones.',
    strengths: [
      'Embraces change easily',
      'Inspires others with enthusiasm',
      'Quick learner in new situations',
      'Adaptable to various environments'
    ],
    weaknesses: [
      'Can be impulsive without considering consequences',
      'May struggle with routine and repetitive tasks',
      'Easily bored without constant stimulation',
      'Sometimes overlooks important details'
    ],
    compatibility_matrix: {
      'wise-guardian': { score: 70, description: 'Complementary balance of adventure and caution' },
      'creative-spark': { score: 95, description: 'Shared love for innovation and new ideas' },
      'social-butterfly': { score: 85, description: 'Both enjoy social adventures and meeting new people' },
      'quiet-observer': { score: 60, description: 'Different energy levels but can learn from each other' },
      'natural-leader': { score: 80, description: 'Both action-oriented, though with different approaches' },
      'gentle-peacemaker': { score: 65, description: 'Can help ground each other\'s energies' }
    },
    priority_order: 1,
    is_active: true
  },
  {
    id: uuidv4(),
    name: 'The Wise Guardian',
    slug: PersonalityTypeSlug.WISE_GUARDIAN,
    theme: 'Wisdom, protection, stability',
    color_palette: {
      primary: '#4A90E2',
      secondary: '#B8D4F0',
      accent: '#5C9CE6',
      background: '#F0F7FF',
      text: '#2D2D2D'
    },
    icon_url: null,
    traits: ['Analytical', 'Dependable', 'Thoughtful', 'Patient'],
    description: 'The Wise Guardian brings stability and wisdom to every situation. You carefully analyze problems before acting, and your dependability makes you a trusted friend and colleague. Your patience allows you to see things others might miss.',
    strengths: [
      'Excellent problem-solver',
      'Reliable and trustworthy',
      'Strategic thinker with long-term vision',
      'Patient under pressure'
    ],
    weaknesses: [
      'Can be overly cautious',
      'May resist necessary changes',
      'Perfectionist tendencies can slow progress',
      'Sometimes overthinks simple decisions'
    ],
    compatibility_matrix: {
      'bold-explorer': { score: 70, description: 'Complementary balance of caution and adventure' },
      'creative-spark': { score: 75, description: 'Wisdom guides creativity effectively' },
      'social-butterfly': { score: 80, description: 'Provides stability to social dynamics' },
      'quiet-observer': { score: 90, description: 'Shared appreciation for depth and thought' },
      'natural-leader': { score: 85, description: 'Wisdom supports leadership well' },
      'gentle-peacemaker': { score: 95, description: 'Shared values of protection and care' }
    },
    priority_order: 2,
    is_active: true
  },
  {
    id: uuidv4(),
    name: 'The Creative Spark',
    slug: PersonalityTypeSlug.CREATIVE_SPARK,
    theme: 'Creativity, innovation, expression',
    color_palette: {
      primary: '#E91E63',
      secondary: '#F8BBD0',
      accent: '#FF4081',
      background: '#FFF0F5',
      text: '#2D2D2D'
    },
    icon_url: null,
    traits: ['Imaginative', 'Artistic', 'Original', 'Expressive'],
    description: 'The Creative Spark sees the world through a unique lens. Your imagination knows no bounds, and you express yourself in ways that inspire others. You bring originality to everything you do and aren\'t afraid to think outside the box.',
    strengths: [
      'Unique perspective on problems',
      'Inspires creativity in others',
      'Adaptable and flexible thinker',
      'Expressive communicator'
    ],
    weaknesses: [
      'May struggle with structure and routine',
      'Sensitive to criticism of creative work',
      'Can be unpredictable in mood',
      'Sometimes impractical in execution'
    ],
    compatibility_matrix: {
      'bold-explorer': { score: 95, description: 'Shared love for innovation and new ideas' },
      'wise-guardian': { score: 75, description: 'Wisdom helps ground creative ideas' },
      'social-butterfly': { score: 85, description: 'Both expressive and enjoy sharing ideas' },
      'quiet-observer': { score: 70, description: 'Depth of thought enhances creativity' },
      'natural-leader': { score: 65, description: 'Creative vision complements leadership' },
      'gentle-peacemaker': { score: 80, description: 'Creativity brings harmony to relationships' }
    },
    priority_order: 3,
    is_active: true
  },
  {
    id: uuidv4(),
    name: 'The Social Butterfly',
    slug: PersonalityTypeSlug.SOCIAL_BUTTERFLY,
    theme: 'Connection, communication, harmony',
    color_palette: {
      primary: '#4CAF50',
      secondary: '#C8E6C9',
      accent: '#66BB6A',
      background: '#F1F8E9',
      text: '#2D2D2D'
    },
    icon_url: null,
    traits: ['Outgoing', 'Empathetic', 'Collaborative', 'Charismatic'],
    description: 'The Social Butterfly thrives on connection and communication. You build relationships effortlessly and bring people together. Your empathy allows you to understand others deeply, and your charisma makes you a natural networker.',
    strengths: [
      'Builds strong relationships easily',
      'Great communicator and listener',
      'Excellent team player',
      'Creates harmony in groups'
    ],
    weaknesses: [
      'May avoid conflict at all costs',
      'Can be influenced by others\' opinions',
      'Needs validation from others',
      'Sometimes neglects own needs for others'
    ],
    compatibility_matrix: {
      'bold-explorer': { score: 85, description: 'Both enjoy social adventures and meeting people' },
      'wise-guardian': { score: 80, description: 'Stability supports social connections' },
      'creative-spark': { score: 85, description: 'Both expressive and enjoy sharing ideas' },
      'quiet-observer': { score: 55, description: 'Different social energy levels' },
      'natural-leader': { score: 90, description: 'Social skills enhance leadership ability' },
      'gentle-peacemaker': { score: 95, description: 'Shared focus on harmony and relationships' }
    },
    priority_order: 4,
    is_active: true
  },
  {
    id: uuidv4(),
    name: 'The Quiet Observer',
    slug: PersonalityTypeSlug.QUIET_OBSERVER,
    theme: 'Introspection, depth, insight',
    color_palette: {
      primary: '#3F51B5',
      secondary: '#C5CAE9',
      accent: '#5C6BC0',
      background: '#E8EAF6',
      text: '#2D2D2D'
    },
    icon_url: null,
    traits: ['Introspective', 'Perceptive', 'Independent', 'Thoughtful'],
    description: 'The Quiet Observer possesses deep insight and wisdom gained through careful observation. You understand the world in profound ways and often notice what others miss. Your independence allows you to think deeply without external influence.',
    strengths: [
      'Deep thinker with valuable insights',
      'Highly self-aware and reflective',
      'Focused and attentive to details',
      'Independent thinker'
    ],
    weaknesses: [
      'May seem distant or unapproachable',
      'Struggles with small talk and casual conversation',
      'Can overthink situations',
      'Sometimes isolates from others'
    ],
    compatibility_matrix: {
      'bold-explorer': { score: 60, description: 'Different energy levels but can learn from each other' },
      'wise-guardian': { score: 90, description: 'Shared appreciation for depth and thought' },
      'creative-spark': { score: 70, description: 'Depth of thought enhances creativity' },
      'social-butterfly': { score: 55, description: 'Different social energy levels' },
      'natural-leader': { score: 65, description: 'Insight can support leadership decisions' },
      'gentle-peacemaker': { score: 85, description: 'Both value depth and understanding' }
    },
    priority_order: 5,
    is_active: true
  },
  {
    id: uuidv4(),
    name: 'The Natural Leader',
    slug: PersonalityTypeSlug.NATURAL_LEADER,
    theme: 'Leadership, confidence, determination',
    color_palette: {
      primary: '#F44336',
      secondary: '#FFCDD2',
      accent: '#EF5350',
      background: '#FFEBEE',
      text: '#2D2D2D'
    },
    icon_url: null,
    traits: ['Confident', 'Decisive', 'Ambitious', 'Responsible'],
    description: 'The Natural Leader takes charge and motivates others to achieve their best. Your confidence inspires trust, and your decisiveness helps teams move forward. You set ambitious goals and have the determination to achieve them.',
    strengths: [
      'Takes charge in challenging situations',
      'Motivates and inspires others',
      'Goal-oriented and driven',
      'Resilient in the face of setbacks'
    ],
    weaknesses: [
      'Can be controlling or domineering',
      'May struggle to delegate tasks',
      'Impatient with slow progress',
      'Sometimes overlooks others\' input'
    ],
    compatibility_matrix: {
      'bold-explorer': { score: 80, description: 'Both action-oriented with different approaches' },
      'wise-guardian': { score: 85, description: 'Wisdom supports leadership well' },
      'creative-spark': { score: 65, description: 'Creative vision complements leadership' },
      'social-butterfly': { score: 90, description: 'Social skills enhance leadership ability' },
      'quiet-observer': { score: 65, description: 'Insight can support leadership decisions' },
      'gentle-peacemaker': { score: 70, description: 'Balance of strength and compassion' }
    },
    priority_order: 6,
    is_active: true
  },
  {
    id: uuidv4(),
    name: 'The Gentle Peacemaker',
    slug: PersonalityTypeSlug.GENTLE_PEACEMAKER,
    theme: 'Peace, harmony, compassion',
    color_palette: {
      primary: '#9C27B0',
      secondary: '#E1BEE7',
      accent: '#AB47BC',
      background: '#F3E5F5',
      text: '#2D2D2D'
    },
    icon_url: null,
    traits: ['Compassionate', 'Patient', 'Supportive', 'Diplomatic'],
    description: 'The Gentle Peacemaker brings harmony and compassion to every interaction. You mediate conflicts naturally and support others without judgment. Your patience and diplomacy make you a valued friend and colleague.',
    strengths: [
      'Mediates conflicts effectively',
      'Supportive and caring friend',
      'Calm under pressure',
      'Diplomatic in difficult situations'
    ],
    weaknesses: [
      'May avoid necessary confrontation',
      'Can be indecisive when making tough calls',
      'Puts others\' needs before own',
      'Sometimes lets people take advantage'
    ],
    compatibility_matrix: {
      'bold-explorer': { score: 65, description: 'Can help ground each other\'s energies' },
      'wise-guardian': { score: 95, description: 'Shared values of protection and care' },
      'creative-spark': { score: 80, description: 'Creativity brings harmony to relationships' },
      'social-butterfly': { score: 95, description: 'Shared focus on harmony and relationships' },
      'quiet-observer': { score: 85, description: 'Both value depth and understanding' },
      'natural-leader': { score: 70, description: 'Balance of strength and compassion' }
    },
    priority_order: 7,
    is_active: true
  }
];
