'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Volume2, CheckCircle, Languages } from 'lucide-react';
import { MotionButton } from './motion/MotionComponents';
import { playSuccessSound } from './utils/audioUtils';
import InstructionSection from './InstructionSection';

interface CheckInDialogProps {
  onComplete: () => void;
}

export default function CheckInDialog({ onComplete }: CheckInDialogProps) {
  const [showTranslation, setShowTranslation] = useState<string | null>(null);

  const handleComplete = () => {
    playSuccessSound();
    onComplete();
  };

  const playSound = (text: string, isAgent: boolean = false) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = isAgent ? 0.9 : 1.1; // Lower pitch for agent (man), higher for passenger (woman)
    utterance.lang = 'en-US';
    
    // Try to set specific voices if available
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
      const englishVoices = voices.filter(voice => voice.lang.startsWith('en'));
      if (englishVoices.length > 0) {
        // Use different voices for agent vs passenger
        const agentVoice = englishVoices.find(voice => voice.name.includes('Male') || voice.name.includes('David') || voice.name.includes('James'));
        const passengerVoice = englishVoices.find(voice => voice.name.includes('Female') || voice.name.includes('Samantha') || voice.name.includes('Victoria'));
        
        if (isAgent && agentVoice) {
          utterance.voice = agentVoice;
        } else if (!isAgent && passengerVoice) {
          utterance.voice = passengerVoice;
        }
      }
    }
    
    speechSynthesis.speak(utterance);
  };

  const toggleTranslation = (lineId: string) => {
    setShowTranslation(showTranslation === lineId ? null : lineId);
  };

  return (
    <div className="max-w-7xl mx-auto container-padding">


        {/* Video Section */}
        <div className="card mb-8">
          <h4 className="text-xl font-semibold text-gray-800 mb-6 text-center">Видео диалог регистрации</h4>
          
          <div className="relative w-full max-w-4xl mx-auto">
            <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-lg">
              <video
                src="/images/Learn English | Check In at the Airport | Basic English Dialogue with Subtitles.mp4"
                title="Check-in Dialog Video"
                className="w-full h-full object-cover"
                controls
                preload="metadata"
                poster="/images/airport-checkin-cover.jpg"

              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        {/* Key Phrases Section */}
        <h4 className="text-xl font-semibold text-gray-800 mb-6 text-center">Ключевые фразы</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="vocabulary-card">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Passenger</h4>
            <p className="text-gray-600 mb-3">&quot;I&apos;d like to check in for my flight&quot;</p>
            <p className="text-sm text-gray-500">Я хотел бы зарегистрироваться на рейс</p>
            <button 
              className="audio-button mt-3" 
              title="Listen to pronunciation"
              onClick={() => playSound(`I'd like to check in for my flight`, false)}
            >
              <Volume2 size={20} />
            </button>
          </div>

          <div className="vocabulary-card">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Agent</h4>
            <p className="text-gray-600 mb-3">&quot;May I see your passport and ticket?&quot;</p>
            <p className="text-sm text-gray-500">Могу я увидеть ваш паспорт и билет?</p>
            <button 
              className="audio-button mt-3" 
              title="Listen to pronunciation"
              onClick={() => playSound(`May I see your passport and ticket?`, true)}
            >
              <Volume2 size={20} />
            </button>
          </div>

          <div className="vocabulary-card">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Passenger</h4>
            <p className="text-gray-600 mb-3">&quot;Here you are&quot;</p>
            <p className="text-sm text-gray-500">Вот, пожалуйста</p>
            <button 
              className="audio-button mt-3" 
              title="Listen to pronunciation"
              onClick={() => playSound(`Here you are`, false)}
            >
              <Volume2 size={20} />
            </button>
          </div>

          <div className="vocabulary-card">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Agent</h4>
            <p className="text-gray-600 mb-3">&quot;Would you like a window or aisle seat?&quot;</p>
            <p className="text-sm text-gray-500">Хотите место у окна или у прохода?</p>
            <button 
              className="audio-button mt-3" 
              title="Listen to pronunciation"
              onClick={() => playSound(`Would you like a window or aisle seat?`, true)}
            >
              <Volume2 size={20} />
            </button>
          </div>
        </div>

        {/* Work with Text Section */}
        <div className="card mb-8">
          <h4 className="text-xl font-semibold text-gray-800 mb-6 text-center">Работа с текстом диалога</h4>
          
          <div className="bg-gray-50 rounded-xl p-8 dialog-text-container">
            <div className="space-y-4 text-lg leading-relaxed">
              <div className="flex gap-4">
                <span className="font-semibold text-blue-600 min-w-[80px]">Agent:</span>
                <div className="flex-1 flex items-center justify-between">
                  <p className="text-gray-800 flex-1 mr-4">Hello, may I see your passport, please?</p>
                  <div className="flex gap-2 flex-shrink-0">
                    <button 
                      className="audio-button" 
                      title="Listen to pronunciation"
                      onClick={() => playSound(`Hello, may I see your passport, please?`, true)}
                    >
                      <Volume2 size={20} />
                    </button>
                    <button 
                      className="audio-button" 
                      title="Show translation"
                      onClick={() => toggleTranslation('line1')}
                    >
                      <Languages size={20} />
                    </button>
                  </div>
                </div>
              </div>
              {showTranslation === 'line1' && (
                <div className="ml-24 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-blue-600 font-medium">Здравствуйте, можно посмотреть ваш паспорт, пожалуйста?</p>
                </div>
              )}
              
              <div className="flex gap-4">
                <span className="font-semibold text-[var(--brand-primary)] min-w-[80px]">Passenger:</span>
                <div className="flex-1 flex items-center justify-between">
                  <p className="text-gray-800 flex-1 mr-4">Here you go.</p>
                  <div className="flex gap-2 flex-shrink-0">
                    <button 
                      className="audio-button" 
                      title="Listen to pronunciation"
                      onClick={() => playSound(`Here you go.`, false)}
                    >
                      <Volume2 size={20} />
                    </button>
                    <button 
                      className="audio-button" 
                      title="Show translation"
                      onClick={() => toggleTranslation('line2')}
                    >
                      <Languages size={20} />
                    </button>
                  </div>
                </div>
              </div>
              {showTranslation === 'line2' && (
                <div className="ml-24 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-blue-600 font-medium">Вот, пожалуйста</p>
                </div>
              )}
              
              <div className="flex gap-4">
                <span className="font-semibold text-blue-600 min-w-[80px]">Agent:</span>
                <div className="flex-1 flex items-center justify-between">
                  <p className="text-gray-800 flex-1 mr-4">Where are you flying to today?</p>
                  <div className="flex gap-2 flex-shrink-0">
                    <button 
                      className="audio-button" 
                      title="Listen to pronunciation"
                      onClick={() => playSound(`Where are you flying to today?`, true)}
                    >
                      <Volume2 size={20} />
                    </button>
                    <button 
                      className="audio-button" 
                      title="Show translation"
                      onClick={() => toggleTranslation('line3')}
                    >
                      <Languages size={20} />
                    </button>
                  </div>
                </div>
              </div>
              {showTranslation === 'line3' && (
                <div className="ml-24 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-blue-600 font-medium">Куда вы летите сегодня?</p>
                </div>
              )}
              
              <div className="flex gap-4">
                <span className="font-semibold text-[var(--brand-primary)] min-w-[80px]">Passenger:</span>
                <div className="flex-1 flex items-center justify-between">
                  <p className="text-gray-800 flex-1 mr-4">I&apos;m going to London.</p>
                  <div className="flex gap-2 flex-shrink-0">
                    <button 
                      className="audio-button" 
                      title="Listen to pronunciation"
                      onClick={() => playSound(`I'm going to London.`, false)}
                    >
                      <Volume2 size={20} />
                    </button>
                    <button 
                      className="audio-button" 
                      title="Show translation"
                      onClick={() => toggleTranslation('line4')}
                    >
                      <Languages size={20} />
                    </button>
                  </div>
                </div>
              </div>
              {showTranslation === 'line4' && (
                <div className="ml-24 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-blue-600 font-medium">Я летлю в Лондон</p>
                </div>
              )}
              
              <div className="flex gap-4">
                <span className="font-semibold text-blue-600 min-w-[80px]">Agent:</span>
                <div className="flex-1 flex items-center justify-between">
                  <p className="text-gray-800 flex-1 mr-4">Are you checking any bags?</p>
                  <div className="flex gap-2 flex-shrink-0">
                    <button 
                      className="audio-button" 
                      title="Listen to pronunciation"
                      onClick={() => playSound(`Are you checking any bags?`, true)}
                    >
                      <Volume2 size={20} />
                    </button>
                    <button 
                      className="audio-button" 
                      title="Show translation"
                      onClick={() => toggleTranslation('line5')}
                    >
                      <Languages size={20} />
                    </button>
                  </div>
                </div>
              </div>
              {showTranslation === 'line5' && (
                <div className="ml-24 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-blue-600 font-medium">Регистрируете ли багаж?</p>
                </div>
              )}
              
              <div className="flex gap-4">
                <span className="font-semibold text-[var(--brand-primary)] min-w-[80px]">Passenger:</span>
                <div className="flex-1 flex items-center justify-between">
                  <p className="text-gray-800 flex-1 mr-4">Yes, just one.</p>
                  <div className="flex gap-2 flex-shrink-0">
                    <button 
                      className="audio-button" 
                      title="Listen to pronunciation"
                      onClick={() => playSound(`Yes, just one.`, false)}
                    >
                      <Volume2 size={20} />
                    </button>
                    <button 
                      className="audio-button" 
                      title="Show translation"
                      onClick={() => toggleTranslation('line6')}
                    >
                      <Languages size={20} />
                    </button>
                  </div>
                </div>
              </div>
              {showTranslation === 'line6' && (
                <div className="ml-24 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-blue-600 font-medium">Да, только один</p>
                </div>
              )}
              
              <div className="flex gap-4">
                <span className="font-semibold text-blue-600 min-w-[80px]">Agent:</span>
                <div className="flex-1 flex items-center justify-between">
                  <p className="text-gray-800 flex-1 mr-4">Please place it on the scale.</p>
                  <div className="flex gap-2 flex-shrink-0">
                    <button 
                      className="audio-button" 
                      title="Listen to pronunciation"
                      onClick={() => playSound(`Please place it on the scale.`, true)}
                    >
                      <Volume2 size={20} />
                    </button>
                    <button 
                      className="audio-button" 
                      title="Show translation"
                      onClick={() => toggleTranslation('line7')}
                    >
                      <Languages size={20} />
                    </button>
                  </div>
                </div>
              </div>
              {showTranslation === 'line7' && (
                <div className="ml-24 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-blue-600 font-medium">Пожалуйста, положите его на весы</p>
                </div>
              )}
              
              <div className="flex gap-4">
                <span className="font-semibold text-blue-600 min-w-[80px]">Agent:</span>
                <div className="flex-1 flex items-center justify-between">
                  <p className="text-gray-800 flex-1 mr-4">Here is your boarding pass. You will depart from Terminal C, Gate 54. Boarding begins one hour before departure.</p>
                  <div className="flex gap-2 flex-shrink-0">
                    <button 
                      className="audio-button" 
                      title="Listen to pronunciation"
                      onClick={() => playSound(`Here is your boarding pass. You will depart from Terminal C, Gate 54. Boarding begins one hour before departure.`, true)}
                    >
                      <Volume2 size={20} />
                    </button>
                    <button 
                      className="audio-button" 
                      title="Show translation"
                      onClick={() => toggleTranslation('line8')}
                    >
                      <Languages size={20} />
                    </button>
                  </div>
                </div>
              </div>
              {showTranslation === 'line8' && (
                <div className="ml-24 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-blue-600 font-medium">Вот ваш посадочный талон. Вы вылетаете из терминала C, гейт 54. Посадка начинается за час до вылета</p>
                </div>
              )}
            </div>
            

          </div>
        </div>

        {/* Practice Tips */}
        <div className="mt-12">
          <InstructionSection 
            title="Советы для практики"
            instructions={[
              { text: "Слушайте внимательно вопросы агента и отвечайте четко" },
              { text: "Практикуйте произношение ключевых фраз и слов" },
              { text: "Обращайте внимание на вежливые выражения и интонацию" },
              { text: "Повторяйте диалог несколько раз для лучшего запоминания" }
            ]}
          />
        </div>

        {/* Complete Button */}
        <div className="text-center">
          <MotionButton
            variant="primary"
            size="large"
            onClick={handleComplete}
            className="px-8 py-4 text-lg flex items-center gap-3 mx-auto"
          >
            <CheckCircle size={24} />
            Завершить изучение диалога
          </MotionButton>
        </div>
    </div>
  );
}