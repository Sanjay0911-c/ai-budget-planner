import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Budget Planner Backend Running");
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

  let suggestion = "";

  if (remaining < 0) {
    suggestion =
      "⚠️ You are overspending this month. Reduce entertainment or food expenses immediately.";
  } 
  else if (savingsPercentage < 20) {
    suggestion =
      "⚠️ Your savings are low. Try reducing unnecessary spending to build better financial habits.";
  } 
  else if (savingsPercentage < 40) {
    suggestion =
      "🙂 Decent budgeting. You can optimize travel or food expenses to increase savings.";
  } 
  else {
    suggestion =
      "✅ Excellent budgeting! You are managing your allowance very efficiently.";
  }

  res.json({
    suggestion: `
Total Expenses: ₹${totalExpenses}
Remaining Balance: ₹${remaining}
Savings: ${savingsPercentage}%

${suggestion}
    `
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});