import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { RootState } from '../types';
import { changePixelColor } from '../redux/pixelsArtSlice';

type PixelProps = {
  initialColor: string;
  id: string;
};

function Pixel({ initialColor, id }: PixelProps) {
  const selectedColor = useSelector((state: RootState) => state.selectedColor);
  const [color, setColor] = useState(initialColor);

  const dispatch = useDispatch();

  const handleClickPixel = useCallback(() => {
    setColor(selectedColor);
    dispatch(changePixelColor({ id, color: selectedColor }));
  }, [selectedColor]);

  return (
    <DivPixel color={ color } onClick={ handleClickPixel } />
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
