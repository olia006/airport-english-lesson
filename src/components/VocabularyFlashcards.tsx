'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, RotateCcw, VolumeX } from 'lucide-react';
import { MotionButton } from './motion/MotionComponents';
import InstructionSection from './InstructionSection';
import { playSuccessSound } from './utils/audioUtils';

interface VocabularyFlashcardsProps {
  onComplete: () => void;
}

interface FlashcardItem {
  id: string;
  word: string;
  transcription: string;
  meaning: string;
  meaningRussian: string;
  imageUrl: string;
  category: string;
}

export default function VocabularyFlashcards({ onComplete }: VocabularyFlashcardsProps) {
  const [currentCategory, setCurrentCategory] = useState<string>('booking');
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isWordRevealed, setIsWordRevealed] = useState<boolean>(false);

  const vocabularyData: FlashcardItem[] = [
    // Booking & Tickets
    { id: 'book', word: 'Book (a ticket)', transcription: '/bʊk ə ˈtɪkɪt/', meaning: 'To reserve a ticket for travel', meaningRussian: 'Забронировать билет на поездку', imageUrl: '/images/order tickets online.png', category: 'booking' },
    { id: 'oneway', word: 'One-way (ticket)', transcription: '/ˈwʌn weɪ ˈtɪkɪt/', meaning: 'Ticket for one direction only', meaningRussian: 'Билет только в одну сторону', imageUrl: '/images/oneway-airplane-vector-260nw-295783898.jpg copy.jpg', category: 'booking' },
    { id: 'return', word: 'Return ticket', transcription: '/rɪˈtɜːn ˈtɪkɪt/', meaning: 'Ticket for going and coming back', meaningRussian: 'Билет туда и обратно', imageUrl: '/images/returnticket.jpg', category: 'booking' },
    { id: 'roundtrip', word: 'Round-trip ticket', transcription: '/ˈraʊnd trɪp ˈtɪkɪt/', meaning: 'Ticket for complete journey there and back', meaningRussian: 'Билет на полный маршрут туда и обратно', imageUrl: '/images/round-trip-airplane-vector-260nw-295783898.jpg copy.jpg', category: 'booking' },
    { id: 'travelagent', word: 'Travel agent', transcription: '/ˈtrævəl ˈeɪdʒənt/', meaning: 'Person who helps you book travel', meaningRussian: 'Человек, который помогает забронировать поездку', imageUrl: '/images/travel-agent-working-with-client-in-light-modern-o-2025-03-08-00-29-18-utc.jpg', category: 'booking' },
    { id: 'visa', word: 'Visa', transcription: '/ˈviːzə/', meaning: 'Permission to enter a country', meaningRussian: 'Разрешение на въезд в страну', imageUrl: '/images/visa.jpg.webp', category: 'booking' },
    
    // Airline & Classes
    { id: 'airline', word: 'Airline', transcription: '/ˈeəlaɪn/', meaning: 'Company that operates flights', meaningRussian: 'Компания, которая выполняет рейсы', imageUrl: '/images/english-vocabulary-words-airport1-e1686673853429.jpg.webp', category: 'airline' },
    { id: 'economy', word: 'Economy class', transcription: '/ɪˈkɒnəmi klɑːs/', meaning: 'Basic seating class on airplane', meaningRussian: 'Базовый класс мест в самолете', imageUrl: '/images/economyclass.jpg.webp', category: 'airline' },
    { id: 'business', word: 'Business class', transcription: '/ˈbɪznəs klɑːs/', meaning: 'Premium seating class with more comfort', meaningRussian: 'Премиум класс мест с большим комфортом', imageUrl: '/images/businessclass.jpg.webp', category: 'airline' },
    { id: 'firstclass', word: 'First class', transcription: '/fɜːst klɑːs/', meaning: 'Most expensive and comfortable class', meaningRussian: 'Самый дорогой и комфортный класс', imageUrl: '/images/firstclass.jpg.webp', category: 'airline' },
    { id: 'windowseat', word: 'Window seat', transcription: '/ˈwɪndəʊ siːt/', meaning: 'Seat next to the window', meaningRussian: 'Место у окна', imageUrl: '/images/window-seat-on-plane.jpg', category: 'airline' },
    { id: 'aisleseat', word: 'Aisle seat', transcription: '/aɪl siːt/', meaning: 'Seat next to the walkway', meaningRussian: 'Место у прохода', imageUrl: '/images/aisleseat.jpg', category: 'airline' },
    { id: 'middleseat', word: 'Middle seat', transcription: '/ˈmɪdl siːt/', meaning: 'Seat between window and aisle', meaningRussian: 'Место между окном и проходом', imageUrl: '/images/middleseat.png.webp', category: 'airline' },
    { id: 'emergencyexit', word: 'Emergency exit', transcription: '/ɪˈmɜːdʒənsi ˈeksɪt/', meaning: 'Exit for emergency situations', meaningRussian: 'Выход для чрезвычайных ситуаций', imageUrl: '/images/emergencyexit.jpg', category: 'airline' },
    { id: 'fastenseatbelts', word: 'Fasten seatbelts', transcription: '/ˈfɑːsn ˈsiːtbelts/', meaning: 'Buckle your safety belt', meaningRussian: 'Пристегнуть ремень безопасности', imageUrl: '/images/Aircraft-seatbelt.jpg', category: 'airline' },
    { id: 'vegetariandish', word: 'Vegetarian dish', transcription: '/ˌvedʒɪˈteəriən dɪʃ/', meaning: 'Food without meat', meaningRussian: 'Еда без мяса', imageUrl: '/images/vegetariandish.jpg', category: 'airline' },
    { id: 'water', word: 'Water', transcription: '/ˈwɔːtə/', meaning: 'Drinking water', meaningRussian: 'Питьевая вода', imageUrl: '/images/water.webp', category: 'airline' },
    { id: 'tea', word: 'Tea', transcription: '/tiː/', meaning: 'Hot drink made from tea leaves', meaningRussian: 'Горячий напиток из чайных листьев', imageUrl: '/images/tea.jpg', category: 'airline' },
    { id: 'coffee', word: 'Coffee', transcription: '/ˈkɒfi/', meaning: 'Hot drink made from coffee beans', meaningRussian: 'Горячий напиток из кофейных зерен', imageUrl: '/images/coffee.jpg', category: 'airline' },
    { id: 'milk', word: 'Milk', transcription: '/mɪlk/', meaning: 'White drink from cows', meaningRussian: 'Белый напиток от коров', imageUrl: '/images/img_Milk-Detail1539705012.jpg', category: 'airline' },
    { id: 'juice', word: 'Juice', transcription: '/dʒuːs/', meaning: 'Drink made from fruits', meaningRussian: 'Напиток из фруктов', imageUrl: '/images/tomato-juice-airplanes-GettyImages-958552090-primary-2000-e0f1934a07bd465e95adc9a149eab4d8.jpg', category: 'airline' },
    { id: 'longhaul', word: 'Long-haul flight', transcription: '/lɒŋ hɔːl flaɪt/', meaning: 'Flight that travels a long distance', meaningRussian: 'Рейс, который преодолевает большое расстояние', imageUrl: '/images/Long-haul flight.jpg', category: 'airline' },
    
    // Check-in & Boarding
    { id: 'checkin', word: 'Check in', transcription: '/tʃek ɪn/', meaning: 'To register for your flight', meaningRussian: 'Зарегистрироваться на рейс', imageUrl: '/images/check-in.jpg', category: 'checkin' },
    { id: 'counter', word: 'Counter', transcription: '/ˈkaʊntə/', meaning: 'Desk where you check in for your flight', meaningRussian: 'Стол, где вы регистрируетесь на рейс', imageUrl: '/images/airport-check-in-counters-for-background-no-peopl-2025-02-24-16-15-02-utc.jpg', category: 'checkin' },
    { id: 'boardingpass', word: 'Boarding pass', transcription: '/ˈbɔːdɪŋ pɑːs/', meaning: 'Ticket to board the plane', meaningRussian: 'Билет для посадки в самолет', imageUrl: '/images/boardingpass.webp', category: 'checkin' },
    { id: 'boardingtime', word: 'Boarding time', transcription: '/ˈbɔːdɪŋ taɪm/', meaning: 'Time when you can board the plane', meaningRussian: 'Время, когда можно садиться в самолет', imageUrl: '/images/boardingtime.jpg', category: 'checkin' },
    { id: 'board', word: 'Board', transcription: '/bɔːd/', meaning: 'To enter the airplane', meaningRussian: 'Войти в самолет', imageUrl: '/images/boarding.jpg', category: 'checkin' },
    { id: 'landing', word: 'Landing', transcription: '/ˈlændɪŋ/', meaning: 'When the plane comes down to the ground', meaningRussian: 'Когда самолет опускается на землю', imageUrl: '/images/landing.jpg', category: 'checkin' },
    { id: 'takeoff', word: 'Take off', transcription: '/teɪk ɒf/', meaning: 'When the plane leaves the ground', meaningRussian: 'Когда самолет отрывается от земли', imageUrl: '/images/plane-taking-off-runway.jpg', category: 'checkin' },
    { id: 'gate', word: 'Gate', transcription: '/ɡeɪt/', meaning: 'Area where you board the plane', meaningRussian: 'Место, где вы садитесь в самолет', imageUrl: '/images/gate.jpg.webp', category: 'checkin' },
    
    // Flight Status
    { id: 'arrivals', word: 'Arrivals', transcription: '/əˈraɪvəlz/', meaning: 'Flights that are landing', meaningRussian: 'Рейсы, которые приземляются', imageUrl: '/images/arrivals.jpg', category: 'status' },
    { id: 'departures', word: 'Departures', transcription: '/dɪˈpɑːtʃəz/', meaning: 'Flights that are taking off', meaningRussian: 'Рейсы, которые взлетают', imageUrl: '/images/departures.jpg', category: 'status' },
    { id: 'ontime', word: 'On time', transcription: '/ɒn taɪm/', meaning: 'Flight is not late', meaningRussian: 'Рейс не опаздывает', imageUrl: '/images/ontime-1750x1081.jpg', category: 'status' },
    { id: 'delayed', word: 'Delayed', transcription: '/dɪˈleɪd/', meaning: 'Flight is late', meaningRussian: 'Рейс опаздывает', imageUrl: '/images/delayed.jpg', category: 'status' },
    { id: 'cancelled', word: 'Cancelled', transcription: '/ˈkænsəld/', meaning: 'Flight will not depart', meaningRussian: 'Рейс не вылетит', imageUrl: '/images/cancelled.jpg', category: 'status' },
    { id: 'stopover', word: 'Stopover / Layover', transcription: '/ˈstɒpəʊvə ˈleɪəʊvə/', meaning: 'Short stop between flights', meaningRussian: 'Короткая остановка между рейсами', imageUrl: '/images/Layover-vs-stopover-ddiffeerence.jpg', category: 'status' },
    { id: 'businesslounge', word: 'Business lounge', transcription: '/ˈbɪznəs laʊndʒ/', meaning: 'Premium waiting area for business travelers', meaningRussian: 'Премиум зона ожидания для бизнес-путешественников', imageUrl: '/images/businesslounge.jpg', category: 'status' },
    { id: 'informationdesk', word: 'Information desk', transcription: '/ˌɪnfəˈmeɪʃn desk/', meaning: 'Desk where you can ask questions', meaningRussian: 'Стол, где можно задать вопросы', imageUrl: '/images/information.jpg', category: 'status' },
    { id: 'wifi', word: 'WiFi connection', transcription: '/ˈwaɪfaɪ kəˈnekʃn/', meaning: 'Wireless internet access', meaningRussian: 'Беспроводной доступ в интернет', imageUrl: '/images/JeSiXd4BDg7omqbtevFUo3.jpg', category: 'status' },
    { id: 'phonecharger', word: 'Phone charger', transcription: '/fəʊn ˈtʃɑːdʒə/', meaning: 'Device to charge your phone', meaningRussian: 'Устройство для зарядки телефона', imageUrl: '/images/phonecharger.jpg.webp', category: 'status' },
    
    // Luggage & Baggage
    { id: 'luggage', word: 'Luggage', transcription: '/ˈlʌɡɪdʒ/', meaning: 'Bags and suitcases', meaningRussian: 'Сумки и чемоданы', imageUrl: '/images/luggage.jpg', category: 'luggage' },
    { id: 'carryon', word: 'Carry on (luggage)', transcription: '/ˈkæri ɒn ˈlʌɡɪdʒ/', meaning: 'Small bag you take on the plane', meaningRussian: 'Небольшая сумка, которую вы берете в самолет', imageUrl: '/images/carry-on.jpg.webp', category: 'luggage' },
    { id: 'baggageclaim', word: 'Conveyor belt / Carousel / Baggage claim', transcription: '/kənˈveɪə belt ˈkærəsel ˈbæɡɪdʒ kleɪm/', meaning: 'Moving belt where you collect luggage', meaningRussian: 'Движущаяся лента, где вы забираете багаж', imageUrl: '/images/airport-baggage-claim-2025-04-05-07-23-58-utc.jpg', category: 'luggage' },
    { id: 'oversized', word: 'Oversized baggage / Overweight baggage', transcription: '/ˈəʊvəsaɪzd ˈbæɡɪdʒ ˈəʊvəweɪt ˈbæɡɪdʒ/', meaning: 'Luggage that is too big or heavy', meaningRussian: 'Багаж, который слишком большой или тяжелый', imageUrl: '/images/oversized.jpg', category: 'luggage' },
    { id: 'fragile', word: 'Fragile', transcription: '/ˈfrædʒaɪl/', meaning: 'Easily broken, needs careful handling', meaningRussian: 'Легко ломается, требует осторожного обращения', imageUrl: '/images/fragile.jpg', category: 'luggage' },
    { id: 'lost', word: 'Lost luggage', transcription: '/lɒst ˈlʌɡɪdʒ/', meaning: 'Baggage that cannot be found', meaningRussian: 'Багаж, который не могут найти', imageUrl: '/images/lost.png', category: 'luggage' },
    
    // Security & Documents
    { id: 'identification', word: 'Identification (ID)', transcription: '/aɪˌdentɪfɪˈkeɪʃn/', meaning: 'Document that proves who you are', meaningRussian: 'Документ, который доказывает, кто вы', imageUrl: '/images/passport.jpg.webp', category: 'security' },
    { id: 'customs', word: 'Customs', transcription: '/ˈkʌstəmz/', meaning: 'Border control for goods and luggage', meaningRussian: 'Пограничный контроль для товаров и багажа', imageUrl: '/images/customs.jpg.webp', category: 'security' },
    { id: 'connection', word: 'Connection', transcription: '/kəˈnekʃn/', meaning: 'Flight that connects to another flight', meaningRussian: 'Рейс, который соединяется с другим рейсом', imageUrl: '/images/yellow-black-transfer-transit-connecting-flights-information-board-sign-airport_665346-103149.jpg.avif', category: 'security' },
    { id: 'liquids', word: 'Liquids', transcription: '/ˈlɪkwɪdz/', meaning: 'Fluid substances (water, shampoo, etc.)', meaningRussian: 'Жидкие вещества (вода, шампунь и т.д.)', imageUrl: '/images/liquid.jpg', category: 'security' },
    { id: 'declare', word: 'Declare', transcription: '/dɪˈkleə/', meaning: 'To report items to customs', meaningRussian: 'Заявить предметы в таможне', imageUrl: '/images/declare.jpg', category: 'security' },
    { id: 'nothingtodeclare', word: 'Nothing to declare', transcription: '/ˈnʌθɪŋ tə dɪˈkleə/', meaning: 'No items to report to customs', meaningRussian: 'Нет предметов для заявления в таможне', imageUrl: '/images/nothing to declare.jpg.webp', category: 'security' },
    { id: 'dutyfree', word: 'Duty-free', transcription: '/ˈdjuːti friː/', meaning: 'Items that do not need customs tax', meaningRussian: 'Предметы, которые не облагаются таможенной пошлиной', imageUrl: '/images/dutyfree.webp', category: 'security' },
  ];

  const categories = [
    { id: 'booking', title: 'Booking & Tickets' },
    { id: 'airline', title: 'Airline & Classes' },
    { id: 'checkin', title: 'Check-in & Boarding' },
    { id: 'status', title: 'Flight Status' },
    { id: 'luggage', title: 'Luggage & Baggage' },
    { id: 'security', title: 'Security & Documents' },
  ];

  const currentCards = vocabularyData.filter(item => item.category === currentCategory);

  const handleCardClick = (cardId: string) => {
    const currentCard = currentCards[currentCardIndex];
    if (currentCard) {
      if (isWordRevealed) {
        setIsWordRevealed(false);
      } else {
        setIsWordRevealed(true);
        playSound(currentCard.word);
      }
    }
  };

  const playSound = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  const handleCardChange = (newIndex: number) => {
    setCurrentCardIndex(newIndex);
    setIsWordRevealed(false);
  };

  const handleComplete = () => {
    playSuccessSound();
    onComplete();
  };

  return (
    <div className="space-y-12">


      {/* Category Navigation */}
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        {categories.map((category) => (
          <MotionButton
            key={category.id}
            variant="nav"
            onClick={() => setCurrentCategory(category.id)}
            className={currentCategory === category.id ? 'active' : ''}
          >
            {category.title}
          </MotionButton>
        ))}
      </div>

      {/* Simple Image Cards */}
      <div className="flashcard-container">
        <h4 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-12 text-center">
          {categories.find(c => c.id === currentCategory)?.title}
        </h4>
        
        <div className="flex flex-col justify-center items-center min-h-96">
          {currentCards.length > 0 && (
            <motion.div
              key={currentCards[currentCardIndex]?.id}
              className="relative cursor-pointer mb-8"
            >
              <div className="flashcard-image-container">
                {!isWordRevealed ? (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={currentCards[currentCardIndex]?.imageUrl}
                      alt={currentCards[currentCardIndex]?.word}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </motion.div>
                                 ) : (
                   <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ duration: 0.3 }}
                     className="absolute inset-0 bg-gray-100 rounded-lg flashcard-word-container"
                   >
                     <div className="text-center">
                       <h3 className="text-6xl font-bold text-gray-800 mb-6">{currentCards[currentCardIndex]?.word}</h3>
                       <p className="text-2xl text-gray-600 mb-8">{currentCards[currentCardIndex]?.transcription}</p>
                       <button 
                         className="btn btn-secondary text-2xl p-4 rounded-full"
                         onClick={(e) => {
                           e.stopPropagation();
                           playSound(currentCards[currentCardIndex]?.word || '');
                         }}
                         title="Play pronunciation"
                       >
                         <Volume2 size={32} />
                       </button>
                     </div>
                   </motion.div>
                 )}
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Navigation */}
        <div className="flex justify-center items-center gap-8 mb-8">
          <button
            onClick={() => handleCardChange(Math.max(0, currentCardIndex - 1))}
            disabled={currentCardIndex === 0}
            className="flashcard-nav-arrow"
          >
            ←
          </button>
          <span className="text-gray-600">
            {currentCardIndex + 1} of {currentCards.length}
          </span>
          <button
            onClick={() => handleCardChange(Math.min(currentCards.length - 1, currentCardIndex + 1))}
            disabled={currentCardIndex === currentCards.length - 1}
            className="flashcard-nav-arrow"
          >
            →
          </button>
        </div>
        
        {/* Click to see word button */}
        <div className="flex justify-center mb-16">
          <button 
            className="reveal-button"
            onClick={() => handleCardClick(currentCards[currentCardIndex]?.id)}
          >
            {isWordRevealed ? 'Hide Word' : 'Click to see the word'}
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-12 max-w-2xl mx-auto px-8">
        <InstructionSection 
          title="Как использовать карточки"
          instructions={[
            { text: "Нажмите на карточку, чтобы перевернуть её и увидеть слово" },
            { text: "Нажмите кнопку аудио, чтобы услышать произношение" },
            { text: "Повторяйте каждое слово вслух для развития навыков" },
            { text: "Просматривайте карточки несколько раз для лучшего запоминания" }
          ]}
        />
      </div>

      {/* Complete Button */}
      <div className="text-center">
        <MotionButton
          variant="primary"
          size="large"
          onClick={handleComplete}
          className="text-xl px-16 py-5"
        >
          Complete Flashcards Practice ✓
        </MotionButton>
      </div>
    </div>
  );
} 