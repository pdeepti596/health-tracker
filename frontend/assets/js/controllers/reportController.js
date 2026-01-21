// // frontend/assets/js/controllers/reportController.js
// import { apiGetReport } from "../services/reportService.js";
// import { renderReportTable } from "../components/reportTable.js";
// import { $ } from "../utils/dom.js";
// import { sortList } from "../utils/listTools.js";
// import { exportToPDF } from "../utils/exportTools.js";



// let allReportData = []; // Store all data for filtering

// export function initreportController() {
//   console.log("Report controller initialized");
//   loadReport();
//   initSearchFunctionality();
// }

// async function loadReport() {
//   const spinner = $("loadingSpinner");
//   const table = $("reportTableContainer");

//   // Show spinner, hide table
//   if (spinner) spinner.style.display = "block";
//   if (table) table.classList.add("hidden");

//   try {
//     // Fetch data from /api/report
//     const rows = await apiGetReport();
    
//     console.log("Report data received:", rows);
    
//     // Store data globally for filtering
//     allReportData = rows;

//     renderReportTable(getSortedRows(allReportData));

    
//     // Render the table
//     renderReportTable(rows);
//     updateResultCount(rows.length, rows.length);
    
//   } catch (error) {
//     console.error("Error loading report:", error);
    
//     // Show error message
//     const tbody = $("reportTableBody");
//     if (tbody) {
//       tbody.innerHTML = `
//         <tr>
//           <td colspan="12" style="text-align: center; color: red; padding: 2rem;">
//             ❌ Error loading report: ${error.message}
//           </td>
//         </tr>
//       `;
//     }
//   } finally {
//     // Hide spinner, show table
//     if (spinner) spinner.style.display = "none";
//     if (table) table.classList.remove("hidden");
//   }
// }

// function initSearchFunctionality() {
//   const searchInput = $("searchInput");
//   const clearBtn = $("clearSearch");
  
//   if (!searchInput) return;
  
//   // Search input handler with debounce
//   let searchTimeout;
//   searchInput.addEventListener("input", (e) => {
//     clearTimeout(searchTimeout);
    
//     const searchTerm = e.target.value.trim();
    
//     // Show/hide clear button
//     if (clearBtn) {
//       if (searchTerm) {
//         clearBtn.classList.remove("hidden");
//       } else {
//         clearBtn.classList.add("hidden");
//       }
//     }
    
//     // Debounce search (wait 300ms after user stops typing)
//     searchTimeout = setTimeout(() => {
//       filterReports(searchTerm);
//     }, 300);
//   });
  
//   // Clear button handler
//   if (clearBtn) {
//     clearBtn.addEventListener("click", () => {
//       searchInput.value = "";
//       clearBtn.classList.add("hidden");
//       filterReports("");
//       searchInput.focus();
//     });
//   }
// }

// function filterReports(searchTerm) {
//   if (!searchTerm) {
//     // Show all data
//     renderReportTable(allReportData);
//     updateResultCount(allReportData.length, allReportData.length);
//     return;
//   }
  
//   const term = searchTerm.toLowerCase();
  
//   // Filter data by user_id, name, or disease
//   const filtered = allReportData.filter(row => {
//     return (
//       (row.user_id && row.user_id.toString().includes(term)) ||
//       (row.name && row.name.toLowerCase().includes(term)) ||
//       (row.disease && row.disease.toLowerCase().includes(term)) ||
//       (row.genetic_disease && row.genetic_disease.toLowerCase().includes(term)) ||
//       (row.allergies && row.allergies.toLowerCase().includes(term))
//     );
//   });
  
//   renderReportTable(filtered);
//   updateResultCount(filtered.length, allReportData.length);
// }

// function updateResultCount(showing, total) {
//   const resultCount = $("resultCount");
//   if (resultCount) {
//     if (showing === total) {
//       resultCount.textContent = `Showing all ${total} records`;
//       resultCount.style.color = "#7f8c8d";
//     } else {
//       resultCount.textContent = `Showing ${showing} of ${total} records`;
//       resultCount.style.color = "#3498db";
//       resultCount.style.fontWeight = "600";
//     }
//   }
// }

// const REPORT_COLUMNS = [
//   { key: "user_id", label: "User ID" },
//   { key: "name", label: "Name" },
//   { key: "age", label: "Age" },
//   { key: "height", label: "Height" },
//   { key: "weight", label: "Weight" },
//   { key: "gender", label: "Gender" },
//   { key: "steps", label: "Steps" },
//   { key: "water", label: "Water" },
//   { key: "calories", label: "Calories" },
//   { key: "disease", label: "Disease" },
//   { key: "genetic_disease", label: "Genetic Disease" },
//   { key: "allergies", label: "Allergies" }
// ];

// function getSortedRows(rows) {
//   const key = $("sortBy")?.value || "user_id";
//   const dir = $("sortDir")?.value || "asc";
//   return sortList(rows, key, dir);
// }

// $("exportCsvBtn")?.addEventListener("click", () => {
//   exportToCSV(
//     "health_report.csv",
//     getSortedRows(allReportData),
//     REPORT_COLUMNS
//   );
// });



// frontend/assets/js/controllers/reportController.js

import { $ } from "../utils/dom.js";
import { filterList, sortList } from "../utils/listTools.js";
import { exportToCSV, exportToPDF } from "../utils/exportTools.js";

import { apiGetReport } from "../services/reportService.js";
import { renderReportTable } from "../components/reportTable.js";

// ----------------------------------
// Columns definition (Health Report)
// ----------------------------------
const REPORT_COLUMNS = [
  { key: "id", label: " ID" },
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "height", label: "Height" },
  { key: "weight", label: "Weight" },
  { key: "gender", label: "Gender" },
  { key: "steps", label: "Steps" },
  { key: "water", label: "Water" },
  { key: "calories", label: "Calories" },
  { key: "disease", label: "Disease" },
  { key: "genetic_disease", label: "Genetic Disease" },
  { key: "allergies", label: "Allergies" }
];

let allReportData = [];

// ----------------------------------
// Init
// ----------------------------------
export function initreportController() {
  loadReport();

  $("searchInput")?.addEventListener("input", refresh);
  $("sortBy")?.addEventListener("change", refresh);
  $("sortDir")?.addEventListener("change", refresh);

  $("exportCsvBtn")?.addEventListener("click", () => {
    exportToCSV(
      "health_report.csv",
      getRows(),
      REPORT_COLUMNS
    );
  });

  $("exportPdfBtn")?.addEventListener("click", () => {
    exportToPDF(
      "Health Report",
      getRows(),
      REPORT_COLUMNS
    );
  });
}

// ----------------------------------
// Load data
// ----------------------------------
async function loadReport() {
  const spinner = $("loadingSpinner");
  const container = $("reportTableContainer");

  if (spinner) spinner.style.display = "block";
  if (container) container.classList.add("hidden");

  try {
    allReportData = await apiGetReport();
    refresh();
  } catch (err) {
    console.error("Failed to load report", err);
  } finally {
    if (spinner) spinner.style.display = "none";
    if (container) container.classList.remove("hidden");
  }
}

// ----------------------------------
// Build rows (search + sort)
// ----------------------------------
function getRows() {
  const q = $("searchInput")?.value?.trim() ?? "";
  const sortKey = $("sortBy")?.value ?? "user_id";
  const sortDir = $("sortDir")?.value ?? "asc";

  const filtered = filterList(allReportData, q, [
    "id",
    "name",
    "disease",
    "genetic_disease",
    "allergies"
  ]);

  return sortList(filtered, sortKey, sortDir);
}

// ----------------------------------
// Render
// ----------------------------------
function refresh() {
  renderReportTable(getRows());
  updateResultCount(getRows().length, allReportData.length);
}

// ----------------------------------
// Result count
// ----------------------------------
function updateResultCount(showing, total) {
  const el = $("resultCount");
  if (!el) return;

  if (showing === total) {
    el.textContent = `Showing all ${total} records`;
  } else {
    el.textContent = `Showing ${showing} of ${total} records`;
  }
}


