import { $ } from "../utils/dom.js";
import { editMedical, deleteMedicalAction } from "../controllers/medicalController.js";

// Renders the list of students into an HTML table
export function renderMedicalTable(records) {
  // Get references to the table body where rows will be inserted and the 'no students' message
  const body = $("medicalTableBody");
  const noRecords = $("noRecords");

  // Clear any existing rows from the table body before rendering new data
  body.innerHTML = "";

  // Check if the student array is empty
  if (records.length === 0) {
    // If no students are found, display the 'no students' message and stop execution
    noRecords.style.display = "block";
    return;
  }

  // If students exist, hide the 'no students' message
  noRecords.style.display = "none";

  // Iterate over each student object in the provided array
  records.forEach(record => {
    // Create a new table row element for the current student
    const row = document.createElement("tr");
    row.className = "border-b"; // Add styling class (likely Tailwind CSS)

    // Populate the row with dynamic HTML content using a template literal
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

    // --- Attach event listeners to the newly created buttons ---

    // Find the 'Edit' button within this specific row and attach a click handler
    // When clicked, call the editStudent function with the correct student ID
    row.querySelector("[data-edit]").onclick = () => editMedical(record.id);
    
    // Find the 'Delete' button within this specific row and attach a click handler
    // When clicked, call the deleteStudentAction function with the correct student ID
    row.querySelector("[data-delete]").onclick = () => deleteMedicalAction(record.id);

    // Append the fully constructed row to the table body
    body.appendChild(row);
  });
}