'use client';

/**
 * 🏆 Why is this the easiest word search implementation?
 * 
 * 1. Users instantly understand (it mimics real paper wordsearch)
 * 2. Developers can use simple event listeners: mousedown/touchstart, mousemove/touchmove, mouseup/touchend
 * 3. Validation is easy: just check if selected cells form a straight line and match a word in your list
 * 
 * Minimal Logic for Classic Wordsearch:
 * - On mousedown/touchstart: record start cell
 * - On mousemove/touchmove: track and highlight path (if in straight line)
 * - On mouseup/touchend: Check if path matches a word, mark as found, give feedback, reset highlights
 * 
 * 📚 Alternative Libraries/Tools (If You Don't Want to Code from Scratch):
 * - wordfind.js (JS, works with simple click/drag)
 * - react-wordsearch (React, ready-to-use)
 * - Many CodePen/JSFiddle examples with "drag to select"
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { MotionButton } from './motion/MotionComponents';
import { playSuccessSound } from './utils/audioUtils';

interface WordSearchProps {
  onComplete: () => void;
}

interface WordItem {
  word: string;
  category: string;
}

interface Cell {
  id: string;
  letter: string;
  isFound: boolean;
  foundColor: string | null;
}

const WordSearch: React.FC<WordSearchProps> = ({ onComplete }) => {
  // State management for word search game
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [showCelebrationPopup, setShowCelebrationPopup] = useState(false);
  
  // Drag selection state - similar to jQuery's "clicking" flag
  const [isDragging, setIsDragging] = useState(false);
  const [startCell, setStartCell] = useState<string | null>(null);
  const [selectedCells, setSelectedCells] = useState<string[]>([]);

  // Word search puzzle with basic airport vocabulary
  const wordSearchWords = [
    { word: 'AIRLINE', category: 'airline' },
    { word: 'BOARDING', category: 'boarding' },
    { word: 'FLIGHT', category: 'flight' },
    { word: 'GATE', category: 'gate' },
    { word: 'LUGGAGE', category: 'luggage' },
    { word: 'TICKET', category: 'ticket' },
  ];

  // Single word search grid with basic airport terms
  const grid = [
    ['G', 'A', 'T', 'E', 'W', 'Z', 'P', 'N', 'K', 'J', 'H', 'V'],
    ['K', 'B', 'C', 'D', 'E', 'S', 'F', 'G', 'H', 'I', 'F', 'K'],
    ['P', 'L', 'I', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'L', 'A'],
    ['Q', 'M', 'R', 'W', 'Y', 'Z', 'A', 'B', 'C', 'D', 'I', 'T'],
    ['L', 'N', 'S', 'X', 'J', 'K', 'L', 'M', 'N', 'O', 'G', 'I'],
    ['U', 'A', 'I', 'R', 'L', 'I', 'N', 'E', 'P', 'Q', 'H', 'C'],
    ['G', 'O', 'T', 'U', 'V', 'T', 'W', 'X', 'Y', 'Z', 'T', 'K'],
    ['G', 'P', 'U', 'E', 'F', 'I', 'G', 'H', 'I', 'J', 'K', 'E'],
    ['A', 'Q', 'V', 'B', 'O', 'A', 'R', 'D', 'I', 'N', 'G', 'T'],
    ['G', 'R', 'W', 'X', 'Y', 'C', 'Z', 'A', 'B', 'C', 'D', 'L'],
    ['E', 'S', 'X', 'Y', 'Z', 'K', 'A', 'B', 'C', 'D', 'E', 'M'],
    ['F', 'T', 'Y', 'Z', 'A', 'E', 'B', 'C', 'D', 'E', 'F', 'N'],
  ];

  // Color array for found words - each word gets a different color
  const colors = ['red', 'green', 'yellow', 'blue', 'purple'];

  // Create cells array with React state
  // Each cell has coordinates (row-col) and letter
  const [cells, setCells] = useState<Cell[]>(() => {
    const cellsArray: Cell[] = [];
    grid.forEach((row, rowIndex) => {
      row.forEach((letter, colIndex) => {
        cellsArray.push({
          id: `${rowIndex}-${colIndex}`,
          letter,
          isFound: false,
          foundColor: null
        });
      });
    });
    return cellsArray;
  });

  const playSound = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const playSuccessSound = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const playWinnerSound = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    const notes = [523, 659, 784, 1047, 1319, 1568];
    const duration = 0.15;
    
    notes.forEach((frequency, index) => {
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime + index * duration);
    });
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + notes.length * duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + notes.length * duration);
  };

  // Reset game state - clears all selections and found words
  const resetGame = () => {
    setFoundWords([]);
    setIsDragging(false);
    setStartCell(null);
    setSelectedCells([]);
    setCells(prev => prev.map(cell => ({
      ...cell,
      isFound: false,
      foundColor: null
    })));
  };



  // Helper function to get coordinates from cell ID (e.g., "2-3" -> {row: 2, col: 3})
  const getCoordinates = (cellId: string) => {
    const [row, col] = cellId.split('-').map(Number);
    return { row, col };
  };

  // Helper function to get cell ID from coordinates (e.g., {row: 2, col: 3} -> "2-3")
  const getCellId = (row: number, col: number) => `${row}-${col}`;

  // Helper function to get all cells in a straight line between two points
  // This ensures selection follows straight lines (horizontal, vertical, diagonal)
  const getCellsInLine = (startId: string, endId: string) => {
    const start = getCoordinates(startId);
    const end = getCoordinates(endId);
    
    const cells: string[] = [];
    
    // Determine direction
    const deltaRow = end.row - start.row;
    const deltaCol = end.col - start.col;
    
    // Check if it's a straight line (horizontal, vertical, or diagonal)
    // This prevents "painting" arbitrary paths - must be straight lines
    if (deltaRow === 0 || deltaCol === 0 || Math.abs(deltaRow) === Math.abs(deltaCol)) {
      const steps = Math.max(Math.abs(deltaRow), Math.abs(deltaCol));
      
      if (steps === 0) {
        // Same cell
        cells.push(startId);
      } else {
        for (let i = 0; i <= steps; i++) {
          const row = start.row + Math.round((deltaRow / steps) * i);
          const col = start.col + Math.round((deltaCol / steps) * i);
          cells.push(getCellId(row, col));
        }
      }
    }
    
    return cells;
  };

  // Helper function to get word from selected cells
  // Builds the word string from the letters in selected cells
  const getWordFromCells = (cellIds: string[]) => {
    return cellIds.map(id => {
      const cell = cells.find(c => c.id === id);
      return cell ? cell.letter : '';
    }).join('');
  };

  // MOUSEDOWN/TOUCHSTART: Start drag selection (equivalent to jQuery's clicking = true)
  // Users instantly understand this - it mimics real paper wordsearch
  // MOUSEDOWN/TOUCHSTART: Start drag selection (equivalent to jQuery's clicking = true)
  // Users instantly understand this - it mimics real paper wordsearch
  const handleCellMouseDown = (cellId: string) => {
    console.log('Mouse down on cell:', cellId);
    setIsDragging(true);
    setStartCell(cellId);
    setSelectedCells([cellId]);
  };

  // MOUSEOVER/TOUCHMOVE: While dragging, add cells to selection
  // This is the "paint" selection - each cell gets highlighted as mouse moves over it
  // Simple event listeners: mousemove/touchmove - minimal logic for classic wordsearch
  const handleCellMouseEnter = (cellId: string) => {
    if (isDragging && startCell) {
      const cellsInLine = getCellsInLine(startCell, cellId);
      console.log('Dragging from', startCell, 'to', cellId, 'selected cells:', cellsInLine);
      setSelectedCells(cellsInLine);
    }
  };

  // MOUSEUP/TOUCHEND: End drag selection and validate word
  // This is where we check if the selected letters form a valid word
  // Validation is easy: just check if selected cells form a straight line and match a word in your list
  const handleCellMouseUp = () => {
    if (isDragging && selectedCells.length > 0) {
      const selectedWord = getWordFromCells(selectedCells);
      console.log('Selected cells:', selectedCells);
      console.log('Selected word:', selectedWord);
      console.log('Target words:', wordSearchWords.map(w => w.word));
      
      // Check if the selected word matches any of our target words
      // Also check reverse direction (for backward word selection)
      const targetWord = wordSearchWords.find(item => 
        item.word === selectedWord || item.word === selectedWord.split('').reverse().join('')
      );
      
      if (targetWord && !foundWords.includes(targetWord.word)) {
        console.log('Found word:', targetWord.word);
        // Mark cells as found with a color
        setCells(prev => prev.map(cell => {
          if (selectedCells.includes(cell.id)) {
            return {
              ...cell,
              isFound: true,
              foundColor: colors[foundWords.length % colors.length]
            };
          }
          return cell;
        }));

        // Add word to found list and play success sound
        setFoundWords(prev => [...prev, targetWord.word]);
        playSuccessSound();

        // Check if all words are found
        if (foundWords.length + 1 >= wordSearchWords.length) {
          playWinnerSound();
          setShowCelebrationPopup(true);
          setTimeout(() => setShowCelebrationPopup(false), 3000);
        }
      } else {
        console.log('No matching word found or word already found');
      }
    }
    
    // Reset drag state (equivalent to jQuery's clicking = false)
    // On mouseup/touchend: Check if path matches a word, mark as found, give feedback, reset highlights
    setIsDragging(false);
    setStartCell(null);
    setSelectedCells([]);
  };

  // MOUSELEAVE: Reset drag state when mouse leaves grid
  const handleMouseLeave = () => {
    setIsDragging(false);
    setStartCell(null);
    setSelectedCells([]);
  };

  const filteredWords = wordSearchWords;

  return (
    <>
      <div className="max-w-8xl mx-auto">


        {/* Main Game Container */}
        <div className="flex flex-row gap-8 justify-center items-start">
          {/* Word Search Grid - First on mobile */}
          <div className="word-search-grid order-2 md:order-1" onMouseLeave={handleMouseLeave}>
            {cells.map((cell) => (
              <button
                key={cell.id}
                data-id={cell.id}
                className={`box ${
                  cell.isFound && cell.foundColor ? `found-${cell.foundColor}` : ''
                } ${
                  selectedCells.includes(cell.id) ? 'highlight' : ''
                }`}
                onMouseDown={() => handleCellMouseDown(cell.id)}
                onMouseEnter={() => handleCellMouseEnter(cell.id)}
                onMouseUp={handleCellMouseUp}
                onTouchStart={() => handleCellMouseDown(cell.id)}
                onTouchMove={(e) => {
                  e.preventDefault();
                  const touch = e.touches[0];
                  const target = document.elementFromPoint(touch.clientX, touch.clientY);
                  if (target && target.getAttribute('data-id')) {
                    handleCellMouseEnter(target.getAttribute('data-id')!);
                  }
                }}
                onTouchEnd={handleCellMouseUp}
              >
                {cell.letter}
              </button>
            ))}
          </div>

          {/* Word List Container - Second on mobile */}
          <div className="word-list-container order-1 md:order-2">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Слова для поиска</h3>
            <ul className="word-list">
              {filteredWords.map((wordItem) => (
                <li 
                  key={wordItem.word}
                  data-word={wordItem.word}
                  className={`word-list-item ${
                    foundWords.includes(wordItem.word) ? 'found' : ''
                  }`}
                >
                  <span className="word-text">{wordItem.word}</span>
                  <button
                    onClick={() => playSound(wordItem.word)}
                    className="audio-button"
                    title="Play word pronunciation"
                  >
                    <Volume2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
            <button 
              onClick={resetGame}
              className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-brand-primary to-brand-accent text-black font-semibold rounded-lg hover:from-brand-accent hover:to-brand-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Начать заново
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="card mt-12 pt-6">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">Как играть:</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border-l-4 border-[var(--brand-primary)]">
              <div className="flex-shrink-0 w-2 h-2 bg-[var(--brand-primary)] rounded-full mt-2"></div>
              <p className="text-base text-gray-700 leading-relaxed">Нажмите и перетащите мышь по буквам, чтобы выбрать слово</p>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border-l-4 border-[var(--brand-primary)]">
              <div className="flex-shrink-0 w-2 h-2 bg-[var(--brand-primary)] rounded-full mt-2"></div>
              <p className="text-base text-gray-700 leading-relaxed">Слова могут быть горизонтальными, вертикальными или диагональными</p>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border-l-4 border-[var(--brand-primary)]">
              <div className="flex-shrink-0 w-2 h-2 bg-[var(--brand-primary)] rounded-full mt-2"></div>
              <p className="text-base text-gray-700 leading-relaxed">Найдите все слова в категории, чтобы завершить задание</p>
            </div>
          </div>
        </div>

        {/* Complete Button */}
        {foundWords.length === wordSearchWords.length && wordSearchWords.length > 0 && (
          <div className="text-center mt-8">
            <MotionButton
              variant="primary"
              size="large"
              onClick={() => {
                playSuccessSound();
                onComplete();
              }}
              className="px-8 py-3 text-lg"
            >
              Complete Word Search ✓
            </MotionButton>
          </div>
        )}
      </div>

      {/* Celebration Popup */}
      {showCelebrationPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="bg-white rounded-2xl p-8 text-center shadow-2xl z-[10000]"
          >
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Поздравляем!</h3>
            <p className="text-lg text-gray-600 mb-4">Вы нашли все слова в этой категории!</p>
            <button
              onClick={() => setShowCelebrationPopup(false)}
              className="btn-primary px-6 py-2"
            >
              Продолжить
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default WordSearch; 