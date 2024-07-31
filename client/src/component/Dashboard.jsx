import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [urlCount, setUrlCount] = useState(0);
  const [urlCountMonth, setUrlCountMonth] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://urlshortend-1.onrender.com/urls/count');
      setUrlCount(response.data.count);
      setUrlCountMonth(response.data.countMonth);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center">Dashboard</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h3>Total URLs Today</h3>
              <p>{urlCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h3>Total URLs This Month</h3>
              <p>{urlCountMonth}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
