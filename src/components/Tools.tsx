import { useDispatch, useSelector } from 'react-redux';
import { changeBoardSize, changeMouseTool, changeSelectedColor } from '../redux/pixelsArtSlice';
import { Eraser, EyedropperSample, Pencil, Trash } from '@phosphor-icons/react';
import { styled } from 'styled-components';
import { RootState } from '../types';
import { useCallback } from 'react';

function Tools() {
  const boardLength = useSelector((state: RootState) => state.board.length);
  const selectedColor = useSelector((state: RootState) => state.selectedColor);
  const dispatch = useDispatch();

  const handleCLickEraseEverything = useCallback(() => {
    const confirm = window.confirm('Are you sure you want to erase everything?');
    if(confirm) dispatch(changeBoardSize(boardLength));
  }, [boardLength]);

  const handleClickPen = useCallback(() => {
    dispatch(changeSelectedColor(selectedColor));
    dispatch(changeMouseTool('pen'));
  }, [selectedColor]);

  const handleClickColorPicker = useCallback(() => {
    dispatch(changeMouseTool('color-picker'));
  }, []);
  
  return (
    <ToolsContainer>
      <ToolButton
        onClick={ () => dispatch(changeMouseTool('eraser')) }
        title="Eraser"
      >
        <Eraser size={32} />
      </ToolButton>
      <ToolButton onClick={ handleCLickEraseEverything } title="Erase everything">
        <Trash size={32} />
      </ToolButton>
      <ToolButton onClick={ handleClickPen } title="Pen">
        <Pencil size={32} />
      </ToolButton>
      <ToolButton title="color picker" onClick={ handleClickColorPicker }>
        <EyedropperSample size={32} />
      </ToolButton>
      <InputColorContainer>
        <InputColor type="color" onChange={ (event) => dispatch(changeSelectedColor(event.target.value)) } />
      </InputColorContainer>
    </ToolsContainer>
  );
}

const ToolsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  border: 1px solid transparent;
  border-right-color: #d6d6d6;
  height: 100%;
  padding: 10px;
  gap: 10px;
`;

const ToolButton = styled.button`
  line-height: 0;
  background-color: transparent;
  border: 1px solid black;
  cursor: pointer;
`;

const InputColorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  width: 34px;
  height: 34px;
`;

const InputColor = styled.input`
  background-color: transparent;
  cursor: pointer;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
`;

export default Tools;
