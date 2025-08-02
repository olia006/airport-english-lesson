'use client';

import { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import { MotionCard, MotionButton, MotionIcon } from './motion/MotionComponents';
import InstructionSection from './InstructionSection';
import { playSuccessSound } from './utils/audioUtils';

interface AlphabetPracticeProps {
  onComplete: () => void;
}

interface LetterSound {
  letter: string;
  sound: string;
  phonetic: string;
  audioFile: string;
}

export default function AlphabetPractice({ onComplete }: AlphabetPracticeProps) {
  const [currentSection, setCurrentSection] = useState<'consonants' | 'vowels'>('consonants');
  const [selectedLetter, setSelectedLetter] = useState<string>('');
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioError, setAudioError] = useState<string>('');

  const consonantSounds: LetterSound[] = [
    { letter: 'Bb', sound: '/biː/', phonetic: 'bee', audioFile: '/voice/b.mp3' },
    { letter: 'Cc', sound: '/siː/', phonetic: 'see', audioFile: '/voice/c.mp3' },
    { letter: 'Dd', sound: '/diː/', phonetic: 'dee', audioFile: '/voice/d.mp3' },
    { letter: 'Ff', sound: '/ef/', phonetic: 'eff', audioFile: '/voice/f.mp3' },
    { letter: 'Gg', sound: '/dʒiː/', phonetic: 'gee', audioFile: '/voice/g.mp3' },
    { letter: 'Hh', sound: '/eɪtʃ/', phonetic: 'aitch', audioFile: '/voice/h.mp3' },
    { letter: 'Jj', sound: '/dʒeɪ/', phonetic: 'jay', audioFile: '/voice/j.mp3' },
    { letter: 'Kk', sound: '/keɪ/', phonetic: 'kay', audioFile: '/voice/k.mp3' },
    { letter: 'Ll', sound: '/el/', phonetic: 'el', audioFile: '/voice/l.mp3' },
    { letter: 'Mm', sound: '/em/', phonetic: 'em', audioFile: '/voice/m.mp3' },
    { letter: 'Nn', sound: '/en/', phonetic: 'en', audioFile: '/voice/n.mp3' },
    { letter: 'Pp', sound: '/piː/', phonetic: 'pee', audioFile: '/voice/p.mp3' },
    { letter: 'Qq', sound: '/kjuː/', phonetic: 'cue', audioFile: '/voice/q.mp3' },
    { letter: 'Rr', sound: '/ɑːr/', phonetic: 'ar', audioFile: '/voice/r.mp3' },
    { letter: 'Ss', sound: '/es/', phonetic: 'ess', audioFile: '/voice/s.mp3' },
    { letter: 'Tt', sound: '/tiː/', phonetic: 'tee', audioFile: '/voice/t.mp3' },
    { letter: 'Vv', sound: '/viː/', phonetic: 'vee', audioFile: '/voice/v.mp3' },
    { letter: 'Ww', sound: '/ˈdʌbəl juː/', phonetic: 'double you', audioFile: '/voice/w.mp3' },
    { letter: 'Xx', sound: '/eks/', phonetic: 'ex', audioFile: '/voice/x.mp3' },
    { letter: 'Zz', sound: '/ziː/', phonetic: 'zee', audioFile: '/voice/z.mp3' },
  ];

  const vowelSounds: LetterSound[] = [
    { letter: 'Aa', sound: '/eɪ/', phonetic: 'ay', audioFile: '/voice/a.mp3' },
    { letter: 'Ee', sound: '/iː/', phonetic: 'e', audioFile: '/voice/e.mp3' },
    { letter: 'Ii', sound: '/aɪ/', phonetic: 'eye', audioFile: '/voice/i.mp3' },
    { letter: 'Oo', sound: '/oʊ/', phonetic: 'oh', audioFile: '/voice/o.mp3' },
    { letter: 'Uu', sound: '/juː/', phonetic: 'you', audioFile: '/voice/u.mp3' },
    { letter: 'Yy', sound: '/waɪ/', phonetic: 'why', audioFile: '/voice/y.mp3' },
  ];

  const sections = [
    { id: 'consonants', title: 'Consonant Letters', letters: consonantSounds },
    { id: 'vowels', title: 'Vowel Letters', letters: vowelSounds },
  ];

  // Initialize audio on first user interaction
  useEffect(() => {
    const enableAudio = () => {
      if (!audioEnabled) {
        // Test audio by trying to load one of the voice files
        const testAudio = new Audio('/voice/a.mp3');
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

  const playSound = (letter: LetterSound) => {
    if (!audioEnabled) {
      setAudioError('Please tap the screen first to enable audio');
      return;
    }

    try {
      const audio = new Audio(letter.audioFile);
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

  const handleLetterClick = (letter: LetterSound) => {
    setSelectedLetter(letter.letter);
    playSound(letter);
  };

  const handleComplete = () => {
    if (audioEnabled) {
      playSuccessSound();
    }
    onComplete();
  };

  const currentLetters = sections.find(s => s.id === currentSection)?.letters || [];

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
            <span>Tap any letter to enable audio</span>
          </div>
        </div>
      )}

      {/* Section Navigation */}
      <div className="flex flex-wrap gap-6 justify-center mb-12">
        {sections.map((section) => (
          <MotionButton
            key={section.id}
            variant="nav"
            onClick={() => setCurrentSection(section.id as 'consonants' | 'vowels')}
            className={currentSection === section.id ? 'active' : ''}
          >
            {section.title}
          </MotionButton>
        ))}
      </div>

      {/* Letter Grid */}
      <div className="alphabet-card">
        <div className="text-center mb-8">
          
          {/* Educational Info Banner */}
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full text-base font-semibold bg-gray-100/80 border border-gray-300/50">
            <span className="text-2xl emoji-no-background">
              {currentSection === 'vowels' ? '🎵' : '🗣️'}
            </span>
            <span className="text-gray-700">
              {currentSection === 'vowels' 
                ? 'These 6 letters make the music of speech' 
                : `These ${consonantSounds.length} letters form the structure of words`
              }
            </span>
          </div>
        </div>
        
        <div className="simple-card-grid">
          {currentLetters.map((letter) => (
            <MotionCard
              key={letter.letter}
              type="letter"
              selected={selectedLetter === letter.letter}
              onClick={() => handleLetterClick(letter)}
              className={currentSection === 'vowels' ? 'motion-card-letter-vowel' : 'motion-card-letter-consonant'}
            >
              <div className="flex flex-col items-center justify-center gap-[var(--space-2)]">
                <span className="text-[var(--font-size-3xl)] md:text-[var(--font-size-4xl)] font-bold leading-none">
                  {letter.letter.charAt(0)}<span className="ml-2">{letter.letter.charAt(1)}</span>
                </span>
                <div className="flex items-center gap-[var(--space-1)]">
                  <Volume2 size={16} className="opacity-70" />
                  <span className="text-[var(--font-size-xs)] font-medium opacity-70 hidden sm:inline">
                    {letter.sound}
                  </span>
                </div>
              </div>
            </MotionCard>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <InstructionSection 
        title="Как изучать алфавит"
        instructions={[
          { text: "Нажмите на любую букву, чтобы услышать её правильное произношение" },
          { text: "Повторяйте каждую букву вслух для улучшения произношения" },
          { text: "Изучите различия между гласными и согласными буквами" },
          { text: "Практикуйтесь регулярно для запоминания правильного произношения" }
        ]}
      />

      {/* Complete Button */}
      <div className="text-center">
        <MotionButton
          variant="primary"
          size="large"
          onClick={handleComplete}
          className="group"
        >
          <span>Complete Alphabet Practice</span>
          <MotionIcon animation="spin">
            ✨
          </MotionIcon>
        </MotionButton>
      </div>
    </div>
  );
} 