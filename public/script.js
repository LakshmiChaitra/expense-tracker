const API = "http://localhost:3000";
let chart;

function addExpense() {
  const title = document.getElementById("title").value;
  const amount = parseInt(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  fetch(API + "/add", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ title, amount, category, date })
  }).then(() => loadExpenses());
}

function loadExpenses() {
  fetch(API + "/expenses")
    .then(res => res.json())
    .then(data => {
      let total = 0;
      let list = document.getElementById("list");
      let categoryData = {};

      list.innerHTML = "";

      data.forEach(e => {
        total += e.amount;
        categoryData[e.category] = (categoryData[e.category] || 0) + e.amount;

        list.innerHTML += `<li>${e.title} - ₹${e.amount}</li>`;
      });

      document.getElementById("total").innerText = "₹" + total;
      document.getElementById("count").innerText = data.length;

      updateChart(categoryData);
    });
}

function updateChart(data) {
  const ctx = document.getElementById("chart");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data),
        backgroundColor: ["#667eea", "#ff6384", "#36a2eb", "#ffce56"]
      }]
    }
  });
}

loadExpenses();
function clearAll() {
  fetch("http://localhost:3000/clear", {
    method: "DELETE"
  }).then(() => loadExpenses());
}
