import Palette from './components/Palette';
import PixelBoard from './components/PixelBoard';
import { styled } from 'styled-components';

function App() {
  return (
    <AppContainer>
      <Palette />
      <PixelBoard />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100vh;
  width: 100vw;
`;

export default App;
