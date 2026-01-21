
// frontend/assets/js/controllers/reportController.js

import { $ } from "../utils/dom.js";
import { filterList, sortList } from "../utils/listTools.js";
import { exportToCSV, exportToPDF } from "../utils/exportTools.js";

import { apiGetReport } from "../services/reportService.js";
import { renderReportTable } from "../components/reportTable.js";


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

function refresh() {
  renderReportTable(getRows());
  updateResultCount(getRows().length, allReportData.length);
}

function updateResultCount(showing, total) {
  const el = $("resultCount");
  if (!el) return;

  if (showing === total) {
    el.textContent = `Showing all ${total} records`;
  } else {
    el.textContent = `Showing ${showing} of ${total} records`;
  }
}


