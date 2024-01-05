FROM arm64v8/amazoncorretto:21-alpine-jdk
MAINTAINER janis666@gmail.com
VOLUME /tmp
COPY target/komornik-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]