function calculate() {
  const gems = Number(document.getElementById("gems").value);
  const minutes = Number(document.getElementById("minutes").value);
  const target = Number(document.getElementById("target").value);

  if (!gems || !minutes || !target) {
    document.getElementById("result").innerText = "Fill all fields";
    return;
  }

  const runs = Math.ceil(target / gems);
  const totalMinutes = runs * minutes;
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  document.getElementById("result").innerText =
    `Runs needed: ${runs}\nTime: ${hours}h ${mins}m`;
}
