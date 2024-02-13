# WebRTC 코드 실행법

### 1. OpenVidu Deployment 4443 포트에 띄우기 (Docker설치는 알아서)

```
docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.29.0
```

### 2. webrtc/back 프로젝트 5000 포트에 실행 (Spring Boot)

### 3. webrtc/front 실행

```
npm i
npm start
```
