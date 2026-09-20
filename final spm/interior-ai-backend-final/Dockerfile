FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

RUN chmod +x mvnw 2>/dev/null || true
RUN ./mvnw clean package -DskipTests 2>/dev/null || mvn clean package -DskipTests

EXPOSE 10000

ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT:-10000} -jar target/*.jar"]