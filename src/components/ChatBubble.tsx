import React from 'react';

interface Props {
  speaker: string;
  text: string;
  isFirstSpeaker: boolean;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export default function ChatBubble({ speaker, text, isFirstSpeaker, colorScheme }: Props) {
  const bubbleColor = isFirstSpeaker ? colorScheme.primary : colorScheme.secondary;

  return (
    <div 
      className={`max-w-[85%] ${isFirstSpeaker ? 'ml-auto' : 'mr-auto'} 
        group cursor-pointer
        ${bubbleColor}
        rounded-[2rem] ${isFirstSpeaker ? 'rounded-br-none' : 'rounded-bl-none'} 
        p-4 shadow-lg transition-all duration-300 
        hover:shadow-2xl hover:-translate-y-1 relative`}
    >
      <div 
        className={`absolute -bottom-3 ${isFirstSpeaker ? 'right-0' : 'left-0'} 
          w-6 h-6 
          ${bubbleColor}
          clip-path-bubble transform ${isFirstSpeaker ? 'rotate-[225deg]' : 'rotate-45'}`}
      />
      <p className="text-sm font-bold text-white/90 mb-1 tracking-wide uppercase font-mono">
        {speaker}
      </p>
      <p className="text-white font-sans text-lg leading-relaxed tracking-wide">
        {text}
      </p>
    </div>
  );
}