import { $ } from "../utils/dom.js";
import { editUser, deleteUserAction } from "../controllers/userController.js";

// Renders the list of students into an HTML table
export function renderUserTable(users) {
  // Get references to the table body where rows will be inserted and the 'no students' message
  const body = $("usersTableBody");
  const noUsers = $("noUsers");

  // Clear any existing rows from the table body before rendering new data
  body.innerHTML = "";

  // Check if the student array is empty
  if (users.length === 0) {
    // If no students are found, display the 'no students' message and stop execution
    noUsers.style.display = "block";
    return;
  }

  // If students exist, hide the 'no students' message
  noUsers.style.display = "none";

  // Iterate over each student object in the provided array
  users.forEach(user => {
    // Create a new table row element for the current student
    const row = document.createElement("tr");
    row.className = "border-b"; // Add styling class (likely Tailwind CSS)

    // Populate the row with dynamic HTML content using a template literal
    row.innerHTML = `
      <td class="px-3 py-2">${user.id}</td>
      <td class="px-3 py-2">${user.name}</td>
      <td class="px-3 py-2">${user.age}</td>
      <td class="px-3 py-2">${user.height}</td>
      <td class="px-3 py-2">${user.weight}</td>
      <td class="px-3 py-2">${user.gender}</td>

      <td class="px-3 py-2 flex space-x-2">
        <!-- Buttons are created with data attributes holding the user ID -->
        <button class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded"
          data-edit="${user.id}">Edit</button>

        <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
          data-delete="${user.id}">Delete</button>
      </td>
    `;

    // --- Attach event listeners to the newly created buttons ---

    // Find the 'Edit' button within this specific row and attach a click handler
    // When clicked, call the editStudent function with the correct student ID
    row.querySelector("[data-edit]").onclick = () => editUser(user.id);
    
    // Find the 'Delete' button within this specific row and attach a click handler
    // When clicked, call the deleteStudentAction function with the correct student ID
    row.querySelector("[data-delete]").onclick = () => deleteUserAction(user.id);

    // Append the fully constructed row to the table body
    body.appendChild(row);
  });
}
