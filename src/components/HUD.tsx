import React from 'react';
import { useCubeStore } from '../store';

const hudStyle: React.CSSProperties = {
  position: 'absolute',
  top: '20px',
  left: '20px',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: 'white',
  padding: '10px 15px',
  borderRadius: '5px',
  fontSize: '18px',
};

export function HUD() {
  const moveCount = useCubeStore((state) => state.moveCount);

  return (
    <div style={hudStyle}>
      Mosse: {moveCount}
    </div>
  );
}
