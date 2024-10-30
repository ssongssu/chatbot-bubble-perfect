import React, { useRef, useEffect } from 'react';
import type { Conversation, DialogueLine } from '../data/conversations';
import Header from './Header';
import Avatar from './Avatar';
import ProgressBar from './ProgressBar';
import Controls from './Controls';
import ChatBubble from './ChatBubble';

interface Props {
  conversation: Conversation;
  currentLine: number;
  isPlaying: boolean;
  isFirstSpeaker: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  speaker: string;
  text: string;
  colorScheme: {
    card: string;
    bubble: {
      primary: string;
      secondary: string;
      accent: string;
    };
    progress: {
      bg: string;
      fill: string;
    };
  };
}

export default function ConversationCard({
  conversation,
  currentLine,
  isPlaying,
  isFirstSpeaker,
  onPlayPause,
  onNext,
  colorScheme,
}: Props) {
  const chatHistory = conversation.dialogue.slice(0, currentLine + 1);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0; // Scroll to top since we're displaying messages bottom-up
    }
  }, [currentLine]);

  return (
    <div className={`${colorScheme.card} rounded-3xl shadow-xl transition-all duration-700 border-2 h-full flex flex-col`}>
      {/* Chat History Section - Fixed height, scrollable */}
      <div 
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto"
        style={{ display: 'flex', flexDirection: 'column-reverse' }}
      >
        <div className="flex flex-col space-y-3">
          {chatHistory.map((line: DialogueLine, index: number) => (
            <div key={index} className="animate-fadeSlide">
              <ChatBubble
                speaker={line.speaker}
                text={line.text}
                isFirstSpeaker={line.speaker === conversation.speakers.first.name}
                colorScheme={colorScheme.bubble}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Bottom Section */}
      <div className="flex-none p-4 bg-white/50 backdrop-blur-sm border-t-2 border-black/5">
        {/* Avatars and Title */}
        <div className="flex justify-between items-start mb-2">
          <Avatar
            imageUrl={conversation.speakers.first.avatarUrl}
            name={conversation.speakers.first.name}
            isSpeaking={isPlaying && isFirstSpeaker}
            colorScheme={colorScheme}
          />
          <Avatar
            imageUrl={conversation.speakers.second.avatarUrl}
            name={conversation.speakers.second.name}
            isSpeaking={isPlaying && !isFirstSpeaker}
            colorScheme={colorScheme}
          />
        </div>
        
        <Header colorScheme={colorScheme} />

        {/* Controls and Progress */}
        <div className="mt-4">
          <Controls
            isPlaying={isPlaying}
            onPlayPause={onPlayPause}
            onNext={onNext}
            colorScheme={colorScheme}
          />
          <ProgressBar
            current={currentLine}
            total={conversation.dialogue.length}
            colorScheme={colorScheme}
          />
        </div>
      </div>
    </div>
  );
}