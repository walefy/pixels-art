import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { changeBoardSize } from '../redux/pixelsArtSlice';
import { styled } from 'styled-components';
import { Check } from '@phosphor-icons/react';

function InputBoardSize() {
  const inputValueRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  
  const handleClickConfirm = useCallback(() => {
    const inputValue = inputValueRef.current?.valueAsNumber;
    
    if(!inputValue) {
      window.alert('Digite um número!');
      return;
    }

    if(inputValue > 300) {
      window.alert('O tamanho máximo é 300!');
      return;
    }

    dispatch(changeBoardSize(inputValue));
  }, [inputValueRef]);
  
  return (
    <NumberInputContainer>
      <NumberInput type="number" min={ 16 } max={ 50 } ref={ inputValueRef } />
      <ConfirmButton onClick={ handleClickConfirm }>
        <Check size={ 16 } />
      </ConfirmButton>
    </NumberInputContainer>
  );
}

const NumberInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 100%;
  border: 1px solid transparent;
  border-top-color: #d6d6d6;
`;

const NumberInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
  width: 5rem;
`;

const ConfirmButton = styled.button`
  padding: 9px;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  line-height: 0;
  background-color: #f0f0f0;
  cursor: pointer;
  
  &:hover {
    background-color: #ddd;
  }
`;

export default InputBoardSize;
