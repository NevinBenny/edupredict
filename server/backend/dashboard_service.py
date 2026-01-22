from flask import Blueprint, jsonify
import random

dashboard_bp = Blueprint("dashboard", __name__)

@dashboard_bp.route("/api/dashboard/summary", methods=["GET"])
def get_summary():
    # Mock data for academic metrics
    summary = {
        "total_students": 1250,
        "pass_percentage": 84.5,
        "high_risk_students": 42,
        "avg_attendance": 88.2
    }
    return jsonify(summary)

@dashboard_bp.route("/api/dashboard/risk-distribution", methods=["GET"])
def get_risk_distribution():
    # Mock data for donut and bar charts
    distribution = {
        "passed": 84.5,
        "medium_risk": 12.3,
        "high_risk": 3.2,
        "risk_levels": [
            {"label": "Low Risk", "value": 1056, "color": "#10b981"},
            {"label": "Medium Risk", "value": 154, "color": "#f59e0b"},
            {"label": "High Risk", "value": 40, "color": "#ef4444"}
        ]
    }
    return jsonify(distribution)

@dashboard_bp.route("/api/students", methods=["GET"])
def get_students():
    # Mock student list
    departments = ["Computer Science", "Information Technology", "Electronics", "Mechanical"]
    risks = ["Low", "Medium", "High"]
    
    students = []
    names = ["John Doe", "Jane Smith", "Robert Brown", "Emily Davis", "Michael Wilson", "Sarah Miller", "David Taylor", "Emma Anderson", "Christopher Thomas", "Olivia Jackson"]
    
    for i in range(1, 51):
        dept = random.choice(departments)
        risk = "Low" if i % 5 != 0 else ("Medium" if i % 10 != 0 else "High")
        attendance = random.randint(65, 98)
        internal_score = random.randint(40, 95)
        
        students.append({
            "id": f"STU{1000 + i}",
            "name": names[i % len(names)],
            "department": dept,
            "attendance": f"{attendance}%",
            "internal_score": internal_score,
            "risk_level": risk
        })
        
    return jsonify({"students": students, "total": len(students)})
