import { $ } from "../utils/dom.js";
import { editMedical, deleteMedicalAction } from "../controllers/medicalController.js";

export function renderMedicalTable(records) {
  const body = $("medicalTableBody");
  const noRecords = $("noRecords");

  body.innerHTML = "";

  if (records.length === 0) {
    noRecords.style.display = "block";
    return;
  }

  noRecords.style.display = "none";

  records.forEach(record => {
    const row = document.createElement("tr");
    row.className = "border-b"; 

    row.innerHTML = `
      <td class="px-3 py-2">${record.user_id}</td>
      <td class="px-3 py-2">${record.disease}</td>
      <td class="px-3 py-2">${record.genetic_disease}</td>
      <td class="px-3 py-2">${record.allergies}</td>
      <td class="px-3 py-2 flex space-x-2">
        <!-- Buttons are created with data attributes holding the student ID -->
        <button class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded"
          data-edit="${record.id}">Edit</button>

        <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
          data-delete="${record.id}">Delete</button>
      </td>
    `;

    row.querySelector("[data-edit]").onclick = () => editMedical(record.id);
    
    row.querySelector("[data-delete]").onclick = () => deleteMedicalAction(record.id);

    body.appendChild(row);
  });
}