'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, RotateCcw, Volume2 } from 'lucide-react';
import { MotionCard, MotionButton } from './motion/MotionComponents';
import InstructionSection from './InstructionSection';
import { playSuccessSound } from './utils/audioUtils';

interface WordPictureMatchProps {
  onComplete: () => void;
}

interface MatchItem {
  id: string;
  word: string;
  image: string;
  category: string;
}

export default function WordPictureMatch({ onComplete }: WordPictureMatchProps) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string>('booking');
  const [showCelebrationPopup, setShowCelebrationPopup] = useState(false);

  const matchItems: MatchItem[] = [
    // Booking & Tickets
    { id: '1', word: 'Book (a ticket)', image: '/images/order tickets online.png', category: 'booking' },
    { id: '2', word: 'One-way (ticket)', image: '/images/oneway-airplane-vector-260nw-295783898.jpg copy.jpg', category: 'booking' },
    { id: '3', word: 'Return ticket', image: '/images/returnticket.jpg', category: 'booking' },
    { id: '4', word: 'Round-trip ticket', image: '/images/round-trip-airplane-vector-260nw-295783898.jpg copy.jpg', category: 'booking' },
    { id: '5', word: 'Travel agent', image: '/images/travel-agent-working-with-client-in-light-modern-o-2025-03-08-00-29-18-utc.jpg', category: 'booking' },
    { id: '6', word: 'Visa', image: '/images/visa.jpg.webp', category: 'booking' },
    
    // Airline & Classes
    { id: '7', word: 'Airline', image: '/images/english-vocabulary-words-airport1-e1686673853429.jpg.webp', category: 'airline' },
    { id: '8', word: 'Economy class', image: '/images/economyclass.jpg.webp', category: 'airline' },
    { id: '9', word: 'Business class', image: '/images/businessclass.jpg.webp', category: 'airline' },
    { id: '10', word: 'First class', image: '/images/firstclass.jpg.webp', category: 'airline' },
    { id: '11', word: 'Window seat', image: '/images/window-seat-on-plane.jpg', category: 'airline' },
    { id: '12', word: 'Aisle seat', image: '/images/aisleseat.jpg', category: 'airline' },
    { id: '13', word: 'Middle seat', image: '/images/middleseat.png.webp', category: 'airline' },
    { id: '14', word: 'Emergency exit', image: '/images/emergencyexit.jpg', category: 'airline' },
    { id: '15', word: 'Fasten seatbelts', image: '/images/Aircraft-seatbelt.jpg', category: 'airline' },
    { id: '16', word: 'Vegetarian dish', image: '/images/vegetariandish.jpg', category: 'airline' },
    { id: '17', word: 'Water', image: '/images/water.webp', category: 'airline' },
    { id: '18', word: 'Tea', image: '/images/tea.jpg', category: 'airline' },
    { id: '19', word: 'Coffee', image: '/images/coffee.jpg', category: 'airline' },
    { id: '20', word: 'Milk', image: '/images/img_Milk-Detail1539705012.jpg', category: 'airline' },
    { id: '21', word: 'Juice', image: '/images/tomato-juice-airplanes-GettyImages-958552090-primary-2000-e0f1934a07bd465e95adc9a149eab4d8.jpg', category: 'airline' },
    { id: '22', word: 'Long-haul flight', image: '/images/Long-haul flight.jpg', category: 'airline' },
    
    // Check-in & Boarding
    { id: '23', word: 'Check in', image: '/images/check-in.jpg', category: 'checkin' },
    { id: '24', word: 'Counter', image: '/images/airport-check-in-counters-for-background-no-peopl-2025-02-24-16-15-02-utc.jpg', category: 'checkin' },
    { id: '25', word: 'Boarding pass', image: '/images/boardingpass.webp', category: 'checkin' },
    { id: '26', word: 'Boarding time', image: '/images/boardingtime.jpg', category: 'checkin' },
    { id: '27', word: 'Board', image: '/images/boarding.jpg', category: 'checkin' },
    { id: '28', word: 'Landing', image: '/images/landing.jpg', category: 'checkin' },
    { id: '29', word: 'Take off', image: '/images/plane-taking-off-runway.jpg', category: 'checkin' },
    { id: '30', word: 'Gate', image: '/images/gate.jpg.webp', category: 'checkin' },
    
    // Flight Status
    { id: '31', word: 'Arrivals', image: '/images/arrivals.jpg', category: 'status' },
    { id: '32', word: 'Departures', image: '/images/departures.jpg', category: 'status' },
    { id: '33', word: 'On time', image: '/images/ontime-1750x1081.jpg', category: 'status' },
    { id: '34', word: 'Delayed', image: '/images/delayed.jpg', category: 'status' },
    { id: '35', word: 'Cancelled', image: '/images/cancelled.jpg', category: 'status' },
    { id: '36', word: 'Stopover / Layover', image: '/images/Layover-vs-stopover-ddiffeerence.jpg', category: 'status' },
    { id: '37', word: 'Business lounge', image: '/images/businesslounge.jpg', category: 'status' },
    { id: '38', word: 'Information desk', image: '/images/information.jpg', category: 'status' },
    { id: '39', word: 'WiFi connection', image: '/images/JeSiXd4BDg7omqbtevFUo3.jpg', category: 'status' },
    { id: '40', word: 'Phone charger', image: '/images/phonecharger.jpg.webp', category: 'status' },
    
    // Luggage & Baggage
    { id: '41', word: 'Luggage', image: '/images/luggage.jpg', category: 'luggage' },
    { id: '42', word: 'Carry on (luggage)', image: '/images/carry-on.jpg.webp', category: 'luggage' },
    { id: '43', word: 'Conveyor belt / Carousel / Baggage claim', image: '/images/airport-baggage-claim-2025-04-05-07-23-58-utc.jpg', category: 'luggage' },
    { id: '44', word: 'Oversized baggage / Overweight baggage', image: '/images/oversized.jpg', category: 'luggage' },
    { id: '45', word: 'Fragile', image: '/images/fragile.jpg', category: 'luggage' },
    { id: '46', word: 'Lost luggage', image: '/images/lost.png', category: 'luggage' },
    
    // Security & Documents
    { id: '47', word: 'Identification (ID)', image: '/images/passport.jpg.webp', category: 'security' },
    { id: '48', word: 'Customs', image: '/images/customs.jpg.webp', category: 'security' },
    { id: '49', word: 'Connection', image: '/images/yellow-black-transfer-transit-connecting-flights-information-board-sign-airport_665346-103149.jpg.avif', category: 'security' },
    { id: '50', word: 'Liquids', image: '/images/liquid.jpg', category: 'security' },
    { id: '51', word: 'Declare', image: '/images/declare.jpg', category: 'security' },
    { id: '52', word: 'Nothing to declare', image: '/images/nothing to declare.jpg.webp', category: 'security' },
    { id: '53', word: 'Duty-free', image: '/images/dutyfree.webp', category: 'security' },
  ];

  const filteredItems = currentCategory === 'all' 
    ? matchItems 
    : matchItems.filter(item => item.category === currentCategory);
    
  const words = filteredItems.map(item => ({ id: item.id, word: item.word }));
  const images = filteredItems.map(item => ({ id: item.id, image: item.image }));

  const playSound = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  };

  const handleWordClick = (wordId: string) => {
    if (matches[wordId]) return; // Already matched
    
    console.log('Word clicked:', wordId);
    
    // Play audio for the word
    const word = words.find(w => w.id === wordId);
    if (word) {
      playSound(word.word);
    }
    
    setSelectedWord(wordId);
  };

  const handleImageClick = (imageId: string) => {
    if (Object.values(matches).includes(imageId)) return; // Already matched
    
    console.log('Image clicked:', imageId);
    
    setSelectedImage(imageId);
  };

  const playSuccessSound = () => {
    // Create a simple success sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Success sound: ascending notes
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const playWinnerSound = () => {
    // Create a more entertaining winner sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // More entertaining winner sound: ascending scale with celebration and fanfare
    const notes = [
      523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50, // C5 to C6
      1046.50, 987.77, 880.00, 783.99, 698.46, 659.25, 587.33, 523.25, // C6 back to C5
      523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00      // Final fanfare
    ];
    const duration = 0.12;
    
    notes.forEach((note, index) => {
      oscillator.frequency.setValueAtTime(note, audioContext.currentTime + (index * duration));
    });
    
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + (notes.length * duration));
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + (notes.length * duration));
  };

  const checkMatch = () => {
    if (!selectedWord || !selectedImage) return;

    console.log('Checking match:', { selectedWord, selectedImage });

    const wordItem = matchItems.find(item => item.id === selectedWord);
    const imageItem = matchItems.find(item => item.id === selectedImage);

    console.log('Found items:', { wordItem, imageItem });

    // Check if they match (order doesn't matter)
    const isMatch = wordItem && imageItem && wordItem.id === imageItem.id;
    
    console.log('Is match:', isMatch);

    if (isMatch) {
      // Correct match
      setMatches(prev => ({ ...prev, [selectedWord]: selectedImage }));
      setScore(prev => prev + 10);
      setAttempts(prev => prev + 1);
      
      // Play success sound
      playSuccessSound();
    } else {
      // Incorrect match
      setScore(prev => Math.max(0, prev - 2));
      setAttempts(prev => prev + 1);
    }

    setSelectedWord(null);
    setSelectedImage(null);

    // Check if current category is complete
    if (currentCategory === 'all') {
      // For 'all' category, check if all items are matched
      if (Object.keys(matches).length + 1 === matchItems.length) {
        console.log('All categories completed!', {
          currentCategory,
          matches: Object.keys(matches).length,
          totalItems: matchItems.length
        });
        setGameComplete(true);
        setShowCelebrationPopup(true);
        // Play winner sound and trigger celebration
        setTimeout(() => {
          playWinnerSound();
        }, 500);
      }
    } else {
      // For specific categories, check if that category is complete
      const currentCategoryItems = filteredItems.filter(item => item.category === currentCategory);
      const currentCategoryMatches = Object.keys(matches).filter(matchId => {
        const matchedItem = matchItems.find(item => item.id === matchId);
        return matchedItem && matchedItem.category === currentCategory;
      });
      
      if (currentCategoryMatches.length + 1 === currentCategoryItems.length) {
        console.log('Category completed!', {
          currentCategory,
          currentCategoryMatches: currentCategoryMatches.length,
          currentCategoryItems: currentCategoryItems.length,
          matches: Object.keys(matches).length
        });
        setGameComplete(true);
        setShowCelebrationPopup(true);
        // Play winner sound and trigger celebration
        setTimeout(() => {
          playWinnerSound();
        }, 500); // Small delay to let the last match animation complete
      }
    }
  };

  const resetGame = () => {
    setMatches({});
    setScore(0);
    setAttempts(0);
    setSelectedWord(null);
    setSelectedImage(null);
    setGameComplete(false);
    setShowCelebrationPopup(false);
  };

  useEffect(() => {
    if (selectedWord && selectedImage) {
      const timer = setTimeout(checkMatch, 500);
      return () => clearTimeout(timer);
    }
  }, [selectedWord, selectedImage]);

  const unmatchedWords = words.filter(word => !matches[word.id]);
  const unmatchedImages = images.filter(image => !Object.values(matches).includes(image.id));
  
  // Shuffle the images array for random order
  const shuffledImages = [...unmatchedImages].sort(() => Math.random() - 0.5);

  return (
    <>
      <div className="space-y-8">


      {/* Category Navigation */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Выберите категорию:</h4>
        <div className="flex flex-wrap justify-center gap-3">
          {['all', 'booking', 'airline', 'checkin', 'status', 'luggage', 'security'].map((category) => (
            <MotionButton
              key={category}
              variant="nav"
              onClick={() => setCurrentCategory(category)}
              className={currentCategory === category ? 'active' : ''}
            >
              {category === 'all' ? 'All Categories' : 
               category === 'booking' ? 'Booking & Tickets' :
               category === 'airline' ? 'Airline & Classes' :
               category === 'checkin' ? 'Check-in & Boarding' :
               category === 'status' ? 'Flight Status' :
               category === 'luggage' ? 'Luggage & Baggage' :
               'Security & Documents'}
            </MotionButton>
          ))}
        </div>
      </div>

      {/* Score and Progress */}
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
              <p className="text-2xl font-bold text-gray-800">{Object.keys(matches).length}/{matchItems.length}</p>
            </div>
          </div>
          <MotionButton
            variant="secondary"
            size="small"
            onClick={resetGame}
          >
            <RotateCcw size={16} className="mr-2" />
            Reset
          </MotionButton>
        </div>
        <div className="progress-bar">
          <div 
            className={`progress-dynamic progress-width-${Math.round((Object.keys(matches).length / matchItems.length) * 100)}`}
          ></div>
        </div>
      </div>

      {/* Game Area */}
      <div className="match-grid">
        {/* Words Container */}
        <div className="card">
          <h4 className="text-xl font-semibold text-gray-800 mb-6 text-center">Words</h4>
          <div className="grid grid-cols-2 gap-4 p-2">
            {unmatchedWords.map((word) => (
              <motion.div
                key={word.id}
                onClick={() => handleWordClick(word.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`vocabulary-card word-card transition-all duration-300 ${
                  selectedWord === word.id
                    ? 'selected'
                    : matches[word.id]
                    ? 'bg-green-50 border-green-300'
                    : 'hover:shadow-lg'
                } ${matches[word.id] ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="space-y-4 p-4">
                  <div className="text-center">
                    <span className="text-lg font-semibold text-gray-800 block mb-2">{word.word}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        const wordObj = words.find(w => w.id === word.id);
                        if (wordObj) playSound(wordObj.word);
                      }}
                      className="transition-all duration-200 hover:scale-110 text-[var(--brand-primary)] hover:text-[var(--brand-accent)]"
                      title="Play word pronunciation"
                    >
                      <Volume2 size={20} />
                    </button>
                  </div>
                  
                  {matches[word.id] && (
                    <div className="flex items-center justify-center">
                      <Check className="w-6 h-6 text-green-600" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Images Column */}
        <div className="card">
          <h4 className="text-xl font-semibold text-gray-800 mb-6 text-center">Pictures</h4>
          <div className="grid grid-cols-2 gap-4 p-2">
            {shuffledImages.map((image) => (
              <motion.div
                key={image.id}
                onClick={() => handleImageClick(image.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`vocabulary-card image-card transition-all duration-300 overflow-hidden ${
                  selectedImage === image.id
                    ? 'selected'
                    : Object.values(matches).includes(image.id)
                    ? 'bg-green-50 border-green-300'
                    : 'hover:shadow-lg'
                } ${Object.values(matches).includes(image.id) ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <img 
                  src={image.image} 
                  alt={image.image}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                
                {Object.values(matches).includes(image.id) && (
                  <div className="absolute top-2 right-2">
                    <Check className="w-6 h-6 text-green-600 bg-white rounded-full p-1 shadow-lg" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-12 max-w-2xl mx-auto px-8">
        <InstructionSection 
          title="Как сопоставлять слова и изображения"
          instructions={[
            { text: "Выберите слово из левой колонки, затем найдите соответствующее изображение справа" },
            { text: "Правильные совпадения приносят 10 очков, ошибки отнимают 2 очка" },
            { text: "Слушайте произношение каждого слова для лучшего запоминания" },
            { text: "Завершите все совпадения для продолжения обучения" }
          ]}
        />
      </div>

      {/* Complete Button */}
      <div className="text-center">
        <MotionButton
          variant="primary"
          size="large"
          onClick={() => {
            playSuccessSound();
            onComplete();
          }}
          className="text-xl px-12 py-4"
        >
          Complete Word-Picture Match ✓
        </MotionButton>
      </div>
      </div>

      {/* Celebration Popup - Outside main container */}
      {console.log('Popup state:', showCelebrationPopup)}
      {showCelebrationPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
          onClick={() => setShowCelebrationPopup(false)}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.6 }}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-8 rounded-2xl shadow-2xl max-w-md mx-4 z-[10000]"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              animate={{ 
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="text-6xl mb-4 text-center"
            >
              🎉
            </motion.div>
            <h3 className="text-3xl font-bold mb-2 text-center">Поздравляем!</h3>
            <p className="text-xl mb-4 text-center">Вы успешно завершили категорию!</p>
            <div className="flex justify-center items-center gap-4 text-2xl mb-6">
              <motion.span
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
              >
                🏆
              </motion.span>
              <motion.span
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
              >
                ⭐
              </motion.span>
              <motion.span
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: 0.4 }}
              >
                🎯
              </motion.span>
            </div>
            <div className="text-lg text-center mb-6">
              <p className="mb-2">Счет: <span className="font-bold text-yellow-300">{score}</span></p>
              <p>Попыток: <span className="font-bold text-yellow-300">{attempts}</span></p>
            </div>
            <div className="flex justify-center">
              <MotionButton
                variant="primary"
                onClick={() => setShowCelebrationPopup(false)}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-lg"
              >
                Продолжить
              </MotionButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
} 