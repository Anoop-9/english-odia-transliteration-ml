// ============================================================================
// Transliteration Engine
// Character-level greedy matching for English → Odia and Odia → English
// ============================================================================

import { engToOdiaMap, odiaToEngMap, wordPairs } from '../data/transliterationMap';

/**
 * Transliterate English text to Odia script using greedy longest-match.
 * First checks pre-mapped word pairs, then falls back to character-level mapping.
 */
export function transliterateEngToOdia(input: string): string {
  if (!input.trim()) return '';

  // Normalize input
  const normalized = input.toLowerCase().trim();

  // Check word-level lookup first
  const words = normalized.split(/\s+/);
  const transliteratedWords = words.map(word => {
    // Check direct word pair match
    const pair = wordPairs.find(p => p.english === word);
    if (pair) return pair.odia;

    // Fall back to character-level mapping
    return charLevelTransliterate(word, engToOdiaMap);
  });

  return transliteratedWords.join(' ');
}

/**
 * Transliterate Odia text to English using reverse mapping.
 */
export function transliterateOdiaToEng(input: string): string {
  if (!input.trim()) return '';

  const normalized = input.trim();

  // Check word-level lookup
  const words = normalized.split(/\s+/);
  const transliteratedWords = words.map(word => {
    const pair = wordPairs.find(p => p.odia === word);
    if (pair) return pair.english;

    // Fall back to character-level reverse mapping
    return charLevelTransliterate(word, odiaToEngMap);
  });

  return transliteratedWords.join(' ');
}

/**
 * Character-level greedy longest-match transliteration.
 * Tries the longest possible match first, then progressively shorter.
 */
function charLevelTransliterate(
  word: string,
  map: Record<string, string>
): string {
  let result = '';
  let i = 0;
  const maxKeyLength = Math.max(...Object.keys(map).map(k => k.length));

  while (i < word.length) {
    let matched = false;

    // Try longest match first
    for (let len = Math.min(maxKeyLength, word.length - i); len > 0; len--) {
      const substr = word.substring(i, i + len);
      if (map[substr]) {
        result += map[substr];
        i += len;
        matched = true;
        break;
      }
    }

    // If no match found, keep original character
    if (!matched) {
      result += word[i];
      i++;
    }
  }

  return result;
}

/**
 * Get character-by-character mapping breakdown for visualization.
 */
export function getCharacterMapping(
  word: string,
  direction: 'eng-to-odia' | 'odia-to-eng' = 'eng-to-odia'
): { source: string; target: string }[] {
  const map = direction === 'eng-to-odia' ? engToOdiaMap : odiaToEngMap;
  const mappings: { source: string; target: string }[] = [];
  let i = 0;
  const maxKeyLength = Math.max(...Object.keys(map).map(k => k.length));

  while (i < word.length) {
    let matched = false;

    for (let len = Math.min(maxKeyLength, word.length - i); len > 0; len--) {
      const substr = word.substring(i, i + len);
      if (map[substr]) {
        mappings.push({ source: substr, target: map[substr] });
        i += len;
        matched = true;
        break;
      }
    }

    if (!matched) {
      mappings.push({ source: word[i], target: word[i] });
      i++;
    }
  }

  return mappings;
}
