// // frontend/assets/js/services/reportService.js
// const API_URL = "/api/reports";
// // const REPORT_URL = window.ENV.REPORT_API;
// async function safeJson(res) {
//   try {
//     return await res.json();
//   } catch {
//     return [];
//   }
// }

// export async function apiGetReport() {
//   const res = await fetch(API_URL);
//   if (!res.ok) return [];
//   return safeJson(res);
// }

const API_URL = window.ENV.REPORTS_API;

async function safeJson(res) {
  try {
    return await res.json();
  } catch (_) {
    return null;
  }
}

/**
 * GET all reports
 * This endpoint must return INNER JOIN data:
 * users + activities + medical
 */
export async function apiGetAll() {
  const res = await fetch(API_URL);
  if (!res.ok) return [];
  return safeJson(res);
}

/**
 * GET report for one user (optional)
 */
export async function apiGetOne(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) return null;
  return safeJson(res);
}
