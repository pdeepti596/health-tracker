import { $, createElement } from "../utils/dom.js";

// Resets the input form to its default state for creating a new user
export function resetUserForm() {
  // Use the native .reset() method on the HTML form element
  $("userForm").reset();

  // Change the submit button text back to "Add User"
  $("submitBtn").textContent = "Save User";

  // Hide the "Cancel" button, as we are no longer in 'edit' mode
  $("cancelBtn").style.display = "none";
}

// Populates the input form fields with data from a selected student object (for editing)
export function fillUserForm(user) {
  // Fill each input field with the corresponding property from the student data
  $("name").value = user.name;
  $("age").value = user.age;
  $("height").value = user.height;
  $("weight").value = user.weight;
  $("gender").value = user.gender;


  // Change the submit button text to "Update Student"
  $("submitBtn").textContent = "Update User";

  // Show the "Cancel" button, allowing the user to exit 'edit' mode
  $("cancelBtn").style.display = "inline-block";
}
