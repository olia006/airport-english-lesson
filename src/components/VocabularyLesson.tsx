'use client';

import { useState, useEffect } from 'react';
import { Volume2, Plane, Shield, Users, FileText, Ban, CheckCircle, Clock, Briefcase, CreditCard, AlertTriangle, Languages } from 'lucide-react';
import { MotionCard, MotionButton } from './motion/MotionComponents';
import InstructionSection from './InstructionSection';
import { playSuccessSound } from './utils/audioUtils';

interface VocabularyLessonProps {
  onComplete: () => void;
}

interface VocabularyItem {
  word: string;
  meaning: string;
  meaningRussian: string;
  icon: React.ReactNode;
  imageUrl?: string;
  category: string;
  audioFile: string;
}

export default function VocabularyLesson({ onComplete }: VocabularyLessonProps) {
  const [currentCategory, setCurrentCategory] = useState<string>('booking');
  const [selectedWord, setSelectedWord] = useState<string>('');
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioError, setAudioError] = useState<string>('');
  const [showTranslation, setShowTranslation] = useState<string>('');

  const vocabulary: VocabularyItem[] = [
    // Booking & Tickets
    { word: 'Book (a ticket)', meaning: 'To reserve a ticket for travel', meaningRussian: 'Забронировать билет на поездку', icon: <CreditCard className="w-10 h-10" />, imageUrl: '/images/order tickets online.png', category: 'booking', audioFile: '/airportvocabulary/To register for your flight.mp3' },
    { word: 'One-way (ticket)', meaning: 'Ticket for one direction only', meaningRussian: 'Билет только в одну сторону', icon: <FileText className="w-10 h-10" />, imageUrl: '/images/oneway-airplane-vector-260nw-295783898.jpg copy.jpg', category: 'booking', audioFile: '/airportvocabulary/Ticket for one direction only.mp3' },
    { word: 'Return ticket', meaning: 'Ticket for going and coming back', meaningRussian: 'Билет туда и обратно', icon: <FileText className="w-10 h-10" />, imageUrl: '/images/returnticket.jpg', category: 'booking', audioFile: '/airportvocabulary/Ticket for going and coming back.mp3' },
    { word: 'Round-trip ticket', meaning: 'Ticket for complete journey there and back', meaningRussian: 'Билет на полный маршрут туда и обратно', icon: <FileText className="w-10 h-10" />, imageUrl: '/images/round-trip-airplane-vector-260nw-295783898.jpg copy.jpg', category: 'booking', audioFile: '/airportvocabulary/Round-trip_ticket.mp3' },
    { word: 'Travel agent', meaning: 'Person who helps you book travel', meaningRussian: 'Человек, который помогает забронировать поездку', icon: <Users className="w-10 h-10" />, imageUrl: '/images/travel-agent-working-with-client-in-light-modern-o-2025-03-08-00-29-18-utc.jpg', category: 'booking', audioFile: '/airportvocabulary/Travel_agent.mp3' },
    { word: 'Visa', meaning: 'Permission to enter a country', meaningRussian: 'Разрешение на въезд в страну', icon: <FileText className="w-10 h-10" />, imageUrl: '/images/visa.jpg.webp', category: 'booking', audioFile: '/airportvocabulary/Visa.mp3' },
    
    // Airline & Classes
    { word: 'Airline', meaning: 'Company that operates flights', meaningRussian: 'Компания, которая выполняет рейсы', icon: <Plane className="w-10 h-10" />, imageUrl: '/images/english-vocabulary-words-airport1-e1686673853429.jpg.webp', category: 'airline', audioFile: '/airportvocabulary/Airline.mp3' },
    { word: 'Economy class', meaning: 'Basic seating class on airplane', meaningRussian: 'Базовый класс мест в самолете', icon: <Plane className="w-10 h-10" />, imageUrl: '/images/economyclass.jpg.webp', category: 'airline', audioFile: '/airportvocabulary/Economy class.mp3' },
    { word: 'Business class', meaning: 'Premium seating class with more comfort', meaningRussian: 'Премиум класс мест с большим комфортом', icon: <Plane className="w-10 h-10" />, imageUrl: '/images/businessclass.jpg.webp', category: 'airline', audioFile: '/airportvocabulary/Business class.mp3' },
    { word: 'First class', meaning: 'Most expensive and comfortable class', meaningRussian: 'Самый дорогой и комфортный класс', icon: <Plane className="w-10 h-10" />, imageUrl: '/images/firstclass.jpg.webp', category: 'airline', audioFile: '/airportvocabulary/First class.mp3' },
    { word: 'Window seat', meaning: 'Seat next to the window', meaningRussian: 'Место у окна', icon: <Plane className="w-10 h-10" />, imageUrl: '/images/window-seat-on-plane.jpg', category: 'airline', audioFile: '/airportvocabulary/Window seat .mp3' },
    { word: 'Aisle seat', meaning: 'Seat next to the walkway', meaningRussian: 'Место у прохода', icon: <Plane className="w-10 h-10" />, imageUrl: '/images/aisleseat.jpg', category: 'airline', audioFile: '/airportvocabulary/Aisle seat.mp3' },
    { word: 'Middle seat', meaning: 'Seat between window and aisle', meaningRussian: 'Место между окном и проходом', icon: <Plane className="w-10 h-10" />, imageUrl: '/images/middleseat.png.webp', category: 'airline', audioFile: '/airportvocabulary/Middle seat.mp3' },
    { word: 'Emergency exit', meaning: 'Exit for emergency situations', meaningRussian: 'Выход для чрезвычайных ситуаций', icon: <AlertTriangle className="w-10 h-10" />, imageUrl: '/images/emergencyexit.jpg', category: 'airline', audioFile: '/airportvocabulary/Emergency exit.mp3' },
    { word: 'Fasten seatbelts', meaning: 'Buckle your safety belt', meaningRussian: 'Пристегнуть ремень безопасности', icon: <AlertTriangle className="w-10 h-10" />, imageUrl: '/images/Aircraft-seatbelt.jpg', category: 'airline', audioFile: '/airportvocabulary/Fasten seatbelts.mp3' },
    { word: 'Vegetarian dish', meaning: 'Food without meat', meaningRussian: 'Еда без мяса', icon: <FileText className="w-10 h-10" />, imageUrl: '/images/vegetariandish.jpg', category: 'airline', audioFile: '/airportvocabulary/Vegetarian dish.mp3' },
    { word: 'Water', meaning: 'Drinking water', meaningRussian: 'Питьевая вода', icon: <FileText className="w-10 h-10" />, imageUrl: '/images/water.webp', category: 'airline', audioFile: '/airportvocabulary/Water.mp3' },
    { word: 'Tea', meaning: 'Hot drink made from tea leaves', meaningRussian: 'Горячий напиток из чайных листьев', icon: <FileText className="w-10 h-10" />, imageUrl: '/images/tea.jpg', category: 'airline', audioFile: '/airportvocabulary/Tea.mp3' },
    { word: 'Coffee', meaning: 'Hot drink made from coffee beans', meaningRussian: 'Горячий напиток из кофейных зерен', icon: <FileText className="w-10 h-10" />, imageUrl: '/images/coffee.jpg', category: 'airline', audioFile: '/airportvocabulary/Coffee.mp3' },
    { word: 'Milk', meaning: 'White drink from cows', meaningRussian: 'Белый напиток от коров', icon: <FileText className="w-10 h-10" />, imageUrl: '/images/img_Milk-Detail1539705012.jpg', category: 'airline', audioFile: '/airportvocabulary/Milk.mp3' },
    { word: 'Juice', meaning: 'Drink made from fruits', meaningRussian: 'Напиток из фруктов', icon: <FileText className="w-10 h-10" />, imageUrl: '/images/tomato-juice-airplanes-GettyImages-958552090-primary-2000-e0f1934a07bd465e95adc9a149eab4d8.jpg', category: 'airline', audioFile: '/airportvocabulary/Juice.mp3' },
    { word: 'Long-haul flight', meaning: 'Flight that travels a long distance', meaningRussian: 'Рейс, который преодолевает большое расстояние', icon: <Plane className="w-10 h-10" />, imageUrl: '/images/Long-haul flight.jpg', category: 'airline', audioFile: '/airportvocabulary/Long-haul flight.mp3' },
    
    // Check-in & Boarding
    { word: 'Check in', meaning: 'To register for your flight', meaningRussian: 'Зарегистрироваться на рейс', icon: <FileText className="w-10 h-10" />, imageUrl: '/images/check-in.jpg', category: 'checkin', audioFile: '/airportvocabulary/Check in.mp3' },
    { word: 'Counter', meaning: 'Desk where you check in for your flight', meaningRussian: 'Стол, где вы регистрируетесь на рейс', icon: <FileText className="w-10 h-10" />, imageUrl: '/images/airport-check-in-counters-for-background-no-peopl-2025-02-24-16-15-02-utc.jpg', category: 'checkin', audioFile: '/airportvocabulary/Counter.mp3' },
    { word: 'Boarding pass', meaning: 'Ticket to board the plane', meaningRussian: 'Билет для посадки в самолет', icon: <FileText className="w-10 h-10" />, imageUrl: '/images/boardingpass.webp', category: 'checkin', audioFile: '/airportvocabulary/Boarding pass.mp3' },
    { word: 'Boarding time', meaning: 'Time when you can board the plane', meaningRussian: 'Время, когда можно садиться в самолет', icon: <Clock className="w-10 h-10" />, imageUrl: '/images/boardingtime.jpg', category: 'checkin', audioFile: '/airportvocabulary/Boarding time.mp3' },
    { word: 'Board', meaning: 'To enter the airplane', meaningRussian: 'Войти в самолет', icon: <Plane className="w-10 h-10" />, imageUrl: '/images/boarding.jpg', category: 'checkin', audioFile: '/airportvocabulary/Board.mp3' },
    { word: 'Landing', meaning: 'When the plane comes down to the ground', meaningRussian: 'Когда самолет опускается на землю', icon: <Plane className="w-10 h-10" />, imageUrl: '/images/landing.jpg', category: 'checkin', audioFile: '/airportvocabulary/Landing.mp3' },
    { word: 'Take off', meaning: 'When the plane leaves the ground', meaningRussian: 'Когда самолет отрывается от земли', icon: <Plane className="w-10 h-10" />, imageUrl: '/images/plane-taking-off-runway.jpg', category: 'checkin', audioFile: '/airportvocabulary/Take off.mp3' },
    { word: 'Gate', meaning: 'Area where you board the plane', meaningRussian: 'Место, где вы садитесь в самолет', icon: <Plane className="w-10 h-10" />, imageUrl: '/images/gate.jpg.webp', category: 'checkin', audioFile: '/airportvocabulary/Gate.mp3' },
    
    // Flight Status
    { word: 'Arrivals', meaning: 'Flights that are landing', meaningRussian: 'Рейсы, которые приземляются', icon: <Plane className="w-10 h-10" />, imageUrl: '/images/arrivals.jpg', category: 'status', audioFile: '/airportvocabulary/Arrivals.mp3' },
    { word: 'Departures', meaning: 'Flights that are taking off', meaningRussian: 'Рейсы, которые взлетают', icon: <Plane className="w-10 h-10" />, imageUrl: '/images/departures.jpg', category: 'status', audioFile: '/airportvocabulary/Departures.mp3' },
    { word: 'On time', meaning: 'Flight is not late', meaningRussian: 'Рейс не опаздывает', icon: <CheckCircle className="w-10 h-10" />, imageUrl: '/images/ontime-1750x1081.jpg', category: 'status', audioFile: '/airportvocabulary/On time.mp3' },
    { word: 'Delayed', meaning: 'Flight is late', meaningRussian: 'Рейс опаздывает', icon: <AlertTriangle className="w-10 h-10" />, imageUrl: '/images/delayed.jpg', category: 'status', audioFile: '/airportvocabulary/Delayed.mp3' },
    { word: 'Cancelled', meaning: 'Flight will not depart', meaningRussian: 'Рейс не вылетит', icon: <Ban className="w-10 h-10" />, imageUrl: '/images/cancelled.jpg', category: 'status', audioFile: '/airportvocabulary/Cancelled.mp3' },
    { word: 'Stopover / Layover', meaning: 'Short stop between flights', meaningRussian: 'Короткая остановка между рейсами', icon: <Clock className="w-10 h-10" />, imageUrl: '/images/Layover-vs-stopover-ddiffeerence.jpg', category: 'status', audioFile: '/airportvocabulary/Layover.mp3' },
    { word: 'Business lounge', meaning: 'Premium waiting area for business travelers', meaningRussian: 'Премиум зона ожидания для бизнес-путешественников', icon: <Users className="w-10 h-10" />, imageUrl: '/images/businesslounge.jpg', category: 'status', audioFile: '/airportvocabulary/Business lounge.mp3' },
    { word: 'Information desk', meaning: 'Desk where you can ask questions', meaningRussian: 'Стол, где можно задать вопросы', icon: <FileText className="w-10 h-10" />, imageUrl: '/images/information.jpg', category: 'status', audioFile: '/airportvocabulary/Information desk.mp3' },
    { word: 'WiFi connection', meaning: 'Wireless internet access', meaningRussian: 'Беспроводной доступ в интернет', icon: <FileText className="w-10 h-10" />, imageUrl: '/images/JeSiXd4BDg7omqbtevFUo3.jpg', category: 'status', audioFile: '/airportvocabulary/WiFi connection.mp3' },
    { word: 'Phone charger', meaning: 'Device to charge your phone', meaningRussian: 'Устройство для зарядки телефона', icon: <FileText className="w-10 h-10" />, imageUrl: '/images/phonecharger.jpg.webp', category: 'status', audioFile: '/airportvocabulary/Phone charger.mp3' },
    
    // Luggage & Baggage
    { word: 'Luggage', meaning: 'Bags and suitcases', meaningRussian: 'Сумки и чемоданы', icon: <Briefcase className="w-10 h-10" />, imageUrl: '/images/luggage.jpg', category: 'luggage', audioFile: '/airportvocabulary/Luggage.mp3' },
    { word: 'Carry on (luggage)', meaning: 'Small bag you take on the plane', meaningRussian: 'Небольшая сумка, которую вы берете в самолет', icon: <Briefcase className="w-10 h-10" />, imageUrl: '/images/carry-on.jpg.webp', category: 'luggage', audioFile: '/airportvocabulary/Carry on (luggage).mp3' },
    { word: 'Baggage claim', meaning: 'Moving belt where you collect luggage', meaningRussian: 'Движущаяся лента, где вы забираете багаж', icon: <Briefcase className="w-10 h-10" />, imageUrl: '/images/airport-baggage-claim-2025-04-05-07-23-58-utc.jpg', category: 'luggage', audioFile: '/airportvocabulary/Baggage claim.mp3' },
    { word: 'Oversized/Overweight baggage', meaning: 'Luggage that is too big or heavy', meaningRussian: 'Багаж, который слишком большой или тяжелый', icon: <Briefcase className="w-10 h-10" />, imageUrl: '/images/oversized.jpg', category: 'luggage', audioFile: '/airportvocabulary/Oversized:Overweight baggage.mp3' },
    { word: 'Fragile', meaning: 'Easily broken, needs careful handling', meaningRussian: 'Легко ломается, требует осторожного обращения', icon: <AlertTriangle className="w-10 h-10" />, imageUrl: '/images/fragile.jpg', category: 'luggage', audioFile: '/airportvocabulary/Fragile.mp3' },
    { word: 'Lost luggage', meaning: 'Baggage that cannot be found', meaningRussian: 'Багаж, который не могут найти', icon: <AlertTriangle className="w-10 h-10" />, imageUrl: '/images/lost.png', category: 'luggage', audioFile: '/airportvocabulary/Lost luggage.mp3' },
    
    // Security & Documents
    { word: 'Identification (ID)', meaning: 'Document that proves who you are', meaningRussian: 'Документ, который доказывает, кто вы', icon: <FileText className="w-10 h-10" />, imageUrl: '/images/passport.jpg.webp', category: 'security', audioFile: '/airportvocabulary/Identification (ID).mp3' },
    { word: 'Customs', meaning: 'Border control for goods and luggage', meaningRussian: 'Пограничный контроль для товаров и багажа', icon: <Shield className="w-10 h-10" />, imageUrl: '/images/customs.jpg.webp', category: 'security', audioFile: '/airportvocabulary/Customs.mp3' },
    { word: 'Connection', meaning: 'Flight that connects to another flight', meaningRussian: 'Рейс, который соединяется с другим рейсом', icon: <Plane className="w-10 h-10" />, imageUrl: '/images/yellow-black-transfer-transit-connecting-flights-information-board-sign-airport_665346-103149.jpg.avif', category: 'security', audioFile: '/airportvocabulary/Connection.mp3' },
    { word: 'Liquids', meaning: 'Fluid substances (water, shampoo, etc.)', meaningRussian: 'Жидкие вещества (вода, шампунь и т.д.)', icon: <Ban className="w-10 h-10" />, imageUrl: '/images/liquid.jpg', category: 'security', audioFile: '/airportvocabulary/Liquids.mp3' },
    { word: 'Declare', meaning: 'To report items to customs', meaningRussian: 'Заявить предметы в таможне', icon: <FileText className="w-10 h-10" />, imageUrl: '/images/declare.jpg', category: 'security', audioFile: '/airportvocabulary/Declare.mp3' },
    { word: 'Nothing to declare', meaning: 'No items to report to customs', meaningRussian: 'Нет предметов для заявления в таможне', icon: <CheckCircle className="w-10 h-10" />, imageUrl: '/images/nothing to declare.jpg.webp', category: 'security', audioFile: '/airportvocabulary/Nothing to declare.mp3' },
    { word: 'Duty-free', meaning: 'Items that do not need customs tax', meaningRussian: 'Предметы, которые не облагаются таможенной пошлиной', icon: <CheckCircle className="w-10 h-10" />, imageUrl: '/images/dutyfree.webp', category: 'security', audioFile: '/airportvocabulary/Duty-free.mp3' },
  ];

  const categories = [
    { id: 'booking', name: 'Booking & Tickets', color: 'from-blue-400 to-blue-600' },
    { id: 'airline', name: 'Airline & Classes', color: 'from-green-400 to-green-600' },
    { id: 'checkin', name: 'Check-in & Boarding', color: 'from-purple-400 to-purple-600' },
    { id: 'status', name: 'Flight Status', color: 'from-orange-400 to-orange-600' },
    { id: 'luggage', name: 'Luggage & Baggage', color: 'from-red-400 to-red-600' },
    { id: 'security', name: 'Security & Documents', color: 'from-indigo-400 to-indigo-600' },
  ];

  // Initialize audio on first user interaction
  useEffect(() => {
    const enableAudio = () => {
      if (!audioEnabled) {
        // Test audio by trying to load one of the vocabulary files
        const testAudio = new Audio('/airportvocabulary/Airline.mp3');
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

  const playSound = (word: string) => {
    if (!audioEnabled) {
      setAudioError('Please tap the screen first to enable audio');
      return;
    }

    const vocabularyItem = vocabulary.find(item => item.word === word);
    if (!vocabularyItem) return;

    try {
      const audio = new Audio(vocabularyItem.audioFile);
      audio.volume = 0.8; // Good volume for mobile devices
      
      // Stop any currently playing audio
      const allAudios = document.querySelectorAll('audio');
      allAudios.forEach(audio => audio.pause());
      
      // Add better error handling
      audio.addEventListener('error', (e) => {
        console.error('Audio error for file:', vocabularyItem.audioFile, e);
        setAudioError(`Audio file not found: ${vocabularyItem.word}`);
      });
      
      audio.addEventListener('loadstart', () => {
        console.log('Loading audio:', vocabularyItem.audioFile);
      });
      
      audio.addEventListener('canplaythrough', () => {
        console.log('Audio ready to play:', vocabularyItem.audioFile);
        setAudioError(''); // Clear any previous errors
      });
      
      // Play the new audio
      audio.play().then(() => {
        setAudioError(''); // Clear any previous errors
      }).catch((error) => {
        console.error('Audio playback error:', error);
        setAudioError(`Audio playback failed for: ${vocabularyItem.word}. Please try again.`);
        
        // Fallback to speech synthesis if audio file fails
        if ('speechSynthesis' in window) {
          try {
            const utterance = new SpeechSynthesisUtterance(vocabularyItem.word);
            utterance.rate = 0.8;
            utterance.pitch = 1;
            utterance.lang = 'en-US';
            speechSynthesis.speak(utterance);
            setAudioError('Using speech synthesis as fallback');
          } catch (fallbackError) {
            console.error('Fallback speech synthesis also failed:', fallbackError);
            setAudioError('Audio not available. Please check your connection.');
          }
        }
      });
      
    } catch (error) {
      console.error('Audio error:', error);
      setAudioError('Audio not supported on this device');
    }
  };

  const playMeaningSound = (meaning: string) => {
    if (!audioEnabled) {
      setAudioError('Please tap the screen first to enable audio');
      return;
    }

    try {
      // Stop any currently playing audio
      const allAudios = document.querySelectorAll('audio');
      allAudios.forEach(audio => audio.pause());
      
      // Use speech synthesis for the meaning text
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(meaning);
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
        setAudioError(''); // Clear any previous errors
      } else {
        setAudioError('Speech synthesis not supported on this device');
      }
      
    } catch (error) {
      console.error('Speech synthesis error:', error);
      setAudioError('Audio not supported on this device');
    }
  };

  const handleWordClick = (word: string) => {
    setSelectedWord(word);
    playSound(word);
  };

  const toggleTranslation = (word: string) => {
    if (showTranslation === word) {
      setShowTranslation(''); // Hide if already showing
    } else {
      setShowTranslation(word); // Show for this word
    }
  };

  const handleComplete = () => {
    if (audioEnabled) {
      playSuccessSound();
    }
    onComplete();
  };

  const currentVocabulary = vocabulary.filter(item => item.category === currentCategory);

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
            <span>Tap any word to enable audio</span>
          </div>
        </div>
      )}

      {/* Category Navigation */}
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((category) => (
          <MotionButton
            key={category.id}
            variant="nav"
            onClick={() => setCurrentCategory(category.id)}
            className={currentCategory === category.id ? 'active' : ''}
          >
            {category.name}
          </MotionButton>
        ))}
      </div>

      {/* Vocabulary Grid */}
      <div className="vocabulary-container">
        <div className="vocabulary-card-grid">
          {currentVocabulary.map((item) => (
            <div key={item.word} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden" style={{ borderRadius: 'var(--radius-xl)' }}>
              {/* Image */}
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.word}
                  className="w-full h-32 object-cover"
                />
              )}
              
              {/* Content */}
              <div className="p-4">
                {/* Word Title */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-gray-800">{item.word}</h3>
                  <button
                    onClick={() => playSound(item.word)}
                    className="p-2 hover:bg-blue-50 transition-colors"
                    style={{ borderRadius: '9999px' }}
                    title="Play pronunciation"
                  >
                    <Volume2 size={20} className="text-blue-600" />
                  </button>
                </div>
                
                {/* English Meaning */}
                <div className="flex items-start gap-2 mb-4">
                  <p className="text-gray-700 leading-relaxed flex-1">{item.meaning}</p>
                  <button
                    onClick={() => playMeaningSound(item.meaning)}
                    className="p-1 hover:bg-blue-50 transition-colors flex-shrink-0"
                    style={{ borderRadius: 'var(--radius-md)' }}
                    title="Play meaning"
                  >
                    <Volume2 size={16} className="text-blue-500" />
                  </button>
                </div>
                
                {/* Translation Button */}
                <div className="flex justify-center">
                  <button
                    onClick={() => toggleTranslation(item.word)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 transition-colors"
                    style={{ borderRadius: 'var(--radius-lg)' }}
                  >
                    <Languages size={16} />
                    {showTranslation === item.word ? 'Hide Translation' : 'Show Translation'}
                  </button>
                </div>
                
                {/* Translation (conditionally shown) */}
                {showTranslation === item.word && (
                  <div className="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400" style={{ borderRadius: 'var(--radius-lg)' }}>
                    <p className="text-blue-800 font-medium">{item.meaningRussian}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <InstructionSection 
        title="Как изучать словарь"
        instructions={[
          { text: "Нажмите на любое слово, чтобы услышать его произношение" },
          { text: "Изучайте слова по категориям для лучшего запоминания" },
          { text: "Повторяйте слова вслух для улучшения произношения" },
          { text: "Используйте изображения для ассоциативного запоминания" }
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
          <span>Complete Vocabulary Practice</span>
          <Volume2 
            size={20} 
            className="text-brand-secondary group-hover:text-brand-accent transition-colors"
          />
        </MotionButton>
      </div>
    </div>
  );
} 