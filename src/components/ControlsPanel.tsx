import React, { useEffect, useRef } from 'react';
import { useCubeStore } from '../store';
import { faceForFaceOption, FaceOption, COLOURS } from '@markforster/cubits';
import * as min2phase from 'min2phase.js';

const buttonStyle: React.CSSProperties = {
  margin: '5px',
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#333',
  color: 'white',
  border: '1px solid #555',
  borderRadius: '5px',
  cursor: 'pointer',
};

const panelStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  padding: '10px',
  borderRadius: '10px',
  display: 'flex',
  justifyContent: 'center',
};

// Mapping from the library's color enum to the facelet character expected by solvers
const colorToFacelet: { [key in COLOURS]: string } = {
  [COLOURS.WHITE]: 'U',
  [COLOURS.RED]: 'R',
  [COLOURS.BLUE]: 'F',
  [COLOURS.YELLOW]: 'D',
  [COLOURS.ORANGE]: 'L',
  [COLOURS.GREEN]: 'B',
};

export function ControlsPanel() {
  const { cube, reset, applyMove } = useCubeStore();
  const solverInitialized = useRef(false);

  useEffect(() => {
    if (!solverInitialized.current) {
      console.log("Initializing solver...");
      min2phase.initFull();
      solverInitialized.current = true;
      console.log("Solver initialized.");
    }
  }, []);

  const handleShuffle = () => {
    const moves = ['U', 'D', 'L', 'R', 'F', 'B'];
    const modifiers = ['', "'", '2'];
    let scramble = '';
    for (let i = 0; i < 20; i++) {
      const move = moves[Math.floor(Math.random() * moves.length)];
      const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
      scramble += `${move}${modifier} `;
    }
    scramble = scramble.trim();

    reset();
    scramble.split(' ').forEach(move => applyMove(move));
    console.log(`Shuffled with: ${scramble}`);
  };

  const handleReset = () => {
    reset();
    console.log("Cube reset!");
  };

  const handleSolve = () => {
    console.log("Attempting to solve...");

    const cubeState = cube.state;
    const faceOrder = [
      FaceOption.UP, FaceOption.RIGHT, FaceOption.FRONT,
      FaceOption.DOWN, FaceOption.LEFT, FaceOption.BACK
    ];
    let faceletString = '';
    for (const face of faceOrder) {
      const faceData = faceForFaceOption(cubeState, face);
      if (faceData && faceData.colours) {
        faceletString += faceData.colours.map(c => colorToFacelet[c]).join('');
      }
    }

    if (faceletString.length !== 54) {
      console.error("Failed to generate a valid facelet string. Got:", faceletString);
      return;
    }

    console.log("Generated Facelet String:", faceletString);
    const solution = min2phase.solve(faceletString);
    console.log("Solver produced solution:", solution);

    if (solution) {
      solution.split(' ').filter(move => move).forEach(move => {
        applyMove(move);
      });
    }
  };

  return (
    <div style={panelStyle}>
      <button style={buttonStyle} onClick={handleShuffle}>Mischia</button>
      <button style={buttonStyle} onClick={handleReset}>Reset</button>
      <button style={buttonStyle} onClick={handleSolve}>Risolvi</button>
    </div>
  );
}
