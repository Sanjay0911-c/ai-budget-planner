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
      alert("Backend error");
    }
    setLoading(false);
  };

  const getRiskColor = () => {
    if (risk.includes("Low")) return "#28a745";
    if (risk.includes("Moderate")) return "#ffc107";
    if (risk.includes("High")) return "#fd7e14";
    return "#dc3545";
  };

  return (
    <div className="app">
      <div className="budget-card">
        <h2>Smart Budget Planner</h2>

        {Object.keys(data).map((key) => (
          <div className="input-group" key={key}>
            <label>{key.toUpperCase()}</label>
            <input name={key} onChange={handleChange} />
          </div>
        ))}

        <button onClick={analyzeBudget}>
          {loading ? "Analyzing..." : "Analyze Budget"}
        </button>
      </div>

      {summary && (
        <div className="report-card">
          <h3>Financial Health Report</h3>

          <pre>{summary}</pre>

          <div className="score-container">
            <div
              className="score-bar"
              style={{ width: `${score}%`, background: getRiskColor() }}
            ></div>
          </div>

          <p className="score-text">Score: {score}/100</p>

          <div
            className="risk-badge"
            style={{ backgroundColor: getRiskColor() }}
          >
            {risk}
          </div>

          <h4>Detailed Analysis</h4>
          <pre>{analysis}</pre>

          <h4>6-Month Projection</h4>
          <pre>{projection}</pre>
        </div>
      )}
    </div>
  );
}

export default App;