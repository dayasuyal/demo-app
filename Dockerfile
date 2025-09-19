ARG PYTHON_VERSION=3.9
FROM python:${PYTHON_VERSION}-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
