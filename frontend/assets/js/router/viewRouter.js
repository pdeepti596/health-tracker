import { initUserController } from "../controllers/userController.js";
import { initActivityController } from "../controllers/activityController.js";
import { initMedicalController } from "../controllers/medicalController.js";
import { initreportController } from "../controllers/reportController.js";

// Load a view into #app container
async function loadView(path) {
  const html = await fetch(path).then(res => res.text());
  document.querySelector("#app").innerHTML = html;
}

// Decide which view to load based on URL
export async function router() {
  const path = window.location.pathname;

  if (path === "/" || path === "/home") {
    await loadView("/frontend/pages/home.html");
  }

  else if (path === "/users") {
    await loadView("/frontend/pages/users.html");
    initUserController();
  }

    else if (path === "/activities") {
    await loadView("/frontend/pages/activities.html");
    initActivityController();
  }

    else if (path === "/medical") {
    await loadView("/frontend/pages/medical.html");
    initMedicalController();
  }
    else if (path === "/report") {
    await loadView("/frontend/pages/report.html");
    initreportController();
  }

    // ✅ INDIVIDUAL HEALTH REPORT PAGE
  // if (path.startsWith("/report/")) {
  //   const id = Number(path.split("/")[2]);

    // // if (!Number.isInteger(id)) {
    // //   await loadView("/frontend/pages/404.html");
    // //   return;
    // }

  //   await loadView("/frontend/pages/report.html");
  //   initreportController(id);
  //   return;
  // }

  

  else {
    await loadView("/frontend/pages/404.html");
  }
}

// Make links work without page reload
export function initRouterEvents() {
  document.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      history.pushState(null, "", e.target.href);
      router();
    }
  });

  // Back/forward buttons support
  window.addEventListener("popstate", router);
}






// import { initUserController } from "../controllers/userController.js";
// import { initActivityController } from "../controllers/activityController.js";
// import { initMedicalController } from "../controllers/medicalController.js";
// import { initreportController } from "../controllers/reportController.js";
// import { initSingleReportController } from "../controllers/singleReportController.js";

// // Load a view into #app container
// async function loadView(path) {
//   const res = await fetch(path);

//   if (!res.ok) {
//     const fallback = await fetch("/frontend/pages/404.html").then(r => r.text());
//     document.querySelector("#app").innerHTML = fallback;
//     return;
//   }

//   document.querySelector("#app").innerHTML = await res.text();
// }

// export async function router() {
//   const path = window.location.pathname;

//   if (path === "/" || path === "/home") {
//     await loadView("/frontend/pages/home.html");
//     return;
//   }

//   if (path === "/users") {
//     await loadView("/frontend/pages/users.html");
//     initUserController();
//     return;
//   }

//   if (path === "/activities") {
//     await loadView("/frontend/pages/activities.html");
//     initActivityController();
//     return;
//   }

//   if (path === "/medical") {
//     await loadView("/frontend/pages/medical.html");
//     initMedicalController();
//     return;
//   }

//   if (path === "/report") {
//     await loadView("/frontend/pages/report.html");
//     initreportController();
//     return;
//   }

//   // ✅ INDIVIDUAL HEALTH REPORT PAGE
//   if (path.startsWith("/report/")) {
//     const id = Number(path.split("/")[2]);

//     if (!Number.isInteger(id)) {
//       await loadView("/frontend/pages/404.html");
//       return;
//     }

//     await loadView("/frontend/pages/report.html");
//     initSingleReportController(id);
//     return;
//   }

//   await loadView("/frontend/pages/404.html");
// }

// export function initRouterEvents() {
//   document.addEventListener("click", (e) => {
//     const link = e.target.closest("[data-link]");
//     if (!link) return;

//     e.preventDefault();
//     history.pushState(null, "", link.getAttribute("href"));
//     router();
//   });

//   window.addEventListener("popstate", router);
// }
