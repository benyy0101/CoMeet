# 🌐 포팅 매뉴얼

# 버전 정보

## 백

- Java - `openjdk 17.0.9 correto`
- Spring - `3.2.1 Gradle, Jar`
- Tomcat - `10.1.17`
- Openvidu - `2.29.0`
- IntelliJ : `2021.2.4 IU-212.5712.43 December 21, 2021`

## 프론트

- npm - `10.1.0`
- Visual Studio Code - `1.86.1`
- NodeJS - `20.9.0`
- React - `18.2.0`
- 다음 정보는 package.json에서 확인 가능
  ```jsx
  front@0.1.0 C:\Users\dongg\project\semester_second\comeet\front
  ├── @heroicons/react@2.1.1
  ├── @monaco-editor/react@4.6.0
  ├── @reduxjs/toolkit@2.1.0
  ├── @stomp/stompjs@7.0.0
  ├── @tanstack/react-query@5.18.0
  ├── @toast-ui/react-editor@3.2.3
  ├── @types/crypto-js@4.2.2
  ├── @types/node@16.18.71
  ├── @types/react-dom@18.2.18
  ├── @types/react-syntax-highlighter@15.5.11
  ├── @types/react@18.2.48
  ├── @types/sockjs-client@1.5.4
  ├── autoprefixer@10.4.16
  ├── axios@1.6.5
  ├── crypto-js@4.2.0
  ├── eslint-config-prettier@9.1.0
  ├── eslint-plugin-prettier@5.1.3
  ├── heroicons@2.1.1
  ├── lil-gui@0.19.1
  ├── moment@2.30.1
  ├── openvidu-browser@2.29.1
  ├── postcss@8.4.33
  ├── prettier@3.2.3
  ├── qs@6.11.2
  ├── react-calendar@4.8.0
  ├── react-dom@18.2.0
  ├── react-hook-form@7.49.3
  ├── react-infinite-scroll-component@6.1.0
  ├── react-markdown@9.0.1
  ├── react-redux@9.1.0
  ├── react-router-dom@6.21.2
  ├── react-scripts@5.0.1
  ├── react-syntax-highlighter@15.5.0
  ├── react-textarea-autosize@8.5.3
  ├── react-toastify@10.0.4
  ├── react-wordcloud@1.2.7
  ├── react@18.2.0
  ├── redux-persist@6.0.0
  ├── remark-gfm@4.0.0
  ├── sockjs-client@1.6.1
  ├── styled-components@6.1.8
  ├── tailwind-scrollbar-hide@1.1.7
  ├── tailwind-scrollbar@3.0.5
  ├── tailwind-styled-components@2.2.0
  ├── tailwindcss@3.4.1
  ├── three@0.161.0
  └── typescript@4.9.5
  ```

## 기타

- EC2 ubuntu - `20.04.6 LTS`
- Docker - `25.0.0`
- Nginx - `1.25.3`
- MySQL - `8.2`
- MySQLWorkbench - `8.0.21`
- Redis - `7.2.4`

# 포트 정보

```jsx
- 80 : 프록시 서버 → 443
- 443 : 프록시 서버(SSL)

- 3000 : 프론트 서버(테스트, 시연용)
- 3001 : 프론트 서버(배포용)
- 3002 : 백 서버(개발용)   3002 →  8080
- 3003 : 백 서버(배포용)
- 3100 : 젠킨스 서버
- 3200 : MySQL
- 3201 : Redis

- 3301 : 프로메테우스
- 3302 : 그라파나
- 3303 : 노드 익스포터

- 3401 : 소나큐브

- 5442 : RTC 시그널링 및 웹소켓 통신 서버
- 5443 : 오픈비두 서버

- 8442 : 오픈비두 프록시 → 8443
- 8443 : 오픈비두 프록시(SSL) → 5442, 5443
```

# 변수 및 보안 정보

- 백

  ```bash
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
          default_batch_fetch_size: 1000

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

    servlet:
      multipart:
        max-file-size: -1
        max-request-size: -1

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

- 프론트
  ```bash
  REACT_APP_API_SERVER_URL = {YOUR DOMAIN NAME}/api2
  REACT_APP_WEBSOCKET_SERVER_URL = {YOUR DOMAIN NAME}:8443/
  REACT_APP_SECRETKEY = {YOUR SECRET KEY}
  ```

# 방화벽 정보

- `ufw status`를 통해 나오는 정보는 다음과 같다.
  ```jsx
  22                         ALLOW       Anywhere
  8989                       ALLOW       Anywhere
  443                        ALLOW       Anywhere
  80                         ALLOW       Anywhere
  5000                       ALLOW       Anywhere
  4443                       ALLOW       Anywhere
  3000                       ALLOW       Anywhere
  3001                       ALLOW       Anywhere
  22/tcp                     ALLOW       Anywhere
  80/tcp                     ALLOW       Anywhere
  443/tcp                    ALLOW       Anywhere
  3478/tcp                   ALLOW       Anywhere
  3478/udp                   ALLOW       Anywhere
  40000:57000/tcp            ALLOW       Anywhere
  40000:57000/udp            ALLOW       Anywhere
  57001:65535/tcp            ALLOW       Anywhere
  57001:65535/udp            ALLOW       Anywhere
  5443                       ALLOW       Anywhere
  3100                       ALLOW       Anywhere
  8442                       ALLOW       Anywhere
  8443                       ALLOW       Anywhere
  3002                       ALLOW       Anywhere
  3200                       ALLOW       Anywhere
  22 (v6)                    ALLOW       Anywhere (v6)
  8989 (v6)                  ALLOW       Anywhere (v6)
  443 (v6)                   ALLOW       Anywhere (v6)
  80 (v6)                    ALLOW       Anywhere (v6)
  5000 (v6)                  ALLOW       Anywhere (v6)
  4443 (v6)                  ALLOW       Anywhere (v6)
  3000 (v6)                  ALLOW       Anywhere (v6)
  3001 (v6)                  ALLOW       Anywhere (v6)
  22/tcp (v6)                ALLOW       Anywhere (v6)
  80/tcp (v6)                ALLOW       Anywhere (v6)
  443/tcp (v6)               ALLOW       Anywhere (v6)
  3478/tcp (v6)              ALLOW       Anywhere (v6)
  3478/udp (v6)              ALLOW       Anywhere (v6)
  40000:57000/tcp (v6)       ALLOW       Anywhere (v6)
  40000:57000/udp (v6)       ALLOW       Anywhere (v6)
  57001:65535/tcp (v6)       ALLOW       Anywhere (v6)
  57001:65535/udp (v6)       ALLOW       Anywhere (v6)
  5443 (v6)                  ALLOW       Anywhere (v6)
  3100 (v6)                  ALLOW       Anywhere (v6)
  8442 (v6)                  ALLOW       Anywhere (v6)
  8443 (v6)                  ALLOW       Anywhere (v6)
  3002 (v6)                  ALLOW       Anywhere (v6)
  3200 (v6)                  ALLOW       Anywhere (v6)
  ```
- Openvidu를 활용하기 위해 위와 같이 포트를 열어주어야만 한다.
  ```jsx
  8442 : nginx
  8443 : nginx
  3478 : TURN server
  5442 : openvidu server(시그널링 서버)
  5443 : openvidu based application
  6379 : redis for openvidu
  8888 : KMS
  ```

# 서버 환경 구축 방법

- 할당 받은 ec2에서 안전한 환경 구축을 위해 도커를 설치하여 모든 프로그램을 컨테이너로 관리한다.
- 서버 구축에 관련한 코드와 보안 정보는 개인 레포지토리`{YOUR PRIVATE GIT REPOSITORY}`에서 관리한다.
- 젠킨스를 통해 배포를 자동화하여 관리하였고 `/var/jenkins_home` 에 settings 디렉토리를 만들어 세팅 파일을 관리하였기에 이후의 스크립트에서 해당 경로가 등장할 수 있다.
- 다음의 설정을 기본적으로 진행한다.

  ```bash
  sudo su

  # 이 친구들은 어떤 컨테든
  apt update && apt install -y git vim net-tools lsof procps

  ssh-keygen
  # /root/.ssh에 생성
  # 키를 깃헙에 등록
  cd ~ && git clone {YOUR PRIVATE GIT REPOSITORY}
  #yes

  cd comeet-infra-setting
  sh initial_configuration.sh
  ```

- initial_configuration.sh

  ```bash
  #!/bin/bash

  cp -f .vimrc ..

  echo '도커 설치'
  apt install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
  add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
  apt update
  apt install -y docker-ce docker-ce-cli containerd.io docker-compose docker-compose-plugin

  systemctl enable docker
  systemctl start docker

  echo '젠킨스 설치'
  mkdir -p /var/jenkins_home
  chown -R 1000:1000 /var/jenkins_home/
  sudo docker run --restart=on-failure --user='root' -p 3100:8080 -p 50000:50000 -v /var/jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -d --name jenkins jenkins/jenkins:lts

  # 젠컨에 필요한 파일 넣고 실행
  # 도커, 노드, 자바 설치 필요
  # settings direc에 전부 넣기
  # .env 파일도 같이 여기에 들어가야 함
  # application.yml도 직접 넣어주기
  echo '젠킨스 컨테이너 설정'
  mkdir -p /var/jenkins_home/settings
  chmod 777 jenkins_settings.sh
  cp jenkins_settings.sh /var/jenkins_home/settings
  cp application.yml /var/jenkins_home/settings

  docker exec jenkins sh /var/jenkins_home/settings/jenkins_settings.sh

  #sql디비 설치
  # 논리 볼륨 만들어서 겉에 놔두기
  echo '디비 설치'
  docker volume create data_volume
  docker pull mysql:8.2.0
  docker run -d -p 3200:3306 -e MYSQL_DATABASE=comeet -e MYSQL_USER=comeet -e MYSQL_PASSWORD=comeet -e MYSQL_ROOT_PASSWORD=root -v data_volume:/var/lib/mysql--name database mysql:8.2.0

  # redis 디비 설치
  docker pull redis:latest
  docker run -d -p 3201:6379 --name=redis redis:latest

  # 개발용 백 설치
  # 초기 설정 파일 구동
  # 재실행 파일도 필요
  echo '개발용 백 설치'
  docker pull ubuntu:jammy
  chmod 777 back_settings.sh
  chmod 777 back_execution.sh
  cp back_settings.sh /var/jenkins_home/settings
  cp back_execution.sh /var/jenkins_home/settings
  docker run -td --link database:database -p 3002:8080 -v /var/jenkins_home/settings/:/settings --user='root' --name dev_back ubuntu:jammy
  docker exec dev_back sh /settings/back_settings.sh

  # 배포용 백 설치
  # 초기 설정 파일 구동
  # 재실행 파일도 필요
  echo '배포용 백 설치'
  docker run -td --link database:database -p 3003:8080 -v /var/jenkins_home/settings/:/settings --user='root' --name dep_back ubuntu:jammy
  docker exec dep_back sh /settings/back_settings.sh

  # 배포용 백 설치
  # 초기 설정 파일 구동
  # 재실행 파일도 필요
  echo '배포용 백 설치'
  docker run -td -p 3001:3000 -v /var/jenkins_home/settings/:/settings --user='root' --name front ubuntu:jammy
  docker exec front sh /settings/front_settings.sh

  # 배포용 웹 서버 설치
  # 초기 설정 파일 구동
  # 재실행 파일 필요
  echo '배포용 웹 설치'
  chmod 777 web_settings.sh
  chmod 777 web_execution.sh
  cp web_settings.sh /var/jenkins_home/settings
  cp web_execution.sh /var/jenkins_home/settings
  docker pull nginx:1.25.3
  docker run -td --user=root -v /var/jenkins_home/settings:/settings -p 443:443-p 80:80 --name web nginx:1.25.3
  docker exec web sh /settings/web_settings.sh
  docker start web
  ```

- 다음은 각 컨테이너에 대한 setting 스크립트이다.

  ```bash
  #!/bin/bash

  # back_settings.sh

  apt update && apt install -y git vim net-tools sudo lsof procps

  apt install -y openjdk-17-jdk
  export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
  ```

  ```bash
  #!/bin/bash

  # front_settings.sh

  apt update && apt install -y git vim net-tools sudo lsof procps

  curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
  export NODE_MAJOR=20
  echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
  sudo apt update && sudo apt install nodejs -y
  npm install -g serve
  ```

  ```bash
  #!/bin/bash

  # web_settings.sh

  apt update && apt install -y git vim net-tools sudo lsof procps

  cp -f /settings/default.conf /etc/nginx/conf.d/
  service nginx restart
  ```

- Openvidu는 배포용을 설치한다.
  ```bash
  cd /opt
  curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_2.29.0.sh | bash
  ```
  - 배포용 Openvidu는 docker-compose를 통해 알아서 각종 서버를 설치한다. 이때 .env 파일을 통해 어느 정도의 커스터마이징이 가능하다.
  - 초기 설치 시에 letsencrypt로 ssl 키를 받으려면 80, 443 포트를 사용해야만 하므로 한번은 기본 실행을 한 후, 포트 번호를 커스터마이징한다.
  - 이 링크에서 설정 방법을 보다 자세히 볼 수 있다. [https://docs.openvidu.io/en/2.29.0/deployment/ce/on-premises/](https://docs.openvidu.io/en/2.29.0/deployment/ce/on-premises/)
  - .env에서 다음의 줄을 커스터마이징한다.
    ```bash
    DOMAIN_OR_PUBLIC_IP={YOUR DOMAIN NAME}
    OPENVIDU_SECRET={OPENVIDU SECRET}
    CERTIFICATE_TYPE=letsencrypt
    LETSENCRYPT_EMAIL={YOUR EMAIL}
    HTTP_PORT=8442
    HTTPS_PORT=8443
    ```

# 파일 빌드 및 배포 방법

- 각각의 빌드 및 실행은 각 컨테이너 내에서 실행되어야만 한다.
- Nginx를 프록시 서버로 활용하여 배포를 진행한다.

  - 80번 포트로 들어온 요청은 ssl인증을 받기 위해 443 포트로 리디렉션 된 이후 각 서버로 프록시 패스된다.
  - 백엔드는 개발용과 배포용 서버를 따로 띄워 관리하며 이에 따라 Nginx에서 업스트림으로 이름을 설정한다.

  ```bash
  upstream ssafy {
      server {YOUR BACK SERVER FOR DEVELOP};
  }
  upstream ssaf {
      server {YOUR BACK SERVER FOR DEPLOY};
  }

  server {
      server_name localhost;
      listen 80;
      listen [::]:80;

      location / {
          proxy_pass {YOUR WEB SERVER};
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
      server_name {YOUR DOMAIN NAME}; # managed by Certbot

      location / {
          proxy_pass {YOUR WEB SERVER};
      }
          location /api {

          rewrite ^/api/(.*)$ /$1 break;
          proxy_pass http://ssafy;
          proxy_pass_request_headers on;
      }
      location /api2 {
          rewrite ^/api2/(.*)$ /$1 break;
          proxy_pass http://ssaf;
          proxy_pass_request_headers on;
      }

      listen [::]:443 ssl ipv6only=on; # managed by Certbot
      listen 443 ssl; # managed by Certbot
      ssl_certificate {your full chain pem}; # managed by Certbot
      ssl_certificate_key {your private key pem}; # managed by Certbot
      include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
      ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

  }
  server {
      if ($host = {YOUR DOMAIN NAME}) {
          return 308 https://$host$request_uri;
      }  # managed by Certbot
      if ($host = localhost) {
          return 301 http://$host:3002$request_uri;
      }

      listen 80 ;
      listen [::]:80 ;
      server_name {YOUR DOMAIN NAME}
      return 404; # managed by Certbot

  }
  ```

- 백
  ```bash
  gradlew clean bootJar
  java -jar comeet-0.0.1-SNAPSHOT.jar
  ```
- 프론트
  ```bash
  npm install -f && CI=false npm run build
  serve -s /settings/build
  ```

## Github OAuth 사용법

- Settings → Developer Settings → OAuth Apps → New OAuth App
- Application name, Homepage URL, Authorization callback URL 지정하여 application 등록
- Client Id 와 Client Secret application.yml 파일에 등록

```java
spring:
  security:
    oauth2:
      client:
        registration:
          github:
            client-id: {your github client Id}
            client-secret: {your github client secret}
```
