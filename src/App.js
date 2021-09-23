import './App.css';
import Board from './Components/Board';

function App() {
  return (
      <div id="app" style={{color: 'white',textAlign: 'center', fontSize: 'large', marginBottom: '7ch'}}>
            Welcome to checkers game!
      <Board/>
    </div>
  );
}

export default App;
