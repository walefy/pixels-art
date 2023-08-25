import { styled } from 'styled-components';
import { nanoid } from 'nanoid';
import Pixel from './Pixel';
import { useSelector } from 'react-redux';
import { RootState } from '../types';
import { nearestPerfectSquare } from '../utils/nearestPerfectSquare';

type DivPixelBoardProps = {
  $sizeRepeat: number;
};

function PixelBoard() {
  const board = useSelector((state: RootState) => state.board);
  const boardSize = Math.sqrt(nearestPerfectSquare(board.length));

  return (
    <DivPixelBoard  $sizeRepeat={ boardSize }>
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

const DivPixelBoard = styled.div<DivPixelBoardProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$sizeRepeat}, 1fr);
`;

export default PixelBoard;
