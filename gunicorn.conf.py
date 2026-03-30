import os

# Gunicorn configuration
bind = f"0.0.0.0:{os.environ.get('PORT', '8080')}"
workers = 1
timeout = 300
loglevel = "warning"
accesslog = "-"
errorlog = "-"
preload_app = True
worker_tmp_dir = "/dev/shm"

# Ensure the control socket is not created in a restricted path
chdir = "/app"

# Minimal access log format to reduce log noise
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s'
