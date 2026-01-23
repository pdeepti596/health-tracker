// // // 
// // import { initUserController } from "../controllers/userController.js";
// // import { initActivityController } from "../controllers/activityController.js";
// // import { initMedicalController } from "../controllers/medicalController.js";
// // import { initreportController } from "../controllers/reportController.js";
// // import { initProfileController } from "../controllers/profileController.js";

// // async function loadView(path) {
// //   const html = await fetch(path).then(res => res.text());
// //   document.querySelector("#app").innerHTML = html;
// // }

// // export async function router() {
// //   const path = window.location.pathname;

// //   // --------------------
// //   // HOME
// //   // --------------------
// //   if (path === "/" || path === "/home") {
// //     await loadView("/frontend/pages/home.html");
// //     return;
// //   }

// //   // --------------------
// //   // USERS
// //   // --------------------
// //   if (path === "/users") {
// //     await loadView("/frontend/pages/users.html");
// //     initUserController();
// //     return;
// //   }

// //   // --------------------
// //   // ACTIVITIES
// //   // --------------------
// //   if (path === "/activities") {
// //     await loadView("/frontend/pages/activities.html");
// //     initActivityController();
// //     return;
// //   }

// //   // --------------------
// //   // MEDICAL
// //   // --------------------
// //   if (path === "/medical") {
// //     await loadView("/frontend/pages/medical.html");
// //     initMedicalController();
// //     return;
// //   }

// //   // --------------------
// //   // REPORT
// //   // --------------------
// //   if (path === "/report") {
// //     await loadView("/frontend/pages/report.html");
// //     initreportController();
// //     return;
// //   }

// //   // --------------------
// //   // PROFILE (current user)
// //   // --------------------
// //   if (path === "/profile") {
// //     await loadView("/frontend/pages/profile.html");
// //     initProfileController(); // no ID
// //     return;
// //   }

// //   // --------------------
// //   // PROFILE BY ID (/profiles/:id)
// //   // --------------------
// //   if (path.startsWith("/profiles/")) {
// //     const idStr = path.split("/")[2];
// //     const id = Number(idStr);

// //     if (!Number.isInteger(id)) {
// //       await loadView("/frontend/pages/404.html");
// //       return;
// //     }

// //     await loadView("/frontend/pages/profile.html");
// //     initProfileController(id); // pass ID
// //     return;
// //   }

// //   // --------------------
// //   // 404
// //   // --------------------
// //   await loadView("/frontend/pages/404.html");
// // }

// // export function initRouterEvents() {
// //   document.addEventListener("click", (e) => {
// //     const link = e.target.closest("[data-link]");
// //     if (!link) return;

// //     e.preventDefault();
// //     history.pushState(null, "", link.href);
// //     router();
// //   });

// //   window.addEventListener("popstate", router);
// // }


import { initUserController } from "../controllers/userController.js";
import { initActivityController } from "../controllers/activityController.js";
import { initMedicalController } from "../controllers/medicalController.js";
import { initreportController } from "../controllers/reportController.js";
import { initProfileController } from "../controllers/profileController.js";

async function loadView(path) {
  const html = await fetch(path).then(res => res.text());
  document.querySelector("#app").innerHTML = html;
}

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

  // REPORT LIST (JOIN TABLE)
  else if (path === "/report") {
    await loadView("/frontend/pages/report.html");
    initreportController();
    return;
  }

  // ✅ REPORT PROFILE VIEW (/report/:id)
 else  if (path.startsWith("/report/")) {
    const userId = Number(path.split("/")[2]);

   if (!Number.isInteger(userId)) {
      await loadView("/frontend/pages/404.html");
      return;
    }

    await loadView("/frontend/pages/profile.html");
    initProfileController(userId);
    return;
  }

  else {
    await loadView("/frontend/pages/404.html");
  }
}

export function initRouterEvents() {
  document.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      history.pushState(null, "", e.target.href);
      router();
    }
  });

  window.addEventListener("popstate", router);
}

// import { initUserController } from "../controllers/userController.js";
// import { initActivityController } from "../controllers/activityController.js";
// import { initMedicalController } from "../controllers/medicalController.js";
// import { initreportController } from "../controllers/reportController.js";
// import { initProfileController } from "../controllers/profileController.js";

// async function loadView(path) {
//   const res = await fetch(path);
//   const html = await res.text();
//   document.querySelector("#app").innerHTML = html;
// }

// export async function router() {
//   let path = window.location.pathname;

//   // HOME
//   if (path === "/" || path === "/home") {
//     await loadView("/frontend/pages/home.html");
//     return;
//   }

//   // USERS
//   if (path === "/users") {
//     await loadView("/frontend/pages/users.html");
//     initUserController();
//     return;
//   }

//   // ACTIVITIES
//   if (path === "/activities") {
//     await loadView("/frontend/pages/activities.html");
//     initActivityController();
//     return;
//   }

//   // MEDICAL
//   if (path === "/medical") {
//     await loadView("/frontend/pages/medical.html");
//     initMedicalController();
//     return;
//   }

//   // REPORT LIST (JOIN TABLE)
//   if (path === "/report") {
//     await loadView("/frontend/pages/report.html");
//     initreportController();
//     return;
//   }

//   // ✅ REPORT PROFILE VIEW (/report/:id)
//   if (path.startsWith("/report/")) {
//     const userId = Number(path.split("/")[2]);

//     if (!Number.isInteger(userId)) {
//       await loadView("/frontend/pages/404.html");
//       return;
//     }

//     await loadView("/frontend/pages/profile.html");
//     initProfileController(userId);
//     return;
//   }

//   // 404
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
