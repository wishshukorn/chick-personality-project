import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Share2, Copy, Twitter, Facebook, Linkedin, RotateCcw, BarChart3, Heart, Zap, Shield } from 'lucide-react';
import { useTestStore } from '../../test/store/testStore';
import { PERSONALITY_TYPES } from '../../../infrastructure/constants/personalityTypes';

export default function ResultsPage() {
  const { shareToken } = useParams<{ shareToken: string }>();
  const navigate = useNavigate();
  const { testResult, resetTest } = useTestStore();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch the result from the backend using the shareToken
    // For now, we'll use the result from the store
    if (!testResult || testResult.share_token !== shareToken) {
      navigate('/');
    }
  }, [shareToken, testResult, navigate]);

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareTwitter = () => {
    const text = `I'm ${testResult?.primary_personality.name}! Take the ChickPersonality test to discover your inner chick:`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const handleShareFacebook = () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    const url = window.location.href;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  const handleRetake = () => {
    resetTest();
    navigate('/');
  };

  if (!testResult) return null;

  const { primary_personality, score_breakdown, secondary_personalities } = testResult;
  const colors = primary_personality.color_palette;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <div
            className="inline-flex items-center justify-center w-32 h-32 rounded-full mb-6 shadow-2xl"
            style={{ backgroundColor: colors.primary }}
          >
            <Heart className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: colors.primary }}>
            {primary_personality.name}
          </h1>
          <p className="text-xl text-gray-600">{primary_personality.theme}</p>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
            style={{ borderTop: `4px solid ${colors.primary}` }}
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: colors.primary }}>
              <Heart className="w-5 h-5" />
              About You
            </h2>
            <p className="text-gray-700 leading-relaxed">{primary_personality.description}</p>
          </motion.div>

          {/* Traits */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
            style={{ borderTop: `4px solid ${colors.secondary}` }}
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: colors.secondary }}>
              <Zap className="w-5 h-5" />
              Your Traits
            </h2>
            <div className="flex flex-wrap gap-2">
              {primary_personality.traits.map((trait, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: colors.secondary }}
                >
                  {trait}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6"
            style={{ borderTop: `4px solid ${colors.accent || colors.primary }` }}
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: colors.accent || colors.primary }}>
              <Zap className="w-5 h-5" />
              Strengths
            </h2>
            <ul className="space-y-2">
              {primary_personality.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-500 mt-1">✓</span>
                  {strength}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Weaknesses */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6"
            style={{ borderTop: `4px solid ${colors.primary }` }}
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: colors.primary }}>
              <Shield className="w-5 h-5" />
              Areas for Growth
            </h2>
            <ul className="space-y-2">
              {primary_personality.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <span className="text-orange-500 mt-1">!</span>
                  {weakness}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Score Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900">
            <BarChart3 className="w-5 h-5" />
            Your Personality Breakdown
          </h2>
          <div className="space-y-4">
            {Object.entries(score_breakdown)
              .sort(([, a], [, b]) => b.percentage - a.percentage)
              .map(([slug, data]) => {
                const personality = PERSONALITY_TYPES.find(pt => pt.slug === slug);
                if (!personality) return null;
                return (
                  <div key={slug} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">{personality.name}</span>
                      <span className="font-bold" style={{ color: personality.color_palette.primary }}>
                        {data.percentage}%
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${data.percentage}%` }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: personality.color_palette.primary }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </motion.div>

        {/* Compatibility */}
        {secondary_personalities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-xl font-bold mb-4 text-gray-900">Compatible Personality Types</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {secondary_personalities.slice(0, 4).map((personality) => {
                const compatibility = primary_personality.compatibility_matrix[personality.slug];
                return (
                  <div
                    key={personality.id}
                    className="p-4 rounded-xl border-2"
                    style={{ borderColor: personality.color_palette.primary, backgroundColor: `${personality.color_palette.background}20` }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: personality.color_palette.primary }}
                      >
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold" style={{ color: personality.color_palette.primary }}>
                          {personality.name}
                        </h3>
                        <p className="text-sm text-gray-600">{compatibility.score}% compatible</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{compatibility.description}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
            <Share2 className="w-5 h-5" />
            Share Your Results
          </h2>
          <div className="flex flex-wrap gap-3 mb-4">
            <button
              onClick={handleShareTwitter}
              className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-colors"
            >
              <Twitter className="w-4 h-4" />
              Twitter
            </button>
            <button
              onClick={handleShareFacebook}
              className="flex items-center gap-2 px-4 py-2 bg-[#4267B2] text-white rounded-lg hover:bg-[#365899] transition-colors"
            >
              <Facebook className="w-4 h-4" />
              Facebook
            </button>
            <button
              onClick={handleShareLinkedIn}
              className="flex items-center gap-2 px-4 py-2 bg-[#0077B5] text-white rounded-lg hover:bg-[#006097] transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </button>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Copy className="w-4 h-4" />
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        </motion.div>

        {/* Retake Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <button
            onClick={handleRetake}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <RotateCcw className="w-5 h-5" />
            Retake the Test
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
