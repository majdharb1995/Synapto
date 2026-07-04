import React from 'react';
import { motion } from 'framer-motion';

/**
 * VisualCore — SYNAPTO AI Core Engine visual.
 * Reusable across pages. Adapts size via `size` prop.
 *
 * Props:
 *   - size: 'sm' | 'md' | 'lg'   (default 'md')
 *   - withBrand: boolean         (show SYNAPTO brand text in center)
 *   - className: string          (extra wrapper class)
 */
const sizeMap = {
  sm: { container: 240, glow: 130, inner: 130, middle: 180, outer: 220 },
  md: { container: 360, glow: 200, inner: 200, middle: 280, outer: 340 },
  lg: { container: 440, glow: 240, inner: 240, middle: 330, outer: 410 },
};

function VisualCore({ size = 'md', withBrand = true, className = '' }) {
  const s = sizeMap[size] || sizeMap.md;

  const containerStyle = {
    width: `${s.container}px`,
    height: `${s.container}px`,
  };
  const glowStyle = { width: `${s.glow}px`, height: `${s.glow}px` };
  const innerStyle = { width: `${s.inner}px`, height: `${s.inner}px` };
  const middleStyle = { width: `${s.middle}px`, height: `${s.middle}px` };
  const outerStyle = { width: `${s.outer}px`, height: `${s.outer}px` };

  return (
    <div className={`visual-core-wrapper ${className}`}>
      <motion.div
        className="core-container"
        style={containerStyle}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        aria-hidden="true"
      >
        <div className="core-glow" style={glowStyle}></div>

        <div className="orbital-ring ring-inner" style={innerStyle}></div>
        <div className="orbital-ring ring-middle" style={middleStyle}></div>
        <div className="orbital-ring ring-outer" style={outerStyle}></div>

        {withBrand && (
          <div className="core-brand-wrapper">
            <div className="brand-title">SYNAPTO</div>
            <div className="brand-subtitle">AI CORE ENGINE</div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default VisualCore;
