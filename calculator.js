const giveSelect = document.getElementById("give");
const getSelect = document.getElementById("get");
const result = document.getElementById("result");

// Load units from your existing data file
Object.values(unitDatabase).forEach(unit => {
  const value = Number(unit.baseStats.value);
  if (!value) return;

  const option1 = document.createElement("option");
  option1.value = value;
  option1.textContent = `${unit.name} (${value})`;

  const option2 = option1.cloneNode(true);

  giveSelect.appendChild(option1);
  getSelect.appendChild(option2);
});

function checkTrade() {
  const giveValue = Number(giveSelect.value);
  const getValue = Number(getSelect.value);

  if (!giveValue || !getValue) {
    result.textContent = "Select both units";
    result.style.color = "white";
    return;
  }

  const diff = getValue - giveValue;

  if (diff === 0) {
    result.textContent = "⚖️ FAIR TRADE";
    result.style.color = "#facc15";
  } else if (diff > 0) {
    result.textContent = `✅ OVERPAY (+${diff})`;
    result.style.color = "#22c55e";
  } else {
    result.textContent = `❌ UNDERPAY (${diff})`;
    result.style.color = "#ef4444";
  }
}
