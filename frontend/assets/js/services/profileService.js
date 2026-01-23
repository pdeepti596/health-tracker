// frontend/assets/js/services/profileService.js
// Only data fetching / shaping (no DOM here)

/* ------------------------
   Fetch single user
------------------------ */
export async function fetchUserById(userId) {
  const res = await fetch(`/api/users/${userId}`);
  if (!res.ok) return null;
  return res.json();
}

/* ------------------------
   Fetch joined health report
   (user + activity + medical)
------------------------ */
export async function fetchHealthReportForUser(userId) {
  const res = await fetch(`/api/report`);
  if (!res.ok) return [];

  const all = await res.json();

  // Filter report rows by user
  return (all || []).filter(
    (r) => Number(r.user_id) === Number(userId)
  );
}
