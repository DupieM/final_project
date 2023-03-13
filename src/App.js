import logo from './LOGO.png';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from './pages/landing';
import Compare from './pages/compare';
import Timeline from './pages/timeline';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element= { <Landing />} />
        <Route path='/time' element= { <Timeline />} />
        <Route path='/compare' element= { <Compare />} />
      </Routes>
    </div>
  );
}

export default App;
