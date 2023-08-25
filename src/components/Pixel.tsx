import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { RootState } from '../types';
import { changeMouseTool, changePixelColor, changeSelectedColor } from '../redux/pixelsArtSlice';

type PixelProps = {
  initialColor: string;
  id: string;
};

function Pixel({ initialColor, id }: PixelProps) {
  const selectedColor = useSelector((state: RootState) => state.selectedColor);
  const mouseTool = useSelector((state: RootState) => state.mouseTool);
  const [color, setColor] = useState(initialColor);

  const dispatch = useDispatch();

  const handlePixel = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (mouseTool === 'eraser' && event.buttons === 1) {
      setColor('white');
      dispatch(changePixelColor({ id, color: 'white' }));
      return;
    }

    if (mouseTool === 'color-picker' && event.buttons === 1) {
      dispatch(changeSelectedColor(color));
      dispatch(changeMouseTool('pen'));
      console.log(mouseTool);
      return;
    }

    if(mouseTool === 'pen' && event.buttons === 1) {
      setColor(selectedColor);
      dispatch(changePixelColor({ id, color: selectedColor }));
    }
  }, [mouseTool, selectedColor, color, id]);

  return (
    <DivPixel
      color={ color }
      onMouseDown={ handlePixel }
      onMouseEnter={ handlePixel }
      onDragStart={ handlePixel }
      onDragEnd={ handlePixel }
      draggable={ false }
    />
  );
}

const DivPixel = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid black;
  background-color: ${(props) => props.color ?? 'white'};
  cursor: pointer;
`;

export default Pixel;
