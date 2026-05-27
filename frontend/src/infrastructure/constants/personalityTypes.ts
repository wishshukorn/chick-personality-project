import { PersonalityType, PersonalityTypeSlug, ColorPalette, CompatibilityMatrix } from '../../shared/types';

export const PERSONALITY_TYPES: PersonalityType[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'The Bold Explorer',
    slug: PersonalityTypeSlug.BOLD_EXPLORER,
    theme: 'Adventure, curiosity, spontaneity',
    color_palette: {
      primary: '#FF6B35',
      secondary: '#F7931E',
      accent: '#FFD23F',
      background: '#FFF8F0',
      text: '#2D2D2D',
    },
    icon_url: null,
    traits: ['Energetic', 'Optimistic', 'Risk-taker', 'Adaptable'],
    description: 'The Bold Explorer thrives on adventure and new experiences. Always curious and ready to take risks, this personality type embraces change with enthusiasm and inspires others to step out of their comfort zones.',
    strengths: [
      'Embraces change and uncertainty',
      'Inspires others with enthusiasm',
      'Quick learner and adaptable',
      'Brings energy to any situation'
    ],
    weaknesses: [
      'Can be impulsive and hasty',
      'May struggle with routine and structure',
      'Easily bored without novelty',
      'Sometimes overlooks details'
    ],
    compatibility_matrix: {
      'bold-explorer': { score: 100, description: 'Perfect match - shared love of adventure' },
      'wise-guardian': { score: 60, description: 'Balancing dynamic - explorer needs grounding' },
      'creative-spark': { score: 85, description: 'Great creative synergy' },
      'social-butterfly': { score: 90, description: 'Excellent social chemistry' },
      'quiet-observer': { score: 50, description: 'Challenging but complementary' },
      'natural-leader': { score: 75, description: 'Strong partnership potential' },
      'gentle-peacemaker': { score: 55, description: 'Needs patience and understanding' }
    },
    priority_order: 1,
    is_active: true,
  },
  {
    id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    name: 'The Wise Guardian',
    slug: PersonalityTypeSlug.WISE_GUARDIAN,
    theme: 'Wisdom, protection, stability',
    color_palette: {
      primary: '#4A90E2',
      secondary: '#5C6BC0',
      accent: '#7986CB',
      background: '#F0F4FF',
      text: '#1A237E',
    },
    icon_url: null,
    traits: ['Analytical', 'Dependable', 'Thoughtful', 'Patient'],
    description: 'The Wise Guardian is the steady rock others rely on. With a deep well of knowledge and a protective nature, this personality type excels at problem-solving and providing stability in uncertain times.',
    strengths: [
      'Excellent problem-solver',
      'Reliable and trustworthy',
      'Strategic thinker',
      'Patient and thorough'
    ],
    weaknesses: [
      'Can be overly cautious',
      'May resist necessary change',
      'Perfectionist tendencies',
      'Slow to adapt to new situations'
    ],
    compatibility_matrix: {
      'bold-explorer': { score: 60, description: 'Explorer brings excitement, Guardian provides stability' },
      'wise-guardian': { score: 100, description: 'Perfect match - shared values and approach' },
      'creative-spark': { score: 70, description: 'Guardian provides structure for creativity' },
      'social-butterfly': { score: 65, description: 'Complementary social dynamics' },
      'quiet-observer': { score: 90, description: 'Deep intellectual connection' },
      'natural-leader': { score: 80, description: 'Strong advisory partnership' },
      'gentle-peacemaker': { score: 85, description: 'Shared commitment to harmony' }
    },
    priority_order: 2,
    is_active: true,
  },
  {
    id: '7c8e9a0b-1d2e-3f4a-5b6c-7d8e9f0a1b2c',
    name: 'The Creative Spark',
    slug: PersonalityTypeSlug.CREATIVE_SPARK,
    theme: 'Creativity, innovation, expression',
    color_palette: {
      primary: '#E91E63',
      secondary: '#9C27B0',
      accent: '#FF4081',
      background: '#FFF0F8',
      text: '#4A148C',
    },
    icon_url: null,
    traits: ['Imaginative', 'Artistic', 'Original', 'Expressive'],
    description: 'The Creative Spark sees the world through a unique lens. Always brimming with ideas and artistic vision, this personality type brings innovation and beauty to everything they touch.',
    strengths: [
      'Unique perspective',
      'Inspires creativity in others',
      'Highly adaptable',
      'Original thinker'
    ],
    weaknesses: [
      'May struggle with structure',
      'Sensitive to criticism',
      'Can be unpredictable',
      'Difficulty with routine tasks'
    ],
    compatibility_matrix: {
      'bold-explorer': { score: 85, description: 'Shared love of novelty and exploration' },
      'wise-guardian': { score: 70, description: 'Guardian provides needed structure' },
      'creative-spark': { score: 100, description: 'Perfect match - creative synergy' },
      'social-butterfly': { score: 80, description: 'Great collaborative potential' },
      'quiet-observer': { score: 75, description: 'Deep creative understanding' },
      'natural-leader': { score: 65, description: 'Leader provides direction for creativity' },
      'gentle-peacemaker': { score: 70, description: 'Shared appreciation for harmony' }
    },
    priority_order: 3,
    is_active: true,
  },
  {
    id: '8d9f0b1c-2e3f-4a5b-6c7d-8e9f0a1b2c3d',
    name: 'The Social Butterfly',
    slug: PersonalityTypeSlug.SOCIAL_BUTTERFLY,
    theme: 'Connection, communication, harmony',
    color_palette: {
      primary: '#4CAF50',
      secondary: '#8BC34A',
      accent: '#CDDC39',
      background: '#F1F8E9',
      text: '#1B5E20',
    },
    icon_url: null,
    traits: ['Outgoing', 'Empathetic', 'Collaborative', 'Charismatic'],
    description: 'The Social Butterfly thrives on human connection. With natural charm and deep empathy, this personality type builds bridges between people and creates harmonious relationships wherever they go.',
    strengths: [
      'Builds strong relationships',
      'Great communicator',
      'Excellent team player',
      'Mediates conflicts effectively'
    ],
    weaknesses: [
      'May avoid necessary conflict',
      'Can be influenced by others',
      'Needs validation from others',
      'Difficulty being alone'
    ],
    compatibility_matrix: {
      'bold-explorer': { score: 90, description: 'Excellent social chemistry' },
      'wise-guardian': { score: 65, description: 'Complementary social dynamics' },
      'creative-spark': { score: 80, description: 'Great collaborative potential' },
      'social-butterfly': { score: 100, description: 'Perfect match - social harmony' },
      'quiet-observer': { score: 55, description: 'Challenging but can learn from each other' },
      'natural-leader': { score: 85, description: 'Strong social leadership partnership' },
      'gentle-peacemaker': { score: 95, description: 'Shared commitment to relationships' }
    },
    priority_order: 4,
    is_active: true,
  },
  {
    id: '9e0a1c2d-3f4a-5b6c-7d8e-9f0a1b2c3d4e',
    name: 'The Quiet Observer',
    slug: PersonalityTypeSlug.QUIET_OBSERVER,
    theme: 'Introspection, depth, insight',
    color_palette: {
      primary: '#3F51B5',
      secondary: '#303F9F',
      accent: '#5C6BC0',
      background: '#E8EAF6',
      text: '#1A237E',
    },
    icon_url: null,
    traits: ['Introspective', 'Perceptive', 'Independent', 'Thoughtful'],
    description: 'The Quiet Observer possesses deep wisdom and keen perception. While often reserved, this personality type notices what others miss and provides valuable insights through careful observation and reflection.',
    strengths: [
      'Deep thinker',
      'Self-aware',
      'Highly focused',
      'Excellent observer'
    ],
    weaknesses: [
      'May seem distant to others',
      'Struggles with small talk',
      'Tends to overthink',
      'Difficulty expressing thoughts'
    ],
    compatibility_matrix: {
      'bold-explorer': { score: 50, description: 'Challenging but complementary' },
      'wise-guardian': { score: 90, description: 'Deep intellectual connection' },
      'creative-spark': { score: 75, description: 'Deep creative understanding' },
      'social-butterfly': { score: 55, description: 'Can learn from each other' },
      'quiet-observer': { score: 100, description: 'Perfect match - shared depth' },
      'natural-leader': { score: 60, description: 'Observer provides valuable insights' },
      'gentle-peacemaker': { score: 80, description: 'Shared appreciation for peace' }
    },
    priority_order: 5,
    is_active: true,
  },
  {
    id: 'a0b1c2d3-e4f5-4a5b-6c7d-8e9f0a1b2c3d',
    name: 'The Natural Leader',
    slug: PersonalityTypeSlug.NATURAL_LEADER,
    theme: 'Leadership, confidence, determination',
    color_palette: {
      primary: '#F44336',
      secondary: '#E53935',
      accent: '#FF5252',
      background: '#FFEBEE',
      text: '#B71C1C',
    },
    icon_url: null,
    traits: ['Confident', 'Decisive', 'Ambitious', 'Responsible'],
    description: 'The Natural Leader commands respect and inspires action. With unwavering confidence and clear vision, this personality type takes charge in challenging situations and motivates others to achieve their best.',
    strengths: [
      'Takes charge effectively',
      'Motivates others',
      'Goal-oriented',
      'Resilient under pressure'
    ],
    weaknesses: [
      'Can be controlling',
      'May struggle with delegation',
      'Impatient with slow progress',
      'Difficulty accepting criticism'
    ],
    compatibility_matrix: {
      'bold-explorer': { score: 75, description: 'Strong partnership potential' },
      'wise-guardian': { score: 80, description: 'Strong advisory partnership' },
      'creative-spark': { score: 65, description: 'Leader provides direction for creativity' },
      'social-butterfly': { score: 85, description: 'Strong social leadership partnership' },
      'quiet-observer': { score: 60, description: 'Observer provides valuable insights' },
      'natural-leader': { score: 100, description: 'Perfect match - shared leadership' },
      'gentle-peacemaker': { score: 70, description: 'Leader needs peacemaker\'s balance' }
    },
    priority_order: 6,
    is_active: true,
  },
  {
    id: 'b1c2d3e4-f5a6-4a5b-6c7d-8e9f0a1b2c3d',
    name: 'The Gentle Peacemaker',
    slug: PersonalityTypeSlug.GENTLE_PEACEMAKER,
    theme: 'Peace, harmony, compassion',
    color_palette: {
      primary: '#9C27B0',
      secondary: '#7B1FA2',
      accent: '#AB47BC',
      background: '#F3E5F5',
      text: '#4A148C',
    },
    icon_url: null,
    traits: ['Compassionate', 'Patient', 'Supportive', 'Diplomatic'],
    description: 'The Gentle Peacemaker brings calm to chaos. With deep compassion and natural diplomacy, this personality type mediates conflicts, supports others, and creates harmony in every environment.',
    strengths: [
      'Mediates conflicts effectively',
      'Supportive friend',
      'Calm under pressure',
      'Diplomatic communicator'
    ],
    weaknesses: [
      'May avoid confrontation',
      'Can be indecisive',
      'Puts others first too often',
      'Difficulty asserting needs'
    ],
    compatibility_matrix: {
      'bold-explorer': { score: 55, description: 'Needs patience and understanding' },
      'wise-guardian': { score: 85, description: 'Shared commitment to harmony' },
      'creative-spark': { score: 70, description: 'Shared appreciation for harmony' },
      'social-butterfly': { score: 95, description: 'Shared commitment to relationships' },
      'quiet-observer': { score: 80, description: 'Shared appreciation for peace' },
      'natural-leader': { score: 70, description: 'Peacemaker balances leader\'s intensity' },
      'gentle-peacemaker': { score: 100, description: 'Perfect match - shared harmony' }
    },
    priority_order: 7,
    is_active: true,
  },
];

export const getPersonalityBySlug = (slug: PersonalityTypeSlug): PersonalityType => {
  return PERSONALITY_TYPES.find(pt => pt.slug === slug)!;
};

export const getPersonalityById = (id: string): PersonalityType => {
  return PERSONALITY_TYPES.find(pt => pt.id === id)!;
};
