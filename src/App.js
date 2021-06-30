import logo from './logo.svg';
import './App.css';
import Demo from './components/Demo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Demo />
      </header>
    </div>
  );
}

export default App;
