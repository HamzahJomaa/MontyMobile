import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Grid } from '@mui/material';

class DashboardPage extends React.Component {
    render() {
        const chart1Data = {
            labels: ['Day 1', 'Day 2', 'Day 3'],
            datasets: [
                {
                    label: 'Messages Sent',
                    data: [10, 15, 12],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Messages Received',
                    data: [8, 10, 6],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Messages Failed',
                    data: [2, 5, 6],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
            ],
        };

        const chart2Data = {
            labels: ['Day 1', 'Day 2', 'Day 3'],
            datasets: [
                {
                    label: 'Calls Sent',
                    data: [5, 7, 6],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Calls Received',
                    data: [4, 6, 3],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            plugins: {
                title: {
                    display: true,
                    text: 'Chart.js Bar Chart - Stacked',
                },
            },
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                },
            },
        };

        return (
            <div>
                <h1>Dashboard</h1>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <h2>Chart 1: Messages</h2>
                        <Bar options={options} data={chart1Data} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <h2>Chart 2: Calls</h2>
                        <Bar data={chart2Data} />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default DashboardPage;
