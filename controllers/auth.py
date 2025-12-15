from core.responses import send_json, send_404
from core.request import parse_json_body
from services.auth_service import (
    service_login,
    service_register,
    service_update,
    service_delete,
)

def login_user(handler):
    data = parse_json_body(handler)
    result = service_login(data)
    return send_json(handler, 200, result)

def register_user(handler):
    data = parse_json_body(handler)
    result = service_register(data)
    return send_json(handler, 201, result)

def update_user(handler, user_id):
    data = parse_json_body(handler)
    updated = service_update(user_id, data)
    return send_json(handler, 200, updated) if updated else send_404(handler)

def delete_user(handler, user_id):
    deleted = service_delete(user_id)
    return send_json(handler, 200, {"deleted": True}) if deleted else send_404(handler)
