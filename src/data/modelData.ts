// ============================================================================
// ML Model Performance Data
// Derived from actual project results (Random Forest: 94.25% accuracy)
// ============================================================================

export interface ModelMetrics {
  name: string;
  shortName: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  cer: number; // Character Error Rate
  trainingTime: string;
  color: string;
  gradient: string;
  icon: string;
  description: string;
}

export const modelData: ModelMetrics[] = [
  {
    name: 'Random Forest',
    shortName: 'RF',
    accuracy: 94.25,
    precision: 93.8,
    recall: 94.1,
    f1Score: 93.95,
    cer: 5.75,
    trainingTime: '2.4s',
    color: '#8b5cf6',
    gradient: 'from-violet-500 to-purple-600',
    icon: '🌲',
    description: 'Ensemble of decision trees using bagging for robust predictions',
  },
  {
    name: 'AdaBoost',
    shortName: 'AB',
    accuracy: 92.8,
    precision: 92.1,
    recall: 92.5,
    f1Score: 92.3,
    cer: 7.2,
    trainingTime: '1.8s',
    color: '#06b6d4',
    gradient: 'from-cyan-500 to-teal-600',
    icon: '⚡',
    description: 'Adaptive boosting that sequentially corrects misclassifications',
  },
  {
    name: 'Decision Tree',
    shortName: 'DT',
    accuracy: 88.4,
    precision: 87.6,
    recall: 88.2,
    f1Score: 87.9,
    cer: 11.6,
    trainingTime: '0.6s',
    color: '#10b981',
    gradient: 'from-emerald-500 to-green-600',
    icon: '🌳',
    description: 'Tree-based classifier using recursive feature splitting',
  },
  {
    name: 'K-Nearest Neighbors',
    shortName: 'KNN',
    accuracy: 86.5,
    precision: 85.9,
    recall: 86.3,
    f1Score: 86.1,
    cer: 13.5,
    trainingTime: '0.3s',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-600',
    icon: '📍',
    description: 'Instance-based learning using nearest neighbor voting',
  },
  {
    name: 'Linear Discriminant Analysis',
    shortName: 'LDA',
    accuracy: 84.9,
    precision: 84.2,
    recall: 84.7,
    f1Score: 84.45,
    cer: 15.1,
    trainingTime: '0.2s',
    color: '#ef4444',
    gradient: 'from-red-500 to-rose-600',
    icon: '📐',
    description: 'Statistical method that finds linear combination of features',
  },
];

// Best model determined by highest accuracy
export const bestModel = modelData.reduce((best, model) =>
  model.accuracy > best.accuracy ? model : best
);

// Confusion matrix mock data (5 classes: vowels, consonants, matras, special, numbers)
export const confusionMatrixData = [
  [92, 3, 2, 1, 2],
  [2, 94, 1, 2, 1],
  [3, 2, 91, 3, 1],
  [1, 1, 3, 93, 2],
  [2, 2, 1, 2, 93],
];

export const confusionMatrixLabels = [
  'Vowels',
  'Consonants',
  'Matras',
  'Special',
  'Numerals',
];

// Feature importance data
export const featureImportanceData = [
  { feature: 'Character Position', importance: 0.28, color: '#8b5cf6' },
  { feature: 'Previous Character', importance: 0.22, color: '#06b6d4' },
  { feature: 'Next Character', importance: 0.19, color: '#10b981' },
  { feature: 'Word Length', importance: 0.12, color: '#f59e0b' },
  { feature: 'Vowel/Consonant', importance: 0.10, color: '#ef4444' },
  { feature: 'Character Frequency', importance: 0.09, color: '#ec4899' },
];

// Training history mock data (epochs vs accuracy)
export const trainingHistory = Array.from({ length: 20 }, (_, i) => ({
  epoch: i + 1,
  randomForest: Math.min(94.25, 60 + 34.25 * (1 - Math.exp(-0.25 * (i + 1)))),
  adaBoost: Math.min(92.8, 58 + 34.8 * (1 - Math.exp(-0.22 * (i + 1)))),
  decisionTree: Math.min(88.4, 55 + 33.4 * (1 - Math.exp(-0.3 * (i + 1)))),
  knn: Math.min(86.5, 52 + 34.5 * (1 - Math.exp(-0.2 * (i + 1)))),
  lda: Math.min(84.9, 50 + 34.9 * (1 - Math.exp(-0.18 * (i + 1)))),
}));
