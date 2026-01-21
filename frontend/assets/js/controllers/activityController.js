import { 
    apiGetAll, 
    apiGetOne, 
    apiCreate, 
    apiUpdate, 
    apiDelete 
} from "../services/activityService.js";

import { showAlert } from "../components/Alert.js";
import { renderActivityTable } from "../components/ActivityTable.js";
import { resetActivityForm, fillActivityForm } from "../components/ActivityForm.js";

import { setState, getState } from "../state/store.js";
import { $, createElement } from "../utils/dom.js";

export function initActivityController() {

  loadActivities();

  $("activityForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {
     user_id: $("user_id").value.trim(),
      steps: $("steps").value.trim(),
      water_intake: $("water_intake").value.trim(),
      calories_burned: $("calories_burned").value.trim()    
    };

    const { editingId } = getState();

    editingId
      ? await updateActivity(editingId, data) 
      : await createNewActivity(data);        
  });

  
  $("cancelBtn").addEventListener("click", () => {
    
    setState({ editingId: null });
  
    resetActivityForm();
  });
}

export async function loadActivities() {

  const spinner = $("loadingSpinner");
  const table = $("activitiesTableContainer");

  spinner.style.display = "block";
  table.style.display = "none";

  const activities = await apiGetAll();

  setState({ activities });
  
  renderActivityTable(activities);

  spinner.style.display = "none";
  table.style.display = "block";
}

export async function createNewActivity(data) {
  const res = await apiCreate(data);
  if (res.ok) {
    showAlert("Activity added!");
    resetActivityForm();
    loadActivities();
  }
}

export async function editActivity(id) {
  const activity = await apiGetOne(id);

  setState({ editingId: id });
  fillActivityForm(activity);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

export async function updateActivity(id, data) {
  const res = await apiUpdate(id, data);
  if (res.ok) {
    showAlert("Updated!");
    resetActivityForm();
    setState({ editingId: null });
    loadActivities();
  }
}

export async function deleteActivityAction(id) {
  if (!confirm("Delete this activity?")) return;

  const res = await apiDelete(id);
 	if (res.ok) {
    showAlert("Deleted!");
    loadActivities();
  }
}

