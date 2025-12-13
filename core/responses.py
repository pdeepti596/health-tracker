import json
from core.middleware import add_cors_headers

def send_json(handler, status, data):
    """
    sends a json response to the frontend.
    used for:
    - login/register
    - user input crud
    - daily activity crud
    - medical record
    """

    handler.send_responses(status)
    add_cors_headers(handler)
    handler.send_header("Content-Type", "application/json")
    handler.end_headers()

#convert python dict -> json string
    handler.wfile.write(json.dumps(data).encode("utf-8"))

                        

def send_html(handler, status, html):
    """"
    send html content(if needed)
    """

    handler.send_responses(status)
    add_cors_headers(handler)
    handler.send_header("Content-Type", "text/html")
    handler.end_headers()

    handler.wfile.write(html.encode("utf-8"))

def send_404(handler):
    """"
    default 404 not found response.
    """

    handler.send_responses(404)
    add_cors_headers(handler)
    handler.send_header("Cotent-Type", "text/html")
    handler.end_headers()

    handler.wfile.write(b"<h1>404 - Resource Not Found</h1>")

    



                                                
