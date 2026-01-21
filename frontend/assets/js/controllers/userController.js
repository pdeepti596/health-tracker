import { 
    apiGetAll, 
    apiGetOne, 
    apiCreate, 
    apiUpdate, 
    apiDelete 
} from "../services/userService.js";

import { showAlert } from "../components/Alert.js";
import { renderUserTable } from "../components/UserTable.js";
import { resetUserForm, fillUserForm } from "../components/UserForm.js";

import { setState, getState } from "../state/store.js";
import { $, createElement } from "../utils/dom.js";

export function initUserController() {

  loadUsers();

  $("userForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {
      name: $("name").value.trim(),   
      age: $("age").value.trim(), 
      height: $("height").value.trim() ,   
      weight: $("weight").value.trim() ,   
      gender: $("gender").value.trim(),
    
    };

    const { editingId } = getState();

    editingId
      ? await updateUser(editingId, data) 
      : await createNewUser(data);        
  });

  $("cancelBtn").addEventListener("click", () => {
    setState({ editingId: null });
    resetUserForm();
  });
}

export async function loadUsers() {
  const spinner = $("loadingSpinner");
  const table = $("usersTableContainer");

  spinner.style.display = "block";
  table.style.display = "none";

  const users = await apiGetAll();

  setState({ users });
  renderUserTable(users);

  spinner.style.display = "none";
  table.style.display = "block";
}


// Create a new user
export async function createNewUser(data) {
  const res = await apiCreate(data);
  if (res.ok) {
    showAlert("User added!");
    resetUserForm();
    loadUsers();
  }
}

// Load a user into the form for editing
export async function editUser(id) {
  const user = await apiGetOne(id);

  setState({ editingId: id });
  fillUserForm(user);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// // Update an existing user
export async function updateUser(id, data) {
  const res = await apiUpdate(id, data);
  if (res.ok) {
    showAlert("Updated!");
    resetUserForm();
    setState({ editingId: null });
    loadUsers();
  }
}

// Delete a user
export async function deleteUserAction(id) {
  if (!confirm("Delete this user?")) return;

  const res = await apiDelete(id);
 	if (res.ok) {
    showAlert("Deleted!");
    loadUsers();
  }
}

