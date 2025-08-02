'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Play, ArrowRight, CheckCircle, BookOpen, Mic } from 'lucide-react';
import { MotionCard, MotionButton } from './motion/MotionComponents';
import { playSuccessSound } from './utils/audioUtils';
import InstructionSection from './InstructionSection';

interface SentenceStructureProps {
  onComplete: () => void;
}

interface SentencePattern {
  id: string;
  pattern: string;
  examples: string[];
  category: string;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export default function SentenceStructure({ onComplete }: SentenceStructureProps) {
  const [currentPattern, setCurrentPattern] = useState(0);
  const [selectedExample, setSelectedExample] = useState<string>('');
  const [completedPatterns, setCompletedPatterns] = useState<Set<number>>(new Set());
  const [showPractice, setShowPractice] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const sentencePatterns: SentencePattern[] = [
    {
      id: '1',
      pattern: 'My flight number is...',
      examples: [
        'My flight number is AA123.',
        'My flight number is BA456.',
        'My flight number is LH789.',
        'My flight number is KL321.',
        'My flight number is DL789.'
      ],
      category: 'flight',
      explanation: '',
      difficulty: 'beginner'
    },
    {
      id: '2',
      pattern: 'I am traveling to...',
      examples: [
        'I am traveling to Argentina.',
        'I am traveling to Peru.',
        'I am traveling to Chile.',
        'I am traveling to Mexico.',
        'I am traveling to Brazil.'
      ],
      category: 'destination',
      explanation: 'Используйте эту структуру, чтобы рассказать о своем пункте назначения во время разговоров с попутчиками или персоналом.',
      difficulty: 'beginner'
    },
    {
      id: '3',
      pattern: 'My final destination is...',
      examples: [
        'My final destination is Buenos Aires.',
        'My final destination is Lima.',
        'My final destination is Santiago.',
        'My final destination is Cancun.',
        'My final destination is San Paolo.'
      ],
      category: 'destination',
      explanation: 'Используйте эту структуру, когда у вас есть пересадки, чтобы объяснить ваш конечный пункт назначения.',
      difficulty: 'intermediate'
    },
    {
      id: '4',
      pattern: 'I am staying in a hotel.',
      examples: [
        'I am staying in a hotel.',
        'I am staying in a hotel near the airport.',
        'I am staying in a hotel in the city center.',
        'I am staying in a hotel for three nights.',
        'I am staying in a hotel downtown.'
      ],
      category: 'accommodation',
      explanation: 'Используйте эту структуру, чтобы рассказать о своих планах размещения, когда вас спрашивают таможенники или попутчики.',
      difficulty: 'intermediate'
    },
    {
      id: '5',
      pattern: 'I need to check in.',
      examples: [
        'I need to check in.',
        'I need to check in for my flight.',
        'I need to check in at the counter.',
        'I need to check in online.',
        'I need to check in my luggage.'
      ],
      category: 'airport',
      explanation: 'Используйте эту структуру, когда вам нужно зарегистрироваться на рейс или сдать багаж.',
      difficulty: 'beginner'
    },
    {
      id: '6',
      pattern: 'Where is the...?',
      examples: [
        'Where is the check-in counter?',
        'Where is the security checkpoint?',
        'Where is the boarding gate?',
        'Where is the baggage claim?',
        'Where is the information desk?'
      ],
      category: 'questions',
      explanation: 'Используйте эту структуру, чтобы спросить дорогу к важным местам в аэропорту.',
      difficulty: 'beginner'
    },
    {
      id: '7',
      pattern: 'I have a connecting flight.',
      examples: [
        'I have a connecting flight.',
        'I have a connecting flight in two hours.',
        'I have a connecting flight to Buenos Aires.',
        'I have a connecting flight at gate 15.',
        'I have a connecting flight tomorrow.'
      ],
      category: 'flight',
      explanation: 'Используйте эту структуру, чтобы объяснить, что у вас есть еще один рейс, особенно когда вас спрашивают о планах путешествия.',
      difficulty: 'intermediate'
    },
    {
      id: '8',
      pattern: 'Could you help me with...?',
      examples: [
        'Could you help me with my luggage?',
        'Could you help me find my gate?',
        'Could you help me with my ticket?',
        'Could you help me with directions?',
        'Could you help me with my passport?'
      ],
      category: 'questions',
      explanation: 'Используйте эту структуру, чтобы вежливо попросить помощи у сотрудников аэропорта или попутчиков.',
      difficulty: 'intermediate'
    },
    {
      id: '9',
      pattern: 'My flight is delayed.',
      examples: [
        'My flight is delayed.',
        'My flight is delayed by two hours.',
        'My flight is delayed due to weather.',
        'My flight is delayed until tomorrow.',
        'My flight is delayed for maintenance.'
      ],
      category: 'flight',
      explanation: 'Используйте эту структуру, чтобы объяснить задержку рейса при разговоре с сотрудниками авиакомпании или попутчиками.',
      difficulty: 'intermediate'
    },
    {
      id: '10',
      pattern: 'I need to change my flight.',
      examples: [
        'I need to change my flight.',
        'I need to change my flight to tomorrow.',
        'I need to change my flight to a later time.',
        'I need to change my flight due to an emergency.',
        'I need to change my flight to a different date.'
      ],
      category: 'flight',
      explanation: 'Используйте эту структуру, когда вам нужно изменить планы путешествия с сотрудниками авиакомпании.',
      difficulty: 'advanced'
    }
  ];

  const playSound = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const handleExampleClick = (example: string) => {
    setSelectedExample(example);
    playSound(example);
  };

  const handlePatternComplete = () => {
    setCompletedPatterns(prev => new Set([...prev, currentPattern]));
  };

  const currentPatternData = sentencePatterns[currentPattern];
  
  const translations = {
    'My flight number is...': 'Мой номер рейса...',
    'I am traveling to...': 'Я путешествую в...',
    'My final destination is...': 'Мой конечный пункт назначения...',
    'I am staying in a hotel.': 'Я остановлюсь в отеле.',
    'I need to check in.': 'Мне нужно зарегистрироваться.',
    'Where is the...?': 'Где находится...?',
    'I have a connecting flight.': 'У меня стыковочный рейс.',
    'Can you help me with...?': 'Можете помочь мне с...?',
    'I would like to...': 'Я хотел бы...',
    'Thank you for your help.': 'Спасибо за помощь.'
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto container-padding space-y-12">
      <div className="card vocabulary-container">

        
        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2">
            {sentencePatterns.map((_, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2 }}
                className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentPattern
                    ? 'bg-[var(--brand-primary)]'
                    : completedPatterns.has(index)
                    ? 'bg-green-400'
                    : 'bg-gray-300'
                }`}
                onClick={() => setCurrentPattern(index)}
              />
            ))}
          </div>
        </div>

        {/* Pattern Header */}
        <div className="text-center mb-8">
          <div className="sentence-structure-header mb-6">
            <BookOpen 
              size={28} 
              className="text-[var(--brand-primary)] sentence-structure-icon"
            />
            <h4 className="text-3xl font-bold text-gray-800 sentence-structure-title">
              Pattern {currentPattern + 1} of {sentencePatterns.length}
            </h4>
            <Mic 
              size={28} 
              className="text-[#b4daf7] sentence-structure-icon"
            />
          </div>
          
          
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">{currentPatternData.explanation}</p>
        </div>

        {/* Pattern Display */}
        <div className="bg-gradient-to-br from-[#b4daf7] via-[#fa8072] to-[#b4daf7] rounded-2xl p-12 mb-8 text-center shadow-2xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/10 to-transparent"></div>
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          
          <div className="relative z-10">
                          <div className="mb-12">
                <div className="inline-flex items-center gap-4 mb-6">
                  <div className="w-4 h-4 bg-black rounded-full animate-pulse"></div>
                  <h5 className="text-4xl font-bold text-black mb-4">Структура предложения:</h5>
                  <div className="w-4 h-4 bg-black rounded-full animate-pulse"></div>
                </div>
                <div className="w-40 h-2 bg-black mx-auto mb-8 rounded-full shadow-lg"></div>
                
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border-2 border-black/20 shadow-xl mb-8 sentence-structure-container">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-6 mb-8 bg-white px-10 py-6 rounded-full shadow-xl border-2 border-gray-200">
                      <span className="text-5xl font-black drop-shadow-lg sentence-structure-who">
                        Кто
                      </span>
                      <span className="text-4xl font-bold sentence-structure-plus">
                        +
                      </span>
                      <span className="text-5xl font-black drop-shadow-lg sentence-structure-what">
                        Что делает
                      </span>
                      <span className="text-4xl font-bold sentence-structure-plus">
                        +
                      </span>
                      <span className="text-5xl font-black drop-shadow-lg sentence-structure-where">
                        С чем/кем/где
                      </span>
                    </div>
                    
                    <p className="text-black text-xl font-medium leading-relaxed max-w-4xl mx-auto">
                      В английском языке слова в предложении всегда стоят в определенном порядке. В русском языке можно менять порядок слов, а в английском структура фиксированная, нужно следовать правилу, но это легко - просто запомни конструкцию и применяй везде.
                    </p>
                  </div>
                </div>
              </div>
            
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-10 mb-10 border border-black/20 shadow-inner">
              <div className="mb-6">
                <p className="text-6xl font-bold text-black mb-6 leading-tight">{currentPatternData.pattern}</p>
                {showTranslation && (
                  <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                    <p className="text-2xl font-medium text-gray-700">{translations[currentPatternData.pattern as keyof typeof translations]}</p>
                  </div>
                )}
                <div className="w-16 h-0.5 bg-black mx-auto mb-4 rounded-full"></div>
                <p className="text-black text-lg font-medium">Нажмите кнопку ниже, чтобы услышать произношение и увидеть перевод</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => playSound(currentPatternData.pattern)}
                title="Listen to pronunciation"
                className="btn bg-black/80 hover:bg-black text-white cursor-pointer hover:scale-105 transition-transform hover:shadow-lg sentence-structure-button"
              >
                <Volume2 
                  size={24} 
                  className="animate-pulse sentence-structure-icon-button"
                />
              </button>
              
              <button
                onClick={() => setShowTranslation(!showTranslation)}
                title="Show/Hide Russian translation"
                className="btn bg-[#fa8072]/80 hover:bg-[#fa8072] text-white cursor-pointer hover:scale-105 transition-transform hover:shadow-lg sentence-structure-button"
              >
                <span className="text-lg font-medium">RU</span>
              </button>
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-6">
          <h5 className="text-xl font-semibold text-gray-800 text-center">Examples:</h5>
          <div className="grid gap-4">
            {currentPatternData.examples.map((example, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`sentence-example-card ${
                  selectedExample === example ? 'selected' : ''
                }`}
                onClick={() => handleExampleClick(example)}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium text-lg">{example}</span>
                  <Volume2 size={24} className="audio-button" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 mb-12">
          <MotionButton
            variant="nav"
            onClick={() => setCurrentPattern(Math.max(0, currentPattern - 1))}
            disabled={currentPattern === 0}
            className={currentPattern === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : ''}
          >
            ← Previous
          </MotionButton>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              {currentPattern + 1} of {sentencePatterns.length}
            </span>
          </div>

          <MotionButton
            variant="nav"
            onClick={() => setCurrentPattern(Math.min(sentencePatterns.length - 1, currentPattern + 1))}
            disabled={currentPattern === sentencePatterns.length - 1}
            className={currentPattern === sentencePatterns.length - 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : ''}
          >
            Next →
          </MotionButton>
        </div>

      </div>

      {/* Instructions */}
      <InstructionSection 
        title="Советы по практике"
        instructions={[
          { text: "Нажмите на любой пример, чтобы услышать его произношение" },
          { text: "Практикуйтесь произносить каждое предложение вслух для улучшения произношения" },
          { text: "Попробуйте изменить слова, чтобы создать свои собственные предложения" },
          { text: "Используйте эти структуры при путешествиях или общении в аэропортах" }
        ]}
      />

      {/* Complete Button */}
      <div className="text-center">
        <MotionButton
          variant="primary"
          size="large"
          onClick={() => {
            playSuccessSound();
            onComplete();
          }}
          className="px-8 py-3 text-lg"
        >
          Complete Sentence Structure ✓
        </MotionButton>
      </div>
    </div>
  );
}