// ============================================================================
// About Page — Project timeline, methodology, and info
// ============================================================================

import { motion } from 'framer-motion';
import { BookOpen, Database, BrainCircuit, LineChart, Code2, Rocket, Info } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import GlassCard from '../components/ui/GlassCard';
import { fadeUp, staggerContainer } from '../utils/animations';

const timelineSteps = [
  {
    icon: <BookOpen size={20} className="text-primary-400" />,
    title: 'Problem Statement',
    desc: 'Odia is a low-resource language in the digital space. Converting English phonetic typing to Odia script manually is tedious. This project automates transliteration using ML.',
    color: 'from-primary-500/20 to-transparent'
  },
  {
    icon: <Database size={20} className="text-cyan-400" />,
    title: 'Data Collection & Preprocessing',
    desc: 'Collected 12,000+ English-Odia word pairs. Preprocessed by removing short words, special characters, and converting to lowercase. Split words into character-level tokens.',
    color: 'from-cyan-500/20 to-transparent'
  },
  {
    icon: <Code2 size={20} className="text-emerald-400" />,
    title: 'Feature Engineering',
    desc: 'Extracted features including character position, previous/next characters, word length, and vowel/consonant flags. Applied Label Encoding for ML ingestion.',
    color: 'from-emerald-500/20 to-transparent'
  },
  {
    icon: <BrainCircuit size={20} className="text-amber-400" />,
    title: 'Model Training',
    desc: 'Trained 5 classifiers: Decision Tree, Random Forest, AdaBoost, KNN, and LDA. Used 80/20 train-test split to ensure robust evaluation.',
    color: 'from-amber-500/20 to-transparent'
  },
  {
    icon: <LineChart size={20} className="text-rose-400" />,
    title: 'Evaluation',
    desc: 'Random Forest emerged as the best model with 94.25% accuracy. Evaluated using Precision, Recall, F1-Score, and Character Error Rate (CER).',
    color: 'from-rose-500/20 to-transparent'
  },
  {
    icon: <Rocket size={20} className="text-purple-400" />,
    title: 'Future Improvements',
    desc: 'Plans to implement Deep Learning (LSTM/Transformers), increase dataset size, and expand to sentence-level contextual transliteration.',
    color: 'from-purple-500/20 to-transparent'
  }
];

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-16">
        <div className="section-container max-w-4xl">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 mb-4">
              <Info size={14} className="text-primary-400" />
              <span className="text-sm font-medium text-primary-300">About Project</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Methodology & <span className="gradient-text-static">Architecture</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/40 max-w-2xl mx-auto">
              Behind the scenes of LinguaSync AI — a college major project exploring machine learning for regional language transliteration.
            </motion.p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/50 via-cyan-500/30 to-transparent -translate-x-1/2" />

            <div className="space-y-12">
              {timelineSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-8 items-center ${
                    i % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Icon point */}
                  <div className="absolute left-6 md:left-1/2 w-12 h-12 bg-surface-950 border border-white/10 rounded-full flex items-center justify-center -translate-x-1/2 z-10">
                    <div className="w-10 h-10 rounded-full bg-surface-800 flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Content Card */}
                  <div className="w-full pl-16 md:pl-0 md:w-1/2">
                    <div className={`md:${i % 2 === 0 ? 'mr-12' : 'ml-12'}`}>
                      <GlassCard className="p-6 relative overflow-hidden" glow={false} hover={true}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-20`} />
                        <h3 className="text-lg font-semibold text-white mb-2 relative z-10">{step.title}</h3>
                        <p className="text-white/50 text-sm leading-relaxed relative z-10">{step.desc}</p>
                      </GlassCard>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Tech Stack Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-24 text-center"
          >
            <h3 className="text-xl font-semibold text-white mb-8">Technology Stack</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'React', 'TypeScript', 'TailwindCSS', 'Framer Motion'].map((tech) => (
                <div key={tech} className="px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-white/60 text-sm font-medium">
                  {tech}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
