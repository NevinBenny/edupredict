import React from 'react';
import './DashboardComponents.css';

const MetricCard = ({ label, value, unit, icon, trend, trendValue }) => {
    return (
        <div className="metric-card">
            <div className="metric-header">
                <span className="metric-icon">{icon}</span>
                <span className="metric-label">{label}</span>
            </div>
            <div className="metric-body">
                <span className="metric-value">{value}</span>
                {unit && <span className="metric-unit">{unit}</span>}
            </div>
            {trend && (
                <div className={`metric-trend ${trend}`}>
                    <span className="trend-arrow">{trend === 'up' ? '↑' : '↓'}</span>
                    <span className="trend-value">{trendValue}</span>
                    <span className="trend-text">since last month</span>
                </div>
            )}
        </div>
    );
};

export default MetricCard;
