import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { FaChartBar, FaChartLine, FaChartPie, FaFilter } from 'react-icons/fa';

const EventAnalytics = ({ events, registrations }) => {
  const [timeRange, setTimeRange] = useState('month'); // 'week', 'month', 'year'
  const [chartType, setChartType] = useState('revenue'); // 'revenue', 'attendance', 'categories', 'growth'
  
  // Process data based on selected time range and chart type
  const processData = () => {
    // Sample data for demonstration
    const revenueData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Revenue',
          data: [4500, 5200, 6800, 5900, 6000, 7200, 8500, 9200, 8700, 9500, 10200, 11500],
          backgroundColor: 'rgba(76, 175, 80, 0.6)',
          borderColor: '#4caf50',
          borderWidth: 2,
        },
      ],
    };

    const attendanceData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Attendance',
          data: [120, 150, 180, 210, 190, 240, 280, 320, 290, 350, 380, 420],
          backgroundColor: 'rgba(33, 150, 243, 0.6)',
          borderColor: '#2196f3',
          borderWidth: 2,
        },
      ],
    };

    const categoriesData = {
      labels: ['Music', 'Technology', 'Business', 'Sports', 'Arts', 'Food', 'Education'],
      datasets: [
        {
          label: 'Event Categories',
          data: [35, 25, 15, 10, 8, 5, 2],
          backgroundColor: [
            '#4caf50', // Green
            '#2196f3', // Blue
            '#ff9800', // Orange
            '#f44336', // Red
            '#9c27b0', // Purple
            '#ffeb3b', // Yellow
            '#795548', // Brown
          ],
          borderWidth: 1,
        },
      ],
    };

    const growthData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'New Users',
          data: [50, 60, 70, 85, 95, 110, 125, 140, 155, 170, 190, 210],
          borderColor: '#4caf50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          borderWidth: 2,
          fill: true,
        },
        {
          label: 'Event Registrations',
          data: [70, 85, 100, 120, 140, 160, 190, 220, 250, 280, 310, 350],
          borderColor: '#2196f3',
          backgroundColor: 'rgba(33, 150, 243, 0.1)',
          borderWidth: 2,
          fill: true,
        },
      ],
    };

    switch (chartType) {
      case 'revenue':
        return revenueData;
      case 'attendance':
        return attendanceData;
      case 'categories':
        return categoriesData;
      case 'growth':
        return growthData;
      default:
        return revenueData;
    }
  };

  const renderChart = () => {
    const data = processData();
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: getChartTitle(),
          font: {
            size: 16,
          },
        },
      },
    };

    switch (chartType) {
      case 'revenue':
        return <Bar data={data} options={options} height={300} />;
      case 'attendance':
        return <Bar data={data} options={options} height={300} />;
      case 'categories':
        return <Doughnut data={data} options={options} height={300} />;
      case 'growth':
        return <Line data={data} options={options} height={300} />;
      default:
        return <Bar data={data} options={options} height={300} />;
    }
  };

  const getChartTitle = () => {
    switch (chartType) {
      case 'revenue':
        return 'Monthly Revenue';
      case 'attendance':
        return 'Event Attendance';
      case 'categories':
        return 'Event Categories Distribution';
      case 'growth':
        return 'Growth Trends';
      default:
        return 'Event Analytics';
    }
  };

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h2>Event Analytics</h2>
        <div className="analytics-controls">
          <div className="chart-type-selector">
            <button 
              className={chartType === 'revenue' ? 'active' : ''}
              onClick={() => setChartType('revenue')}
            >
              <FaChartBar /> Revenue
            </button>
            <button 
              className={chartType === 'attendance' ? 'active' : ''}
              onClick={() => setChartType('attendance')}
            >
              <FaChartBar /> Attendance
            </button>
            <button 
              className={chartType === 'categories' ? 'active' : ''}
              onClick={() => setChartType('categories')}
            >
              <FaChartPie /> Categories
            </button>
            <button 
              className={chartType === 'growth' ? 'active' : ''}
              onClick={() => setChartType('growth')}
            >
              <FaChartLine /> Growth
            </button>
          </div>
          <div className="time-range-selector">
            <button 
              className={timeRange === 'week' ? 'active' : ''}
              onClick={() => setTimeRange('week')}
            >
              Week
            </button>
            <button 
              className={timeRange === 'month' ? 'active' : ''}
              onClick={() => setTimeRange('month')}
            >
              Month
            </button>
            <button 
              className={timeRange === 'year' ? 'active' : ''}
              onClick={() => setTimeRange('year')}
            >
              Year
            </button>
          </div>
        </div>
      </div>
      <div className="analytics-chart">
        {renderChart()}
      </div>
      <div className="analytics-summary">
        <div className="summary-card">
          <h3>Total Revenue</h3>
          <p className="summary-value">$85,700</p>
          <p className="summary-change positive">+12.5% from last period</p>
        </div>
        <div className="summary-card">
          <h3>Total Attendance</h3>
          <p className="summary-value">2,530</p>
          <p className="summary-change positive">+8.3% from last period</p>
        </div>
        <div className="summary-card">
          <h3>Conversion Rate</h3>
          <p className="summary-value">68.4%</p>
          <p className="summary-change positive">+5.2% from last period</p>
        </div>
        <div className="summary-card">
          <h3>Avg. Ticket Price</h3>
          <p className="summary-value">$42.50</p>
          <p className="summary-change negative">-2.1% from last period</p>
        </div>
      </div>
    </div>
  );
};

export default EventAnalytics;