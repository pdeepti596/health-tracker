import { $, createElement } from "../utils/dom.js";

// Resets the input form to its default state for creating a new student
export function resetMedicalForm() {
  // Use the native .reset() method on the HTML form element
  $("medicalForm").reset();

  // Change the submit button text back to "Add Student"
  $("submitBtn").textContent = "Add Record";

  // Hide the "Cancel" button, as we are no longer in 'edit' mode
  $("cancelBtn").style.display = "none";
}

// Populates the input form fields with data from a selected student object (for editing)
export function fillMedicalForm(record) {
  // Fill each input field with the corresponding property from the student data
  $("user_id").value = record.user_id;
  $("disease").value = record.disease;
  $("genetic_disease").value = record.genetic_disease;
  $("allergies").value = record.allergies;

  // Change the submit button text to "Update Student"
  $("submitBtn").textContent = "Update Record";

  // Show the "Cancel" button, allowing the user to exit 'edit' mode
  $("cancelBtn").style.display = "inline-block";
}