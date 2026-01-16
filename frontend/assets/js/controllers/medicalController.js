import { 
    apiGetAll, 
    apiGetOne, 
    apiCreate, 
    apiUpdate, 
    apiDelete 
} from "../services/medicalService.js";

import { showAlert } from "../components/Alert.js";
import { renderMedicalTable } from "../components/medicalTable.js";
import { resetMedicalForm, fillMedicalForm } from "../components/medicalForm.js";

import { setState, getState } from "../state/store.js";
import { $, createElement } from "../utils/dom.js";

// Setup event listeners and load initial data
// Initialize the main logic and set up all necessary event listeners
export function initMedicalController() {
  // Start by fetching and displaying all student data immediately upon load
  loadMedical();

  // --- Handle Form Submissions ---

  // Attach a listener to the 'submit' event of the student input form
  $("medicalForm").addEventListener("submit", async (e) => {
    // Prevent the browser's default form submission behavior (page refresh)
    e.preventDefault();

    // Collect data from the input fields using the custom '$' selector
    const data = {
      user_id: $("user_id").value.trim(),   // Get name value, remove whitespace
      disease: $("disease").value.trim(), // Get email value
      genetic_disease: $("genetic_disease").value.trim(), // Get course value
      allergies: $("allergies").value.trim()    // Get year value
    };

    // Check the application state to see if we are currently editing an existing record
    const { editingId } = getState();

    // Use a ternary operator to decide which action to take:
    editingId
      ? await updateMedical(editingId, data) // If editingId exists, update the student
      : await createNewMedical(data);        // Otherwise, create a new student
  });

  // --- Handle Cancel Button Click ---

  // Attach a listener to the 'click' event of the cancel button
  $("cancelBtn").addEventListener("click", () => {
    // Clear the editing state (set the ID to null)
    setState({ editingId: null });
    // Clear all input fields in the form
    resetMedicalForm();
  });
}


// Fetch all student data from the API and update the user interface
export async function loadMedical() {
  // Get references to the loading spinner and the main data table elements
  const spinner = $("loadingSpinner");
  const table = $("medicalTableContainer");

  // Show the spinner and hide the table to indicate a loading state
  spinner.style.display = "block";
  table.style.display = "none";

  // Asynchronously fetch all student records from the backend API
  const records = await apiGetAll();

  // Store the retrieved student array in the application's global state
  setState({ records });
  // Render the fetched student data into the HTML table structure
  renderMedicalTable(records);

  // Hide the spinner and show the table now that the data is loaded and displayed
  spinner.style.display = "none";
  table.style.display = "block";
}


// Create a new student
export async function createNewMedical(data) {
  const res = await apiCreate(data);
  if (res.ok) {
    showAlert("Medical record added!");
    resetMedicalForm();
    loadMedical();
  }
}

// Load a student into the form for editing
export async function editMedical(id) {
  const record = await apiGetOne(id);

  setState({ editingId: id });
  fillMedicalForm(record);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// // Update an existing student
export async function updateMedical(id, data) {
  const res = await apiUpdate(id, data);
  if (res.ok) {
    showAlert("Updated!");
    resetMedicalForm();
    setState({ editingId: null });
    loadMedical();
  }
}

// Delete a student
export async function deleteMedicalAction(id) {
  if (!confirm("Delete this medical record?")) return;

  const res = await apiDelete(id);
 	if (res.ok) {
    showAlert("Deleted!");
    loadMedical();
  }
}

