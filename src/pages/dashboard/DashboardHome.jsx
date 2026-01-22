import React, { useEffect, useState } from 'react';
import './DashboardHome.css';
import MetricCard from './MetricCard';
import StatDonutChart from './StatDonutChart';
import RiskDistributionChart from './RiskDistributionChart';
import StudentTable from './StudentTable';
import { Users, GraduationCap, AlertTriangle, Clock } from 'lucide-react';

const DashboardHome = () => {
  const [summary, setSummary] = useState(null);
  const [distribution, setDistribution] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, distRes, studentsRes] = await Promise.all([
          fetch('http://localhost:5000/api/dashboard/summary').then(res => res.json()),
          fetch('http://localhost:5000/api/dashboard/risk-distribution').then(res => res.json()),
          fetch('http://localhost:5000/api/students').then(res => res.json())
        ]);

        setSummary(summaryRes);
        setDistribution(distRes);
        setStudents(studentsRes.students);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <p style={{ color: '#64748b', fontWeight: 500 }}>Loading academic insights...</p>
      </div>
    );
  }

  const donutData = [
    { name: 'Passed', value: distribution?.passed || 0 },
    { name: 'Medium Risk', value: distribution?.medium_risk || 0 },
    { name: 'High Risk', value: distribution?.high_risk || 0 }
  ];

  return (
    <div className="dash-container">
      {/* Summary Section */}
      <div className="stats-grid">
        <MetricCard
          label="Total Students"
          value={summary?.total_students}
          icon={<Users size={18} />}
          trend="up"
          trendValue="+12"
        />
        <MetricCard
          label="Pass Percentage"
          value={summary?.pass_percentage}
          unit="%"
          icon={<GraduationCap size={18} />}
          trend="up"
          trendValue="+2.4%"
        />
        <MetricCard
          label="High-Risk Students"
          value={summary?.high_risk_students}
          icon={<AlertTriangle size={18} />}
          trend="down"
          trendValue="-5"
        />
        <MetricCard
          label="Avg Attendance"
          value={summary?.avg_attendance}
          unit="%"
          icon={<Clock size={18} />}
          trend="down"
          trendValue="-0.8%"
        />
      </div>

      {/* Charts Section */}
      <div className="charts-row">
        <div className="risk-summary-card">
          <div className="risk-summary-header">
            <h3>Pass & Risk Overview</h3>
          </div>
          <StatDonutChart
            data={donutData}
            centerText={`${summary?.pass_percentage}%`}
          />
        </div>
        <RiskDistributionChart data={distribution?.risk_levels || []} />
      </div>

      {/* Student Details Section */}
      <div className="content-section">
        <h2 className="section-title">Individual Student Performance</h2>
        <StudentTable students={students} />
      </div>
    </div>
  );
};

export default DashboardHome;
