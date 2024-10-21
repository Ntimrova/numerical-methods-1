import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function Graph({ results }) {
  // Prepare data for graph
  const data = results.map((result, index) => ({
    method: result.method,
    root: result.root,
  }));

  return (
    <div>
      <h2>Graph of Solutions</h2>
      <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="root" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="method" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
}

export default Graph;
