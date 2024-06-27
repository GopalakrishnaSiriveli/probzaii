import React, { useEffect, useState, useRef } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush
} from 'recharts';

import './App.css';

const Chart = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [timeframe, setTimeframe] = useState("daily");
  const chartRef = useRef(null);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  useEffect(() => {
    const filterData = () => {
      switch (timeframe) {
        case 'weekly':
          return data.filter((_, index) => index % 7 === 0);
        case 'monthly':
          return data.filter((_, index) => index % 30|| index% 31 === 0);
        default:
          return data;
      }
    };

    setFilteredData(filterData());
  }, [data, timeframe]);

  const handleTimeframeChange = (e) => {
    setTimeframe(e.target.value);
  };

  const handleChartClick = (data) => {
    alert(`You clicked on ${data.activeLabel} with value ${data.activePayload[0].value}`);
  };

  return (
    <div>
      <select onChange={handleTimeframeChange}  className='frame' value={timeframe}>
        <option  className='time' value="daily">Daily</option>
        <option className='time' value="weekly">Weekly</option>
        <option className='time' value="monthly">Monthly</option>
      </select>

      <div ref={chartRef}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={filteredData} onClick={handleChartClick}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Brush dataKey="timestamp" height={30} stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;