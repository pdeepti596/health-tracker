def add_cors_headers(handler):
    handler.send_header("Access_Control-Allow-Origin", "*")
    handler.send_header("Access-Control-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    handler.send_header("Access_control-Allow-Headers", "Content-Type, Authorization")
    