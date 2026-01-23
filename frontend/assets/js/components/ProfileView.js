

// frontend/assets/js/components/ProfileView.js
import { $ } from "../utils/dom.js";

/* ------------------------
   Helpers
------------------------ */

function show(id, yes) {
  const el = $(id);
  if (!el) return;
  el.classList[yes ? "remove" : "add"]("hidden");
}

function setText(id, value) {
  const el = $(id);
  if (el) el.textContent = value ?? "—";
}

/* ------------------------
   Loading states
------------------------ */

export function setProfileLoading(isLoading) {
  // Basic user info
  show("basicLoading", isLoading);
  show("basicDetails", !isLoading);

  // Health records table
  show("joinLoading", isLoading);
  show("joinTableContainer", !isLoading);
}

/* ------------------------
   User basic details
------------------------ */

export function renderUserBasic(user) {
  setText("userId", user?.id);
  setText("userName", user?.name);
  setText("userAge", user?.age);
  // setText("userGender", user?.gender);
  setText("userHeight", user?.height);
  setText("userWeight", user?.weight);
  setText("userGender", user?.gender);
  
}

/* ------------------------
   Health records count
------------------------ */

export function renderHealthRecordCount(count) {
  const el = $("totalRecords");
  if (el) el.textContent = count ?? 0;
}

/* ------------------------
   Health JOIN table
------------------------ */

export function renderHealthTable(rows = []) {
  const body = $("joinTableBody");
  if (!body) return;

  body.innerHTML = "";

  if (!rows.length) {
    show("noRecords", true);
    return;
  }

  show("noRecords", false);

  rows.forEach((r) => {
    const tr = document.createElement("tr");
    tr.className = "border-b";

    tr.innerHTML = `
      <td class="px-3 py-2">${r.steps ?? "-"}</td>
      <td class="px-3 py-2">${r.water_intake ?? "-"}</td>
      <td class="px-3 py-2">${r.calories_burned?? "-"}</td>
      <td class="px-3 py-2">${r.disease ?? "-"}</td>
      <td class="px-3 py-2">${r.genetic_disease ?? "-"}</td>
      <td class="px-3 py-2">${r.allergies ?? "-"}</td>
    `;

    body.appendChild(tr);
  });
}

/* ------------------------
   Error state
------------------------ */

export function renderProfileError() {
  setProfileLoading(false);
  renderHealthRecordCount(0);
  show("noRecords", true);
}
