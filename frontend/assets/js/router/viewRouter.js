import { initUserController } from "../controllers/userController.js";
import { initActivityController } from "../controllers/activityController.js";
import { initMedicalController } from "../controllers/medicalController.js";
import { initreportController } from "../controllers/reportController.js";

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
    else if (path === "/report") {
    await loadView("/frontend/pages/report.html");
    initreportController();
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

