'use client';

import { useState, useEffect } from 'react';
import AlphabetPractice from '@/components/AlphabetPractice';
import NumbersPractice from '@/components/NumbersPractice';
import VocabularyLesson from '@/components/VocabularyLesson';
import VocabularyFlashcards from '@/components/VocabularyFlashcards';
import WordPictureMatch from '@/components/WordPictureMatch';
import WordSearch from '@/components/WordSearch';
import SentenceStructure from '@/components/SentenceStructure';
import SentenceBuilder from '@/components/SentenceBuilder';
import CheckInDialog from '@/components/CheckInDialog';
import { MotionButton } from '@/components/motion/MotionComponents';
import InformationSection from '@/components/InformationSection';
import ImageSlideshow from '@/components/ImageSlideshow';
import ScrollToTop from '@/components/ScrollToTop';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  const [currentTask, setCurrentTask] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load localStorage data after component mounts
  useEffect(() => {
    const savedTask = localStorage.getItem('airport-lesson-current-task');
    const savedCompleted = localStorage.getItem('airport-lesson-completed-tasks');
    
    if (savedTask) {
      setCurrentTask(parseInt(savedTask));
    }
    
    if (savedCompleted) {
      setCompletedTasks(JSON.parse(savedCompleted));
    }
    
    setIsLoaded(true);
  }, []);

  const tasks = [
    { id: 1, title: "Alphabet Practice", component: AlphabetPractice },
    { id: 2, title: "Numbers Practice", component: NumbersPractice },
    { id: 3, title: "Airport Vocabulary", component: VocabularyLesson },
    { id: 4, title: "Vocabulary Flashcards", component: VocabularyFlashcards },
    { id: 5, title: "Match Words & Pictures", component: WordPictureMatch },
    { id: 6, title: "Word Search", component: WordSearch },
    { id: 7, title: "Sentence Structure", component: SentenceStructure },
    { id: 8, title: "Build Sentences", component: SentenceBuilder },
    { id: 9, title: "Check-in Dialog", component: CheckInDialog },
  ];

  const handleTaskComplete = (taskId: number) => {
    if (!completedTasks.includes(taskId)) {
      const newCompletedTasks = [...completedTasks, taskId];
      setCompletedTasks(newCompletedTasks);
      localStorage.setItem('airport-lesson-completed-tasks', JSON.stringify(newCompletedTasks));
    }
  };

  const handleTaskChange = (taskId: number) => {
    setCurrentTask(taskId);
    localStorage.setItem('airport-lesson-current-task', taskId.toString());
    
    // Scroll to the current task section
    setTimeout(() => {
      const currentTaskElement = document.getElementById('current-task-section');
      if (currentTaskElement) {
        currentTaskElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
  };

  const CurrentComponent = tasks[currentTask - 1].component;

  // Show loading state until localStorage is loaded
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="text-center">
        <div className="container-padding">
          <h1 className="mb-8">
            ✈️ Airport English Lesson
          </h1>
          <p className="text-body-large text-gray-600 max-w-4xl mx-auto">
            Английский для путешествий и аэропортов - Начальный уровень
          </p>
        </div>
      </header>

      {/* Information Section */}
      <div className="max-w-1024 mx-auto container-padding mb-8">
        <InformationSection />
      </div>

      {/* Image Slideshow */}
      <ImageSlideshow />

      {/* Progress Bar */}
      <div className="max-w-1024 mx-auto container-padding">
        <div className="card">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
            <h2>Прогресс</h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <span className="text-body text-gray-600 text-center sm:text-left">
                Выполнено {completedTasks.length} из {tasks.length} заданий
              </span>
              {completedTasks.length > 0 && (
                <MotionButton
                  variant="outline"
                  size="small"
                  onClick={() => {
                    setCompletedTasks([]);
                    setCurrentTask(1);
                    localStorage.removeItem('airport-lesson-completed-tasks');
                    localStorage.removeItem('airport-lesson-current-task');
                  }}
                  className="w-full sm:w-auto"
                >
                  Сбросить прогресс
                </MotionButton>
              )}
            </div>
          </div>
          <div className="progress-bar">
            <div 
              className={`progress-dynamic progress-width-${Math.round((completedTasks.length / tasks.length) * 100)}`}
            ></div>
          </div>
        </div>
      </div>

      {/* Task Navigation */}
      <div className="max-w-1024 mx-auto container-padding">
        <div className="grid-responsive">
          {tasks.map((task) => (
            <MotionButton
              key={task.id}
              variant="nav"
              onClick={() => handleTaskChange(task.id)}
              className={`${
                currentTask === task.id
                  ? 'active'
                  : completedTasks.includes(task.id)
                  ? 'completed'
                  : ''
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-medium text-body">{task.title}</span>
                {completedTasks.includes(task.id) && (
                  <span className="text-green-600 text-2xl">✓</span>
                )}
              </div>
            </MotionButton>
          ))}
        </div>
      </div>

      {/* Current Task */}
      <div id="current-task-section" className="max-w-1024 mx-auto container-padding">
        <div className="card vocabulary-container">
          <div className="mb-10 text-center pt-8">
            <h2 className="mb-4 text-2xl font-bold text-blue-800">
              Task {currentTask}: {tasks[currentTask - 1].title}
            </h2>
            <p className="text-body text-gray-600 mb-8">
              Выполните задание для перехода к следующему этапу обучения
            </p>
          </div>
          
          <CurrentComponent onComplete={() => handleTaskComplete(currentTask)} />
          
                      <div className="flex justify-center gap-6 mt-12 pt-8 border-t border-color-border">
            {currentTask > 1 && (
              <MotionButton
                variant="secondary"
                onClick={() => {
                  setCurrentTask(currentTask - 1);
                  setTimeout(() => {
                    const currentTaskElement = document.getElementById('current-task-section');
                    if (currentTaskElement) {
                      currentTaskElement.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                      });
                    }
                  }, 100);
                }}
                className="group"
              >
                <span className="transition-transform group-hover:-translate-x-1">←</span>
                <span>Previous</span>
              </MotionButton>
            )}
            {currentTask < tasks.length && (
              <MotionButton
                variant="primary"
                onClick={() => {
                  setCurrentTask(currentTask + 1);
                  setTimeout(() => {
                    const currentTaskElement = document.getElementById('current-task-section');
                    if (currentTaskElement) {
                      currentTaskElement.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                      });
                    }
                  }, 100);
                }}
                className="group"
              >
                <span>Next</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </MotionButton>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center section-spacing text-gray-600">
        <div className="container-padding">
          <p className="text-body-large">Завершите все задания для освоения английского языка в аэропорту! 🎯</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop />
      
      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}
