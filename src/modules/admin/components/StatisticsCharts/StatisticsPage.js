import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import './StatisticsPage.css'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const StatisticsPage = () => {
    const statisticsData = {
        books: 1200,
        readers: 800,
        visits: 5000,
        borrows: 1500,
        searches: 3000,
        updates: 500,
        availableBooks: 700,
    };


    const yearlyData = {
        years: ['2020', '2021', '2022', '2023', '2024'],
        books: [50, 75, 100, 120, 150],
        readers: [30, 50, 70, 80, 90],
    };

    const barData = {
        labels: ['Sách', 'Độc giả', 'Truy Cập', 'Mượn', 'Tìm Kiếm', 'Thêm Mới', 'Sách Sẵn Có'],
        datasets: [
            {
                label: 'Tổng Giá Trị',
                data: [
                    statisticsData.books,
                    statisticsData.readers,
                    statisticsData.visits,
                    statisticsData.borrows,
                    statisticsData.searches,
                    statisticsData.updates,
                    statisticsData.availableBooks,
                ],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const pieData = {
        labels: ['Sách', 'Độc Giả', 'Mượn', 'Sách Sẵn Có'],
        datasets: [
            {
                data: [
                    statisticsData.books,
                    statisticsData.readers,
                    statisticsData.borrows,
                    statisticsData.availableBooks,
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                ],
            },
        ],
    };


    const lineData = {
        labels: yearlyData.years,
        datasets: [
            {
                label: 'Sách',
                data: yearlyData.books,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
            },
            {
                label: 'Độc Giả',
                data: yearlyData.readers,
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="statistics-page">
            <h2>Thống Kê Nhanh</h2>
            <div className="chart-container">
                <div className="chart">
                    <h3>Thống Kê Tổng Quát</h3>
                    <Bar data={barData} />
                </div>
                <div className="chart">
                    <h3>Sách Và Độc Giả</h3>
                    <Pie data={pieData} />
                </div>
                <div className="chart">
                    <h3>Tăng Trưởng Qua Các Năm</h3>
                    <Line data={lineData} />
                </div>
            </div>
        </div>
    );
};

export default StatisticsPage;
