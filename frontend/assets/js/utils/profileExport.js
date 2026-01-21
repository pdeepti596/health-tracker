// // frontend/assets/js/utils/profileExport.js
// // Health Tracker – Profile export helpers only (NO student data)

// function esc(v) {
//   return String(v ?? "")
//     .replaceAll("&", "&amp;")
//     .replaceAll("<", "&lt;")
//     .replaceAll(">", "&gt;");
// }

// /* =========================
//    CSV Columns (Health Data)
// ========================= */
// export const PROFILE_CSV_COLUMNS = [
//   { key: "steps", label: "Steps" },
//   { key: "water", label: "Water Intake" },
//   { key: "calories", label: "Calories" },
//   { key: "disease", label: "Disease" },
//   { key: "genetic_disease", label: "Genetic Disease" },
//   { key: "allergies", label: "Allergies" },
// ];

// /* =========================
//    Normalize JOIN rows
// ========================= */
// export function normalizeProfileRows(rows) {
//   return (rows || []).map(r => ({
//     steps: r.steps ?? "",
//     water: r.water ?? "",
//     calories: r.calories ?? "",
//     disease: r.disease ?? "",
//     genetic_disease: r.genetic_disease ?? "",
//     allergies: r.allergies ?? "",
//   }));
// }

// /* =========================
//    Build PDF HTML
// ========================= */
// export function buildProfilePDFHtml(user, rows) {
//   const safeUser = user || {};
//   const safeRows = normalizeProfileRows(rows);

//   return `
//     <h1>User Health Profile</h1>

//     <h2>Basic Information</h2>
//     <table>
//       <tbody>
//         <tr><th>User ID</th><td>${esc(safeUser.user_id ?? safeUser.id)}</td></tr>
//         <tr><th>Name</th><td>${esc(safeUser.name)}</td></tr>
//         <tr><th>Age</th><td>${esc(safeUser.age)}</td></tr>
//         <tr><th>Gender</th><td>${esc(safeUser.gender)}</td></tr>
//         <tr><th>Height</th><td>${esc(safeUser.height)}</td></tr>
//         <tr><th>Weight</th><td>${esc(safeUser.weight)}</td></tr>
//         <tr><th>Total Records</th><td>${safeRows.length}</td></tr>
//       </tbody>
//     </table>

//     <h2>Health Report</h2>
//     <table>
//       <thead>
//         <tr>
//           <th>Steps</th>
//           <th>Water</th>
//           <th>Calories</th>
//           <th>Disease</th>
//           <th>Genetic Disease</th>
//           <th>Allergies</th>
//         </tr>
//       </thead>
//       <tbody>
//         ${
//           safeRows.length
//             ? safeRows.map(r => `
//               <tr>
//                 <td>${esc(r.steps)}</td>
//                 <td>${esc(r.water)}</td>
//                 <td>${esc(r.calories)}</td>
//                 <td>${esc(r.disease)}</td>
//                 <td>${esc(r.genetic_disease)}</td>
//                 <td>${esc(r.allergies)}</td>
//               </tr>
//             `).join("")
//             : `<tr><td colspan="6">No health records found.</td></tr>`
//         }
//       </tbody>
//     </table>
//   `;
// }
