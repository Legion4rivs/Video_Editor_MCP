import { create } from 'zustand';
import { Cube, ICube, IOperator, Operator } from '@markforster/cubits';

interface CubeState {
  cube: ICube;
  operator: IOperator;
  moveCount: number;
  moveLog: string[];
  isSolved: boolean;
  // Actions
  reset: () => void;
  applyMove: (move: string) => void;
}

// Helper function to create a new cube and operator
const createNewCube = () => {
  const cube = new Cube();
  const operator = new Operator();
  operator.cube = cube;
  return { cube, operator };
};

export const useCubeStore = create<CubeState>((set, get) => ({
  ...createNewCube(),
  moveCount: 0,
  moveLog: [],
  isSolved: true,

  reset: () => {
    const { cube, operator } = createNewCube();
    set({ cube, operator, moveCount: 0, moveLog: [], isSolved: true });
  },

  applyMove: (move) => {
    const { operator } = get();
    operator.execute(move);
    set((state) => ({
      // The cube object inside the operator is mutated directly by execute()
      cube: operator.cube,
      moveCount: state.moveCount + 1,
      moveLog: [...state.moveLog, move],
      isSolved: operator.cube.solved(),
    }));
  },
}));
