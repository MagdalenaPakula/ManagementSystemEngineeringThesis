# Use a smaller base image
FROM python:3.7-slim as builder

# Set the working directory in the builder stage
WORKDIR /app

# Copy only the necessary files
COPY . .

# Install build dependencies
RUN apt-get update && apt-get install -y build-essential

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip setuptools && \
    pip install --no-cache-dir -r requirements.txt && \
    apt-get remove -y build-essential && apt-get autoremove -y && apt-get clean

# Switch to a smaller base image
FROM python:3.7-slim

# Set the working directory in the final stage
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app /app

# Expose the port your app will run on
EXPOSE 8000

# Command to run your application
CMD ["python", "app.py"]
