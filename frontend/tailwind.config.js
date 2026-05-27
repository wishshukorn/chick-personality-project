/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Personality type colors
        'bold-explorer': {
          primary: '#FF6B35',
          secondary: '#F7931E',
          accent: '#FFD23F',
          background: '#FFF8F0',
          text: '#2D2D2D',
        },
        'wise-guardian': {
          primary: '#4A90E2',
          secondary: '#5C6BC0',
          accent: '#7986CB',
          background: '#F0F4FF',
          text: '#1A237E',
        },
        'creative-spark': {
          primary: '#E91E63',
          secondary: '#9C27B0',
          accent: '#FF4081',
          background: '#FFF0F8',
          text: '#4A148C',
        },
        'social-butterfly': {
          primary: '#4CAF50',
          secondary: '#8BC34A',
          accent: '#CDDC39',
          background: '#F1F8E9',
          text: '#1B5E20',
        },
        'quiet-observer': {
          primary: '#3F51B5',
          secondary: '#303F9F',
          accent: '#5C6BC0',
          background: '#E8EAF6',
          text: '#1A237E',
        },
        'natural-leader': {
          primary: '#F44336',
          secondary: '#E53935',
          accent: '#FF5252',
          background: '#FFEBEE',
          text: '#B71C1C',
        },
        'gentle-peacemaker': {
          primary: '#9C27B0',
          secondary: '#7B1FA2',
          accent: '#AB47BC',
          background: '#F3E5F5',
          text: '#4A148C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
