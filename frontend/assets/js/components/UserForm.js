import { $, createElement } from "../utils/dom.js";

export function resetUserForm() {
  $("userForm").reset();

  $("submitBtn").textContent = "Save User";
  $("cancelBtn").style.display = "none";
}

export function fillUserForm(user) {
  $("name").value = user.name;
  $("age").value = user.age;
  $("height").value = user.height;
  $("weight").value = user.weight;
  $("gender").value = user.gender;

  $("submitBtn").textContent = "Update User";
  $("cancelBtn").style.display = "inline-block";
}
