import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types';
import { styled } from 'styled-components';
import { changeMouseTool, changeSelectedColor } from '../redux/pixelsArtSlice';
import { useCallback } from 'react';

type ColorDivProps = {
  $bgColor: string;
  $selectedColor: string;
};

function PaletteHistory() {
  const colorsHistory = useSelector((state: RootState) => state.colorsHistory);
  const selectedColor = useSelector((state: RootState) => state.selectedColor);
  const dispatch = useDispatch();

  const handleClickColor = useCallback((color: string) => {
    dispatch(changeSelectedColor(color));
    dispatch(changeMouseTool('pen'));
  }, []);

  return (
    <ColorContainer>
      {
        colorsHistory.map((color, index) => (
          <ColorDiv
            key={ index }
            $bgColor={ color }
            onClick={() => handleClickColor(color) }
            $selectedColor={ selectedColor }
          />
        ))
      }
    </ColorContainer>
  );
}

const ColorDiv = styled.div.attrs<ColorDivProps>((props) => {
  return {
    style: {
      backgroundColor: props.$bgColor,
      borderColor: props.$selectedColor === props.$bgColor ? 'white' : 'black',
    },
  };
})`
  width: 50px;
  height: 50px;
  border: 1px solid black;
  cursor: pointer;
`;

const ColorContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  align-content: flex-start;
  border-left-width: 1px;
  border-left-style: solid;
  border-left-color: #d6d6d6;
`;

export default PaletteHistory;
