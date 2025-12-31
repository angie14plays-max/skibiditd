const units = Object.keys(unitDatabase).map(key => {
  const u = unitDatabase[key];
  return { name: u.name, value: parseInt(u.baseStats.value) };
});

const yourSelect = document.getElementById("yourUnit");
const theirSelect = document.getElementById("theirUnit");
const result = document.getElementById("result");

units.forEach(u => {
  const opt1 = new Option(`${u.name} (${u.value})`, u.value);
  const opt2 = new Option(`${u.name} (${u.value})`, u.value);
  yourSelect.add(opt1);
  theirSelect.add(opt2);
});

function calculateTrade() {
  const yours = Number(yourSelect.value);
  const theirs = Number(theirSelect.value);

  if (!yours || !theirs) {
    result.textContent = "Select both units first.";
    result.style.color = "#fff";
    return;
  }

  const diff = yours - theirs;
  if (diff === 0) {
    result.textContent = "⚖️ Fair Trade";
    result.style.color = "#facc15";
  } else if (diff > 0) {
    result.textContent = "✅ Overpay (+ " + diff + ")";
    result.style.color = "#22c55e";
  } else {
    result.textContent = "❌ Underpay (" + diff + ")";
    result.style.color = "#ef4444";
  }
}
