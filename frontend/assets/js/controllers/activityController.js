import { 
    apiGetAll, 
    apiGetOne, 
    apiCreate, 
    apiUpdate, 
    apiDelete 
} from "../services/activityService.js";

import { showAlert } from "../components/Alert.js";
import { renderActivityTable } from "../components/ActivityTable.js";
import { resetForm, fillForm } from "../components/ActivityForm.js";

import { setState, getState } from "../state/store.js";
import { $, createElement } from "../utils/dom.js";

// Setup event listeners and load initial data
// Initialize the main logic and set up all necessary event listeners
export function initActivityController() {
  // Start by fetching and displaying all student data immediately upon load
  loadActivities();

  // --- Handle Form Submissions ---

  // Attach a listener to the 'submit' event of the student input form
  $("activityForm").addEventListener("submit", async (e) => {
    // Prevent the browser's default form submission behavior (page refresh)
    e.preventDefault();

    // Collect data from the input fields using the custom '$' selector
    const data = {
     user_id: $("user_id").value.trim(),
      steps: $("steps").value.trim(),
      water_intake: $("water_intake").value.trim(),
      calories_burned: $("calories_burned").value.trim()    
    };

    // Check the application state to see if we are currently editing an existing record
    const { editingId } = getState();

    // Use a ternary operator to decide which action to take:
    editingId
      ? await updateActivity(editingId, data) // If editingId exists, update the student
      : await createNewActivity(data);        // Otherwise, create a new student
  });

  // --- Handle Cancel Button Click ---

  // Attach a listener to the 'click' event of the cancel button
  $("cancelBtn").addEventListener("click", () => {
    // Clear the editing state (set the ID to null)
    setState({ editingId: null });
    // Clear all input fields in the form
    resetForm();
  });
}


// Fetch all student data from the API and update the user interface
export async function loadActivities() {
  // Get references to the loading spinner and the main data table elements
  const spinner = $("loadingSpinner");
  const table = $("activitiesTableContainer");

  // Show the spinner and hide the table to indicate a loading state
  spinner.style.display = "block";
  table.style.display = "none";

  // Asynchronously fetch all student records from the backend API
  const activities = await apiGetAll();

  // Store the retrieved student array in the application's global state
  setState({ activities });
  // Render the fetched student data into the HTML table structure
  renderActivityTable(activities);

  // Hide the spinner and show the table now that the data is loaded and displayed
  spinner.style.display = "none";
  table.style.display = "block";
}

// Create a new student
export async function createNewActivity(data) {
  const res = await apiCreate(data);
  if (res.ok) {
    showAlert("Activity added!");
    resetForm();
    loadActivities();
  }
}

// Load a student into the form for editing
export async function editActivity(id) {
  const activity = await apiGetOne(id);

  setState({ editingId: id });
  fillForm(activity);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// // Update an existing student
export async function updateActivity(id, data) {
  const res = await apiUpdate(id, data);
  if (res.ok) {
    showAlert("Updated!");
    resetForm();
    setState({ editingId: null });
    loadActivities();
  }
}

// Delete a student
export async function deleteActivityAction(id) {
  if (!confirm("Delete this activity?")) return;

  const res = await apiDelete(id);
 	if (res.ok) {
    showAlert("Deleted!");
    loadActivities();
  }
}

