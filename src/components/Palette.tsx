import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { changeSelectedColor, regeneratePalette, addPaletteInHistory, changeMouseTool } from '../redux/pixelsArtSlice';
import { RootState } from '../types';
import { ArrowsClockwise } from '@phosphor-icons/react';
import { useCallback } from 'react';

type DivPaletteProps =  {
  $color: string;
  $selectedColor: string;
}

function Palette() {
  const palette = useSelector((state: RootState) => state.palette);
  const selectedColor = useSelector((state: RootState) => state.selectedColor);

  const dispatch = useDispatch();

  const handleClickRegenerate = useCallback(() => {
    dispatch(addPaletteInHistory());
    dispatch(regeneratePalette());
  }, []);

  const handleClickPalette = useCallback((color: string) => {
    dispatch(changeSelectedColor(color));
    dispatch(changeMouseTool('pen'));
  }, []);

  return (
    <PaletteContainer>
      {
        palette.map((color) => (
          <DivPalette
            key={ color }
            $color={ color }
            $selectedColor={ selectedColor }
            onClick={ () => handleClickPalette(color) }
          >
          </DivPalette>
        ))
      }
      <RegenerateButton onClick={ handleClickRegenerate }>
        <ArrowsClockwise size={32} />
      </RegenerateButton>
    </PaletteContainer>
  );
}

const DivPalette = styled.div<DivPaletteProps>`
  width: 100px;
  height: 100px;
  border: 1px solid ${(props) => (props.$selectedColor === props.$color ? 'black' : 'white')};
  border-radius: 50%;
  background-color: ${(props) => props.$color};
  cursor: pointer;
`;

const PaletteContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
`;

const RegenerateButton = styled.button`
  line-height: 0;
  width: 50px;
  height: 50px;
  border: none;
  background-color: whitesmoke;
  border-radius: 50%;
  cursor: pointer;
`;

export default Palette;
