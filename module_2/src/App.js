import logo from './logo.svg';
import './App.css';
import ClassCounter from './Components/ClassCounter';
import FunctionalCounter from './Components/FunctionalCounter';

function App() {
  return (
    <div className="App">
      <ClassCounter />
      <hr />
      <FunctionalCounter />
    </div>
  );
}

export default App;
