// ============================================================================
// Footer — Modern footer with links and branding
// ============================================================================

import { Link } from 'react-router-dom';
import { GitBranch, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-surface-950/50">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src="/logo.png" alt="LinguaSync Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-lg font-bold gradient-text-static">LinguaSync AI</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed">
              Advanced English ↔ Odia transliteration powered by machine learning.
              Character-level phonetic mapping with 94.25% accuracy.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white/70 font-semibold text-sm mb-4 uppercase tracking-wider">
              Platform
            </h4>
            <div className="flex flex-col gap-2.5">
              {[
                { to: '/transliterate', label: 'Transliterate' },
                { to: '/analytics', label: 'ML Analytics' },
                { to: '/insights', label: 'Language Insights' },
                { to: '/about', label: 'About Project' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-white/35 hover:text-white/70 text-sm transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ML Models */}
          <div>
            <h4 className="text-white/70 font-semibold text-sm mb-4 uppercase tracking-wider">
              ML Models
            </h4>
            <div className="flex flex-col gap-2.5">
              {['Random Forest', 'AdaBoost', 'Decision Tree', 'KNN', 'LDA'].map((model) => (
                <span key={model} className="text-white/35 text-sm">
                  {model}
                </span>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white/70 font-semibold text-sm mb-4 uppercase tracking-wider">
              Resources
            </h4>
            <div className="flex flex-col gap-2.5">
              <a
                href="#"
                className="text-white/35 hover:text-white/70 text-sm transition-colors duration-200 flex items-center gap-1.5"
              >
                <GitBranch size={14} /> Source Code <ExternalLink size={10} />
              </a>
              <a
                href="#"
                className="text-white/35 hover:text-white/70 text-sm transition-colors duration-200 flex items-center gap-1.5"
              >
                Documentation <ExternalLink size={10} />
              </a>
              <a
                href="#"
                className="text-white/35 hover:text-white/70 text-sm transition-colors duration-200 flex items-center gap-1.5"
              >
                Research Paper <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            © 2025 LinguaSync AI. College Major Project — English-Odia Transliteration System.
          </p>
          <p className="text-white/40 text-sm flex items-center justify-center sm:justify-start gap-1">
            Built with <Heart size={14} className="text-rose-400 mx-1" /> by Anoop
          </p>
        </div>
      </div>
    </footer>
  );
}
