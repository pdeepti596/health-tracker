import { $, createElement } from "../utils/dom.js";

// Resets the input form to its default state for creating a new student
export function resetForm() {
  // Use the native .reset() method on the HTML form element
  $("activityForm").reset();

  // Change the submit button text back to "Add Student"
  $("submitBtn").textContent = "Add Activity";

  // Hide the "Cancel" button, as we are no longer in 'edit' mode
  $("cancelBtn").style.display = "none";
}

// Populates the input form fields with data from a selected student object (for editing)
export function fillForm(activity) {
  // Fill each input field with the corresponding property from the student data
  $("user_id").value = activity.user_id;
  $("steps").value = activity.steps;
  $("water_intake").value = activity.water_intake;
  $("calories_burned").value = activity.calories_burned;

  // Change the submit button text to "Update Student"
  $("submitBtn").textContent = "Update Activity";

  // Show the "Cancel" button, allowing the user to exit 'edit' mode
  $("cancelBtn").style.display = "inline-block";
}
