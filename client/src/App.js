import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

function App() {
    const [data, setData] = useState([]);
    const userId = 'user123'; // Hardcoded for demo purposes

    
    useEffect(() => {
        axios.get(`/api/user-data/${userId}`)
            .then(response => {
                setData(response.data);
                renderChart(response.data);
            });
    }, []);

    const renderChart = (data) => {
        const ctx = document.getElementById('financeChart').getContext('2d');
        const chartData = data.map(d => ({ x: new Date(d.date), y: d.amountSpent }));

        new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Spending Over Time',
                    data: chartData,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'month'
                        }
                    }
                }
            }
        });
    };

    return (
        <div className="App">
            <h1>Personal Finance Dashboard</h1>
            <canvas id="financeChart" width="400" height="200"></canvas>
        </div>
    );
}

export default App;