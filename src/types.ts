export type PixelType = {
  color: string;
  id: string;
};

export type RootState = {
  selectedColor: string;
  palette: string[];
  board: PixelType[];
};
