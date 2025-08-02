'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import React from 'react';

// ========================================================================
// UNIVERSAL MOTION CARD COMPONENT
// ========================================================================

interface MotionCardProps {
  children: ReactNode;
  type: 'letter' | 'number' | 'vocabulary' | 'word' | 'sentence';
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export function MotionCard({ 
  children, 
  type, 
  selected = false, 
  onClick, 
  className = '', 
  disabled = false,
  style
}: MotionCardProps) {
  // Universal motion values based on card type
  const motionConfig = {
    letter: {
      hover: { scale: 1.05, y: -3 },
      tap: { scale: 0.95 },
      selected: { y: -2, scale: 1.02 }
    },
    number: {
      hover: { scale: 1.02, y: -2 },
      tap: { scale: 0.98 },
      selected: { y: -1, scale: 1.01 }
    },
    vocabulary: {
      hover: { scale: 1.02, y: -2 },
      tap: { scale: 0.98 },
      selected: { y: -1, scale: 1.01 }
    },
    word: {
      hover: { scale: 1.03, y: -2 },
      tap: { scale: 0.97 },
      selected: { y: -1, scale: 1.01 }
    },
    sentence: {
      hover: { scale: 1.02, y: -2 },
      tap: { scale: 0.98 },
      selected: { y: -1, scale: 1.01 }
    }
  };

  const config = motionConfig[type];

  return (
    <motion.div
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? undefined : config.hover}
      whileTap={disabled ? undefined : config.tap}
      animate={{
        y: selected ? config.selected.y : 0,
        scale: selected ? config.selected.scale : 1
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.2
      }}
      className={`motion-card motion-card-${type} ${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ========================================================================
// UNIVERSAL MOTION BUTTON COMPONENT
// ========================================================================

interface MotionButtonProps {
  children: ReactNode;
  variant: 'primary' | 'secondary' | 'outline' | 'success' | 'nav';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

export function MotionButton({ 
  children, 
  variant, 
  size = 'medium', 
  onClick, 
  className = '', 
  disabled = false,
  type = 'button'
}: MotionButtonProps) {
  // Universal motion values based on button variant
  const motionConfig = {
    primary: {
      hover: { scale: 1.02, y: -2 },
      tap: { scale: 0.98 }
    },
    secondary: {
      hover: { scale: 1.02, y: -2 },
      tap: { scale: 0.98 }
    },
    outline: {
      hover: { scale: 1.02, y: -2 },
      tap: { scale: 0.98 }
    },
    success: {
      hover: { scale: 1.02, y: -2 },
      tap: { scale: 0.98 }
    },
    nav: {
      hover: { scale: 1.02, y: -2 },
      tap: { scale: 0.98 }
    }
  };

  const config = motionConfig[variant];

  return (
    <motion.button
      type={type}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? undefined : config.hover}
      whileTap={disabled ? undefined : config.tap}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.15
      }}
      className={`btn btn-${variant} btn-${size} ${disabled ? 'disabled' : ''} ${className}`}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}

// ========================================================================
// UNIVERSAL MOTION CONTAINER COMPONENT
// ========================================================================

interface MotionContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function MotionContainer({ 
  children, 
  className = '', 
  delay = 0 
}: MotionContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ========================================================================
// UNIVERSAL MOTION ICON COMPONENT
// ========================================================================

interface MotionIconProps {
  children: ReactNode;
  animation?: 'spin' | 'bounce' | 'pulse' | 'none';
  className?: string;
}

export function MotionIcon({ 
  children, 
  animation = 'none', 
  className = '' 
}: MotionIconProps) {
  const animations = {
    spin: {
      animate: { rotate: [0, 360] },
      transition: { duration: 2, repeat: Infinity }
    },
    bounce: {
      animate: { y: [0, -10, 0] },
      transition: { duration: 0.5, repeat: Infinity }
    },
    pulse: {
      animate: { scale: [1, 1.1, 1] },
      transition: { duration: 1, repeat: Infinity }
    },
    none: {
      animate: {},
      transition: {}
    }
  };

  const config = animations[animation];

  return (
    <motion.span
      animate={config.animate}
      transition={config.transition}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  );
}