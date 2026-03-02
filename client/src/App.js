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

  const [result, setResult] = useState("");
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
      setResult(response.data.suggestion);
    } catch (error) {
      setResult("Error connecting to backend");
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <div className="budget-card">
        <h2>💰 AI Budget Planner</h2>

        <div className="input-group">
          <label>Monthly Allowance</label>
          <input name="allowance" onChange={handleChange} />
        </div>

        <div className="section-title">Expenses</div>

        {["rent", "food", "travel", "entertainment"].map((item) => (
          <div className="input-group" key={item}>
            <label>{item.charAt(0).toUpperCase() + item.slice(1)}</label>
            <input name={item} onChange={handleChange} />
          </div>
        ))}

        <button onClick={analyzeBudget}>
          {loading ? "Analyzing..." : "Analyze Budget"}
        </button>
      </div>

      {result && (
        <div className="ai-card">
          <h3>🤖 AI Financial Insight</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default App;