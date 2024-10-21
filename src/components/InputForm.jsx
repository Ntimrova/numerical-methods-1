import React from 'react';

function InputForm({ equation, setEquation, range, setRange, precision, setPrecision }) {
  return (
    <div>
      <h2>Enter the equation and parameters</h2>
      <div>
        <label>Equation: </label>
        <input type="text" value={equation} onChange={(e) => setEquation(e.target.value)} />
      </div>
      <div>
        <label>Range (a, b): </label>
        <input type="number" value={range.a} onChange={(e) => setRange({ ...range, a: parseFloat(e.target.value) })} />
        <input type="number" value={range.b} onChange={(e) => setRange({ ...range, b: parseFloat(e.target.value) })} />
      </div>
      <div>
        <label>Precision: </label>
        <input type="number" value={precision} onChange={(e) => setPrecision(parseFloat(e.target.value))} />
      </div>
    </div>
  );
}

export default InputForm;
