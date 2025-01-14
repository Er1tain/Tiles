import ReactDOM from 'react-dom/client';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Settings from './pages/Settings';
import Game from './pages/Game';
import { Provider } from 'react-redux';
import  store  from './app/store/store';
import Result from './pages/Result';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='*' element={<Settings/>}/>

          <Route path='/' element={<Settings/>} />

          <Route path='/game' element={<Game/>}/>

          <Route path='/result' element={<Result/>} />
        </Routes>
      </Provider>
    </BrowserRouter>
);
