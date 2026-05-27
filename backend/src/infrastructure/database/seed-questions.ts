/**
 * Seed Data for Questions and Answer Options
 * Based on Project Spec Description (Step 1)
 * 25 questions with scoring weights for 7 personality types
 */

import { v4 as uuidv4 } from 'uuid';
import { PersonalityTypeSlug } from '../../shared/types/entities';

export const questionsSeedData = [
  {
    id: uuidv4(),
    question_text: "You're at a party where you don't know many people. What do you do?",
    question_number: 1,
    category: 'social',
    is_active: true,
    answer_options: [
      {
        id: uuidv4(),
        option_text: "Introduce myself to as many people as possible",
        option_order: 1,
        scoring_weights: {
          'bold-explorer': 8,
          'wise-guardian': 3,
          'creative-spark': 6,
          'social-butterfly': 10,
          'quiet-observer': 1,
          'natural-leader': 7,
          'gentle-peacemaker': 5
        }
      },
      {
        id: uuidv4(),
        option_text: "Find a few interesting people and have deep conversations",
        option_order: 2,
        scoring_weights: {
          'bold-explorer': 5,
          'wise-guardian': 6,
          'creative-spark': 7,
          'social-butterfly': 6,
          'quiet-observer': 10,
          'natural-leader': 4,
          'gentle-peacemaker': 7
        }
      },
      {
        id: uuidv4(),
        option_text: "Observe the room and wait for someone to approach me",
        option_order: 3,
        scoring_weights: {
          'bold-explorer': 2,
          'wise-guardian': 7,
          'creative-spark': 4,
          'social-butterfly': 3,
          'quiet-observer': 9,
          'natural-leader': 3,
          'gentle-peacemaker': 8
        }
      },
      {
        id: uuidv4(),
        option_text: "Help the host make sure everyone feels welcome",
        option_order: 4,
        scoring_weights: {
          'bold-explorer': 4,
          'wise-guardian': 5,
          'creative-spark': 3,
          'social-butterfly': 7,
          'quiet-observer': 4,
          'natural-leader': 6,
          'gentle-peacemaker': 10
        }
      }
    ]
  },
  {
    id: uuidv4(),
    question_text: "Your team is facing a tight deadline. How do you respond?",
    question_number: 2,
    category: 'work',
    is_active: true,
    answer_options: [
      {
        id: uuidv4(),
        option_text: "Take charge and delegate tasks to get it done",
        option_order: 1,
        scoring_weights: {
          'bold-explorer': 7,
          'wise-guardian': 5,
          'creative-spark': 4,
          'social-butterfly': 6,
          'quiet-observer': 2,
          'natural-leader': 10,
          'gentle-peacemaker': 3
        }
      },
      {
        id: uuidv4(),
        option_text: "Analyze the situation and create a strategic plan",
        option_order: 2,
        scoring_weights: {
          'bold-explorer': 4,
          'wise-guardian': 10,
          'creative-spark': 5,
          'social-butterfly': 5,
          'quiet-observer': 8,
          'natural-leader': 7,
          'gentle-peacemaker': 6
        }
      },
      {
        id: uuidv4(),
        option_text: "Come up with innovative solutions to work faster",
        option_order: 3,
        scoring_weights: {
          'bold-explorer': 8,
          'wise-guardian': 4,
          'creative-spark': 10,
          'social-butterfly': 5,
          'quiet-observer': 5,
          'natural-leader': 6,
          'gentle-peacemaker': 4
        }
      },
      {
        id: uuidv4(),
        option_text: "Support my teammates and help reduce stress",
        option_order: 4,
        scoring_weights: {
          'bold-explorer': 3,
          'wise-guardian': 5,
          'creative-spark': 4,
          'social-butterfly': 8,
          'quiet-observer': 5,
          'natural-leader': 5,
          'gentle-peacemaker': 10
        }
      }
    ]
  },
  {
    id: uuidv4(),
    question_text: "You discover a new hobby that excites you. What's your first move?",
    question_number: 3,
    category: 'personal',
    is_active: true,
    answer_options: [
      {
        id: uuidv4(),
        option_text: "Dive right in and learn by doing",
        option_order: 1,
        scoring_weights: {
          'bold-explorer': 10,
          'wise-guardian': 3,
          'creative-spark': 8,
          'social-butterfly': 6,
          'quiet-observer': 4,
          'natural-leader': 7,
          'gentle-peacemaker': 4
        }
      },
      {
        id: uuidv4(),
        option_text: "Research thoroughly before starting",
        option_order: 2,
        scoring_weights: {
          'bold-explorer': 3,
          'wise-guardian': 10,
          'creative-spark': 5,
          'social-butterfly': 4,
          'quiet-observer': 9,
          'natural-leader': 6,
          'gentle-peacemaker': 5
        }
      },
      {
        id: uuidv4(),
        option_text: "Find a community to share it with",
        option_order: 3,
        scoring_weights: {
          'bold-explorer': 6,
          'wise-guardian': 4,
          'creative-spark': 7,
          'social-butterfly': 10,
          'quiet-observer': 3,
          'natural-leader': 5,
          'gentle-peacemaker': 8
        }
      },
      {
        id: uuidv4(),
        option_text: "Experiment and put my own spin on it",
        option_order: 4,
        scoring_weights: {
          'bold-explorer': 7,
          'wise-guardian': 4,
          'creative-spark': 10,
          'social-butterfly': 5,
          'quiet-observer': 6,
          'natural-leader': 5,
          'gentle-peacemaker': 5
        }
      }
    ]
  },
  {
    id: uuidv4(),
    question_text: "A friend comes to you with a problem. How do you help?",
    question_number: 4,
    category: 'relationships',
    is_active: true,
    answer_options: [
      {
        id: uuidv4(),
        option_text: "Listen empathetically and offer emotional support",
        option_order: 1,
        scoring_weights: {
          'bold-explorer': 5,
          'wise-guardian': 6,
          'creative-spark': 6,
          'social-butterfly': 9,
          'quiet-observer': 7,
          'natural-leader': 5,
          'gentle-peacemaker': 10
        }
      },
      {
        id: uuidv4(),
        option_text: "Analyze the situation and offer practical solutions",
        option_order: 2,
        scoring_weights: {
          'bold-explorer': 5,
          'wise-guardian': 10,
          'creative-spark': 6,
          'social-butterfly': 5,
          'quiet-observer': 8,
          'natural-leader': 7,
          'gentle-peacemaker': 6
        }
      },
      {
        id: uuidv4(),
        option_text: "Brainstorm creative approaches they might not have considered",
        option_order: 3,
        scoring_weights: {
          'bold-explorer': 7,
          'wise-guardian': 5,
          'creative-spark': 10,
          'social-butterfly': 6,
          'quiet-observer': 6,
          'natural-leader': 6,
          'gentle-peacemaker': 5
        }
      },
      {
        id: uuidv4(),
        option_text: "Encourage them to take action and be there for support",
        option_order: 4,
        scoring_weights: {
          'bold-explorer': 8,
          'wise-guardian': 5,
          'creative-spark': 5,
          'social-butterfly': 7,
          'quiet-observer': 4,
          'natural-leader': 9,
          'gentle-peacemaker': 7
        }
      }
    ]
  },
  {
    id: uuidv4(),
    question_text: "You're planning a vacation. What's your approach?",
    question_number: 5,
    category: 'lifestyle',
    is_active: true,
    answer_options: [
      {
        id: uuidv4(),
        option_text: "Pick a destination and go with the flow",
        option_order: 1,
        scoring_weights: {
          'bold-explorer': 10,
          'wise-guardian': 2,
          'creative-spark': 7,
          'social-butterfly': 7,
          'quiet-observer': 3,
          'natural-leader': 6,
          'gentle-peacemaker': 4
        }
      },
      {
        id: uuidv4(),
        option_text: "Research everything and create a detailed itinerary",
        option_order: 2,
        scoring_weights: {
          'bold-explorer': 2,
          'wise-guardian': 10,
          'creative-spark': 4,
          'social-butterfly': 4,
          'quiet-observer': 8,
          'natural-leader': 7,
          'gentle-peacemaker': 6
        }
      },
      {
        id: uuidv4(),
        option_text: "Find unique, off-the-beaten-path experiences",
        option_order: 3,
        scoring_weights: {
          'bold-explorer': 8,
          'wise-guardian': 4,
          'creative-spark': 10,
          'social-butterfly': 6,
          'quiet-observer': 6,
          'natural-leader': 5,
          'gentle-peacemaker': 4
        }
      },
      {
        id: uuidv4(),
        option_text: "Plan activities that everyone will enjoy",
        option_order: 4,
        scoring_weights: {
          'bold-explorer': 5,
          'wise-guardian': 6,
          'creative-spark': 5,
          'social-butterfly': 9,
          'quiet-observer': 4,
          'natural-leader': 6,
          'gentle-peacemaker': 10
        }
      }
    ]
  },
  {
    id: uuidv4(),
    question_text: "You disagree with someone's opinion in a group discussion. What do you do?",
    question_number: 6,
    category: 'social',
    is_active: true,
    answer_options: [
      {
        id: uuidv4(),
        option_text: "Speak up confidently and present my perspective",
        option_order: 1,
        scoring_weights: {
          'bold-explorer': 8,
          'wise-guardian': 5,
          'creative-spark': 6,
          'social-butterfly': 5,
          'quiet-observer': 3,
          'natural-leader': 10,
          'gentle-peacemaker': 3
        }
      },
      {
        id: uuidv4(),
        option_text: "Listen carefully and ask thoughtful questions",
        option_order: 2,
        scoring_weights: {
          'bold-explorer': 4,
          'wise-guardian': 8,
          'creative-spark': 6,
          'social-butterfly': 6,
          'quiet-observer': 10,
          'natural-leader': 6,
          'gentle-peacemaker': 8
        }
      },
      {
        id: uuidv4(),
        option_text: "Offer a creative alternative perspective",
        option_order: 3,
        scoring_weights: {
          'bold-explorer': 6,
          'wise-guardian': 5,
          'creative-spark': 10,
          'social-butterfly': 6,
          'quiet-observer': 6,
          'natural-leader': 5,
          'gentle-peacemaker': 6
        }
      },
      {
        id: uuidv4(),
        option_text: "Try to find common ground and maintain harmony",
        option_order: 4,
        scoring_weights: {
          'bold-explorer': 3,
          'wise-guardian': 6,
          'creative-spark': 4,
          'social-butterfly': 7,
          'quiet-observer': 5,
          'natural-leader': 4,
          'gentle-peacemaker': 10
        }
      }
    ]
  },
  {
    id: uuidv4(),
    question_text: "You're working on a creative project. What's your process?",
    question_number: 7,
    category: 'work',
    is_active: true,
    answer_options: [
      {
        id: uuidv4(),
        option_text: "Start immediately and iterate as I go",
        option_order: 1,
        scoring_weights: {
          'bold-explorer': 10,
          'wise-guardian': 3,
          'creative-spark': 8,
          'social-butterfly': 5,
          'quiet-observer': 4,
          'natural-leader': 6,
          'gentle-peacemaker': 4
        }
      },
      {
        id: uuidv4(),
        option_text: "Plan carefully before starting execution",
        option_order: 2,
        scoring_weights: {
          'bold-explorer': 3,
          'wise-guardian': 10,
          'creative-spark': 5,
          'social-butterfly': 4,
          'quiet-observer': 8,
          'natural-leader': 7,
          'gentle-peacemaker': 5
        }
      },
      {
        id: uuidv4(),
        option_text: "Brainstorm many ideas before narrowing down",
        option_order: 3,
        scoring_weights: {
          'bold-explorer': 6,
          'wise-guardian': 5,
          'creative-spark': 10,
          'social-butterfly': 6,
          'quiet-observer': 6,
          'natural-leader': 5,
          'gentle-peacemaker': 5
        }
      },
      {
        id: uuidv4(),
        option_text: "Collaborate with others to develop ideas",
        option_order: 4,
        scoring_weights: {
          'bold-explorer': 5,
          'wise-guardian': 5,
          'creative-spark': 7,
          'social-butterfly': 10,
          'quiet-observer': 4,
          'natural-leader': 6,
          'gentle-peacemaker': 8
        }
      }
    ]
  },
  {
    id: uuidv4(),
    question_text: "You face a major setback. How do you react?",
    question_number: 8,
    category: 'resilience',
    is_active: true,
    answer_options: [
      {
        id: uuidv4(),
        option_text: "Quickly pivot and try a new approach",
        option_order: 1,
        scoring_weights: {
          'bold-explorer': 10,
          'wise-guardian': 4,
          'creative-spark': 8,
          'social-butterfly': 5,
          'quiet-observer': 4,
          'natural-leader': 8,
          'gentle-peacemaker': 4
        }
      },
      {
        id: uuidv4(),
        option_text: "Analyze what went wrong to prevent recurrence",
        option_order: 2,
        scoring_weights: {
          'bold-explorer': 4,
          'wise-guardian': 10,
          'creative-spark': 6,
          'social-butterfly': 4,
          'quiet-observer': 9,
          'natural-leader': 7,
          'gentle-peacemaker': 5
        }
      },
      {
        id: uuidv4(),
        option_text: "Seek support from friends and family",
        option_order: 3,
        scoring_weights: {
          'bold-explorer': 5,
          'wise-guardian': 5,
          'creative-spark': 5,
          'social-butterfly': 10,
          'quiet-observer': 5,
          'natural-leader': 5,
          'gentle-peacemaker': 9
        }
      },
      {
        id: uuidv4(),
        option_text: "Stay calm and help others affected by the setback",
        option_order: 4,
        scoring_weights: {
          'bold-explorer': 4,
          'wise-guardian': 7,
          'creative-spark': 4,
          'social-butterfly': 6,
          'quiet-observer': 6,
          'natural-leader': 7,
          'gentle-peacemaker': 10
        }
      }
    ]
  },
  {
    id: uuidv4(),
    question_text: "You're learning something new. What's your preferred style?",
    question_number: 9,
    category: 'learning',
    is_active: true,
    answer_options: [
      {
        id: uuidv4(),
        option_text: "Jump in and learn by trial and error",
        option_order: 1,
        scoring_weights: {
          'bold-explorer': 10,
          'wise-guardian': 2,
          'creative-spark': 8,
          'social-butterfly': 5,
          'quiet-observer': 3,
          'natural-leader': 7,
          'gentle-peacemaker': 4
        }
      },
      {
        id: uuidv4(),
        option_text: "Study the theory thoroughly first",
        option_order: 2,
        scoring_weights: {
          'bold-explorer': 2,
          'wise-guardian': 10,
          'creative-spark': 4,
          'social-butterfly': 3,
          'quiet-observer': 10,
          'natural-leader': 6,
          'gentle-peacemaker': 5
        }
      },
      {
        id: uuidv4(),
        option_text: "Find creative ways to apply what I'm learning",
        option_order: 3,
        scoring_weights: {
          'bold-explorer': 7,
          'wise-guardian': 4,
          'creative-spark': 10,
          'social-butterfly': 5,
          'quiet-observer': 5,
          'natural-leader': 5,
          'gentle-peacemaker': 5
        }
      },
      {
        id: uuidv4(),
        option_text: "Learn with others in a group setting",
        option_order: 4,
        scoring_weights: {
          'bold-explorer': 6,
          'wise-guardian': 4,
          'creative-spark': 6,
          'social-butterfly': 10,
          'quiet-observer': 3,
          'natural-leader': 6,
          'gentle-peacemaker': 8
        }
      }
    ]
  },
  {
    id: uuidv4(),
    question_text: "You have free time. How do you prefer to spend it?",
    question_number: 10,
    category: 'lifestyle',
    is_active: true,
    answer_options: [
      {
        id: uuidv4(),
        option_text: "Try a new activity or go on an adventure",
        option_order: 1,
        scoring_weights: {
          'bold-explorer': 10,
          'wise-guardian': 3,
          'creative-spark': 8,
          'social-butterfly': 6,
          'quiet-observer': 3,
          'natural-leader': 7,
          'gentle-peacemaker': 4
        }
      },
      {
        id: uuidv4(),
        option_text: "Read, research, or work on a personal project",
        option_order: 2,
        scoring_weights: {
          'bold-explorer': 3,
          'wise-guardian': 8,
          'creative-spark': 7,
          'social-butterfly': 3,
          'quiet-observer': 10,
          'natural-leader': 6,
          'gentle-peacemaker': 5
        }
      },
      {
        id: uuidv4(),
        option_text: "Spend time with friends and family",
        option_order: 3,
        scoring_weights: {
          'bold-explorer': 5,
          'wise-guardian': 5,
          'creative-spark': 5,
          'social-butterfly': 10,
          'quiet-observer': 3,
          'natural-leader': 6,
          'gentle-peacemaker': 9
        }
      },
      {
        id: uuidv4(),
        option_text: "Engage in creative hobbies or artistic expression",
        option_order: 4,
        scoring_weights: {
          'bold-explorer': 6,
          'wise-guardian': 4,
          'creative-spark': 10,
          'social-butterfly': 5,
          'quiet-observer': 6,
          'natural-leader': 4,
          'gentle-peacemaker': 6
        }
      }
    ]
  },
  {
    id: uuidv4(),
    question_text: "You need to make an important decision. What's your approach?",
    question_number: 11,
    category: 'decision-making',
    is_active: true,
    answer_options: [
      {
        id: uuidv4(),
        option_text: "Trust my gut and decide quickly",
        option_order: 1,
        scoring_weights: {
          'bold-explorer': 10,
          'wise-guardian': 2,
          'creative-spark': 6,
          'social-butterfly': 5,
          'quiet-observer': 3,
          'natural-leader': 9,
          'gentle-peacemaker': 3
        }
      },
      {
        id: uuidv4(),
        option_text: "Gather all information and analyze carefully",
        option_order: 2,
        scoring_weights: {
          'bold-explorer': 2,
          'wise-guardian': 10,
          'creative-spark': 5,
          'social-butterfly': 4,
          'quiet-observer': 10,
          'natural-leader': 7,
          'gentle-peacemaker': 6
        }
      },
      {
        id: uuidv4(),
        option_text: "Consider creative alternatives and possibilities",
        option_order: 3,
        scoring_weights: {
          'bold-explorer': 6,
          'wise-guardian': 5,
          'creative-spark': 10,
          'social-butterfly': 5,
          'quiet-observer': 6,
          'natural-leader': 5,
          'gentle-peacemaker': 5
        }
      },
      {
        id: uuidv4(),
        option_text: "Consult others and consider their perspectives",
        option_order: 4,
        scoring_weights: {
          'bold-explorer': 4,
          'wise-guardian': 6,
          'creative-spark': 5,
          'social-butterfly': 9,
          'quiet-observer': 5,
          'natural-leader': 6,
          'gentle-peacemaker': 10
        }
      }
    ]
  },
  {
    id: uuidv4(),
    question_text: "You're in a leadership position. What's your style?",
    question_number: 12,
    category: 'leadership',
    is_active: true,
    answer_options: [
      {
        id: uuidv4(),
        option_text: "Lead by example and take charge",
        option_order: 1,
        scoring_weights: {
          'bold-explorer': 8,
          'wise-guardian': 5,
          'creative-spark': 5,
          'social-butterfly': 5,
          'quiet-observer': 2,
          'natural-leader': 10,
          'gentle-peacemaker': 4
        }
      },
      {
        id: uuidv4(),
        option_text: "Provide guidance and strategic direction",
        option_order: 2,
        scoring_weights: {
          'bold-explorer': 4,
          'wise-guardian': 10,
          'creative-spark': 5,
          'social-butterfly': 5,
          'quiet-observer': 7,
          'natural-leader': 8,
          'gentle-peacemaker': 6
        }
      },
      {
        id: uuidv4(),
        option_text: "Inspire with vision and innovation",
        option_order: 3,
        scoring_weights: {
          'bold-explorer': 7,
          'wise-guardian': 4,
          'creative-spark': 10,
          'social-butterfly': 6,
          'quiet-observer': 4,
          'natural-leader': 8,
          'gentle-peacemaker': 5
        }
      },
      {
        id: uuidv4(),
        option_text: "Support and empower team members",
        option_order: 4,
        scoring_weights: {
          'bold-explorer': 4,
          'wise-guardian': 6,
          'creative-spark': 5,
          'social-butterfly': 8,
          'quiet-observer': 5,
          'natural-leader': 6,
          'gentle-peacemaker': 10
        }
      }
    ]
  },
  {
    id: uuidv4(),
    question_text: "You see someone being treated unfairly. What do you do?",
    question_number: 13,
    category: 'values',
    is_active: true,
    answer_options: [
      {
        id: uuidv4(),
        option_text: "Speak up immediately and directly",
        option_order: 1,
        scoring_weights: {
          'bold-explorer': 9,
          'wise-guardian': 6,
          'creative-spark': 6,
          'social-butterfly': 5,
          'quiet-observer': 4,
          'natural-leader': 10,
          'gentle-peacemaker': 5
        }
      },
      {
        id: uuidv4(),
        option_text: "Assess the situation and take calculated action",
        option_order: 2,
        scoring_weights: {
          'bold-explorer': 5,
          'wise-guardian': 10,
          'creative-spark': 5,
          'social-butterfly': 5,
          'quiet-observer': 8,
          'natural-leader': 8,
          'gentle-peacemaker': 6
        }
      },
      {
        id: uuidv4(),
        option_text: "Find a creative way to address the injustice",
        option_order: 3,
        scoring_weights: {
          'bold-explorer': 6,
          'wise-guardian': 5,
          'creative-spark': 10,
          'social-butterfly': 6,
          'quiet-observer': 5,
          'natural-leader': 6,
          'gentle-peacemaker': 6
        }
      },
      {
        id: uuidv4(),
        option_text: "Offer support to the person affected",
        option_order: 4,
        scoring_weights: {
          'bold-explorer': 5,
          'wise-guardian': 6,
          'creative-spark': 5,
          'social-butterfly': 8,
          'quiet-observer': 6,
          'natural-leader': 5,
          'gentle-peacemaker': 10
        }
      }
    ]
  },
  {
    id: uuidv4(),
    question_text: "You're working in a team. What role do you naturally take?",
    question_number: 14,
    category: 'work',
    is_active: true,
    answer_options: [
      {
        id: uuidv4(),
        option_text: "The initiator who gets things moving",
        option_order: 1,
        scoring_weights: {
          'bold-explorer': 10,
          'wise-guardian': 4,
          'creative-spark': 7,
          'social-butterfly': 6,
          'quiet-observer': 2,
          'natural-leader': 9,
          'gentle-peacemaker': 4
        }
      },
      {
        id: uuidv4(),
        option_text: "The planner who ensures quality",
        option_order: 2,
        scoring_weights: {
          'bold-explorer': 3,
          'wise-guardian': 10,
          'creative-spark': 4,
          'social-butterfly': 4,
          'quiet-observer': 9,
          'natural-leader': 7,
          'gentle-peacemaker': 6
        }
      },
      {
        id: uuidv4(),
        option_text: "The innovator with fresh ideas",
        option_order: 3,
        scoring_weights: {
          'bold-explorer': 7,
          'wise-guardian': 4,
          'creative-spark': 10,
          'social-butterfly': 6,
          'quiet-observer': 5,
          'natural-leader': 5,
          'gentle-peacemaker': 5
        }
      },
      {
        id: uuidv4(),
        option_text: "The collaborator who brings people together",
        option_order: 4,
        scoring_weights: {
          'bold-explorer': 5,
          'wise-guardian': 5,
          'creative-spark': 6,
          'social-butterfly': 10,
          'quiet-observer': 4,
          'natural-leader': 6,
          'gentle-peacemaker': 9
        }
      }
    ]
  },
  {
    id: uuidv4(),
    question_text: "You're feeling stressed. How do you cope?",
    question_number: 15,
    category: 'wellness',
    is_active: true,
    answer_options: [
      {
        id: uuidv4(),
        option_text: "Physical activity or adventure",
        option_order: 1,
        scoring_weights: {
          'bold-explorer': 10,
          'wise-guardian': 4,
          'creative-spark': 6,
          'social-butterfly': 5,
          'quiet-observer': 4,
          'natural-leader': 7,
          'gentle-peacemaker': 4
        }
      },
      {
        id: uuidv4(),
        option_text: "Reflection and analysis of the situation",
        option_order: 2,
        scoring_weights: {
          'bold-explorer': 3,
          'wise-guardian': 10,
          'creative-spark': 5,
          'social-butterfly': 3,
          'quiet-observer': 10,
          'natural-leader': 6,
          'gentle-peacemaker': 6
        }
      },
      {
        id: uuidv4(),
        option_text: "Creative expression or artistic activities",
        option_order: 3,
        scoring_weights: {
          'bold-explorer': 6,
          'wise-guardian': 4,
          'creative-spark': 10,
          'social-butterfly': 5,
          'quiet-observer': 6,
          'natural-leader': 4,
          'gentle-peacemaker': 6
        }
      },
      {
        id: uuidv4(),
        option_text: "Talking with friends or loved ones",
        option_order: 4,
        scoring_weights: {
          'bold-explorer': 5,
          'wise-guardian': 5,
          'creative-spark': 5,
          'social-butterfly': 10,
          'quiet-observer': 4,
          'natural-leader': 5,
          'gentle-peacemaker': 9
        }
      }
    ]
  },
  {
    id: uuidv4(),
    question_text: "You receive unexpected praise. How do you feel?",
    question_number: 16,
    category: 'self-perception',
    is_active: true,
    answer_options: [
      {
        id: uuidv4(),
        option_text: "Excited and motivated to do more",
        option_order: 1,
        scoring_weights: {
          'bold-explorer': 10,
          'wise-guardian': 4,
          'creative-spark': 8,
          'social-butterfly': 7,
          'quiet-observer': 3,
          'natural-leader': 8,
          'gentle-peacemaker': 5
        }
      },
      {
        id: uuidv4(),
        option_text: "Proud but reflective on how to improve",
        option_order: 2,
        scoring_weights: {
          'bold-explorer': 5,
          'wise-guardian': 10,
          'creative-spark': 6,
          'social-butterfly': 5,
          'quiet-observer': 9,
          'natural-leader': 7,
          'gentle-peacemaker': 6
        }
      },
      {
        id: uuidv4(),
        option_text: "Inspired to be even more creative",
        option_order: 3,
        scoring_weights: {
          'bold-explorer': 7,
          'wise-guardian': 5,
          'creative-spark': 10,
          'social-butterfly': 6,
          'quiet-observer': 6,
          'natural-leader': 5,
          'gentle-peacemaker': 5
        }
      },
      {
        id: uuidv4(),
        option_text: "Grateful and want to share with others",
        option_order: 4,
        scoring_weights: {
          'bold-explorer': 5,
          'wise-guardian': 6,
          'creative-spark': 5,
          'social-butterfly': 10,
          'quiet-observer': 4,
          'natural-leader': 6,
          'gentle-peacemaker': 9
        }
      }
    ]
  },
  {
    id: uuidv4(),
    question_text: "You're at a crossroads in life. What guides your decision?",
    question_number: 17,
    category: 'values',
    is_active: true,
    answer_options: [
      {
        id: uuidv4(),
        option_text: "The potential for adventure and growth",
        option_order: 1,
        scoring_weights: {
          'bold-explorer': 10,
          'wise-guardian': 4,
          'creative-spark': 8,
          'social-butterfly': 5,
          'quiet-observer': 4,
          'natural-leader': 7,
          'gentle-peacemaker': 4
        }
      },
      {
        id: uuidv4(),
        option_text: "Careful analysis of long-term consequences",
        option_order: 2,
        scoring_weights: {
          'bold-explorer': 2,
          'wise-guardian': 10,
          'creative-spark': 4,
          'social-butterfly': 3,
          'quiet-observer': 10,
          'natural-leader': 7,
          'gentle-peacemaker': 6
        }
      },
      {
        id: uuidv4(),
        option_text: "Alignment with my authentic self-expression",
        option_order: 3,
        scoring_weights: {
          'bold-explorer': 7,
          'wise-guardian': 4,
          'creative-spark': 10,
          'social-butterfly': 5,
          'quiet-observer': 6,
          'natural-leader': 5,
          'gentle-peacemaker': 5
        }
      },
      {
        id: uuidv4(),
        option_text: "Impact on my relationships and community",
        option_order: 4,
        scoring_weights: {
          'bold-explorer': 4,
          'wise-guardian': 6,
          'creative-spark': 5,
          'social-butterfly': 10,
          'quiet-observer': 5,
          'natural-leader': 6,
          'gentle-peacemaker': 10
        }
      }
    ]
  },
  {
    id: uuidv4(),
    question_text: "You're in a conflict with someone close to you. What's your approach?",
    question_number: 18,
    category: 'relationships',
    is_active: true,
    answer_options: [
      {
        id: uuidv4(),
        option_text: "Address it directly and honestly",
        option_order: 1,
        scoring_weights: {
          'bold-explorer': 9,
          'wise-guardian': 6,
          'creative-spark': 6,
          'social-butterfly': 5,
          'quiet-observer': 4,
          'natural-leader': 9,
          'gentle-peacemaker': 4
        }
      },
      {
        id: uuidv4(),
        option_text: "Take time to understand all perspectives",
        option_order: 2,
        scoring_weights: {
          'bold-explorer': 4,
          'wise-guardian': 10,
          'creative-spark': 6,
          'social-butterfly': 6,
          'quiet-observer': 10,
          'natural-leader': 6,
          'gentle-peacemaker': 8
        }
      },
      {
        id: uuidv4(),
        option_text: "Find a creative solution that works for both",
        option_order: 3,
        scoring_weights: {
          'bold-explorer': 6,
          'wise-guardian': 5,
          'creative-spark': 10,
          'social-butterfly': 6,
          'quiet-observer': 5,
          'natural-leader': 5,
          'gentle-peacemaker': 7
        }
      },
      {
        id: uuidv4(),
        option_text: "Prioritize preserving the relationship",
        option_order: 4,
        scoring_weights: {
          'bold-explorer': 3,
          'wise-guardian': 6,
          'creative-spark': 4,
          'social-butterfly': 8,
          'quiet-observer': 5,
          'natural-leader': 4,
          'gentle-peacemaker': 10
        }
      }
    ]
  },
  {
    id: uuidv4(),
    question_text: "You're presented with a risky opportunity. What do you do?",
    question_number: 19,
    category: 'risk',
    is_active: true,
    answer_options: [
      {
        id: uuidv4(),
        option_text: "Take the risk without hesitation",
        option_order: 1,
        scoring_weights: {
          'bold-explorer': 10,
          'wise-guardian': 1,
          'creative-spark': 7,
          'social-butterfly': 5,
          'quiet-observer': 2,
          'natural-leader': 8,
          'gentle-peacemaker': 3
        }
      },
      {
        id: uuidv4(),
        option_text: "Carefully evaluate the risks and rewards",
        option_order: 2,
        scoring_weights: {
          'bold-explorer': 3,
          'wise-guardian': 10,
          'creative-spark': 5,
          'social-butterfly': 4,
          'quiet-observer': 9,
          'natural-leader': 7,
          'gentle-peacemaker': 6
        }
      },
      {
        id: uuidv4(),
        option_text: "Consider creative ways to mitigate the risk",
        option_order: 3,
        scoring_weights: {
          'bold-explorer': 7,
          'wise-guardian': 5,
          'creative-spark': 10,
          'social-butterfly': 5,
          'quiet-observer': 5,
          'natural-leader': 6,
          'gentle-peacemaker': 5
        }
      },
      {
        id: uuidv4(),
        option_text: "Consult trusted advisors before deciding",
        option_order: 4,
        scoring_weights: {
          'bold-explorer': 4,
          'wise-guardian': 7,
          'creative-spark': 5,
          'social-butterfly': 9,
          'quiet-observer': 6,
          'natural-leader': 6,
          'gentle-peacemaker': 8
        }
      }
    ]
  },
  {
    id: uuidv4(),
    question_text: "You're organizing an event. What's your focus?",
    question_number: 20,
    category: 'planning',
    is_active: true,
    answer_options: [
      {
        id: uuidv4(),
        option_text: "Making it exciting and memorable",
        option_order: 1,
        scoring_weights: {
          'bold-explorer': 10,
          'wise-guardian': 4,
          'creative-spark': 9,
          'social-butterfly': 7,
          'quiet-observer': 3,
          'natural-leader': 7,
          'gentle-peacemaker': 5
        }
      },
      {
        id: uuidv4(),
        option_text: "Ensuring everything runs smoothly",
        option_order: 2,
        scoring_weights: {
          'bold-explorer': 4,
          'wise-guardian': 10,
          'creative-spark': 5,
          'social-butterfly': 5,
          'quiet-observer': 8,
          'natural-leader': 8,
          'gentle-peacemaker': 7
        }
      },
      {
        id: uuidv4(),
        option_text: "Adding unique and creative touches",
        option_order: 3,
        scoring_weights: {
          'bold-explorer': 7,
          'wise-guardian': 4,
          'creative-spark': 10,
          'social-butterfly': 6,
          'quiet-observer': 5,
          'natural-leader': 5,
          'gentle-peacemaker': 5
        }
      },
      {
        id: uuidv4(),
        option_text: "Making sure everyone has a great time",
        option_order: 4,
        scoring_weights: {
          'bold-explorer': 5,
          'wise-guardian': 6,
          'creative-spark': 5,
          'social-butterfly': 10,
          'quiet-observer': 4,
          'natural-leader': 6,
          'gentle-peacemaker': 10
        }
      }
    ]
  },
  {
    id: uuidv4(),
    question_text: "You're learning from a mistake. What's most important?",
    question_number: 21,
    category: 'growth',
    is_active: true,
    answer_options: [
      {
        id: uuidv4(),
        option_text: "Moving forward quickly and trying again",
        option_order: 1,
        scoring_weights: {
          'bold-explorer': 10,
          'wise-guardian': 4,
          'creative-spark': 7,
          'social-butterfly': 5,
          'quiet-observer': 3,
          'natural-leader': 8,
          'gentle-peacemaker': 4
        }
      },
      {
        id: uuidv4(),
        option_text: "Understanding exactly what went wrong",
        option_order: 2,
        scoring_weights: {
          'bold-explorer': 3,
          'wise-guardian': 10,
          'creative-spark': 5,
          'social-butterfly': 4,
          'quiet-observer': 10,
          'natural-leader': 7,
          'gentle-peacemaker': 6
        }
      },
      {
        id: uuidv4(),
        option_text: "Finding a new approach based on lessons learned",
        option_order: 3,
        scoring_weights: {
          'bold-explorer': 7,
          'wise-guardian': 5,
          'creative-spark': 10,
          'social-butterfly': 5,
          'quiet-observer': 6,
          'natural-leader': 6,
          'gentle-peacemaker': 5
        }
      },
      {
        id: uuidv4(),
        option_text: "Sharing what I learned to help others",
        option_order: 4,
        scoring_weights: {
          'bold-explorer': 5,
          'wise-guardian': 6,
          'creative-spark': 6,
          'social-butterfly': 9,
          'quiet-observer': 5,
          'natural-leader': 6,
          'gentle-peacemaker': 9
        }
      }
    ]
  },
  {
    id: uuidv4(),
    question_text: "You're in a new environment. What's your first instinct?",
    question_number: 22,
    category: 'adaptability',
    is_active: true,
    answer_options: [
      {
        id: uuidv4(),
        option_text: "Explore and discover everything",
        option_order: 1,
        scoring_weights: {
          'bold-explorer': 10,
          'wise-guardian': 3,
          'creative-spark': 8,
          'social-butterfly': 6,
          'quiet-observer': 4,
          'natural-leader': 7,
          'gentle-peacemaker': 4
        }
      },
      {
        id: uuidv4(),
        option_text: "Observe and understand the dynamics",
        option_order: 2,
        scoring_weights: {
          'bold-explorer': 3,
          'wise-guardian': 8,
          'creative-spark': 5,
          'social-butterfly': 4,
          'quiet-observer': 10,
          'natural-leader': 6,
          'gentle-peacemaker': 6
        }
      },
      {
        id: uuidv4(),
        option_text: "Look for opportunities to be creative",
        option_order: 3,
        scoring_weights: {
          'bold-explorer': 7,
          'wise-guardian': 4,
          'creative-spark': 10,
          'social-butterfly': 5,
          'quiet-observer': 5,
          'natural-leader': 5,
          'gentle-peacemaker': 5
        }
      },
      {
        id: uuidv4(),
        option_text: "Connect with people and build relationships",
        option_order: 4,
        scoring_weights: {
          'bold-explorer': 5,
          'wise-guardian': 5,
          'creative-spark': 5,
          'social-butterfly': 10,
          'quiet-observer': 3,
          'natural-leader': 6,
          'gentle-peacemaker': 9
        }
      }
    ]
  },
  {
    id: uuidv4(),
    question_text: "You're setting goals for yourself. What matters most?",
    question_number: 23,
    category: 'ambition',
    is_active: true,
    answer_options: [
      {
        id: uuidv4(),
        option_text: "Challenging myself with new experiences",
        option_order: 1,
        scoring_weights: {
          'bold-explorer': 10,
          'wise-guardian': 4,
          'creative-spark': 8,
          'social-butterfly': 5,
          'quiet-observer': 3,
          'natural-leader': 8,
          'gentle-peacemaker': 4
        }
      },
      {
        id: uuidv4(),
        option_text: "Achieving meaningful, lasting results",
        option_order: 2,
        scoring_weights: {
          'bold-explorer': 4,
          'wise-guardian': 10,
          'creative-spark': 5,
          'social-butterfly': 4,
          'quiet-observer': 8,
          'natural-leader': 9,
          'gentle-peacemaker': 6
        }
      },
      {
        id: uuidv4(),
        option_text: "Expressing my unique vision",
        option_order: 3,
        scoring_weights: {
          'bold-explorer': 7,
          'wise-guardian': 4,
          'creative-spark': 10,
          'social-butterfly': 5,
          'quiet-observer': 6,
          'natural-leader': 5,
          'gentle-peacemaker': 5
        }
      },
      {
        id: uuidv4(),
        option_text: "Making a positive impact on others",
        option_order: 4,
        scoring_weights: {
          'bold-explorer': 5,
          'wise-guardian': 6,
          'creative-spark': 5,
          'social-butterfly': 9,
          'quiet-observer': 5,
          'natural-leader': 6,
          'gentle-peacemaker': 10
        }
      }
    ]
  },
  {
    id: uuidv4(),
    question_text: "You're facing a complex problem. How do you approach it?",
    question_number: 24,
    category: 'problem-solving',
    is_active: true,
    answer_options: [
      {
        id: uuidv4(),
        option_text: "Try different approaches until something works",
        option_order: 1,
        scoring_weights: {
          'bold-explorer': 10,
          'wise-guardian': 3,
          'creative-spark': 8,
          'social-butterfly': 5,
          'quiet-observer': 4,
          'natural-leader': 7,
          'gentle-peacemaker': 4
        }
      },
      {
        id: uuidv4(),
        option_text: "Break it down systematically and solve step by step",
        option_order: 2,
        scoring_weights: {
          'bold-explorer': 3,
          'wise-guardian': 10,
          'creative-spark': 5,
          'social-butterfly': 4,
          'quiet-observer': 10,
          'natural-leader': 8,
          'gentle-peacemaker': 6
        }
      },
      {
        id: uuidv4(),
        option_text: "Think outside the box for innovative solutions",
        option_order: 3,
        scoring_weights: {
          'bold-explorer': 7,
          'wise-guardian': 4,
          'creative-spark': 10,
          'social-butterfly': 5,
          'quiet-observer': 6,
          'natural-leader': 5,
          'gentle-peacemaker': 5
        }
      },
      {
        id: uuidv4(),
        option_text: "Collaborate with others to find the best solution",
        option_order: 4,
        scoring_weights: {
          'bold-explorer': 5,
          'wise-guardian': 6,
          'creative-spark': 6,
          'social-butterfly': 10,
          'quiet-observer': 4,
          'natural-leader': 7,
          'gentle-peacemaker': 9
        }
      }
    ]
  },
  {
    id: uuidv4(),
    question_text: "Looking back on your life, what would you want to be remembered for?",
    question_number: 25,
    category: 'legacy',
    is_active: true,
    answer_options: [
      {
        id: uuidv4(),
        option_text: "Living life to the fullest and inspiring others",
        option_order: 1,
        scoring_weights: {
          'bold-explorer': 10,
          'wise-guardian': 4,
          'creative-spark': 8,
          'social-butterfly': 6,
          'quiet-observer': 4,
          'natural-leader': 8,
          'gentle-peacemaker': 5
        }
      },
      {
        id: uuidv4(),
        option_text: "My wisdom and the positive impact I made",
        option_order: 2,
        scoring_weights: {
          'bold-explorer': 4,
          'wise-guardian': 10,
          'creative-spark': 5,
          'social-butterfly': 5,
          'quiet-observer': 9,
          'natural-leader': 8,
          'gentle-peacemaker': 7
        }
      },
      {
        id: uuidv4(),
        option_text: "My creativity and unique contributions",
        option_order: 3,
        scoring_weights: {
          'bold-explorer': 7,
          'wise-guardian': 4,
          'creative-spark': 10,
          'social-butterfly': 5,
          'quiet-observer': 6,
          'natural-leader': 5,
          'gentle-peacemaker': 5
        }
      },
      {
        id: uuidv4(),
        option_text: "The love and connections I shared with others",
        option_order: 4,
        scoring_weights: {
          'bold-explorer': 4,
          'wise-guardian': 6,
          'creative-spark': 5,
          'social-butterfly': 10,
          'quiet-observer': 5,
          'natural-leader': 5,
          'gentle-peacemaker': 10
        }
      }
    ]
  }
];
