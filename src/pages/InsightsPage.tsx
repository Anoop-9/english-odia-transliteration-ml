// ============================================================================
// Language Insights Page — Word frequencies, char mapping stats, trends
// ============================================================================

import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, Cell
} from 'recharts';
import {
  LineChart as LucideLineChart, Sparkles, Languages, PieChart as LucidePieChart, Activity, BarChart as LucideBarChart
} from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import GlassCard from '../components/ui/GlassCard';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import {
  wordFrequencyData, charMappingStats, datasetStats, trendData, languageStats
} from '../data/insightsData';
import { fadeUp, staggerContainer } from '../utils/animations';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card p-3 !rounded-lg text-xs">
      <p className="text-white/60 mb-1 font-medium">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }} className="font-mono">
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

function DatasetStatsCards() {
  const stats = [
    { label: 'Total Word Pairs', value: datasetStats.totalPairs, suffix: '', icon: <Languages size={18} className="text-primary-400" /> },
    { label: 'Unique English Words', value: datasetStats.uniqueEnglish, suffix: '', icon: <span className="text-cyan-400 font-bold text-lg">En</span> },
    { label: 'Unique Odia Words', value: datasetStats.uniqueOdia, suffix: '', icon: <span className="text-amber-400 font-bold text-lg">ଓଡ଼ି</span> },
    { label: 'Phonetic Coverage', value: datasetStats.coveragePercent, suffix: '%', icon: <LucidePieChart size={18} className="text-emerald-400" /> },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <GlassCard key={i} className="p-5" delay={i * 0.1}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/40 text-xs font-medium uppercase tracking-wider">{stat.label}</span>
            {stat.icon}
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white font-mono">
            <AnimatedCounter end={stat.value} suffix={stat.suffix} decimals={stat.label.includes('Percent') ? 1 : 0} />
          </div>
        </GlassCard>
      ))}
    </div>
  );
}

function WordFrequencyChart() {
  return (
    <GlassCard className="p-6">
      <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
        <LucideBarChart size={18} className="text-primary-400" />
        Top 15 Most Frequent Words
      </h3>
      <p className="text-white/30 text-xs mb-6">Frequency distribution in training dataset</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={wordFrequencyData.slice(0, 15)} layout="vertical" margin={{ left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={true} vertical={false} />
          <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis dataKey="word" type="category" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
          <Bar dataKey="frequency" name="Frequency" radius={[0, 4, 4, 0]}>
            {wordFrequencyData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={index < 3 ? '#8b5cf6' : 'rgba(139, 92, 246, 0.4)'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}

function TrendChart() {
  return (
    <GlassCard className="p-6">
      <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
        <LucideLineChart size={18} className="text-cyan-400" />
        Model Improvement Trends
      </h3>
      <p className="text-white/30 text-xs mb-6">Accuracy and usage growth over time</p>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={trendData}>
          <defs>
            <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="left" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="right" orientation="right" domain={[80, 100]} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area yAxisId="left" type="monotone" dataKey="conversions" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorConversions)" name="Conversions/Day" />
          <Area yAxisId="right" type="monotone" dataKey="accuracy" stroke="#06b6d4" fillOpacity={1} fill="url(#colorAccuracy)" name="Accuracy (%)" />
        </AreaChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}

function CharMappingGrid() {
  return (
    <GlassCard className="p-6 h-full">
      <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
        <Sparkles size={18} className="text-emerald-400" />
        Character Mapping Distribution
      </h3>
      <p className="text-white/30 text-xs mb-6">Most frequent phonetic mappings in dataset</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {charMappingStats.map((stat, i) => (
          <motion.div
            key={stat.engChar}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] transition-colors text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-white/60 font-mono text-sm bg-white/5 px-2 py-0.5 rounded">{stat.engChar}</span>
              <span className="text-white/20 text-xs">→</span>
              <span className="text-emerald-400 font-mono text-lg bg-emerald-400/10 px-2 py-0.5 rounded">{stat.odiaChar}</span>
            </div>
            <p className="text-white/30 text-xs">{stat.count.toLocaleString()} occurrences</p>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}

function LanguageCoverage() {
  return (
    <GlassCard className="p-6 h-full">
      <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
        <Activity size={18} className="text-amber-400" />
        Odia Script Coverage
      </h3>
      <p className="text-white/30 text-xs mb-6">Percentage of script categories handled</p>

      <div className="space-y-5">
        {languageStats.map((stat, i) => (
          <div key={stat.label}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-white/70">{stat.label}</span>
              <span className="text-white/40 font-mono">{stat.value}/{stat.total} ({stat.percent}%)</span>
            </div>
            <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${stat.percent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                className="h-full rounded-full bg-amber-500/80"
              />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

export default function InsightsPage() {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-16">
        <div className="section-container">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center mb-10"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 mb-4">
              <Sparkles size={14} className="text-primary-400" />
              <span className="text-sm font-medium text-primary-300">Dataset Insights</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Language <span className="gradient-text-static">Intelligence</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/40 max-w-xl mx-auto">
              Explore the statistics and linguistic patterns from our English-Odia training dataset.
            </motion.p>
          </motion.div>

          {/* Stats Overview */}
          <DatasetStatsCards />

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <WordFrequencyChart />
            <TrendChart />
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <CharMappingGrid />
            <LanguageCoverage />
          </div>
          
        </div>
      </div>
    </PageTransition>
  );
}
