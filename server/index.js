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

  // 🔥 STRICTER FINANCIAL SCORE
  let score = 100;

  // Overspending (very high risk)
  if (remaining < 0) score -= 50;

  // Savings strength
  if (savingsPercentage < 10) score -= 30;
  else if (savingsPercentage < 20) score -= 20;

  // Rent ratio
  if (rentRatio > 45) score -= 20;
  else if (rentRatio > 40) score -= 10;

  // Food ratio
  if (foodRatio > 35) score -= 15;
  else if (foodRatio > 30) score -= 10;

  // Entertainment ratio
  if (entertainmentRatio > 30) score -= 15;
  else if (entertainmentRatio > 25) score -= 10;

  if (score < 0) score = 0;

  // 🔥 UPDATED RISK LEVEL THRESHOLDS
  let riskLevel = "";
  if (score >= 85) riskLevel = "Low Risk";
  else if (score >= 65) riskLevel = "Moderate Risk";
  else if (score >= 40) riskLevel = "High Risk";
  else riskLevel = "Critical Risk";

  // 🔥 AI-STYLE ANALYSIS
  let analysis = "";

  if (remaining < 0) {
    analysis += `⚠️ You are currently overspending beyond your monthly income.\n\n`;
    analysis += `This behavior significantly increases financial vulnerability.\n\n`;
  }

  if (savingsPercentage >= 40) {
    analysis += `✅ Your savings ratio reflects strong financial discipline.\n\n`;
  } 
  else if (savingsPercentage >= 20 && remaining >= 0) {
    analysis += `🙂 Your savings are acceptable but can be improved.\n\n`;
  } 
  else if (remaining >= 0) {
    analysis += `⚠️ Your savings buffer is critically low.\n\n`;
    analysis += `Increasing savings to at least 20% will improve resilience.\n\n`;
  }

  if (rentRatio > 40) {
    analysis += `🏠 Housing costs are consuming a significant share of your income.\n\n`;
  }

  if (foodRatio > 30) {
    analysis += `🍽️ Food spending exceeds recommended allocation.\n\n`;
  }

  if (entertainmentRatio > 25) {
    analysis += `🎬 Entertainment spending is relatively high.\n\n`;
  }

  if (remaining > 0) {
    analysis += `💰 You have ₹${remaining} remaining this month.\n\n`;
  }

  // 🔥 6-MONTH PROJECTION
  let projection = "";

  if (remaining > 0) {
    const sixMonthSavings = remaining * 6;

    projection += `📈 Maintaining this pattern could generate approximately ₹${sixMonthSavings} over 6 months.\n\n`;

    if (score >= 85) {
      projection += `Your current financial trend suggests long-term stability.\n\n`;
    } else if (score >= 65) {
      projection += `Minor optimization could significantly accelerate financial growth.\n\n`;
    } else {
      projection += `Without improvement, financial progress may remain limited.\n\n`;
    }
  } else {
    const sixMonthLoss = Math.abs(remaining) * 6;

    projection += `⚠️ Continuing this trend may result in a deficit of ₹${sixMonthLoss} within 6 months.\n\n`;
    projection += `Immediate corrective action is recommended.\n\n`;
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