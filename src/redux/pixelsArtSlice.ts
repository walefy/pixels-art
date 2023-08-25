import { createSlice } from '@reduxjs/toolkit';
import { PixelType, RootState } from '../types';
import { nanoid } from 'nanoid';
import { getItemFromLocalStorage, setItemFromLocalStorage } from '../utils/localStoreUtils';
import { nearestPerfectSquare } from '../utils/nearestPerfectSquare';

const LOCAL_STORAGE_BOARD_KEY = 'board';
const LOCAL_STORAGE_PALETTE_KEY = 'palette';
const LOCAL_STORAGE_COLORS_HISTORY_KEY = 'colorsHistory';

const generateRgbColor = () => {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  return `rgb(${red}, ${green}, ${blue})`;
};

const generateInitialBoard = () => {
  const localStorageBoard = getItemFromLocalStorage<PixelType[]>(LOCAL_STORAGE_BOARD_KEY);
  if (localStorageBoard) return localStorageBoard;
  const newBoard = new Array(16).fill(null).map(() => ({ id: nanoid(), color: 'rgb(255, 255, 255)' }));
  setItemFromLocalStorage<PixelType[]>(LOCAL_STORAGE_BOARD_KEY, newBoard);
  return newBoard;
};

const generateInitialPalette = () => {
  const localStoragePalette = getItemFromLocalStorage<string[]>(LOCAL_STORAGE_PALETTE_KEY);
  if (localStoragePalette) return localStoragePalette;
  const newPalette = new Array(4).fill(null).map(generateRgbColor);
  setItemFromLocalStorage<string[]>(LOCAL_STORAGE_PALETTE_KEY, newPalette);
  return newPalette;
};

const generateInitialColorsHistory = () => {
  const localStorageColorsHistory = getItemFromLocalStorage<string[]>(LOCAL_STORAGE_COLORS_HISTORY_KEY);
  if (localStorageColorsHistory) return localStorageColorsHistory;
  setItemFromLocalStorage<string[]>(LOCAL_STORAGE_COLORS_HISTORY_KEY, []);
  return [];
};

const palette = generateInitialPalette();

const INITIAL_STATE: RootState = {
  selectedColor: palette[0],
  palette,
  mouseTool: 'pen',
  board: generateInitialBoard(),
  colorsHistory: generateInitialColorsHistory(),
};

const pixelArtSlice = createSlice({
  name: 'counter',
  initialState: INITIAL_STATE,
  reducers: {
    changeSelectedColor: (state, action) => {
      state.selectedColor = action.payload;
    },
    changePixelColor: (state, action) => {
      const index = state.board.findIndex((pixel) => pixel.id === action.payload.id);
      state.board[index].color = action.payload.color;
      setItemFromLocalStorage<PixelType[]>(LOCAL_STORAGE_BOARD_KEY, state.board);
    },
    regeneratePalette: (state) => {
      const newPalette = new Array(4).fill(null).map(generateRgbColor);
      state.palette = newPalette;
      state.selectedColor = newPalette[0];
      setItemFromLocalStorage<string[]>(LOCAL_STORAGE_PALETTE_KEY, newPalette);
    },
    changeBoardSize: (state, action) => {
      const newBoard = new Array(nearestPerfectSquare(action.payload))
        .fill(null).map(() => ({ id: nanoid(), color: 'rgb(255, 255, 255)' }));
      state.board = newBoard;
      setItemFromLocalStorage<PixelType[]>(LOCAL_STORAGE_BOARD_KEY, newBoard);
    },
    addPaletteInHistory: (state) => {
      const colorsHistory = getItemFromLocalStorage<string[]>(LOCAL_STORAGE_COLORS_HISTORY_KEY);
      if (colorsHistory) {
        const newColorsHistory = [...colorsHistory, ...state.palette];
        setItemFromLocalStorage<string[]>(LOCAL_STORAGE_COLORS_HISTORY_KEY, newColorsHistory);
        state.colorsHistory = newColorsHistory;
      } else {
        setItemFromLocalStorage<string[]>(LOCAL_STORAGE_COLORS_HISTORY_KEY, [...state.palette]);
        state.colorsHistory = [...state.palette];
      }
    },
    changeMouseTool: (state, action) => {
      state.mouseTool = action.payload;
    },
  }
});

export const {
  changeSelectedColor,
  changePixelColor,
  regeneratePalette,
  changeBoardSize,
  addPaletteInHistory,
  changeMouseTool,
} = pixelArtSlice.actions;
export default pixelArtSlice.reducer;
