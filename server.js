const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "expense_db"
});

// Add Expense
app.post("/add", (req, res) => {
  const { title, amount, category, date } = req.body;
  db.query(
    "INSERT INTO expenses (title, amount, category, date) VALUES (?, ?, ?, ?)",
    [title, amount, category, date],
    (err) => {
      if (err) console.log(err);
      else res.send("Added");
    }
  );
});

// Get Expenses
app.get("/expenses", (req, res) => {
  db.query("SELECT * FROM expenses", (err, result) => {
    if (err) console.log(err);
    else res.json(result);
  });
});

// Delete one
app.delete("/delete/:id", (req, res) => {
  db.query("DELETE FROM expenses WHERE id=?", [req.params.id], (err) => {
    if (err) console.log(err);
    else res.send("Deleted");
  });
});

// CLEAR ALL (your step 4)
app.delete("/clear", (req, res) => {
  db.query("DELETE FROM expenses", (err) => {
    if (err) console.log(err);
    else res.send("All deleted");
  });
});

// Server start
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
