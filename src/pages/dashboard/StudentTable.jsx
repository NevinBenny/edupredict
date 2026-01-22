import React, { useState } from 'react';
import './DashboardComponents.css';

const StudentTable = ({ students }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRisk, setFilterRisk] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRisk = filterRisk === 'All' || student.risk_level === filterRisk;
        return matchesSearch && matchesRisk;
    });

    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="student-table-container">
            <div className="table-controls">
                <div className="search-box">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search by ID or Name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="risk-filter">
                    <select value={filterRisk} onChange={(e) => setFilterRisk(e.target.value)}>
                        <option value="All">All Risk Levels</option>
                        <option value="Low">Low Risk</option>
                        <option value="Medium">Medium Risk</option>
                        <option value="High">High Risk</option>
                    </select>
                </div>
            </div>
            <table className="student-table">
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Attendance</th>
                        <th>IA Score</th>
                        <th>Risk Level</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedStudents.length > 0 ? (
                        paginatedStudents.map(student => (
                            <tr key={student.id}>
                                <td style={{ fontWeight: 500, color: '#64748b' }}>{student.id}</td>
                                <td style={{ fontWeight: 600 }}>{student.name}</td>
                                <td>{student.department}</td>
                                <td>{student.attendance}</td>
                                <td style={{ fontWeight: 600 }}>{student.internal_score}/100</td>
                                <td>
                                    <span className={`risk-badge ${student.risk_level.toLowerCase()}`}>
                                        {student.risk_level}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn-view">View Details</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={{ textAlign: 'center', padding: '48px', color: '#94a3b8' }}>
                                No students found matching your criteria.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="pagination">
                <span>Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredStudents.length)} of {filteredStudents.length} students</span>
                <div className="pagination-btns">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                    >
                        Prev
                    </button>
                    <button
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentTable;
