FROM eclipse-temurin:17-jdk-alpine
MAINTAINER janis666@gmail.com
VOLUME /tmp
COPY target/komornik-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]