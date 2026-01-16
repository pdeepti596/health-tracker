# router.py — Health Tracker Version (FULL CRUD)

from datetime import datetime
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse
from controllers.report import get_health_report
# # Controllers
from controllers.user import (
    
    get_all_users,
    get_user,
    create_user,
    update_user,
    delete_user

)

from controllers.activity import (
    get_all_activities,
    get_activity,
    create_activity, 
    update_activity,
    delete_activity
)

from controllers.medical import (
    get_all_medical,
    get_medical,
    create_medical,
    update_medical,
    delete_medical
)

from core.static import serve_static
from core.responses import send_404
from core.middleware import add_cors_headers


# ----------------------------------------
# UI ROUTES
# ----------------------------------------
FRONTEND_ROUTES = {
    "/", "/home", "/users", "/activities", "/medical"
}

def handle_ui_routes(handler, path):
    if path in FRONTEND_ROUTES:
        serve_static(handler, "frontend/pages/index.html")
        return True
    if path.startswith("/frontend/"):
        serve_static(handler, path.lstrip("/"))
        return True


    return False



# ----------------------------------------
# MAIN ROUTER
# ----------------------------------------
class HealthRouter(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        self.send_response(200)
        add_cors_headers(self)
        self.end_headers()


    # ------------------------------------
    # READ (GET)
    # ------------------------------------
    def do_GET(self):
        path = urlparse(self.path).path

        if handle_ui_routes(self, path):
            return

        if path == "/api/users":
            return get_all_users(self)

        if path.startswith("/api/users/"):
            return get_user(self, int(path.split("/")[-1]))

        if path == "/api/activities":
            return get_all_activities(self)

        if path.startswith("/api/activities/"):
            return get_activity(self, int(path.split("/")[-1]))

        if path == "/api/medical":
            return get_all_medical(self)

        if path.startswith("/api/medical/"):
            return get_medical(self, int(path.split("/")[-1]))
        
                # ---------------------------
        # REPORTS (JOIN)
        # ---------------------------
        if path == "/api/report":
            return get_health_report(self)


        send_404(self)


    # ------------------------------------
    # CREATE (POST)
    # ------------------------------------
    def do_POST(self):
        if self.path == "/api/users":
            return create_user(self)

        if self.path == "/api/activities":
            return create_activity(self)

        if self.path == "/api/medical":
            return create_medical(self)
        else:
            send_404(self)


    # ------------------------------------
    # UPDATE (PUT)
    # ------------------------------------
    def do_PUT(self):
        if self.path.startswith("/api/users/"):
            user_id = int(self.path.split("/")[-1])
            return update_user(self, user_id)

        if self.path.startswith("/api/activities/"):
            activity_id = int(self.path.split("/")[-1])
            return update_activity(self, activity_id)

        if self.path.startswith("/api/medical/"):
            medical_id = int(self.path.split("/")[-1])
            return update_medical(self, medical_id)
        else:
            send_404(self)

    # ------------------------------------
    # DELETE (DELETE)
    # ------------------------------------
    def do_DELETE(self):
        if self.path.startswith("/api/users/"):
            user_id = int(self.path.split("/")[-1])
            return delete_user(self, user_id)
        
        if self.path.startswith("/api/activities/"):
            activity_id = int(self.path.split("/")[-1])
            return delete_activity(self, activity_id)

        if self.path.startswith("/api/medical/"):
            medical_id = int(self.path.split("/")[-1])
            return delete_medical(self, medical_id)
        else:
            send_404(self)


    # ------------------------------------
    # LOGGER
    # ------------------------------------
    def log_message(self, format, *args):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] [Server] {format % args}")

        




            
            

            
            


                


           
        
    

