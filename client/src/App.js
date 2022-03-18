import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Main from './components/Main/Main';
import Square from './components/Square/Square';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App-background">
    <div className="RPG">
      <Routes>
        <Route path='/' element={<Navigate to='/main'/>} />
        <Route path='/main' element={<Main/>} />
        <Route path='/square' element={<Square/>} />
        <Route path='/home' element={<Home/>} />
      </Routes>
    </div>
    </div>
  );
}

export default App;