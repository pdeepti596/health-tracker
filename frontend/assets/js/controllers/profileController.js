// // frontend/assets/js/controllers/profileController.js

// import { $ } from "../utils/dom.js";
// import { exportToCSV, exportToPDF } from "../utils/exportTools.js";

// import {
//   fetchUserById,
//   fetchHealthReportForUser
// } from "../services/profileService.js";

// import {
//   setProfileLoading,
//   renderUserBasic,
//   renderHealthRecordCount,
//   renderHealthTable,
//   renderProfileError,
// } from "../components/ProfileView.js";

// import {
//   PROFILE_CSV_COLUMNS,
//   normalizeProfileRows,
//   buildProfilePDFHtml,
// } from "../utils/profileExport.js";

// /* ------------------------
//    Init Health Profile
// ------------------------ */

// export async function initProfileController(userId) {
//   setProfileLoading(true);

//   try {
//     // Fetch user + JOIN health data
//     const [user, rows] = await Promise.all([
//       fetchUserById(userId),
//       fetchHealthReportForUser(userId),
//     ]);

//     if (!user) throw new Error("User not found");

//     // Render UI
//     renderUserBasic(user);
//     renderHealthRecordCount(rows.length);
//     renderHealthTable(rows);

//     /* ------------------------
//        Export CSV
//     ------------------------ */
//     $("profileExportCsvBtn")?.addEventListener("click", () => {
//       const safeRows = normalizeProfileRows(rows);
//       const filename = `user_${user.user_id ?? user.id}_health_report.csv`;

//       exportToCSV(filename, safeRows, PROFILE_CSV_COLUMNS);
//     });

//     /* ------------------------
//        Export PDF
//     ------------------------ */
//     $("profileExportPdfBtn")?.addEventListener("click", () => {
//       const html = buildProfilePDFHtml(user, rows);
//       exportToPDF(`User ${user.name} Health Profile`, html);
//     });

//     setProfileLoading(false);
//   } catch (err) {
//     console.error("[HealthProfileController] error:", err);
//     renderProfileError();
//   }
// }

// export default { initProfileController };
