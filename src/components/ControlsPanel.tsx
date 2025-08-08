import React, { useEffect } from 'react';
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

  useEffect(() => {
    // Initialize the solver when the component mounts
    console.log("Initializing solver...");
    min2phase.initFull();
    console.log("Solver initialized.");
  }, []);

  const handleShuffle = () => {
    // A more robust shuffle using the library's operator
    const scramble = useCubeStore.getState().operator.scramble();
    scramble.split(' ').forEach(move => applyMove(move));
    console.log(`Shuffled with: ${scramble}`);
  };

  const handleReset = () => {
    reset();
    console.log("Cube reset!");
  };

  const handleSolve = () => {
    console.log("Attempting to solve...");

    // 1. Get the current cube state
    const cubeState = cube.state;

    // 2. Define the face order for the facelet string (U-R-F-D-L-B)
    const faceOrder = [
      FaceOption.WHITE, FaceOption.RED, FaceOption.BLUE,
      FaceOption.YELLOW, FaceOption.ORANGE, FaceOption.GREEN
    ];

    // 3. Build the facelet string
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

    // 4. Call the solver
    const solution = min2phase.solve(faceletString);
    console.log("Solver produced solution:", solution);

    // 5. Apply the solution
    if (solution) {
      solution.split(' ').forEach(move => {
        // Here we would ideally have a delay for animation
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
