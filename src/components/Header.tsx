import React from 'react';

interface Props {
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export default function Header({ colorScheme }: Props) {
  return (
    <div className="text-center group">
      <h1 className="text-2xl font-black text-gray-800 leading-none group-hover:animate-wiggle">
        SpeakEasy
      </h1>
      <p className="text-sm text-gray-600">Master English through conversation</p>
    </div>
  );
}