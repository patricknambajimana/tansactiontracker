let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const form = document.getElementById("form");
const list = document.getElementById("list");
const totalDisplay = document.getElementById("total");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const description = document.getElementById("description").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const date = document.getElementById("date").value;

  if (!description || !amount || !date)
    return alert("All fields are required.");

  const expense = {
    id: Date.now(),
    description,
    amount,
    date,
  };

  expenses.push(expense);
  saveAndRender();
  form.reset();
});

function saveAndRender() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

function renderExpenses() {
  list.innerHTML = "";
  let total = 0;

  expenses.forEach((exp) => {
    total += exp.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${exp.description} (${exp.date})</span>
      <span class="${exp.amount >= 0 ? "income" : "expense"}">${
      exp.amount >= 0 ? "+" : ""
    }${exp.amount}</span>
      <button onclick="editExpense(${exp.id})"style="color:red;padding:8px;font-size:17px">Edit</button>
      <button onclick="deleteExpense(${exp.id})"style="color:green;padding:8px;font-size:17px">Delete</button>
    `;
    list.appendChild(li);
  });

  totalDisplay.textContent = total.toFixed(2);
}

function deleteExpense(id) {
  expenses = expenses.filter((exp) => exp.id !== id);
  saveAndRender();
}

function editExpense(id) {
  const exp = expenses.find((e) => e.id === id);
  if (!exp) return;

  document.getElementById("description").value = exp.description;
  document.getElementById("amount").value = exp.amount;
  document.getElementById("date").value = exp.date;

  deleteExpense(id);
}

renderExpenses();
