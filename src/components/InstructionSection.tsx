import React from 'react';
import { MotionCard, MotionButton } from './motion/MotionComponents';

interface InstructionItem {
  text: string;
  icon?: string;
}

interface InstructionSectionProps {
  title: string;
  instructions: InstructionItem[];
  className?: string;
}

export default function InstructionSection({ 
  title, 
  instructions, 
  className = "" 
}: InstructionSectionProps) {
  return (
    <div className={`card ${className}`}>
      {/* Section Header */}
      <div className="text-center mb-[var(--space-8)]">
        <h4 className="font-semibold mb-[var(--space-3)] text-[var(--color-text-primary)]">
          {title}
        </h4>
        <div className="w-16 h-0.5 bg-gradient-to-r from-[var(--brand-primary)]/30 via-[var(--brand-primary)] to-[var(--brand-primary)]/30 mx-auto rounded-full"></div>
      </div>
      
      {/* Instructions List */}
      <div className="space-y-[var(--space-4)]">
        {instructions.map((instruction, index) => (
          <div 
            key={index}
            className="flex items-start gap-[var(--space-4)] p-[var(--space-4)] bg-gradient-to-r from-[var(--brand-secondary)]/8 to-transparent rounded-[var(--radius-lg)] border-l-2 border-[var(--brand-secondary)]/30 hover:border-[var(--brand-secondary)]/50 transition-all duration-300"
          >
            {/* Number or Icon */}
            <div className="flex-shrink-0 w-6 h-6 bg-[var(--brand-primary)] text-gray-800 rounded-full flex items-center justify-center text-[var(--font-size-sm)] font-semibold shadow-sm">
              {instruction.icon || (index + 1)}
            </div>
            
            {/* Instruction Text */}
            <p className="text-[var(--color-text-secondary)] leading-relaxed pt-0.5">
              {instruction.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Predefined instruction sets for common activities
export const CommonInstructions = {
  listening: [
    { text: "Нажмите на элемент, чтобы услышать его произношение" },
    { text: "Внимательно слушайте и повторяйте за диктором" },
    { text: "Обратите внимание на интонацию и ударение" }
  ],
  
  matching: [
    { text: "Выберите элемент из левого столбца" },
    { text: "Затем нажмите на соответствующий элемент справа" },
    { text: "Правильные совпадения приносят очки" },
    { text: "Завершите все задания для продолжения" }
  ],
  
  building: [
    { text: "Выберите слова из доступных вариантов" },
    { text: "Расположите их в правильном порядке" },
    { text: "Нажмите 'Проверить', чтобы увидеть результат" },
    { text: "Изучите структуру предложения" }
  ],
  
  practice: [
    { text: "Изучите материал внимательно" },
    { text: "Используйте аудио для правильного произношения" },
    { text: "Практикуйтесь регулярно для лучших результатов" },
    { text: "Применяйте изученное в реальных ситуациях" }
  ]
};