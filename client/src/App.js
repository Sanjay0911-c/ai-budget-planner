import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState({
    allowance: "",
    rent: "",
    food: "",
    travel: "",
    entertainment: ""
  });

  const [summary, setSummary] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [projection, setProjection] = useState("");
  const [score, setScore] = useState(0);
  const [risk, setRisk] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const analyzeBudget = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:5000/ai-budget",
        data
      );

      setSummary(response.data.summary);
      setAnalysis(response.data.analysis);
      setProjection(response.data.projection);
      setScore(response.data.score);
      setRisk(response.data.riskLevel);
    } catch (error) {
      alert("Backend error. Please check server.");
    }

    setLoading(false);
  };

  const getRiskColor = () => {
    if (risk.includes("Low")) return "#16a34a";
    if (risk.includes("Moderate")) return "#f59e0b";
    if (risk.includes("High")) return "#f97316";
    return "#dc2626";
  };

  return (
    <div className="app">
      {/* ===== INPUT CARD ===== */}
      <div className="budget-card">
        <h2>Student Budget Planner</h2>

        {Object.keys(data).map((key) => (
          <div className="input-group" key={key}>
            <label>{key.toUpperCase()}</label>
            <input
              type="number"
              name={key}
              value={data[key]}
              onChange={handleChange}
              placeholder={`Enter ${key}`}
            />
          </div>
        ))}

        <button onClick={analyzeBudget}>
          {loading ? "Analyzing..." : "Analyze Budget"}
        </button>
      </div>

      {/* ===== REPORT CARD ===== */}
      {summary && (
        <div className="report-card">
          <h3>Financial Health Report</h3>

          <div className="summary-text">
            {summary}
          </div>

          {/* SCORE BAR */}
          <div className="score-container">
            <div
              className="score-bar"
              style={{
                width: `${score}%`,
                background: getRiskColor()
              }}
            ></div>
          </div>

          <div className="score-text">
            Financial Score: {score}/100
          </div>

          {/* RISK BADGE */}
          <div
            className="risk-badge"
            style={{ backgroundColor: getRiskColor() }}
          >
            {risk}
          </div>

          {/* ANALYSIS */}
          <div className="section-title">Detailed Analysis</div>
          <div className="analysis-text">
            {analysis}
          </div>

          {/* PROJECTION */}
          <div className="section-title">6-Month Projection</div>
          <div className="projection-text">
            {projection}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;