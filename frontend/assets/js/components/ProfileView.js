// // frontend/assets/js/components/ProfileView.js
// import { $ } from "../utils/dom.js";

// /* ------------------------
//    Helper functions
// ------------------------ */

// function show(id, yes) {
//   const el = $(id);
//   if (!el) return;
//   el.classList[yes ? "remove" : "add"]("hidden");
// }

// function setText(id, value) {
//   const el = $(id);
//   if (el) el.textContent = value ?? "—";
// }

// /* ------------------------
//    Loading states
// ------------------------ */

// export function setProfileLoading(isLoading) {
//   // User basic info
//   show("basicLoading", isLoading);
//   show("basicDetails", !isLoading);

//   // Health JOIN table
//   show("healthLoading", isLoading);
//   show("healthTableContainer", !isLoading);
// }

// /* ------------------------
//    User basic details
// ------------------------ */

// export function renderUserBasic(user) {
//   setText("userId", user?.user_id ?? user?.id);
//   setText("userName", user?.name);
//   setText("userAge", user?.age);
//   setText("userGender", user?.gender);
// }

// /* ------------------------
//    Health summary count
// ------------------------ */

// export function renderHealthRecordCount(count) {
//   const totalEl = $("totalHealthRecords");
//   if (totalEl) {
//     totalEl.textContent = `Total Records: ${count ?? 0}`;
//   }
// }

// /* ------------------------
//    Health report table
// ------------------------ */

// export function renderHealthTable(rows) {
//   const body = $("healthTableBody");
//   if (body) body.innerHTML = "";

//   if (!rows || rows.length === 0) {
//     show("noHealthData", true);
//     return;
//   }

//   show("noHealthData", false);

//   rows.forEach((r) => {
//     const tr = document.createElement("tr");
//     tr.className = "border-b hover:bg-gray-50";

//     tr.innerHTML = `
//       <td class="px-3 py-2">${r.steps ?? "-"}</td>
//       <td class="px-3 py-2">${r.water ?? "-"}</td>
//       <td class="px-3 py-2">${r.calories ?? "-"}</td>
//       <td class="px-3 py-2">${r.disease ?? "-"}</td>
//       <td class="px-3 py-2">${r.genetic_disease ?? "-"}</td>
//       <td class="px-3 py-2">${r.allergies ?? "-"}</td>
//     `;

//     body.appendChild(tr);
//   });
// }

// /* ------------------------
//    Error state
// ------------------------ */

// export function renderProfileError() {
//   setProfileLoading(false);
//   renderHealthRecordCount(0);
//   show("noHealthData", true);
// }
