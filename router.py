# router.py — Health Tracker Version (FULL CRUD)

from datetime import datetime
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse

# # Controllers
# from controllers.auth import login_user, register_user, update_user, delete_user
from controllers.user import (
    
    get_all_users,
    # get_user,
    # create_user,
    # update_user,
    # delete_user

)
# from controllers.activity import (
#     add_activity_record,
#     get_activity_records,
#     update_activity_record,
#     delete_activity_record
# )
# from controllers.medical import (
#     add_medical_record,
#     get_medical_records,
#     update_medical_record,
#     delete_medical_record
# )

# from core.static import serve_static
from core.responses import send_404
from core.middleware import add_cors_headers


# ----------------------------------------
# UI ROUTES
# ----------------------------------------
# FRONTEND_ROUTES = {
#     "/", "/signin", "/user-input", "/daily-activity", "/medical-records"
# }

# def handle_ui_routes(handler, path):
#     if path in FRONTEND_ROUTES:
#         serve_static(handler, "frontend/pages/index.html")
#         return True

#     if path.startswith("/frontend/"):
#         serve_static(handler, path.lstrip("/"))
#         return True

#     return False



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

        # if handle_ui_routes(self, path):
        #     return


        # USER PERSONAL DETAILS
        if path == "/api/user/":
            return get_all_users(self)
        
        
        # if path.startswith("/api/user/"):
        #     user_id = int(path.split("/")[-1])
        #     return get_user(self, user_id)

        # DAILY ACTIVITY
        # if path == "/api/activity":
        #     return get_activity_records(self)

        # MEDICAL
        # if path == "/api/medical":
        #     return get_medical_records(self)

        return send_404(self)



    # ------------------------------------
    # CREATE (POST)
    # ------------------------------------
    # def do_POST(self):

    #     # USER DETAILS
    #     if self.path == "/api/user/":
    #         return create_user(self)

    #     # # ACTIVITY
    #     # if self.path == "/api/activity":
    #     #     return add_activity_record(self)

    #     # # MEDICAL
    #     # if self.path == "/api/medical":
    #     #     return add_medical_record(self)

    #     return send_404(self)



    # ------------------------------------
    # UPDATE (PUT)
    # ------------------------------------
    # def do_PUT(self):
    #     if self.path.startswith("/api/user/"):
    #         user_id = int(self.path.split("/")[-1])
    #         return update_user(self, user_id)
    #     return send_404(self)

        # # ACTIVITY UPDATE
        # if path.startswith("/api/activity/"):
        #     record_id = int(path.split("/")[-1])
        #     return update_activity_record(self, record_id)

        # # MEDICAL UPDATE
        # if path.startswith("/api/medical/"):
        #     record_id = int(path.split("/")[-1])
        #     return update_medical_record(self, record_id)

        # return send_404(self)



    # ------------------------------------
    # DELETE (DELETE)
    # ------------------------------------
    # def do_DELETE(self):
    #     if self.path.startswith("/api/users/"):
    #         user_id = int(self.path.split("/")[-1])
    #         return delete_user(self, user_id)
    #     return send_404(self)

        # # DELETE ACTIVITY
        # if path.startswith("/api/activity/"):
        #     record_id = int(path.split("/")[-1])
        #     return delete_activity_record(self, record_id)

        # # DELETE MEDICAL
        # if path.startswith("/api/medical/"):
        #     record_id = int(path.split("/")[-1])
        #     return delete_medical_record(self, record_id)

        # return send_404(self)



    # ------------------------------------
    # LOGGER
    # ------------------------------------
    def log_message(self, format, *args):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] [Server] {format % args}")

        




            
            

            
            


                


           
        
    

