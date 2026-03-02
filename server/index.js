import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Smart Budget Planner Backend Running");
});

app.post("/ai-budget", (req, res) => {
  const { allowance, rent, food, travel, entertainment } = req.body;

  const totalExpenses =
    Number(rent) +
    Number(food) +
    Number(travel) +
    Number(entertainment);

  const remaining = allowance - totalExpenses;
  const savingsPercentage = ((remaining / allowance) * 100).toFixed(1);

  const rentRatio = ((rent / allowance) * 100).toFixed(1);
  const foodRatio = ((food / allowance) * 100).toFixed(1);
  const entertainmentRatio = ((entertainment / allowance) * 100).toFixed(1);

  // 🔥 Financial Score
  let score = 100;

  if (remaining < 0) score -= 40;
  if (savingsPercentage < 20) score -= 20;
  if (rentRatio > 40) score -= 10;
  if (foodRatio > 30) score -= 10;
  if (entertainmentRatio > 25) score -= 10;

  if (score < 0) score = 0;

  // 🔥 Risk Level
  let riskLevel = "";
  if (score >= 80) riskLevel = "Low Risk";
  else if (score >= 50) riskLevel = "Moderate Risk";
  else if (score >= 30) riskLevel = "High Risk";
  else riskLevel = "Critical Risk";

  // 🔥 AI-Style Analysis
  let analysis = "";

  if (remaining < 0) {
    analysis += `⚠️ You are currently spending more than your monthly allowance.\n\n`;
    analysis += `Immediate reduction in discretionary categories such as entertainment and food is recommended.\n\n`;
  }

  if (savingsPercentage >= 40) {
    analysis += `✅ Excellent savings discipline. Your financial structure is strong.\n\n`;
    analysis += `Consider investing surplus funds or building an emergency reserve.\n\n`;
  } 
  else if (savingsPercentage >= 20 && remaining >= 0) {
    analysis += `🙂 Your savings are stable but could be optimized.\n\n`;
    analysis += `Review recurring expenses to improve long-term financial growth.\n\n`;
  } 
  else if (remaining >= 0) {
    analysis += `⚠️ Your savings buffer is weak.\n\n`;
    analysis += `Reducing flexible expenses will improve financial stability.\n\n`;
  }

  if (rentRatio > 40) {
    analysis += `🏠 Housing costs consume a significant portion of your income. Explore shared housing or utility optimization.\n\n`;
  }

  if (foodRatio > 30) {
    analysis += `🍽️ Food spending is high. Meal planning and limiting deliveries can improve savings.\n\n`;
  }

  if (entertainmentRatio > 25) {
    analysis += `🎬 Entertainment expenses are elevated. Setting monthly caps is advisable.\n\n`;
  }

  if (remaining > 0) {
    analysis += `💰 You have ₹${remaining} remaining this month. Allocate this directly to savings.\n\n`;
  }

  // 🔥 6-Month Projection
  let projection = "";

  if (remaining > 0) {
    const sixMonthSavings = remaining * 6;

    projection += `📈 If you maintain this spending pattern, you could accumulate approximately ₹${sixMonthSavings} over the next 6 months.\n\n`;

    if (score >= 80) {
      projection += `Your current financial behavior suggests strong long-term stability.\n\n`;
    } else if (score >= 50) {
      projection += `With minor optimization, your financial growth rate could significantly improve.\n\n`;
    } else {
      projection += `Without corrective action, your savings growth may remain limited.\n\n`;
    }
  } else {
    const sixMonthLoss = Math.abs(remaining) * 6;

    projection += `⚠️ If this overspending trend continues, you may accumulate a deficit of ₹${sixMonthLoss} over 6 months.\n\n`;
    projection += `Immediate budget restructuring is recommended.\n\n`;
  }

  res.json({
    summary: `
Total Expenses: ₹${totalExpenses}
Remaining Balance: ₹${remaining}
Savings: ${savingsPercentage}%`,
    score,
    riskLevel,
    analysis,
    projection
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});