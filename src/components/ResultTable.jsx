import React from 'react';

function ResultTable({ results }) {
  return (
    <div>
      <h2>Calculation Results</h2>
      <table>
        <thead>
          <tr>
            <th>Method</th>
            <th>Approximate Root</th>
            <th>Iterations</th>
            <th>Accuracy</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.method}</td>
              <td>{result.root}</td>
              <td>{result.iterations}</td>
              <td>{result.accuracy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultTable;
