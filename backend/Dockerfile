# syntax=docker/dockerfile:1.7
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN apk add --no-cache maven
RUN --mount=type=cache,target=/root/.m2 \
    sh -lc 'for i in 1 2 3; do \
      mvn -B -q \
      -DskipTests \
      -Dmaven.wagon.http.retryHandler.count=5 \
      -Dmaven.wagon.http.pool=false \
      -Dmaven.artifact.threads=1 \
      dependency:go-offline && exit 0; \
      echo "Maven go-offline failed, retry $i/3"; \
      sleep 5; \
    done; \
    exit 1'
RUN --mount=type=cache,target=/root/.m2 \
    sh -lc 'for i in 1 2 3; do \
      mvn -B -q \
      -DskipTests \
      -Dmaven.wagon.http.retryHandler.count=5 \
      -Dmaven.wagon.http.pool=false \
      -Dmaven.artifact.threads=1 \
      package && exit 0; \
      echo "Maven package failed, retry $i/3"; \
      sleep 5; \
    done; \
    exit 1'

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
