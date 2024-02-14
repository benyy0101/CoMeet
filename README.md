# 🌠COMEET🌠

메인 페이지 이미지 필요 (gif 되면 좋겠다!)



### Introduction
* 개발자들을 위한 모각코 커뮤니티 사이트입니다

### ⏱ 개발 기간
* 2024.01.08 ~ 2024.02.15 (6주)


### 🧑‍💻 팀소개

| 김태수   | 이유로   | 정현아   | 김희연   | 정덕주   | 김동건   |
|-------|-------|-------|-------|-------|-------|
|<img src="https://github.com/damdam6/BaekJoon-Group-Board/assets/110401199/cd575a38-8fc4-4470-889b-b920862f2e30" width="150" height="150">| <img src="https://github.com/damdam6/BaekJoon-Group-Board/assets/110401199/97e4445e-6437-4ee9-b989-c80de981d20b" width="150" height="150">| <img src="https://github.com/damdam6/BaekJoon-Group-Board/assets/110401199/cd575a38-8fc4-4470-889b-b920862f2e30" width="150" height="150">| <img src="https://github.com/damdam6/BaekJoon-Group-Board/assets/110401199/cd575a38-8fc4-4470-889b-b920862f2e30" width="150" height="150">|<img src="https://github.com/damdam6/BaekJoon-Group-Board/assets/110401199/e77290ea-72d3-498f-8e2d-0f97331449b1" width="150" height="150">|  <img src="https://github.com/damdam6/BaekJoon-Group-Board/assets/110401199/cd575a38-8fc4-4470-889b-b920862f2e30" width="150" height="150">|
| 팀장, 프론트| 프론트, 백| 프론트| 백| 백| 인프라 & 프론트
| 주요 기능| 주요 기능| 주요 기능| 주요 기능| 주요 기능| 주요 기능|
| 셀(3,1)| 셀(3,2)| 셀(3,3)| 셀(3,4)| 셀(3,5)| 셀(3,6)|
| 셀(4,1)| 셀(4,2)| 셀(4,3)| 셀(4,4)| 셀(4,5)| 셀(4,6)|



### 🛠️ 기술 스택

##### Front

<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=black">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">


##### Back

<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> 
<img src="https://img.shields.io/badge/SPRING DATA JPA-6DB33F?style=for-the-badge&logoColor=white"> 
<img src="https://img.shields.io/badge/querydsl-669DF6?style=for-the-badge&logoColor=white"> 
<img src="https://img.shields.io/badge/SPRING SECURITY-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white"> 


<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/redis-DC382D?style=for-the-badge&logo=redis&logoColor=white">
<img src="https://img.shields.io/badge/mongodb-4479A1?style=for-the-badge&logo=mongodb&logoColor=white">
<img src="https://img.shields.io/badge/amazons3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">


##### Environment

<img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white">
<img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
<img src="https://img.shields.io/badge/EC2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">

<img src="https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white">
<img src="https://img.shields.io/badge/sonarqube-4E9BCD?style=for-the-badge&logo=sonarqube&logoColor=white">
<img src="https://img.shields.io/badge/prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white">
<img src="https://img.shields.io/badge/grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white">

<img src="https://img.shields.io/badge/openvidu-F46800?style=for-the-badge&logoColor=white">

##### Cooperation
<img src="https://img.shields.io/badge/gitlab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white">
<img src="https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=jira&logoColor=white">
<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">

##### Etc
<img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
<img src="https://img.shields.io/badge/erdcloud-F46800?style=for-the-badge&logoColor=white">



#### 포팅 메뉴얼

##### 1. 개발 환경 (Version)
* Front
    * VS Code : 

* Back
    * Java : `coretto-17`
    * SpringBoot : `3.2.1, Gradle, Jar`
    * IntelliJ : `2021.2.4 IU-212.5712.43 December 21, 2021`
    * MySQL : `8.2`
    * MySQL workbench : `8.0.21`


##### 2. 주요 setting

* React

* Spring Boot
    * application-secret.yml 파일을 만들어 gitignore. 에 관리하여 사용하였습니다.
    * application.yml

        ```
        spring:
        profiles:
            include: secret

        datasource:
            url: jdbc:mysql://127.0.0.1:3306/comeet?serverTimezone=UTC
            username: {username}
            password: {password}
            driver-class-name: com.mysql.cj.jdbc.Driver

        jpa:
            hibernate:
            ddl-auto: update
            properties:
            hibernate:
                format_sql: true
                dialect: org.hibernate.dialect.MySQL8Dialect
                default_batch_fetch_size:

        jwt:
            header: Authorization
            secret: {your secret SSL Encryption, create by `openssl rand -base64 60`}
            access-token-validity-in-seconds : 7200
            refresh-token-validity-in-seconds : 86400

        data:
            redis:
            host: localhost
            port: 6379
            mongodb:
            uri: {yourMongoDBURI}

        security:
            oauth2:
            client:
                registration:
                github:
                    client-id: {your github client Id}
                    client-secret: {your github client secret}
                password-salt: {your password-salt. create your own random value}

        logging.level:
        org.hibernate.SQL: debug

        aes:
        secret-key: {your aes128 encryption secret key. create your own random value}

        cloud:
        aws:
            s3:
            bucket: {your bucket}
            credentials:
            access-key: {your access-key}
            secret-key: {your secret-key}
            region:
            static: ap-northeast-2 # 한국 서버
            auto: false
            stack:
            auto: false

        ```


##### 3. 빌드 및 실행
* Front
* Back
     ```
    gradlew clean bootJar
    ```

     ```
    java -jar comeet-0.0.1-SNAPSHOT.jar
    ```


##### 4. 배포
* Nginx 

    ```
    upstream ssafy {
        server i10a506.p.ssafy.io:3002;
    }

    server {
        server_name localhost;
        listen 80;
        listen [::]:80;

        location / {
            proxy_pass http://localhost:3002;
        }
    }
    server {
        listen 80 default_server;
        listen [::]:80 default_server;

        root /var/www/html;
        # Add index.php to the list if you are using PHP
        index index.html index.htm index.nginx-debiain.html;
        location / {
            try_files $uri $uri/ =404;
        }
    }


    server {
    #    index index.html index.htm index.nginx-debian.html;
        server_name i10a506.p.ssafy.io; # managed by Certbot


        location / {
            proxy_pass http://i10a506.p.ssafy.io:3001;
        }
            location /api {
            
    #        if ($request_method = 'OPTIONS') {
    #                  add_header 'Access-Control-Allow-Origin' 'http://localhost:3000, http://i10a506.p.ssafy.io:3001';
    #            add_header 'Access-Control-Allow-Credentials' 'true';
    #                   add_header 'Access-Control-Allow-Methods' 'GET, POST, DELETE, PATCH, OPTIONS';
    #                  add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization';
    #                 add_header 'Access-Control-Max-Age' 86400;
        #                return 204;
        #       }

            rewrite ^/api/(.*)$ /$1 break;
            proxy_pass http://ssafy;
            proxy_pass_request_headers on;
        }
        location /api2 {
            rewrite ^/api2/(.*)$ /$1 break;
            proxy_pass http://i10a506.p.ssafy.io:3003;
            proxy_pass_request_headers on;
        }
            
        listen [::]:443 ssl ipv6only=on; # managed by Certbot
        listen 443 ssl; # managed by Certbot
        ssl_certificate /etc/letsencrypt/live/i10a506.p.ssafy.io/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/i10a506.p.ssafy.io/privkey.pem; # managed by Certbot
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

    }
    server {
        if ($host = i10a506.p.ssafy.io) {
            return 308 https://$host$request_uri;
        }  # managed by Certbot 
        if ($host = localhost) {
            return 301 http://$host:3002$request_uri;
        }


        listen 80 ;
        listen [::]:80 ;
        server_name i10a506.p.ssafy.io;
        return 404; # managed by Certbot


    }
    ```


#### 아키텍처



#### 🎚️ 주요 기능

1. 로그인 & 소셜 로그인
2. 일회용방, 지속방 구분
3. 채팅 & 코드채팅
4. 공유 코드 채팅
4. 캠공유 & 화면공유 & 필터
5. 방 & 게시판 검색
6. 모집 게시판 & 가입링크 & 쪽지 전송




#### 이슈 해결법


#### [API 명세서](https://www.notion.so/API-75586b08754643c3b8c514174477d506?pvs=4)

#### [트러블 슈팅 기록](https://www.notion.so/6b959b38992d4e1f9f44e785ef2dd2aa?pvs=4)


#### [학습 자료]()


### 상세 설명 및 소감
- 👋 [김태수 소감]()
- 👋 [이유로 소감]()
- 👋 [정현아 소감]()
- 👋 [김희연 소감]()
- 👋 [정덕주 소감]()
- 👋 [김동건 소감]()