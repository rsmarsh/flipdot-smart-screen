import { createContext, useContext, useReducer, type ReactNode } from 'react';
import { emptyMatrix } from '@/utils/display';
import SIZE from '@/config/size';
import { DotMatrix } from '@/types/flipdot';

type MatrixAction =
  | { type: 'setMatrix'; payload: DotMatrix }
  | { type: 'resetMatrix' }
  | { type: 'emptyMatrix' };

export const MatrixContext = createContext<
  | {
      matrix: DotMatrix;
      matrixDispatch: React.Dispatch<MatrixAction>;
    }
  | undefined
>(undefined);

interface ProviderProps {
  children: ReactNode;
}

const defaultMatrix = emptyMatrix(SIZE);

const reducer = (state: DotMatrix, action: MatrixAction) => {
  switch (action.type) {
    case 'setMatrix':
      return { ...action.payload };
    case 'resetMatrix':
      return defaultMatrix;
    // likely the same as reset, but useful in case the default state becomes a message and we want blank
    case 'emptyMatrix':
      return emptyMatrix(SIZE);
    default:
      return state;
  }
};

export const MatrixContextProvider = (props: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, defaultMatrix);

  return (
    <MatrixContext.Provider value={{ matrix: state, matrixDispatch: dispatch }}>
      {props.children}
    </MatrixContext.Provider>
  );
};

// Hook to access the current state of the matrix
export const useMatrix = () => {
  const matrix = useContext(MatrixContext);

  if (!matrix) {
    throw new Error(
      'Matrix context not found, please wrap a parent component with MatrixContextProvider'
    );
  }

  return matrix;
};
