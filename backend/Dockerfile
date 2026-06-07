# --------- Stage 1: Build the application ---------
FROM gradle:8.14.2-jdk21 AS builder

# Set working directory inside build container
WORKDIR /app

# Copy Gradle build files
COPY build.gradle settings.gradle ./

# Copy the entire source code
COPY src ./src

# Build the jar (skip tests for faster builds)
RUN gradle clean build -x test --no-daemon

# --------- Stage 2: Run the application ---------
FROM eclipse-temurin:21-jdk-jammy

# Set working directory inside runtime container
WORKDIR /app

# Copy built jar from previous stage
COPY --from=builder /app/build/libs/*.jar app.jar

# Expose the port your Spring Boot app runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]