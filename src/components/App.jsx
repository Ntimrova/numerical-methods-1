import React, { useState } from 'react';
import { bisectionMethod, newtonMethod, iterativeMethod } from '../utils/methods';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const App = () => {  
  const [result, setResult] = useState(null);
  const [method, setMethod] = useState('bisection');
  const [tolerance, setTolerance] = useState(0.0001);
  const [x0, setX0] = useState(1);
  const [range, setRange] = useState({ a: 1, b: 2 });
  const [resultsTable, setResultsTable] = useState([]);

  const handleCalculate = () => {
    let res;
    switch (method) {
      case 'bisection':
        res = bisectionMethod(range.a, range.b, tolerance);
        break;
      case 'newton':
        res = newtonMethod(x0, tolerance);
        break;
      case 'iterative':
        res = iterativeMethod(x0, tolerance);
        break;
      default:
        res = null;
    }
    setResult(res);
    setResultsTable((prev) => [...prev, { method, result: res }]);
  };

  const data = Array.from({ length: 100 }, (_, i) => {
    const x = i / 10;
    return {
      x: x,
      y: Math.log(5 * x - 3) - 0.1 * x * (1 + x),
    };
  });

  return (
    <div>
      <h1>Чисельне розв'язування нелінійних рівнянь</h1>
      <h2>Рівняння: ln(5x - 3) = 0.1x(1 + x)</h2>

      <label>
        Точність (tolerance):
        <input
          type="number"
          value={tolerance}
          onChange={(e) => setTolerance(parseFloat(e.target.value))}
        />
      </label>

      <label>
        Виберіть метод:
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="bisection">Метод дихотомії</option>
          <option value="newton">Метод Ньютона</option>
          <option value="iterative">Ітераційний метод</option>
        </select>
      </label>

      {method === 'bisection' && (
        <>
          <label>
            Інтервал [a, b]:
            <input
              type="number"
              value={range.a}
              onChange={(e) => setRange({ ...range, a: parseFloat(e.target.value) })}
            />
            <input
              type="number"
              value={range.b}
              onChange={(e) => setRange({ ...range, b: parseFloat(e.target.value) })}
            />
          </label>
        </>
      )}

      {(method === 'newton' || method === 'iterative') && (
        <label>
          Початкове наближення (x0):
          <input
            type="number"
            value={x0}
            onChange={(e) => setX0(parseFloat(e.target.value))}
          />
        </label>
      )}

      <button onClick={handleCalculate}>Розрахувати</button>

      {result !== null && (
        <div>
          <h3>Результат: {result}</h3>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Метод</th>
            <th>Результат</th>
          </tr>
        </thead>
        <tbody>
          {resultsTable.map((row, index) => (
            <tr key={index}>
              <td>{row.method}</td>
              <td>{row.result}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default App;
