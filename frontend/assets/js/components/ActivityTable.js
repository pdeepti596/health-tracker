import { $ } from "../utils/dom.js";
import { editActivity, deleteActivityAction } from "../controllers/activityController.js";

export function renderActivityTable(activities) {

  const body = $("activitiesTableBody");
  const noActivities = $("noActivities");

  body.innerHTML = "";

  if (activities.length === 0) {
    
    noActivities.style.display = "block";
    return;
  }

  noActivities.style.display = "none";

  activities.forEach(activity => {

    const row = document.createElement("tr");
    row.className = "border-b"; 

    row.innerHTML = `
      <td class="px-3 py-2">${activity.user_id}</td>
      <td class="px-3 py-2">${activity.steps}</td>
      <td class="px-3 py-2">${activity.water_intake}</td>
      <td class="px-3 py-2">${activity.calories_burned}</td>
      <td class="px-3 py-2 flex space-x-2">
        <!-- Buttons are created with data attributes holding the student ID -->
        <button class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded"
          data-edit="${activity.id}">Edit</button>

        <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
          data-delete="${activity.id}">Delete</button>
      </td>
    `;

    row.querySelector("[data-edit]").onclick = () => editActivity(activity.id);

    row.querySelector("[data-delete]").onclick = () => deleteActivityAction(activity.id);
    body.appendChild(row);
  });
}