import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Feather, Heart } from 'lucide-react';
import { useTestStore } from '../../test/store/testStore';

export default function LandingPage() {
  const navigate = useNavigate();
  const startTest = useTestStore(state => state.startTest);

  const handleStartTest = () => {
    startTest();
    navigate('/test');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-6 shadow-lg"
          >
            <Feather className="w-12 h-12 text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-4"
          >
            ChickPersonality
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-700 mb-2"
          >
            Discover Your Inner Chick
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Take our fun personality test to uncover which of the 7 unique chick archetypes matches your personality. 
            It only takes a few minutes!
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {[
            {
              icon: Sparkles,
              title: 'Quick & Fun',
              description: 'Complete the test in just 5-10 minutes with engaging questions',
              color: 'from-purple-500 to-purple-600',
            },
            {
              icon: Heart,
              title: 'Insightful Results',
              description: 'Get detailed personality insights with strengths and weaknesses',
              color: 'from-pink-500 to-pink-600',
            },
            {
              icon: Feather,
              title: 'Shareable',
              description: 'Share your results with friends and compare personalities',
              color: 'from-orange-500 to-orange-600',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-center"
        >
          <button
            onClick={handleStartTest}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Sparkles className="w-5 h-5" />
            Start Your Test
            <Sparkles className="w-5 h-5" />
          </button>
          
          <p className="mt-4 text-sm text-gray-500">
            No registration required • Completely free
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center text-sm text-gray-500"
        >
          <p>Explore the 7 Personality Types:</p>
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {['Bold Explorer', 'Wise Guardian', 'Creative Spark', 'Social Butterfly', 'Quiet Observer', 'Natural Leader', 'Gentle Peacemaker'].map((type, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 shadow-sm"
              >
                {type}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
