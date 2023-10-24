import './App.css';
import Navbar from '@/components/Navbar';
import Router from '@/router';

function App() {
  return (
    <div className="App">
      <div className="App__header">
        <h2>Stocks Dashboard</h2>
        <Navbar />
      </div>
      <Router />
    </div>
  );
}

export default App;
