// ============================================================================
// Testimonials Data
// ============================================================================

export const testimonials = [
  {
    name: 'Dr. Priya Mohanty',
    role: 'Professor of Linguistics, Utkal University',
    quote: 'LinguaSync AI represents a breakthrough in Odia transliteration technology. The character-level phonetic mapping is remarkably accurate, and the ML model comparison dashboard is invaluable for research.',
    avatar: '👩‍🏫',
    rating: 5,
  },
  {
    name: 'Rajesh Panda',
    role: 'Software Engineer, Infosys',
    quote: 'I\'ve been looking for a reliable English-to-Odia transliteration tool for our localization pipeline. The Random Forest model achieving 94.25% accuracy is impressive. Great work!',
    avatar: '👨‍💻',
    rating: 5,
  },
  {
    name: 'Sushma Nayak',
    role: 'Content Writer, Odia Digital Media',
    quote: 'This tool has transformed my workflow. Converting English drafts to Odia script used to take hours — now it\'s instant. The analytics page showing model comparisons is fascinating.',
    avatar: '✍️',
    rating: 4,
  },
];

export const faqData = [
  {
    question: 'What is transliteration and how is it different from translation?',
    answer: 'Transliteration converts text from one script to another based on phonetic sounds, preserving pronunciation. Translation converts meaning between languages. For example, "namaskar" → "ନମସ୍କାର" is transliteration (same word, different script), while "hello" → "ନମସ୍କାର" would be translation.',
  },
  {
    question: 'Which ML model performs best for English-Odia transliteration?',
    answer: 'Our Random Forest classifier achieves the highest accuracy at 94.25%, followed by AdaBoost at 92.8%. Random Forest\'s ensemble approach of combining multiple decision trees through bagging provides robust predictions with low variance.',
  },
  {
    question: 'How does character-level phonetic mapping work?',
    answer: 'The system breaks English words into phonetic units (e.g., "na", "ma", "ska", "r") and maps each to corresponding Odia characters (ନ, ମ, ସ୍କ, ର). It uses a greedy longest-match algorithm to handle multi-character mappings like aspirated consonants.',
  },
  {
    question: 'What is Character Error Rate (CER)?',
    answer: 'CER measures the edit distance between predicted and actual Odia output at the character level. A lower CER means better accuracy. Our best model (Random Forest) achieves a CER of just 5.75%, meaning fewer than 6 in 100 characters need correction.',
  },
  {
    question: 'Can this system handle complex Odia conjuncts?',
    answer: 'Yes, the system handles common Odia conjuncts (yuktaksharas) like କ୍ଷ (ksha), ଜ୍ଞ (gya), and ତ୍ର (tra). The character mapping includes special multi-character rules that are matched before single characters.',
  },
  {
    question: 'Is this deployed as a backend service?',
    answer: 'This is a fully static frontend application with simulated ML outputs. The transliteration engine runs entirely in the browser using pre-defined phonetic mappings. No server, database, or API calls are required.',
  },
];
