// ============================================================================
// ML Analytics Page — Advanced model comparison dashboard
// ============================================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend,
  LineChart, Line, Cell
} from 'recharts';
import {
  Trophy, Medal, Award, TrendingUp, Target, Cpu,
  Download, BarChart3, Activity, Sparkles
} from 'lucide-react';
import toast from 'react-hot-toast';
import PageTransition from '../components/layout/PageTransition';
import GlassCard from '../components/ui/GlassCard';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import {
  modelData, bestModel, confusionMatrixData, confusionMatrixLabels,
  featureImportanceData, trainingHistory
} from '../data/modelData';
import { fadeUp, staggerContainer } from '../utils/animations';

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card p-3 !rounded-lg text-xs">
      <p className="text-white/60 mb-1 font-medium">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }} className="font-mono">
          {p.name}: {typeof p.value === 'number' ? p.value.toFixed(2) : p.value}%
        </p>
      ))}
    </div>
  );
};

// ─── Leaderboard ───────────────────────────────────────────────
function Leaderboard() {
  const sorted = [...modelData].sort((a, b) => b.accuracy - a.accuracy);
  const medals = [
    <Trophy key="gold" size={20} className="text-amber-400" />,
    <Medal key="silver" size={20} className="text-gray-300" />,
    <Award key="bronze" size={20} className="text-amber-600" />,
  ];

  return (
    <GlassCard className="p-6" glow>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <Trophy size={18} className="text-amber-400" />
          Model Leaderboard
        </h3>
        <span className="text-xs text-white/30 font-mono">Ranked by Accuracy</span>
      </div>
      <div className="space-y-3">
        {sorted.map((model, i) => (
          <motion.div
            key={model.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${
              i === 0
                ? 'bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20'
                : 'bg-white/[0.02] hover:bg-white/[0.04]'
            }`}
          >
            <div className="w-8 text-center">
              {i < 3 ? medals[i] : (
                <span className="text-white/20 font-mono text-sm">#{i + 1}</span>
              )}
            </div>
            <div className="text-2xl">{model.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm">{model.name}</p>
              <p className="text-white/30 text-xs truncate">{model.description}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold font-mono" style={{ color: model.color }}>
                {model.accuracy}%
              </p>
              <p className="text-white/20 text-xs">CER: {model.cer}%</p>
            </div>
            {/* Mini accuracy bar */}
            <div className="w-20 hidden sm:block">
              <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${model.accuracy}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: model.color }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}

// ─── Performance Cards ─────────────────────────────────────────
function PerformanceCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {modelData.map((model, i) => (
        <GlassCard
          key={model.name}
          className={`p-5 relative overflow-hidden ${
            model.name === bestModel.name ? 'ring-1 ring-primary-500/30' : ''
          }`}
          delay={i * 0.08}
        >
          {model.name === bestModel.name && (
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-cyan-500" />
          )}
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl">{model.icon}</span>
            {model.name === bestModel.name && (
              <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full uppercase">
                Best
              </span>
            )}
          </div>
          <h4 className="text-white font-semibold text-sm mb-3">{model.shortName}</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-white/30">Accuracy</span>
              <span className="text-white/70 font-mono">{model.accuracy}%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-white/30">Precision</span>
              <span className="text-white/70 font-mono">{model.precision}%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-white/30">Recall</span>
              <span className="text-white/70 font-mono">{model.recall}%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-white/30">F1-Score</span>
              <span className="text-white/70 font-mono">{model.f1Score}%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-white/30">CER</span>
              <span className="text-white/70 font-mono">{model.cer}%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-white/30">Train Time</span>
              <span className="text-white/70 font-mono">{model.trainingTime}</span>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}


// ─── Metrics Radar Chart ───────────────────────────────────────
function MetricsRadarChart() {
  const radarData = [
    { metric: 'Accuracy', ...Object.fromEntries(modelData.map(m => [m.shortName, m.accuracy])) },
    { metric: 'Precision', ...Object.fromEntries(modelData.map(m => [m.shortName, m.precision])) },
    { metric: 'Recall', ...Object.fromEntries(modelData.map(m => [m.shortName, m.recall])) },
    { metric: 'F1-Score', ...Object.fromEntries(modelData.map(m => [m.shortName, m.f1Score])) },
    { metric: '1-CER', ...Object.fromEntries(modelData.map(m => [m.shortName, 100 - m.cer])) },
  ];

  return (
    <GlassCard className="p-6">
      <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
        <Target size={18} className="text-cyan-400" />
        Multi-Metric Radar
      </h3>
      <p className="text-white/30 text-xs mb-6">All metrics compared across models</p>
      <ResponsiveContainer width="100%" height={320}>
        <RadarChart data={radarData}>
          <PolarGrid stroke="rgba(255,255,255,0.06)" />
          <PolarAngleAxis dataKey="metric" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
          <PolarRadiusAxis angle={90} domain={[75, 100]} tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10 }} />
          {modelData.map((model) => (
            <Radar
              key={model.shortName}
              name={model.shortName}
              dataKey={model.shortName}
              stroke={model.color}
              fill={model.color}
              fillOpacity={0.08}
              strokeWidth={2}
            />
          ))}
          <Legend
            wrapperStyle={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}

// ─── CER Comparison ────────────────────────────────────────────
function CERComparison() {
  const data = [...modelData].sort((a, b) => a.cer - b.cer).map(m => ({
    name: m.shortName,
    cer: m.cer,
    color: m.color,
  }));

  return (
    <GlassCard className="p-6">
      <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
        <Activity size={18} className="text-emerald-400" />
        Character Error Rate (CER)
      </h3>
      <p className="text-white/30 text-xs mb-6">Lower is better — character-level error rate</p>
      <div className="space-y-4">
        {data.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3"
          >
            <span className="text-white/50 text-sm font-mono w-8">{m.name}</span>
            <div className="flex-1 h-3 bg-white/[0.04] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(m.cer / 20) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                className="h-full rounded-full"
                style={{ backgroundColor: m.color }}
              />
            </div>
            <span className="text-white/60 font-mono text-sm w-14 text-right">{m.cer}%</span>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}

// ─── Confusion Matrix ──────────────────────────────────────────
function ConfusionMatrix() {
  const maxVal = Math.max(...confusionMatrixData.flat());

  return (
    <GlassCard className="p-6">
      <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
        <Cpu size={18} className="text-rose-400" />
        Confusion Matrix (Best Model)
      </h3>
      <p className="text-white/30 text-xs mb-6">Random Forest classification results</p>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-[300px]">
          {/* Column headers */}
          <div className="flex gap-1 mb-1 ml-16">
            {confusionMatrixLabels.map((l) => (
              <div key={l} className="w-14 text-center text-white/30 text-[10px] truncate">{l}</div>
            ))}
          </div>
          {/* Rows */}
          {confusionMatrixData.map((row, i) => (
            <div key={i} className="flex items-center gap-1 mb-1">
              <div className="w-14 text-right text-white/30 text-[10px] truncate pr-2">
                {confusionMatrixLabels[i]}
              </div>
              {row.map((val, j) => {
                const intensity = val / maxVal;
                const isdiag = i === j;
                return (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i * 5 + j) * 0.03 }}
                    className="w-14 h-12 rounded-lg flex items-center justify-center text-xs font-mono transition-all duration-200 hover:scale-110"
                    style={{
                      backgroundColor: isdiag
                        ? `rgba(139, 92, 246, ${intensity * 0.5})`
                        : `rgba(239, 68, 68, ${intensity * 0.2})`,
                      border: isdiag ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid rgba(255,255,255,0.03)',
                    }}
                  >
                    <span className={isdiag ? 'text-primary-300 font-semibold' : 'text-white/30'}>
                      {val}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}

// ─── Feature Importance ────────────────────────────────────────
function FeatureImportance() {
  return (
    <GlassCard className="p-6">
      <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
        <TrendingUp size={18} className="text-amber-400" />
        Feature Importance
      </h3>
      <p className="text-white/30 text-xs mb-6">Random Forest feature contribution</p>
      <div className="space-y-4">
        {featureImportanceData.map((f, i) => (
          <motion.div
            key={f.feature}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-white/60">{f.feature}</span>
              <span className="text-white/40 font-mono">{(f.importance * 100).toFixed(0)}%</span>
            </div>
            <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${f.importance * 100 * (100 / 28)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 + i * 0.08 }}
                className="h-full rounded-full"
                style={{ backgroundColor: f.color }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}

// ─── Training History ──────────────────────────────────────────
function TrainingHistoryChart() {
  return (
    <GlassCard className="p-6">
      <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
        <Activity size={18} className="text-cyan-400" />
        Training Convergence
      </h3>
      <p className="text-white/30 text-xs mb-6">Model accuracy over training iterations</p>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={trainingHistory}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="epoch" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis domain={[50, 100]} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          {modelData.map((model) => (
            <Line
              key={model.shortName}
              type="monotone"
              dataKey={model.shortName === 'RF' ? 'randomForest' : model.shortName === 'AB' ? 'adaBoost' : model.shortName === 'DT' ? 'decisionTree' : model.shortName === 'KNN' ? 'knn' : 'lda'}
              name={model.shortName}
              stroke={model.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: model.color }}
            />
          ))}
          <Legend wrapperStyle={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }} />
        </LineChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}

// ─── Analytics Page ────────────────────────────────────────────
export default function AnalyticsPage() {
  const [activeMetric, setActiveMetric] = useState<'accuracy' | 'precision' | 'recall' | 'f1Score'>('accuracy');

  const metricsBarData = modelData.map(m => ({
    name: m.shortName,
    value: m[activeMetric],
    color: m.color,
  }));

  const handleDownloadReport = () => {
    const report = modelData.map(m =>
      `${m.name}\n  Accuracy: ${m.accuracy}%\n  Precision: ${m.precision}%\n  Recall: ${m.recall}%\n  F1: ${m.f1Score}%\n  CER: ${m.cer}%\n  Training: ${m.trainingTime}\n`
    ).join('\n');

    const blob = new Blob(
      [`LinguaSync AI — ML Model Report\n${'='.repeat(40)}\n\n🏆 Best Model: ${bestModel.name} (${bestModel.accuracy}% Accuracy)\n\n${report}\nGenerated by LinguaSync AI`],
      { type: 'text/plain' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'linguasync-ml-report.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Report downloaded!', {
      style: { background: '#1e1b3a', color: '#fff', border: '1px solid rgba(139, 92, 246, 0.3)' },
    });
  };

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
              <BarChart3 size={14} className="text-primary-400" />
              <span className="text-sm font-medium text-primary-300">ML Analytics Dashboard</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Model <span className="gradient-text-static">Performance Analytics</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/40 max-w-xl mx-auto mb-6">
              Compare 5 machine learning models across accuracy, precision, recall, F1-score, and CER.
            </motion.p>
            <motion.button
              variants={fadeUp}
              onClick={handleDownloadReport}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/50 hover:text-white hover:bg-white/[0.08] text-sm transition-all"
            >
              <Download size={14} /> Download Report
            </motion.button>
          </motion.div>

          {/* Best model banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="glass-card p-6 bg-gradient-to-r from-primary-600/10 to-cyan-600/5 border-primary-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/10 rounded-full blur-[60px]" />
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-3">
                  <Trophy size={32} className="text-amber-400" />
                  <div>
                    <p className="text-white/40 text-xs font-medium uppercase tracking-wider">Best Performing Model</p>
                    <p className="text-2xl font-bold text-white">{bestModel.name} {bestModel.icon}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 sm:gap-6 sm:ml-auto">
                  <div>
                    <p className="text-white/30 text-xs">Accuracy</p>
                    <p className="text-xl font-bold text-primary-400 font-mono">
                      <AnimatedCounter end={bestModel.accuracy} decimals={2} suffix="%" />
                    </p>
                  </div>
                  <div>
                    <p className="text-white/30 text-xs">CER</p>
                    <p className="text-xl font-bold text-emerald-400 font-mono">
                      <AnimatedCounter end={bestModel.cer} decimals={2} suffix="%" />
                    </p>
                  </div>
                  <div>
                    <p className="text-white/30 text-xs">F1-Score</p>
                    <p className="text-xl font-bold text-cyan-400 font-mono">
                      <AnimatedCounter end={bestModel.f1Score} decimals={2} suffix="%" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Performance cards */}
          <div className="mb-8">
            <PerformanceCards />
          </div>

          {/* Charts grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Dynamic metric bar chart */}
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <Sparkles size={18} className="text-primary-400" />
                  Metric Comparison
                </h3>
                <div className="flex gap-1">
                  {(['accuracy', 'precision', 'recall', 'f1Score'] as const).map(metric => (
                    <button
                      key={metric}
                      onClick={() => setActiveMetric(metric)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                        activeMetric === metric
                          ? 'bg-primary-500/20 text-primary-300'
                          : 'text-white/30 hover:text-white/50'
                      }`}
                    >
                      {metric === 'f1Score' ? 'F1' : metric.charAt(0).toUpperCase() + metric.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={metricsBarData} barSize={40}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[75, 100]} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                  <Bar dataKey="value" name={activeMetric} radius={[6, 6, 0, 0]}>
                    {metricsBarData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} fillOpacity={0.8} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </GlassCard>

            <MetricsRadarChart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <CERComparison />
            <FeatureImportance />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ConfusionMatrix />
            <TrainingHistoryChart />
          </div>

          {/* Leaderboard */}
          <Leaderboard />
        </div>
      </div>
    </PageTransition>
  );
}
