import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Text } from 'recharts';

const StatDonutChart = ({ data, centerText }) => {
    const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

    return (
        <div className="chart-container donut-chart">
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        verticalAnchor="middle"
                        className="chart-center-text"
                    >
                        {centerText}
                    </Text>
                </PieChart>
            </ResponsiveContainer>
            <div className="chart-legend">
                {data.map((item, index) => (
                    <div key={item.name} className="legend-item">
                        <span className="legend-color" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                        <span className="legend-label">{item.name}</span>
                        <span className="legend-percentage">{item.value}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatDonutChart;
