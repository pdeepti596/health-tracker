import { $ } from "../utils/dom.js";

export function renderReportTable(rows) {
  const body = $("reportTableBody");
  const empty = $("noRows");

  body.innerHTML = "";

  if (!rows || rows.length === 0) {
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");

  rows.forEach(r => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="px-3 py-2 border">${r.user_id ?? ""}</td>

      <td class="px-3 py-2 border">
        ${r.name ?? ""} 
        <span class="text-xs text-gray-500">(Age: ${r.age ?? ""})</span>
      </td>

      <td class="px-3 py-2 border">
        H: ${r.height ?? ""} cm<br>
        W: ${r.weight ?? ""} kg
      </td>

       <td class="px-3 py-2 border">
        ${r.gender ?? ""}

      <td class="px-3 py-2 border">
        Steps: ${r.steps ?? ""}<br>
        Water: ${r.water_intake ?? ""} L<br>
        Calories: ${r.calories_burned ?? ""}
      </td>

      <td class="px-3 py-2 border">
        Disease: ${r.disease ?? "None"}<br>
        Genetic: ${r.genetic_disease ?? "None"}<br>
        Allergies: ${r.allergies ?? "None"}
      </td>
    `;
    body.appendChild(tr);
  });
}
