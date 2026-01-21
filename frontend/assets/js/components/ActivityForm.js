import { $, createElement } from "../utils/dom.js";

export function resetActivityForm() {
  $("activityForm").reset();

  $("submitBtn").textContent = "Save Activity";

  $("cancelBtn").style.display = "none";
}

export function fillActivityForm(activity) {
  $("user_id").value = activity.user_id;
  $("steps").value = activity.steps;
  $("water_intake").value = activity.water_intake;
  $("calories_burned").value = activity.calories_burned;

  $("submitBtn").textContent = "Update Activity";
  $("cancelBtn").style.display = "inline-block";
}
