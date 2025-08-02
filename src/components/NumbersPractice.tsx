'use client';

import { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import { MotionCard, MotionButton } from './motion/MotionComponents';
import InstructionSection from './InstructionSection';
import { playSuccessSound } from './utils/audioUtils';

interface NumbersPracticeProps {
  onComplete: () => void;
}

interface NumberSound {
  number: string;
  sound: string;
  phonetic: string;
  audioFile: string;
}

export default function NumbersPractice({ onComplete }: NumbersPracticeProps) {
  const [currentSection, setCurrentSection] = useState<string>('numbers1-12');
  const [selectedNumber, setSelectedNumber] = useState<string>('');
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioError, setAudioError] = useState<string>('');

  const numberSections = [
    { id: 'numbers1-12', title: 'Numbers 1-12', numbers: [
      { number: '1', sound: '/wʌn/', phonetic: 'one', audioFile: '/numbers/1.mp3' },
      { number: '2', sound: '/tuː/', phonetic: 'two', audioFile: '/numbers/2.mp3' },
      { number: '3', sound: '/θriː/', phonetic: 'three', audioFile: '/numbers/3.mp3' },
      { number: '4', sound: '/fɔːr/', phonetic: 'four', audioFile: '/numbers/4.mp3' },
      { number: '5', sound: '/faɪv/', phonetic: 'five', audioFile: '/numbers/5.mp3' },
      { number: '6', sound: '/sɪks/', phonetic: 'six', audioFile: '/numbers/6.mp3' },
      { number: '7', sound: '/ˈsevn/', phonetic: 'seven', audioFile: '/numbers/7.mp3' },
      { number: '8', sound: '/eɪt/', phonetic: 'eight', audioFile: '/numbers/8.mp3' },
      { number: '9', sound: '/naɪn/', phonetic: 'nine', audioFile: '/numbers/9.mp3' },
      { number: '10', sound: '/ten/', phonetic: 'ten', audioFile: '/numbers/10.mp3' },
      { number: '11', sound: '/ɪˈlevn/', phonetic: 'eleven', audioFile: '/numbers/11.mp3' },
      { number: '12', sound: '/twelv/', phonetic: 'twelve', audioFile: '/numbers/12.mp3' },
    ]},
    { id: 'numbers13-19', title: 'Numbers 13-19', numbers: [
      { number: '13', sound: '/ˌθɜːˈtiːn/', phonetic: 'thirteen', audioFile: '/numbers/13.mp3' },
      { number: '14', sound: '/ˌfɔːˈtiːn/', phonetic: 'fourteen', audioFile: '/numbers/14.mp3' },
      { number: '15', sound: '/ˌfɪfˈtiːn/', phonetic: 'fifteen', audioFile: '/numbers/15.mp3' },
      { number: '16', sound: '/ˌsɪkˈstiːn/', phonetic: 'sixteen', audioFile: '/numbers/16.mp3' },
      { number: '17', sound: '/ˌsevnˈtiːn/', phonetic: 'seventeen', audioFile: '/numbers/17.mp3' },
      { number: '18', sound: '/ˌeɪˈtiːn/', phonetic: 'eighteen', audioFile: '/numbers/18.mp3' },
      { number: '19', sound: '/ˌnaɪnˈtiːn/', phonetic: 'nineteen', audioFile: '/numbers/19.mp3' },
    ]},
    { id: 'numbersTens', title: 'Numbers 20, 30, 40...', numbers: [
      { number: '20', sound: '/ˈtwenti/', phonetic: 'twenty', audioFile: '/numbers/20.mp3' },
      { number: '30', sound: '/ˈθɜːti/', phonetic: 'thirty', audioFile: '/numbers/30.mp3' },
      { number: '40', sound: '/ˈfɔːti/', phonetic: 'forty', audioFile: '/numbers/40.mp3' },
      { number: '50', sound: '/ˈfɪfti/', phonetic: 'fifty', audioFile: '/numbers/50.mp3' },
      { number: '60', sound: '/ˈsɪksti/', phonetic: 'sixty', audioFile: '/numbers/60.mp3' },
      { number: '70', sound: '/ˈsevnti/', phonetic: 'seventy', audioFile: '/numbers/70.mp3' },
      { number: '80', sound: '/ˈeɪti/', phonetic: 'eighty', audioFile: '/numbers/80.mp3' },
      { number: '90', sound: '/ˈnaɪnti/', phonetic: 'ninety', audioFile: '/numbers/90.mp3' },
    ]},
    { id: 'numbersHundreds', title: 'Numbers 100, 200...', numbers: [
      { number: '100', sound: '/ˈhʌndrəd/', phonetic: 'hundred', audioFile: '/numbers/100.mp3' },
      { number: '200', sound: '/ˈtuː ˈhʌndrəd/', phonetic: 'two hundred', audioFile: '/numbers/200.mp3' },
      { number: '300', sound: '/ˈθriː ˈhʌndrəd/', phonetic: 'three hundred', audioFile: '/numbers/300.mp3' },
      { number: '400', sound: '/ˈfɔː ˈhʌndrəd/', phonetic: 'four hundred', audioFile: '/numbers/400.mp3' },
      { number: '500', sound: '/ˈfaɪv ˈhʌndrəd/', phonetic: 'five hundred', audioFile: '/numbers/500.mp3' },
      { number: '600', sound: '/ˈsɪks ˈhʌndrəd/', phonetic: 'six hundred', audioFile: '/numbers/600.mp3' },
      { number: '700', sound: '/ˈsevn ˈhʌndrəd/', phonetic: 'seven hundred', audioFile: '/numbers/700.mp3' },
      { number: '800', sound: '/ˈeɪt ˈhʌndrəd/', phonetic: 'eight hundred', audioFile: '/numbers/800.mp3' },
      { number: '900', sound: '/ˈnaɪn ˈhʌndrəd/', phonetic: 'nine hundred', audioFile: '/numbers/900.mp3' },
      { number: '1000', sound: '/ˈθaʊznd/', phonetic: 'thousand', audioFile: '/numbers/1000.mp3' },
    ]},
  ];

  // Initialize audio on first user interaction
  useEffect(() => {
    const enableAudio = () => {
      if (!audioEnabled) {
        // Test audio by trying to load one of the number files
        const testAudio = new Audio('/numbers/1.mp3');
        testAudio.volume = 0.5;
        
        testAudio.addEventListener('canplaythrough', () => {
          setAudioEnabled(true);
          setAudioError('');
        });
        
        testAudio.addEventListener('error', () => {
          setAudioError('Audio files not available. Please check your connection.');
        });
        
        // Try to load the audio
        testAudio.load();
      }
    };

    // Enable audio on first click/touch
    const handleFirstInteraction = () => {
      enableAudio();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [audioEnabled]);

  const playSound = (number: NumberSound) => {
    if (!audioEnabled) {
      setAudioError('Please tap the screen first to enable audio');
      return;
    }

    try {
      const audio = new Audio(number.audioFile);
      audio.volume = 0.8; // Good volume for mobile devices
      
      // Stop any currently playing audio
      const allAudios = document.querySelectorAll('audio');
      allAudios.forEach(audio => audio.pause());
      
      // Play the new audio
      audio.play().then(() => {
        setAudioError(''); // Clear any previous errors
      }).catch((error) => {
        console.error('Audio playback error:', error);
        setAudioError('Audio playback failed. Please try again.');
      });
      
    } catch (error) {
      console.error('Audio error:', error);
      setAudioError('Audio not supported on this device');
    }
  };

  const handleNumberClick = (number: NumberSound) => {
    setSelectedNumber(number.number);
    playSound(number);
  };

  const handleComplete = () => {
    if (audioEnabled) {
      playSuccessSound();
    }
    onComplete();
  };

  const currentNumbers = numberSections.find(s => s.id === currentSection)?.numbers || [];

  return (
    <div className="space-y-12">
      {/* Audio Status Banner */}
      {audioError && (
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-yellow-100 border border-yellow-300 text-yellow-800">
            <span>⚠️</span>
            <span>{audioError}</span>
          </div>
        </div>
      )}

      {!audioEnabled && !audioError && (
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-blue-100 border border-blue-300 text-blue-800">
            <span>🔊</span>
            <span>Tap any number to enable audio</span>
          </div>
        </div>
      )}

      {/* Section Navigation */}
      <div className="flex flex-wrap gap-6 justify-center mb-12">
        {numberSections.map((section) => (
          <MotionButton
            key={section.id}
            variant="nav"
            onClick={() => setCurrentSection(section.id)}
            className={currentSection === section.id ? 'active' : ''}
          >
            {section.title}
          </MotionButton>
        ))}
      </div>

      {/* Numbers Grid */}
      <div className="card">
        
        <div className={`simple-card-grid ${currentSection === 'numbersHundreds' ? 'numbers-hundreds' : ''} ${currentSection === 'numbersTens' ? 'numbers-tens' : ''}`}>
          {currentNumbers.map((number) => (
            <MotionCard
              key={number.number}
              type="number"
              selected={selectedNumber === number.number}
              onClick={() => handleNumberClick(number)}
              style={{
                backgroundColor: selectedNumber === number.number ? '#fa8072' : 'white',
                border: selectedNumber === number.number ? '2px solid #fa8072' : '2px solid #e5e7eb',
                color: selectedNumber === number.number ? 'white' : 'inherit',
                boxShadow: selectedNumber === number.number ? '0 8px 30px rgba(0, 0, 0, 0.3)' : 'inherit'
              }}
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <span className="number-text">{number.number}</span>
                <span className="text-sm text-gray-600">{number.phonetic}</span>
                <Volume2 size={16} className={selectedNumber === number.number ? 'text-white' : 'text-[var(--brand-primary)]'} />
              </div>
            </MotionCard>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <InstructionSection 
        title="Как изучать числа"
        instructions={[
          { text: "Нажмите на любое число, чтобы услышать его произношение" },
          { text: "Повторяйте каждое число вслух для улучшения произношения" },
          { text: "Изучайте закономерности в произношении чисел" },
          { text: "Практикуйте счёт от 1 до 20 для уверенности" }
        ]}
      />

      {/* Complete Button - Only show in the last section (100, 200, 300...) */}
      {currentSection === 'numbersHundreds' && (
        <div className="text-center">
          <MotionButton
            variant="primary"
            size="large"
            onClick={handleComplete}
            className="text-xl px-16 py-5"
          >
            Complete Numbers Practice ✓
          </MotionButton>
        </div>
      )}
    </div>
  );
} 