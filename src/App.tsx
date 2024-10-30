import React, { useState, useEffect } from 'react';
import { conversations } from './data/conversations';
import ConversationCard from './components/ConversationCard';
import PhoneContainer from './components/PhoneContainer';

const colorSchemes = [
  { 
    card: 'bg-rose-50/80 border-rose-100', 
    bubble: { primary: 'bg-indigo-900', secondary: 'bg-emerald-900', accent: 'bg-rose-900' },
    progress: { bg: 'bg-rose-100', fill: 'bg-rose-300' }
  },
  { 
    card: 'bg-sky-50/80 border-sky-100', 
    bubble: { primary: 'bg-purple-900', secondary: 'bg-orange-900', accent: 'bg-sky-900' },
    progress: { bg: 'bg-sky-100', fill: 'bg-sky-300' }
  },
  { 
    card: 'bg-amber-50/80 border-amber-100', 
    bubble: { primary: 'bg-teal-900', secondary: 'bg-rose-900', accent: 'bg-amber-900' },
    progress: { bg: 'bg-amber-100', fill: 'bg-amber-300' }
  },
  { 
    card: 'bg-violet-50/80 border-violet-100', 
    bubble: { primary: 'bg-emerald-900', secondary: 'bg-indigo-900', accent: 'bg-violet-900' },
    progress: { bg: 'bg-violet-100', fill: 'bg-violet-300' }
  },
  { 
    card: 'bg-teal-50/80 border-teal-100', 
    bubble: { primary: 'bg-fuchsia-900', secondary: 'bg-blue-900', accent: 'bg-teal-900' },
    progress: { bg: 'bg-teal-100', fill: 'bg-teal-300' }
  }
];

function App() {
  const [currentConversation, setCurrentConversation] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [colorSchemeIndex, setColorSchemeIndex] = useState(0);

  const conversation = conversations[currentConversation];
  const line = conversation.dialogue[currentLine];
  const isFirstSpeaker = line.speaker === conversation.speakers.first.name;

  useEffect(() => {
    if (isPlaying) {
      speak(line.text, isFirstSpeaker);
    }
  }, [currentLine, isPlaying]);

  const speak = async (text: string, isFirst: boolean) => {
    if (!window.speechSynthesis) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const englishVoices = voices.filter(voice => voice.lang.startsWith('en'));
    
    if (isFirst) {
      const femaleVoice = englishVoices.find(v => 
        v.name.toLowerCase().includes('female') || 
        v.name.toLowerCase().includes('samantha')
      );
      utterance.voice = femaleVoice || englishVoices[0] || voices[0];
      utterance.pitch = 1.3;
      utterance.rate = 1.3;
    } else {
      const maleVoice = englishVoices.find(v => 
        v.name.toLowerCase().includes('male') || 
        v.name.toLowerCase().includes('daniel')
      );
      utterance.voice = maleVoice || englishVoices[1] || voices[0];
      utterance.pitch = 0.7;
      utterance.rate = 0.8;
    }
    
    utterance.onend = () => {
      if (currentLine < conversation.dialogue.length - 1) {
        setCurrentLine(prev => prev + 1);
      } else {
        setCurrentLine(0);
        handleNext();
      }
    };
    
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const togglePlay = () => {
    if (isPlaying) {
      window.speechSynthesis?.cancel();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    window.speechSynthesis?.cancel();
    setCurrentLine(0);
    setCurrentConversation(prev => (prev + 1) % conversations.length);
    setColorSchemeIndex(prev => (prev + 1) % colorSchemes.length);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <PhoneContainer>
        <ConversationCard
          conversation={conversation}
          currentLine={currentLine}
          isPlaying={isPlaying}
          isFirstSpeaker={isFirstSpeaker}
          onPlayPause={togglePlay}
          onNext={handleNext}
          speaker={line.speaker}
          text={line.text}
          colorScheme={colorSchemes[colorSchemeIndex]}
        />
      </PhoneContainer>
    </div>
  );
}

export default App;