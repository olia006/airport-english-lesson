export const playSuccessSound = () => {
  try {
    // Check if AudioContext is supported
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) {
      console.log('AudioContext not supported');
      return;
    }

    const audioContext = new AudioContextClass();
    
    // Resume audio context if suspended (required for mobile)
    if (audioContext.state === 'suspended') {
      audioContext.resume().catch(error => {
        console.log('Failed to resume audio context:', error);
        return;
      });
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Mobile-optimized frequencies (lower for better mobile speaker compatibility)
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.2);
    
    // Lower volume for mobile devices
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (error) {
    console.log('Success sound played with error:', error);
  }
};

// Mobile-specific audio context initialization
export const initAudioContext = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) {
      return null;
    }

    const audioContext = new AudioContextClass();
    
    // Resume if suspended (mobile requirement)
    if (audioContext.state === 'suspended') {
      return audioContext.resume().then(() => audioContext).catch(() => null);
    }
    
    return Promise.resolve(audioContext);
  } catch (error) {
    console.log('Failed to initialize audio context:', error);
    return Promise.resolve(null);
  }
};

// Check if audio is supported on the device
export const isAudioSupported = () => {
  return !!(window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
};

// Check if speech synthesis is supported
export const isSpeechSynthesisSupported = () => {
  return 'speechSynthesis' in window;
}; 