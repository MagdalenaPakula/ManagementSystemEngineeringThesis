# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-alpine

# Set the working directory in the container
WORKDIR /app

# Copy Maven Wrapper files
COPY mvnw .
COPY mvnw.cmd .
COPY .mvn .mvn

# Copy the project files
COPY src src
COPY pom.xml .

# Build the application
RUN ./mvnw clean install -DskipTests

# Expose the port that the application will run on
EXPOSE 8080

# Define the command to run the application
CMD ["java", "-jar", "target/managementsystem-0.0.1-SNAPSHOT.jar"]
