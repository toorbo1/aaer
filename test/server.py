import http.server
import socketserver

PORT = 8000

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory='public', **kwargs)

print(f"🚀 Сервер запущен: http://localhost:{PORT}")
print("📱 Для Telegram: https://your-domain.com (нужен HTTPS)")

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    httpd.serve_forever()