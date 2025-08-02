'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  src: string;
  alt: string;
  caption: string;
}

const slides: Slide[] = [
  {
    src: '/slide/marina-bay-area-in-singapore-city-2024-10-20-11-14-18-utc.jpg',
    alt: 'Marina Bay Singapore - Travel Destination',
    caption: 'Marina Bay, Singapore'
  },
  {
    src: '/slide/Best_Airports_in_the_World_-_Singapore_Changi_Airport_-_SimCorner.jpg.webp',
    alt: 'Singapore Changi Airport',
    caption: 'Singapore Changi Airport'
  },
  {
    src: '/slide/singapore-airport-water-feature.jpg.webp',
    alt: 'Singapore Airport Water Feature',
    caption: 'Singapore Airport'
  },
  {
    src: '/slide/8-vancouver-international-airport.jpg',
    alt: 'Vancouver International Airport',
    caption: 'Vancouver International Airport'
  },
  {
    src: '/slide/Beijing-Daxing-International-Airport.jpg',
    alt: 'Beijing Daxing International Airport',
    caption: 'Beijing Daxing Airport'
  },
  {
    src: '/slide/Denver-International-Airport-1536x969.jpg',
    alt: 'Denver International Airport',
    caption: 'Denver International Airport'
  },
  {
    src: '/slide/Pulkovo-International-Airport.jpg',
    alt: 'Pulkovo International Airport',
    caption: 'Pulkovo International Airport'
  },
  {
    src: '/slide/Chhatrapati-Shivaji-International-Airport.jpg',
    alt: 'Chhatrapati Shivaji International Airport',
    caption: 'Mumbai International Airport'
  },
  {
    src: '/slide/Azure-airports-Vietnam-Heerim-2.jpg',
    alt: 'Vietnam Airport',
    caption: 'Vietnam Airport'
  },
  {
    src: '/slide/autoban.jpg',
    alt: 'Airport Terminal',
    caption: 'Modern Airport Terminal'
  },
  {
    src: '/slide/these-are-the-best-airports-in-the-world.jpg',
    alt: 'World Best Airports',
    caption: 'World\'s Best Airports'
  }
];

const ImageSlideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative max-w-1024 mx-auto container-padding mb-8">
      {/* Main Image Container */}
      <div className="relative overflow-hidden rounded-lg">
        <img 
          src={slides[currentSlide].src}
          alt={slides[currentSlide].alt}
          className="w-full object-cover transition-opacity duration-500"
          style={{ 
            borderRadius: 'var(--radius-lg)',
            height: window.innerWidth < 768 ? '300px' : '600px',
            width: '100%'
          }}
        />
        
        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-200"
          style={{ borderRadius: '9999px' }}
          aria-label="Previous slide"
          title="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-200"
          style={{ borderRadius: '9999px' }}
          aria-label="Next slide"
          title="Next slide"
        >
          <ChevronRight size={20} />
        </button>

        {/* Slide Counter */}
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>

      {/* Caption */}
      <p className="text-center text-gray-600 mt-2 text-sm">
        {slides[currentSlide].caption}
      </p>

      {/* Dot Indicators */}
      <div className="flex justify-center mt-4 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentSlide 
                ? 'bg-blue-600' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            style={{ borderRadius: '9999px' }}
            aria-label={`Go to slide ${index + 1}`}
            title={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlideshow; 