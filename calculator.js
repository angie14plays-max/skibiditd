const yourSelect = document.getElementById("yourItem");
const theirSelect = document.getElementById("theirItem");
const resultBox = document.getElementById("result");

// fill dropdowns
Object.values(unitDatabase).forEach(unit => {
  const opt1 = document.createElement("option");
  opt1.value = unit.baseStats.value;
  opt1.textContent = `${unit.name} (${unit.baseStats.value})`;
  yourSelect.appendChild(opt1);

  const opt2 = document.createElement("option");
  opt2.value = unit.baseStats.value;
  opt2.textContent = `${unit.name} (${unit.baseStats.value})`;
  theirSelect.appendChild(opt2);
});

function calculateTrade() {
  const yourValue = Number(yourSelect.value);
  const theirValue = Number(theirSelect.value);

  if (yourValue === theirValue) {
    resultBox.textContent = "🤝 Fair Trade";
    resultBox.style.color = "#a855f7";
  } else if (theirValue > yourValue) {
    resultBox.textContent = "✅ Overpay (Good for you)";
    resultBox.style.color = "#22c55e";
  } else {
    resultBox.textContent = "❌ Underpay (Bad for you)";
    resultBox.style.color = "#ef4444";
  }
}

function goBack() {
  window.location.href = "skibidi-td-v1-test.html";
}
