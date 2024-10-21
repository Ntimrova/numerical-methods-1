import React, { useState } from 'react';
import Header from './Header';
import InputForm from './InputForm';
import ResultTable from './ResultTable';
import Graph from './Graph';
import { iterativeMethod, bisectionMethod, newtonMethod } from '../utils/methods';

function App() {
  const [equation, setEquation] = useState('');
  const [range, setRange] = useState({ a: 0, b: 1 });
  const [precision, setPrecision] = useState(0.001);
  const [results, setResults] = useState([]);

  const handleCalculate = () => {
    const iterResults = iterativeMethod(equation, range.a, range.b, precision);
    const bisectResults = bisectionMethod(equation, range.a, range.b, precision);
    const newtonResults = newtonMethod(equation, range.a, range.b, precision);

    setResults([
      { method: 'Iterative', ...iterResults },
      { method: 'Bisection', ...bisectResults },
      { method: 'Newton', ...newtonResults },
    ]);
  };

  return (
    <div className="App">
      <Header />
      <InputForm 
        equation={equation} 
        setEquation={setEquation} 
        range={range} 
        setRange={setRange} 
        precision={precision} 
        setPrecision={setPrecision} 
      />
      <button onClick={handleCalculate}>Calculate</button>
      <ResultTable results={results} />
      <Graph results={results} />
    </div>
  );
}

export default App;
