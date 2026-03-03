import { useState } from "react";
import axios from "axios";
import "./App.css";

/*
  Backend URL
  - In development: uses localhost
  - In production (Vercel): uses VITE_BACKEND_URL
*/

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL ||
  "https://ai-budget-planner-production.up.railway.app";

function App() {
  const [data, setData] = useState({
    allowance: "",
    rent: "",
    food: "",
    travel: "",
    entertainment: "",
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
        `${BACKEND_URL}/ai-budget`,
        data
      );

      setSummary(response.data.summary);
      setAnalysis(response.data.analysis);
      setProjection(response.data.projection);
      setScore(response.data.score);
      setRisk(response.data.riskLevel);
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server. Please try again.");
    }

    setLoading(false);
  };

  const getRiskColor = () => {
    if (risk.includes("Low")) return "#16a34a";       // Green
    if (risk.includes("Moderate")) return "#f59e0b";  // Yellow
    if (risk.includes("High")) return "#f97316";      // Orange
    return "#dc2626";                                 // Red (Critical)
  };

  return (
    <div className="app">
      {/* ===== INPUT CARD ===== */}
      <div className="budget-card">
        <h2>Smart Budget Planner</h2>
        

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
                background: getRiskColor(),
                transition: "width 1s ease-in-out",
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