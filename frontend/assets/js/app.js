import { initUserController } from "./controllers/userController.js";
import { initActivityController } from "./controllers/activityController.js";
import { initMedicalController } from "./controllers/medicalController.js";
import { router } from "./router/viewRouter.js";

// Initialize app on page load
window.addEventListener("DOMContentLoaded", () => {
  router();
 initUserController();
 initActivityController();
 initMedicalController();
});