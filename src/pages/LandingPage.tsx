// ============================================================================
// Landing Page — Hero, Features, Stats, Model Showcase, Testimonials, FAQ
// ============================================================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Zap, Brain, BarChart3, Globe2, Shield, Cpu,
  ChevronDown, Trophy, Sparkles, Languages
} from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import GlassCard from '../components/ui/GlassCard';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { modelData, bestModel } from '../data/modelData';
import { faqData } from '../data/testimonialsData';
import { fadeUp, staggerContainer } from '../utils/animations';

// ─── Hero Section ──────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background effects */}
      <div className="absolute inset-0 mesh-gradient-strong" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-600/15 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8"
          >
            <Sparkles size={14} className="text-primary-400" />
            <span className="text-sm font-medium text-primary-300">
              Powered by 5 ML Models · 94.25% Accuracy
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6"
          >
            <span className="text-white">Transliterate with</span>
            <br />
            <span className="gradient-text">AI Intelligence</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Advanced English ↔ Odia transliteration powered by character-level phonetic mapping
            and ensemble machine learning models. Compare, analyze, and convert in real-time.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/transliterate"
              className="btn-neon text-base flex items-center gap-2 group"
            >
              <Languages size={18} />
              Start Transliteration
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/analytics"
              className="px-8 py-3 rounded-xl font-semibold text-white/70 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-all duration-300 flex items-center gap-2"
            >
              <BarChart3 size={18} />
              View ML Analytics
            </Link>
          </motion.div>

          {/* Floating script preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 relative"
          >
            <div className="glass-card p-6 sm:p-8 max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                <div className="w-3 h-3 rounded-full bg-green-400/60" />
                <span className="text-white/20 text-xs font-mono ml-2">linguasync-engine.ts</span>
              </div>
              <div className="font-mono text-sm space-y-2">
                <div>
                  <span className="text-primary-400">const</span>{' '}
                  <span className="text-cyan-300">input</span>{' '}
                  <span className="text-white/40">=</span>{' '}
                  <span className="text-green-400">"namaskar"</span>
                </div>
                <div>
                  <span className="text-primary-400">const</span>{' '}
                  <span className="text-cyan-300">output</span>{' '}
                  <span className="text-white/40">=</span>{' '}
                  <span className="text-amber-400 text-2xl">"ନମସ୍କାର"</span>
                </div>
                <div className="text-white/20">
                  <span className="text-white/30">// ✓</span> Random Forest · 94.25% accuracy · CER: 5.75%
                </div>
              </div>
            </div>
            {/* Glow behind card */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-600/10 via-transparent to-cyan-600/10 rounded-3xl blur-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Features Section ──────────────────────────────────────────
function FeaturesSection() {
  const features = [
    {
      icon: <Languages size={24} />,
      title: 'Bidirectional Transliteration',
      desc: 'Convert seamlessly between English and Odia script with phonetic character-level mapping.',
    },
    {
      icon: <Brain size={24} />,
      title: '5 ML Models Compared',
      desc: 'Decision Tree, Random Forest, AdaBoost, KNN, and LDA trained and benchmarked.',
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'Advanced Analytics',
      desc: 'Interactive charts, radar plots, confusion matrices, and performance leaderboards.',
    },
    {
      icon: <Zap size={24} />,
      title: 'Real-Time Processing',
      desc: 'Instant transliteration with sub-50ms response time, running entirely in browser.',
    },
    {
      icon: <Shield size={24} />,
      title: '94.25% Accuracy',
      desc: 'Random Forest achieves state-of-the-art accuracy with 5.75% character error rate.',
    },
    {
      icon: <Cpu size={24} />,
      title: 'Phonetic Mapping',
      desc: 'Character-level greedy matching engine with 100+ phonetic rules for Odia script.',
    },
  ];

  return (
    <section className="page-section relative">
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-primary-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Features
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything you need for{' '}
            <span className="gradient-text-static">intelligent transliteration</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/40 max-w-2xl mx-auto">
            A comprehensive platform combining machine learning, language processing, and beautiful analytics.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <GlassCard key={i} className="p-6" delay={i * 0.08}>
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{feature.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stats Section ─────────────────────────────────────────────
function StatsSection() {
  const stats = [
    { value: 94.25, suffix: '%', label: 'Best Accuracy', decimals: 2 },
    { value: 5, suffix: '', label: 'ML Models', decimals: 0 },
    { value: 12847, suffix: '+', label: 'Word Pairs', decimals: 0 },
    { value: 50, suffix: 'ms', label: 'Avg Response', decimals: 0, prefix: '<' },
  ];

  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/10 via-surface-950 to-cyan-900/10" />
      <div className="section-container relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <GlassCard key={i} className="p-6 text-center" delay={i * 0.1}>
              <div className="text-3xl sm:text-4xl font-bold gradient-text-static mb-2">
                <AnimatedCounter
                  end={stat.value}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              </div>
              <p className="text-white/40 text-sm">{stat.label}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Model Showcase ────────────────────────────────────────────
function ModelShowcase() {
  return (
    <section className="page-section relative">
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.p variants={fadeUp} className="text-primary-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Model Comparison
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Powered by <span className="gradient-text-static">5 ML Models</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {modelData.map((model, i) => (
            <GlassCard
              key={model.name}
              className={`p-5 text-center relative overflow-hidden ${
                model.name === bestModel.name ? 'ring-1 ring-primary-500/30' : ''
              }`}
              delay={i * 0.08}
              glow={model.name === bestModel.name}
            >
              {model.name === bestModel.name && (
                <div className="absolute top-2 right-2">
                  <Trophy size={16} className="text-amber-400" />
                </div>
              )}
              <div className="text-3xl mb-3">{model.icon}</div>
              <h3 className="text-white font-semibold text-sm mb-1">{model.shortName}</h3>
              <p className="text-white/30 text-xs mb-3">{model.name}</p>
              <div className="text-2xl font-bold" style={{ color: model.color }}>
                {model.accuracy}%
              </div>
              <p className="text-white/30 text-xs mt-1">Accuracy</p>
              {/* Progress bar */}
              <div className="mt-3 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${model.accuracy}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: model.color }}
                />
              </div>
            </GlassCard>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Link
            to="/analytics"
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors"
          >
            View detailed ML analytics <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FAQ ───────────────────────────────────────────────────────
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="page-section relative">
      <div className="section-container max-w-3xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.p variants={fadeUp} className="text-primary-400 font-semibold text-sm uppercase tracking-widest mb-3">
            FAQ
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-white">
            Frequently Asked Questions
          </motion.h2>
        </motion.div>

        <div className="space-y-3">
          {faqData.map((item, i) => (
            <GlassCard
              key={i}
              className="overflow-hidden"
              hover={false}
              delay={i * 0.05}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex items-center justify-between p-5">
                <h3 className="text-white/80 font-medium text-sm pr-4">{item.question}</h3>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={18} className="text-white/30" />
                </motion.div>
              </div>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 pb-5 text-white/40 text-sm leading-relaxed border-t border-white/[0.04] pt-4">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ───────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient-strong" />
      <div className="section-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Globe2 size={48} className="text-primary-400/50 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Ready to <span className="gradient-text">transliterate</span>?
          </h2>
          <p className="text-white/40 max-w-lg mx-auto mb-8">
            Experience the power of ML-driven English ↔ Odia transliteration right in your browser.
          </p>
          <Link
            to="/transliterate"
            className="btn-neon text-lg inline-flex items-center gap-2"
          >
            Launch Dashboard <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Landing Page ──────────────────────────────────────────────
export default function LandingPage() {
  return (
    <PageTransition>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <ModelShowcase />

      <FAQSection />
      <CTASection />
    </PageTransition>
  );
}
