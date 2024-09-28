import ReactDOM from 'react-dom/client';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Settings from './pages/Settings';
import Game from './pages/Game';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Settings/>}/>

        <Route path='/' element={<Settings/>} />

        <Route path='/game' element={<Game/>}/>

      </Routes>
    </BrowserRouter>
);
