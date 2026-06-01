// ============================================================================
// PageTransition — Framer Motion page wrapper
// ============================================================================

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { pageTransition } from '../../utils/animations';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export default function PageTransition({ children, className = '' }: PageTransitionProps) {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
}
