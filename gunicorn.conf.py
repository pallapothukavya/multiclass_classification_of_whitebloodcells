import os

# Gunicorn configuration
bind = f"0.0.0.0:{os.environ.get('PORT', '8080')}"
workers = 2
timeout = 300
loglevel = "warning"
accesslog = "-"
errorlog = "-"
# Force silence the informational "Control socket" message
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s"'
