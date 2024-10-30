import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function PhoneContainer({ children }: Props) {
  return (
    <div className="max-w-sm mx-auto min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full aspect-[9/16] bg-white rounded-[3rem] shadow-2xl p-4 relative overflow-hidden">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-black/10 rounded-full" />
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}