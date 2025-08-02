'use client';

import { useState, useEffect } from 'react';
import { playSuccessSound, isAudioSupported, isSpeechSynthesisSupported, initAudioContext } from '../../components/utils/audioUtils';

export default function AudioTestPage() {
  const [audioStatus, setAudioStatus] = useState<string>('Testing...');
  const [testResults, setTestResults] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    const runTests = async () => {
      const results: {[key: string]: boolean} = {};
      
      // Test AudioContext support
      results.audioContext = isAudioSupported();
      
      // Test Speech Synthesis support
      results.speechSynthesis = isSpeechSynthesisSupported();
      
      // Test AudioContext initialization
      try {
        const audioContext = await initAudioContext();
        results.audioContextInit = !!audioContext;
      } catch (error) {
        results.audioContextInit = false;
      }
      
      // Test speech synthesis voices
      if (results.speechSynthesis) {
        const voices = speechSynthesis.getVoices();
        results.voicesAvailable = voices.length > 0;
        
        if (!results.voicesAvailable) {
          // Wait for voices to load
          speechSynthesis.onvoiceschanged = () => {
            const availableVoices = speechSynthesis.getVoices();
            setTestResults(prev => ({ ...prev, voicesAvailable: availableVoices.length > 0 }));
          };
        }
      }
      
      setTestResults(results);
      
      const allPassed = Object.values(results).every(result => result);
      setAudioStatus(allPassed ? 'All tests passed!' : 'Some tests failed');
    };
    
    runTests();
  }, []);

  const testSpeechSynthesis = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('Test audio on mobile device');
      utterance.lang = 'en-US';
      utterance.rate = 0.5;
      utterance.volume = 0.9;
      
      speechSynthesis.speak(utterance);
    }
  };

  const testAudioContext = () => {
    playSuccessSound();
  };

  return (
    <div className="container-padding section-spacing">
      <div className="max-w-1024 mx-auto">
        <h1 className="text-center mb-8">Mobile Audio Test</h1>
        
        <div className="space-y-6">
          {/* Status */}
          <div className="text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
              audioStatus.includes('passed') 
                ? 'bg-green-100 border border-green-300 text-green-800'
                : 'bg-yellow-100 border border-yellow-300 text-yellow-800'
            }`}>
              <span>{audioStatus.includes('passed') ? '✅' : '⚠️'}</span>
              <span>{audioStatus}</span>
            </div>
          </div>

          {/* Test Results */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Test Results</h2>
            <div className="space-y-2">
              {Object.entries(testResults).map(([test, passed]) => (
                <div key={test} className="flex items-center justify-between">
                  <span className="font-medium capitalize">
                    {test.replace(/([A-Z])/g, ' $1').trim()}:
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    passed 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {passed ? 'PASS' : 'FAIL'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Test Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={testSpeechSynthesis}
              className="btn btn-primary"
              disabled={!testResults.speechSynthesis}
            >
              Test Speech Synthesis
            </button>
            
            <button
              onClick={testAudioContext}
              className="btn btn-secondary"
              disabled={!testResults.audioContext}
            >
              Test Audio Context
            </button>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Testing Instructions</h3>
            <ul className="space-y-2 text-sm">
              <li>• Make sure your device volume is turned on</li>
              <li>• Tap the test buttons to hear audio</li>
              <li>• If audio doesn&apos;t work, try refreshing the page</li>
              <li>• On iOS, you may need to enable &quot;Auto-Play Media&quot; in Safari settings</li>
              <li>• On Android, check if the browser has audio permissions</li>
            </ul>
          </div>

          {/* Device Info */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Device Information</h3>
            <div className="space-y-1 text-sm">
              <div><strong>User Agent:</strong> {navigator.userAgent}</div>
              <div><strong>Platform:</strong> {navigator.platform}</div>
              <div><strong>Language:</strong> {navigator.language}</div>
              <div><strong>Online:</strong> {navigator.onLine ? 'Yes' : 'No'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 