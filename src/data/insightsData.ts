// ============================================================================
// Language Insights & Statistics Mock Data
// ============================================================================

export const wordFrequencyData = [
  { word: 'namaskar', frequency: 342, odia: 'ନମସ୍କାର' },
  { word: 'odisha', frequency: 289, odia: 'ଓଡ଼ିଶା' },
  { word: 'sarkar', frequency: 256, odia: 'ସରକାର' },
  { word: 'puri', frequency: 234, odia: 'ପୁରୀ' },
  { word: 'jagannath', frequency: 221, odia: 'ଜଗନ୍ନାଥ' },
  { word: 'manisha', frequency: 198, odia: 'ମନୀଷା' },
  { word: 'shiksha', frequency: 187, odia: 'ଶିକ୍ଷା' },
  { word: 'paribara', frequency: 176, odia: 'ପରିବାର' },
  { word: 'chilika', frequency: 165, odia: 'ଚିଲିକା' },
  { word: 'mahanadi', frequency: 154, odia: 'ମହାନଦୀ' },
  { word: 'sambalpur', frequency: 143, odia: 'ସମ୍ବଲପୁର' },
  { word: 'konark', frequency: 138, odia: 'କୋଣାର୍କ' },
  { word: 'cuttack', frequency: 132, odia: 'କଟକ' },
  { word: 'hirakud', frequency: 121, odia: 'ହୀରାକୁଦ' },
  { word: 'bhubaneswar', frequency: 115, odia: 'ଭୁବନେଶ୍ୱର' },
];

export const charMappingStats = [
  { engChar: 'a', odiaChar: 'ଅ', count: 4521, accuracy: 96.2 },
  { engChar: 'ka', odiaChar: 'କ', count: 3892, accuracy: 95.8 },
  { engChar: 'na', odiaChar: 'ନ', count: 3456, accuracy: 94.5 },
  { engChar: 'ta', odiaChar: 'ତ', count: 3201, accuracy: 93.9 },
  { engChar: 'ra', odiaChar: 'ର', count: 2987, accuracy: 95.1 },
  { engChar: 'ma', odiaChar: 'ମ', count: 2876, accuracy: 94.8 },
  { engChar: 'pa', odiaChar: 'ପ', count: 2654, accuracy: 93.2 },
  { engChar: 'sa', odiaChar: 'ସ', count: 2543, accuracy: 92.7 },
  { engChar: 'i', odiaChar: 'ଇ', count: 2432, accuracy: 91.5 },
  { engChar: 'da', odiaChar: 'ଦ', count: 2321, accuracy: 90.8 },
  { engChar: 'la', odiaChar: 'ଲ', count: 2109, accuracy: 91.3 },
  { engChar: 'ba', odiaChar: 'ବ', count: 1987, accuracy: 89.6 },
];

export const datasetStats = {
  totalPairs: 12847,
  uniqueEnglish: 11234,
  uniqueOdia: 10876,
  avgEnglishLength: 7.4,
  avgOdiaLength: 5.2,
  maxEnglishLength: 22,
  maxOdiaLength: 18,
  coveragePercent: 87.5,
  trainSize: 9635,
  testSize: 1607,
  validSize: 1605,
};

export const trendData = Array.from({ length: 12 }, (_, i) => ({
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
  conversions: Math.floor(800 + Math.random() * 400 + i * 50),
  accuracy: Math.min(94.25, 82 + i * 1.1 + Math.random() * 0.5),
  uniqueWords: Math.floor(500 + i * 80 + Math.random() * 40),
}));

export const languageStats = [
  { label: 'Vowels Mapped', value: 14, total: 14, percent: 100 },
  { label: 'Consonants Mapped', value: 36, total: 39, percent: 92.3 },
  { label: 'Conjuncts Covered', value: 45, total: 62, percent: 72.6 },
  { label: 'Matras Handled', value: 12, total: 12, percent: 100 },
  { label: 'Special Chars', value: 8, total: 11, percent: 72.7 },
];
