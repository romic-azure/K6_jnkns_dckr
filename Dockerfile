# Use official k6 image as the base
FROM grafana/k6:latest

# Set working directory inside the container
WORKDIR /k6-test

# Copy your project files to the working directory
COPY . /k6-test

# Command to run your main.js file (adjust path if necessary)
CMD ["run", "/k6-test/main.js"]