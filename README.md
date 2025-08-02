# Airport English Lesson - Complete Beginner Course

A comprehensive React Next.js application designed to teach complete beginners English vocabulary and sentence structure for airport and travel situations.

## ✈️ Features

### 1. Alphabet Practice
- **Consonants**: Learn all 21 consonant letters with pronunciation
- **Vowels**: Master the 5 vowel letters (A, E, I, O, U)
- **Letter Combinations**: Practice common letter combinations (CH, SH, TH, etc.)
- **Vowel Combinations**: Learn vowel combinations (AI, EA, OI, etc.)
- Interactive click-to-hear pronunciation

### 2. Airport & Travel Vocabulary
- **Transport Terms**: Airplane, Airport, Taxi, Train, Ship
- **Airport Terms**: Check-in, Boarding Pass, Passport, Luggage, Security
- **Travel Terms**: Destination, Hotel, Ticket, Reservation, Tourist
- Phonetic transcriptions and audio pronunciation
- Categorized learning with visual icons

### 3. Word-Picture Matching Game
- Interactive matching game with score tracking
- Match vocabulary words with corresponding pictures
- Visual feedback and progress tracking
- Complete beginner-friendly interface

### 4. Word-Sound Matching Game
- Audio pronunciation practice
- Match written words with their spoken sounds
- Phonetic transcription display
- Score-based learning system

### 5. Sentence Structure Learning
- **Flight Information**: "My flight number is..."
- **Travel Plans**: "I am traveling to..."
- **Destinations**: "My final destination is..."
- **Accommodation**: "I am staying in a hotel."
- **Airport Procedures**: "I need to check in."
- **Questions**: "Where is the...?"
- Audio examples for each pattern

### 6. Sentence Builder Game
- Drag-and-drop sentence construction
- Color-coded word types (subjects, verbs, objects, prepositions)
- Multiple sentence templates
- Real-time feedback and scoring
- Translation support

## 🎨 Design Features

- **Brand Colors**: 
  - Coral Salmon (#fa8072)
  - Soft Sky Blue (#b4daf7)
- **Modern UI**: Clean, responsive design with smooth animations
- **Professional Button System**: Multiple button variants (primary, secondary, outline, success) with advanced hover effects, focus states, and accessibility features
- **Accessibility**: Screen reader friendly with proper ARIA labels
- **Progress Tracking**: Visual progress indicators for all tasks
- **Interactive Elements**: Advanced hover effects, smooth transitions, and micro-animations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd airport-english-lesson
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📚 Learning Structure

The application follows a progressive learning path:

1. **Alphabet Foundation** → Build basic pronunciation skills
2. **Vocabulary Building** → Learn essential travel words
3. **Visual Recognition** → Match words with pictures
4. **Audio Recognition** → Match words with sounds
5. **Sentence Patterns** → Learn basic sentence structures
6. **Sentence Construction** → Build complete sentences

## 🎯 Target Audience

- **Complete beginners** in English
- **Travelers** preparing for airport situations
- **ESL students** focusing on practical vocabulary
- **Self-learners** wanting interactive practice

## 🛠️ Technical Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Audio**: Web Speech API

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Touch devices

## 🎨 Customization

### Colors
The application uses CSS custom properties for easy color customization:
```css
:root {
  --coral-salmon: #fa8072;
  --soft-sky-blue: #b4daf7;
  --primary: #fa8072;
  --secondary: #b4daf7;
  --accent: #e06b5d;
}
```

### Content
All vocabulary, sentences, and exercises can be easily modified in the component files.

## 📊 Learning Analytics

The application tracks:
- Task completion progress
- Score accumulation
- Attempt counts
- Learning patterns

## 🔧 Development

### Project Structure
```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
└── components/
    ├── AlphabetPractice.tsx
    ├── VocabularyLesson.tsx
    ├── WordPictureMatch.tsx
    ├── WordSoundMatch.tsx
    ├── SentenceStructure.tsx
    └── SentenceBuilder.tsx
```

### Adding New Content
1. Modify the data arrays in each component
2. Add new vocabulary items with proper structure
3. Update sentence templates as needed
4. Test audio pronunciation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🎓 Educational Value

This application provides:
- **Comprehensive vocabulary** for airport and travel situations
- **Interactive learning** through games and exercises
- **Audio pronunciation** practice
- **Sentence structure** understanding
- **Practical application** of learned skills

Perfect for complete beginners who want to learn English for travel and airport situations!
