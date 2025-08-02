'use client';

import { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Volume2, RotateCcw, Check, X } from 'lucide-react';
import { MotionCard, MotionButton } from './motion/MotionComponents';
import InstructionSection from './InstructionSection';
import { playSuccessSound } from './utils/audioUtils';

interface SentenceBuilderProps {
  onComplete: () => void;
}

interface WordCard {
  id: string;
  word: string;
  type: 'subject' | 'verb' | 'object' | 'preposition' | 'destination';
}

interface SentenceTemplate {
  id: string;
  words: WordCard[];
  correct: string;
  translation: string;
}

export default function SentenceBuilder({ onComplete }: SentenceBuilderProps) {
  const [currentSentence, setCurrentSentence] = useState(0);
  const [userSentence, setUserSentence] = useState<WordCard[]>([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const sentenceTemplates: SentenceTemplate[] = [
    {
      id: '1',
      words: [
        { id: '1-1', word: 'My', type: 'subject' },
        { id: '1-2', word: 'flight', type: 'object' },
        { id: '1-3', word: 'number', type: 'object' },
        { id: '1-4', word: 'is', type: 'verb' },
        { id: '1-5', word: 'AA123', type: 'destination' }
      ],
      correct: 'My flight number is AA123',
      translation: 'Мой номер рейса AA123'
    },
    {
      id: '2',
      words: [
        { id: '2-1', word: 'I', type: 'subject' },
        { id: '2-2', word: 'am', type: 'verb' },
        { id: '2-3', word: 'traveling', type: 'verb' },
        { id: '2-4', word: 'to', type: 'preposition' },
        { id: '2-5', word: 'Argentina', type: 'destination' }
      ],
      correct: 'I am traveling to Argentina',
      translation: 'Я путешествую в Аргентину'
    },
    {
      id: '3',
      words: [
        { id: '3-1', word: 'My', type: 'subject' },
        { id: '3-2', word: 'final', type: 'object' },
        { id: '3-3', word: 'destination', type: 'object' },
        { id: '3-4', word: 'is', type: 'verb' },
        { id: '3-5', word: 'Buenos', type: 'destination' },
        { id: '3-6', word: 'Aires', type: 'destination' }
      ],
      correct: 'My final destination is Buenos Aires',
      translation: 'Мой конечный пункт назначения - Буэнос-Айрес'
    },
    {
      id: '4',
      words: [
        { id: '4-1', word: 'I', type: 'subject' },
        { id: '4-2', word: 'am', type: 'verb' },
        { id: '4-3', word: 'staying', type: 'verb' },
        { id: '4-4', word: 'in', type: 'preposition' },
        { id: '4-5', word: 'a', type: 'object' },
        { id: '4-6', word: 'hotel', type: 'object' }
      ],
      correct: 'I am staying in a hotel',
      translation: 'Я останавливаюсь в отеле'
    },
    {
      id: '5',
      words: [
        { id: '5-1', word: 'I', type: 'subject' },
        { id: '5-2', word: 'need', type: 'verb' },
        { id: '5-3', word: 'to', type: 'preposition' },
        { id: '5-4', word: 'check', type: 'verb' },
        { id: '5-5', word: 'in', type: 'preposition' }
      ],
      correct: 'I need to check in',
      translation: 'Мне нужно зарегистрироваться'
    },
    {
      id: '6',
      words: [
        { id: '6-1', word: 'Where', type: 'subject' },
        { id: '6-2', word: 'is', type: 'verb' },
        { id: '6-3', word: 'the', type: 'object' },
        { id: '6-4', word: 'check-in', type: 'object' },
        { id: '6-5', word: 'counter', type: 'object' }
      ],
      correct: 'Where is the check-in counter',
      translation: 'Где стойка регистрации'
    },
    {
      id: '7',
      words: [
        { id: '7-1', word: 'I', type: 'subject' },
        { id: '7-2', word: 'have', type: 'verb' },
        { id: '7-3', word: 'a', type: 'object' },
        { id: '7-4', word: 'connecting', type: 'verb' },
        { id: '7-5', word: 'flight', type: 'object' }
      ],
      correct: 'I have a connecting flight',
      translation: 'У меня стыковочный рейс'
    },
    {
      id: '8',
      words: [
        { id: '8-1', word: 'Could', type: 'subject' },
        { id: '8-2', word: 'you', type: 'subject' },
        { id: '8-3', word: 'help', type: 'verb' },
        { id: '8-4', word: 'me', type: 'object' },
        { id: '8-5', word: 'with', type: 'preposition' },
        { id: '8-6', word: 'my', type: 'object' },
        { id: '8-7', word: 'luggage', type: 'object' }
      ],
      correct: 'Could you help me with my luggage',
      translation: 'Можете ли вы помочь мне с багажом'
    },
    {
      id: '9',
      words: [
        { id: '9-1', word: 'My', type: 'subject' },
        { id: '9-2', word: 'flight', type: 'object' },
        { id: '9-3', word: 'is', type: 'verb' },
        { id: '9-4', word: 'delayed', type: 'verb' }
      ],
      correct: 'My flight is delayed',
      translation: 'Мой рейс задержан'
    },
    {
      id: '10',
      words: [
        { id: '10-1', word: 'I', type: 'subject' },
        { id: '10-2', word: 'need', type: 'verb' },
        { id: '10-3', word: 'to', type: 'preposition' },
        { id: '10-4', word: 'change', type: 'verb' },
        { id: '10-5', word: 'my', type: 'object' },
        { id: '10-6', word: 'flight', type: 'object' }
      ],
      correct: 'I need to change my flight',
      translation: 'Мне нужно изменить рейс'
    }
  ];

  const currentTemplate = sentenceTemplates[currentSentence];
  const availableWords = [...currentTemplate.words].sort(() => Math.random() - 0.5);

  const playSuccessSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      
      // Resume audio context if suspended
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
      oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch {
      console.log('Success sound played');
    }
  };

  const playWinnerSound = () => {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Play a sequence of notes for winner sound
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C (octave higher)
    const duration = 0.15;
    
    notes.forEach((frequency, index) => {
      const noteOscillator = audioContext.createOscillator();
      const noteGain = audioContext.createGain();
      
      noteOscillator.connect(noteGain);
      noteGain.connect(audioContext.destination);
      
      noteOscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      noteGain.gain.setValueAtTime(0.2, audioContext.currentTime);
      noteGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      noteOscillator.start(audioContext.currentTime + (index * duration));
      noteOscillator.stop(audioContext.currentTime + (index * duration) + duration);
    });
  };

  const checkSentence = () => {
    const userSentenceText = userSentence.map(word => word.word).join(' ');
    const isSentenceCorrect = userSentenceText === currentTemplate.correct;
    
    console.log('Checking sentence:', userSentenceText);
    console.log('Correct sentence:', currentTemplate.correct);
    console.log('Is correct:', isSentenceCorrect);
    
    setIsCorrect(isSentenceCorrect);
    setShowResult(true);
    setAttempts(prev => prev + 1);
    
    if (isSentenceCorrect) {
      console.log('Sentence is correct! Playing success sound...');
      setScore(prev => prev + 10);
      playSuccessSound();
      
      // Check if this is the last sentence
      if (currentSentence === sentenceTemplates.length - 1) {
        setTimeout(() => {
          playWinnerSound();
        }, 500);
      }
    } else {
      setScore(prev => Math.max(0, prev - 2));
    }
  };

  const resetSentence = () => {
    setUserSentence([]);
    setShowResult(false);
  };

  const nextSentence = () => {
    if (currentSentence < sentenceTemplates.length - 1) {
      setCurrentSentence(prev => prev + 1);
      resetSentence();
    } else {
      playSuccessSound();
      onComplete();
    }
  };

  const addWord = (word: WordCard) => {
    console.log('Adding word:', word.word);
    console.log('Current userSentence:', userSentence);
    
    if (!userSentence.find(w => w.id === word.id)) {
      setUserSentence(prev => {
        const newSentence = [...prev, word];
        console.log('New userSentence:', newSentence);
        return newSentence;
      });
    } else {
      console.log('Word already added:', word.word);
    }
  };

  const removeWord = (index: number) => {
    setUserSentence(prev => prev.filter((_, i) => i !== index));
  };

  const playSound = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  };



  return (
    <>
      <div className="space-y-8">


        {/* Progress and Score */}
        <div className="card">
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600 mb-1">Score</p>
                  <p className="text-2xl font-bold text-[var(--brand-primary)]">{score}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600 mb-1">Attempts</p>
                  <p className="text-2xl font-bold text-[#b4daf7]">{attempts}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600 mb-1">Progress</p>
                  <p className="text-2xl font-bold text-gray-800">{currentSentence + 1}/{sentenceTemplates.length}</p>
                </div>
              </div>
              <button
                onClick={resetSentence}
                className="btn-secondary btn-large flex items-center gap-2 whitespace-nowrap"
              >
                <RotateCcw size={16} />
                Reset
              </button>
            </div>
            <div className="progress-bar">
              <div 
                className={`progress-dynamic progress-width-${Math.round(((currentSentence + 1) / sentenceTemplates.length) * 100)}`}
              ></div>
            </div>
          </div>

          {/* Available Words */}
          <div className="card">
            <h4 className="text-xl font-semibold text-gray-800 mb-6 text-center">Доступные слова</h4>
            <div className="flex flex-wrap gap-4 justify-center">
              {availableWords.map((word) => (
                <MotionCard
                  key={word.id}
                  type="word"
                  onClick={() => addWord(word)}
                  disabled={!!userSentence.find(w => w.id === word.id)}
                  selected={userSentence.find(w => w.id === word.id) ? true : false}
                  className="motion-card-word"
                >
                  <span className="text-lg font-bold">{word.word}</span>
                </MotionCard>
              ))}
            </div>
          </div>

          {/* Sentence Building Area */}
          <div className="card">
            <h4 className="text-xl font-semibold text-gray-800 mb-6 text-center">Ваше предложение</h4>
            
            {userSentence.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-12 text-center text-gray-500">
                <p className="text-lg">Нажмите на слова выше, чтобы составить предложение</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2 min-h-[80px] items-center justify-center p-4 bg-gray-50 rounded-lg">
                  {userSentence.map((word, index) => (
                    <div
                      key={`${word.id}-${index}`}
                      className="inline-flex items-center gap-1 bg-white px-4 py-2 rounded-lg border-2 border-[var(--brand-primary)] shadow-sm"
                    >
                      <span className="text-lg font-medium">{word.word}</span>
                      <button
                        onClick={() => removeWord(index)}
                        className="text-red-500 hover:text-red-700 transition-colors p-0.5 rounded-full hover:bg-red-50"
                        aria-label="Remove word"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-6">
                  <MotionButton
                    variant="primary"
                    size="medium"
                    onClick={checkSentence}
                    className="px-8 py-3"
                  >
                    Проверить предложение
                  </MotionButton>
                </div>
              </div>
            )}
          </div>

          {/* Result Display */}
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`card ${
                isCorrect ? 'bg-green-50 border-2 border-green-300' : 'bg-red-50 border-2 border-red-300'
              }`}
            >
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {isCorrect ? (
                    <Check className="w-12 h-12 text-green-600" />
                  ) : (
                    <X className="w-12 h-12 text-red-600" />
                  )}
                </div>
                <h4 className={`text-2xl font-bold mb-4 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isCorrect ? 'Правильно!' : 'Попробуйте снова'}
                </h4>
                <p className="text-gray-600 mb-6 text-lg">{currentTemplate.translation}</p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => {
                      playSound(currentTemplate.correct);
                    }}
                    className="btn-secondary btn-large flex items-center justify-center p-3 rounded-full"
                    title="Listen to sentence"
                  >
                    <Volume2 size={24} />
                  </button>
                  {!isCorrect && (
                    <button
                      onClick={resetSentence}
                      className="btn-secondary btn-large flex items-center gap-2 whitespace-nowrap"
                    >
                      Попробовать снова
                    </button>
                  )}
                  <MotionButton
                    variant="primary"
                    size="large"
                    onClick={nextSentence}
                    className="whitespace-nowrap"
                  >
                    {currentSentence < sentenceTemplates.length - 1 ? 'Следующее предложение' : 'Завершить'}
                  </MotionButton>
                </div>
              </div>
            </motion.div>
          )}

          {/* Complete Button - Only show when all sentences are completed */}
          {currentSentence === sentenceTemplates.length - 1 && (
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
                Complete Sentence Builder ✓
              </MotionButton>
            </div>
          )}
        </div>

      {/* Instructions - Moved outside main container */}
      <InstructionSection 
        title="Как составлять предложения"
        instructions={[
          { text: "Выбирайте слова из доступных вариантов в правильном порядке" },
          { text: "Нажимайте 'Проверить предложение', чтобы увидеть результат" },
          { text: "Изучайте структуру правильно составленных предложений" },
          { text: "Завершите все задания для продолжения обучения" }
        ]}
      />
    </>
  );
} 