import Palette from './components/Palette';
import PixelBoard from './components/PixelBoard';
import { styled } from 'styled-components';

function App() {
  return (
    <AppContainer>
      <Aside>
        <TestDiv />
      </Aside>
      <TopOrBottom>
        <Palette />
      </TopOrBottom>
      <Main>
        <PixelBoard />
      </Main>
      <Aside>
        <TestDiv />
      </Aside>
      <TopOrBottom>
        <TestDiv />
      </TopOrBottom>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: grid;
  height: 100vh;
  width: 100vw;
  grid-template-rows: 1fr 4fr 1fr;
  grid-template-columns: 1fr 4fr 1fr;
  grid-gap: 10px;
`;

const Aside = styled.aside`
  grid-row: 1 / 4;
`;

const Main = styled.main`
  display: flex;
  grid-row: 2 / 3;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const TopOrBottom = styled.div`
  grid-column: 2 / 3;
`;

const TestDiv = styled.div`
  background-color: red;
  height: 100%;
  width: 100%;
`;

export default App;
