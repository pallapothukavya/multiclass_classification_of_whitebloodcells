# Use Python 3.11 slim image
FROM python:3.11-slim

# Create a non-root user (Hugging Face Spaces requires UID 1000)
RUN useradd -m -u 1000 user
USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH

WORKDIR $HOME/app

# Copy requirements and install
COPY --chown=user requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

# Copy the rest of the application
COPY --chown=user . .

# Collect static files manually if not already done
RUN python manage.py collectstatic --noinput

# Expose port 7860 (Hugging Face default)
EXPOSE 7860

# Run the app with gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:7860", "WBC_Classification.wsgi:application"]
