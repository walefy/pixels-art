import { styled } from 'styled-components';
import { nanoid } from 'nanoid';
import Pixel from './Pixel';
import { useSelector } from 'react-redux';
import { RootState } from '../types';

function PixelBoard() {
  // rewrite
  const board = useSelector((state: RootState) => state.board);

  return (
    <DivPixelBoard>
      {
        board.map((pixel) => (
          <Pixel
            key={ nanoid() }
            initialColor={ pixel.color }
            id={ pixel.id }
          />
        ))
      }
    </DivPixelBoard>
  );
}

const DivPixelBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 40px);
  margin: auto auto;
`;

export default PixelBoard;
