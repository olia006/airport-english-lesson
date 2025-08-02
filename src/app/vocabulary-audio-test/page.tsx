'use client';

import { useState, useEffect } from 'react';

interface AudioTestItem {
  word: string;
  audioFile: string;
  status: 'untested' | 'loading' | 'success' | 'error';
  error?: string;
}

export default function VocabularyAudioTestPage() {
  const [testItems, setTestItems] = useState<AudioTestItem[]>([
    { word: 'Airline', audioFile: '/airportvocabulary/Airline.mp3', status: 'untested' },
    { word: 'Economy class', audioFile: '/airportvocabulary/Economy class.mp3', status: 'untested' },
    { word: 'Business class', audioFile: '/airportvocabulary/Business class.mp3', status: 'untested' },
    { word: 'First class', audioFile: '/airportvocabulary/First class.mp3', status: 'untested' },
    { word: 'Window seat', audioFile: '/airportvocabulary/Window seat .mp3', status: 'untested' },
    { word: 'Aisle seat', audioFile: '/airportvocabulary/Aisle seat.mp3', status: 'untested' },
    { word: 'Middle seat', audioFile: '/airportvocabulary/Middle seat.mp3', status: 'untested' },
    { word: 'Emergency exit', audioFile: '/airportvocabulary/Emergency exit.mp3', status: 'untested' },
    { word: 'Fasten seatbelts', audioFile: '/airportvocabulary/Fasten seatbelts.mp3', status: 'untested' },
    { word: 'Vegetarian dish', audioFile: '/airportvocabulary/Vegetarian dish.mp3', status: 'untested' },
    { word: 'Water', audioFile: '/airportvocabulary/Water.mp3', status: 'untested' },
    { word: 'Tea', audioFile: '/airportvocabulary/Tea.mp3', status: 'untested' },
    { word: 'Coffee', audioFile: '/airportvocabulary/Coffee.mp3', status: 'untested' },
    { word: 'Milk', audioFile: '/airportvocabulary/Milk.mp3', status: 'untested' },
    { word: 'Juice', audioFile: '/airportvocabulary/Juice.mp3', status: 'untested' },
    { word: 'Long-haul flight', audioFile: '/airportvocabulary/Long-haul flight.mp3', status: 'untested' },
    { word: 'Check in', audioFile: '/airportvocabulary/Check in.mp3', status: 'untested' },
    { word: 'Counter', audioFile: '/airportvocabulary/Counter.mp3', status: 'untested' },
    { word: 'Boarding pass', audioFile: '/airportvocabulary/Boarding pass.mp3', status: 'untested' },
    { word: 'Boarding time', audioFile: '/airportvocabulary/Boarding time.mp3', status: 'untested' },
    { word: 'Board', audioFile: '/airportvocabulary/Board.mp3', status: 'untested' },
    { word: 'Landing', audioFile: '/airportvocabulary/Landing.mp3', status: 'untested' },
    { word: 'Take off', audioFile: '/airportvocabulary/Take off.mp3', status: 'untested' },
    { word: 'Gate', audioFile: '/airportvocabulary/Gate.mp3', status: 'untested' },
    { word: 'Arrivals', audioFile: '/airportvocabulary/Arrivals.mp3', status: 'untested' },
    { word: 'Departures', audioFile: '/airportvocabulary/Departures.mp3', status: 'untested' },
    { word: 'On time', audioFile: '/airportvocabulary/On time.mp3', status: 'untested' },
    { word: 'Delayed', audioFile: '/airportvocabulary/Delayed.mp3', status: 'untested' },
    { word: 'Cancelled', audioFile: '/airportvocabulary/Cancelled.mp3', status: 'untested' },
    { word: 'Layover', audioFile: '/airportvocabulary/Layover.mp3', status: 'untested' },
    { word: 'Business lounge', audioFile: '/airportvocabulary/Business lounge.mp3', status: 'untested' },
    { word: 'Information desk', audioFile: '/airportvocabulary/Information desk.mp3', status: 'untested' },
    { word: 'WiFi connection', audioFile: '/airportvocabulary/WiFi connection.mp3', status: 'untested' },
    { word: 'Phone charger', audioFile: '/airportvocabulary/Phone charger.mp3', status: 'untested' },
    { word: 'Luggage', audioFile: '/airportvocabulary/Luggage.mp3', status: 'untested' },
    { word: 'Carry on (luggage)', audioFile: '/airportvocabulary/Carry on (luggage).mp3', status: 'untested' },
    { word: 'Baggage claim', audioFile: '/airportvocabulary/Baggage claim.mp3', status: 'untested' },
    { word: 'Oversized baggage', audioFile: '/airportvocabulary/Oversized:Overweight baggage.mp3', status: 'untested' },
    { word: 'Fragile', audioFile: '/airportvocabulary/Fragile.mp3', status: 'untested' },
    { word: 'Lost luggage', audioFile: '/airportvocabulary/Lost luggage.mp3', status: 'untested' },
    { word: 'Identification (ID)', audioFile: '/airportvocabulary/Identification (ID).mp3', status: 'untested' },
    { word: 'Customs', audioFile: '/airportvocabulary/Customs.mp3', status: 'untested' },
    { word: 'Connection', audioFile: '/airportvocabulary/Connection.mp3', status: 'untested' },
    { word: 'Liquids', audioFile: '/airportvocabulary/Liquids.mp3', status: 'untested' },
    { word: 'Declare', audioFile: '/airportvocabulary/Declare.mp3', status: 'untested' },
    { word: 'Nothing to declare', audioFile: '/airportvocabulary/Nothing to declare.mp3', status: 'untested' },
    { word: 'Duty-free', audioFile: '/airportvocabulary/Duty-free.mp3', status: 'untested' },
    { word: 'Visa', audioFile: '/airportvocabulary/Visa.mp3', status: 'untested' },
    { word: 'Travel agent', audioFile: '/airportvocabulary/Travel_agent.mp3', status: 'untested' },
    { word: 'Round-trip ticket', audioFile: '/airportvocabulary/Round-trip_ticket.mp3', status: 'untested' },
  ]);

  const testAudioFile = (item: AudioTestItem) => {
    const audio = new Audio(item.audioFile);
    
    setTestItems(prev => prev.map(testItem => 
      testItem.word === item.word 
        ? { ...testItem, status: 'loading' }
        : testItem
    ));

    audio.addEventListener('loadstart', () => {
      console.log('Loading:', item.audioFile);
    });

    audio.addEventListener('canplaythrough', () => {
      console.log('Success:', item.audioFile);
      setTestItems(prev => prev.map(testItem => 
        testItem.word === item.word 
          ? { ...testItem, status: 'success' }
          : testItem
      ));
    });

    audio.addEventListener('error', (e) => {
      console.error('Error:', item.audioFile, e);
      setTestItems(prev => prev.map(testItem => 
        testItem.word === item.word 
          ? { ...testItem, status: 'error', error: 'File not found or invalid' }
          : testItem
      ));
    });

    audio.load();
  };

  const playAudioFile = (item: AudioTestItem) => {
    const audio = new Audio(item.audioFile);
    audio.volume = 0.8;
    
    audio.play().catch(error => {
      console.error('Playback error:', error);
    });
  };

  const testAllAudio = () => {
    testItems.forEach(item => {
      setTimeout(() => testAudioFile(item), Math.random() * 1000);
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'loading': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'loading': return '⏳';
      default: return '⏸️';
    }
  };

  return (
    <div className="container-padding section-spacing">
      <div className="max-w-1024 mx-auto">
        <h1 className="text-center mb-8">Vocabulary Audio Test</h1>
        
        <div className="space-y-6">
          {/* Test Controls */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={testAllAudio}
              className="btn btn-primary"
            >
              Test All Audio Files
            </button>
          </div>

          {/* Test Results */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Audio File Status</h2>
            <div className="space-y-2">
              {testItems.map((item) => (
                <div key={item.word} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                      {getStatusIcon(item.status)} {item.status}
                    </span>
                    <span className="font-medium">{item.word}</span>
                    <span className="text-sm text-gray-500">{item.audioFile}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => testAudioFile(item)}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                    >
                      Test
                    </button>
                    {item.status === 'success' && (
                      <button
                        onClick={() => playAudioFile(item)}
                        className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded hover:bg-green-200"
                      >
                        Play
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Test Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {testItems.filter(item => item.status === 'success').length}
                </div>
                <div className="text-sm text-gray-500">Working</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {testItems.filter(item => item.status === 'error').length}
                </div>
                <div className="text-sm text-gray-500">Failed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {testItems.filter(item => item.status === 'loading').length}
                </div>
                <div className="text-sm text-gray-500">Loading</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {testItems.filter(item => item.status === 'untested').length}
                </div>
                <div className="text-sm text-gray-500">Untested</div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Troubleshooting</h3>
                         <ul className="space-y-2 text-sm">
               <li>• If files show as &quot;error&quot;, check that the file names match exactly</li>
               <li>• Make sure audio files are in the correct folder: <code>/public/airportvocabulary/</code></li>
               <li>• Check browser console for detailed error messages</li>
               <li>• Try refreshing the page if audio doesn&apos;t work initially</li>
               <li>• Ensure your device volume is turned on</li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 