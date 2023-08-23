import { createSlice } from '@reduxjs/toolkit';
import { PixelType, RootState } from '../types';
import { nanoid } from 'nanoid';
import { getItemFromLocalStorage, setItemFromLocalStorage } from '../utils/localStoreUtils';

const LOCAL_STORAGE_BOARD_KEY = 'board';
const LOCAL_STORAGE_PALETTE_KEY = 'palette';

const generateRgbColor = () => {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  return `rgb(${red}, ${green}, ${blue})`;
};

const generateBoard = () => {
  const localStorageBoard = getItemFromLocalStorage(LOCAL_STORAGE_BOARD_KEY);
  if (localStorageBoard) return localStorageBoard;
  const newBoard = new Array(16).fill(null).map(() => ({ id: nanoid(), color: 'rgb(255, 255, 255)' }));
  setItemFromLocalStorage<PixelType[]>(LOCAL_STORAGE_BOARD_KEY, newBoard);
  return newBoard;
};

const generatePalette = () => {
  const localStoragePalette = getItemFromLocalStorage(LOCAL_STORAGE_PALETTE_KEY);
  if (localStoragePalette) return localStoragePalette;
  const newPalette = new Array(4).fill(null).map(generateRgbColor);
  setItemFromLocalStorage<string[]>(LOCAL_STORAGE_PALETTE_KEY, newPalette);
  return newPalette;
};

const palette = generatePalette();

const INITIAL_STATE: RootState = {
  selectedColor: palette[0],
  palette,
  board: generateBoard(),
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
  }
});

export const { changeSelectedColor, changePixelColor, regeneratePalette } = pixelArtSlice.actions;
export default pixelArtSlice.reducer;
