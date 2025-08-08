import React from 'react';
import { useCubeStore } from '../store';

const logStyle: React.CSSProperties = {
  position: 'absolute',
  top: '20px',
  right: '20px',
  width: '120px',
  height: '80%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: 'white',
  padding: '10px',
  borderRadius: '5px',
  fontSize: '14px',
  overflowY: 'auto',
  fontFamily: 'monospace',
};

const moveStyle: React.CSSProperties = {
    margin: '0 5px',
    display: 'inline-block',
}

export function MoveLog() {
  const moveLog = useCubeStore((state) => state.moveLog);

  return (
    <div style={logStyle}>
      <h4 style={{marginTop: 0, borderBottom: '1px solid white', paddingBottom: '5px'}}>Log Mosse</h4>
      <div>
        {moveLog.map((move, index) => (
          <span key={index} style={moveStyle}>{move}</span>
        ))}
      </div>
    </div>
  );
}
