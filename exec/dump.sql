-- MySQL dump 10.13  Distrib 8.2.0, for Linux (x86_64)
--
-- Host: localhost    Database: comeet
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `comeet`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `comeet` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `comeet`;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `category` enum('CHAT','TIP','QUESTION','PROMOTION','POPULAR') DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `is_valid` bit(1) DEFAULT NULL,
  `like_count` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type` enum('FREE','RECRUIT') DEFAULT NULL,
  `room_id` bigint DEFAULT NULL,
  `writer_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_9f995uxvpm7n5bpbr7yu0hveg` (`room_id`),
  KEY `FKi57kt4qb1qssjljxotb26a4h0` (`writer_id`),
  CONSTRAINT `FKi57kt4qb1qssjljxotb26a4h0` FOREIGN KEY (`writer_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKkpd26b4gg6fdx0tmoub89stkw` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (1,'2024-02-15 04:46:11.113150',_binary '\0','2024-02-15 04:46:11.113150','CHAT','자바 프로그래밍을 처음 배우는 사람들을 위한 스터디 방법입니다.',_binary '',0,'자바 공부법','FREE',NULL,'damongsanga'),(2,'2024-02-15 04:46:11.132400',_binary '\0','2024-02-15 04:46:11.132400','CHAT','개발하면서 겪은 재미있는 일화를 공유해요. 모두의 이야기를 기다립니다.',_binary '',0,'개발자의 일상','FREE',NULL,'movinggun'),(3,'2024-02-15 04:46:11.145801',_binary '\0','2024-02-15 04:46:11.145801','QUESTION','데이터 분석 중에 마주친 문제에 대해 질문합니다. 판다스 사용법이 궁금해요!',_binary '',0,'파이썬 데이터 분석 질문','FREE',NULL,'hyeeyon'),(4,'2024-02-15 04:46:11.157936',_binary '\0','2024-02-15 04:46:11.157936','TIP','개발을 하면서 알게 된 유용한 팁들을 공유합니다. 시간 절약하는 팁 대환영!',_binary '',0,'개발자를 위한 꿀팁!','FREE',NULL,'yuroyuro'),(5,'2024-02-15 04:46:11.170343',_binary '\0','2024-02-15 04:46:11.170343','PROMOTION','새로 시작한 프로젝트를 소개하고 팀원을 모집합니다. 관심 있으신 분들은 연락주세요!',_binary '',0,'내 프로젝트 홍보','FREE',NULL,'hyeonah'),(6,'2024-02-15 04:46:11.183560',_binary '\0','2024-02-15 04:46:11.183560','CHAT','네. 풀스택 오버플로우요',_binary '',0,'풀스택이라고 하셨잖아요!','FREE',NULL,'damongsanga'),(7,'2024-02-15 04:46:11.197370',_binary '\0','2024-02-15 04:46:11.197370','CHAT','light 모드는 bug를 끌어들이니까요.. 살려주세요..',_binary '',0,'왜 개발자들은 다크모드를 좋아할까요?','FREE',NULL,'hyeonah'),(8,'2024-02-15 04:46:11.210054',_binary '\0','2024-02-15 04:46:11.210054','CHAT','어제 하체 맛있게 먹었으니 오늘은 등으로 간다',_binary '',0,'오늘 운동 뭐하지','FREE',NULL,'movinggun'),(9,'2024-02-15 04:46:11.224148',_binary '\0','2024-02-15 04:46:11.224148','CHAT','90% 얼리버드 개꿀. 같이 가실분 구합니다!',_binary '',0,'곧 커피 엑스포가 열린대요','FREE',NULL,'benny'),(10,'2024-02-15 04:46:11.237468',_binary '\0','2024-02-15 04:46:11.237468','CHAT','다시 회사로 복귀도 했으니 800조 정도는 투자를 받아야겠어요~',_binary '',0,'반도체 수급이 부족해요','FREE',NULL,'iamaltman'),(11,'2024-02-15 04:46:11.251222',_binary '\0','2024-02-15 04:46:11.251222','CHAT','로고는 너무 잘 뽑은 것 같아요 그렇죠?',_binary '',0,'솔직히 생각해도','FREE',NULL,'hyeeyon'),(12,'2024-02-15 04:46:11.265604',_binary '\0','2024-02-15 08:44:26.329297','CHAT','그 친구 뮤비를 제가 만들었습니다. 가서 빨리 조회수를 올려주시죠.',_binary '',2,'윤딴딴 아세요?','FREE',NULL,'yuroyuro'),(13,'2024-02-15 04:46:11.278320',_binary '\0','2024-02-15 04:46:11.278320','PROMOTION','맛집 추천 프로젝트를 같이 운영하실 프론트 엔드원을 모집합니다! 주말에 함께 4시간정도 시간 내서 코밋에서 함께 진행하실 수 있는 분 구해요~',_binary '',0,'맛집 추천 프로젝트 모집','FREE',NULL,'hyeeyon'),(14,'2024-02-15 04:46:11.291665',_binary '\0','2024-02-15 04:46:11.291665','PROMOTION','AI를 활용한 작곡 서비스를 함께 만들어가실 개발자를 모십니다! 관심 있으신 분들은 연락주세요!',_binary '',0,'작곡 AI 프로젝트 모집','FREE',NULL,'damongsanga'),(15,'2024-02-15 04:46:11.305799',_binary '\0','2024-02-15 04:46:11.305799','PROMOTION','새로 시작한 프로젝트를 소개하고 팀원을 모집합니다. 관심 있으신 분들은 연락주세요!',_binary '',0,'사이드 프로젝트 함께하실 분 구합니다','FREE',NULL,'hyeonah'),(16,'2024-02-15 04:46:11.323018',_binary '\0','2024-02-15 04:46:11.323018','PROMOTION','다음 달, 새로운 사진 SNS로 찾아오겠습니다! 많은 관심 부탁드려요~',_binary '',0,'사진 SNS 프로젝트 홍보','FREE',NULL,'benny'),(17,'2024-02-15 04:46:11.336973',_binary '\0','2024-02-15 04:46:11.336973','PROMOTION','테슬라를 따라잡을 신규 전장 플랫폼을 기획하고 있습니다. 저희 팀에 관심 있으신 분들은 쪽지 주세요~',_binary '',0,'전기자 플랫폼 서비스 개발','FREE',NULL,'iammusk'),(18,'2024-02-15 04:46:11.350233',_binary '\0','2024-02-15 04:46:11.350233','PROMOTION','제가 곧 런칭을 준비중인 플랫폼에 네트워크 수업을 해주실 강사분을 모집합니다! 관심 있으신 분들은 쪽지 주세요~',_binary '',0,'교육 플랫폼 강사 모집','FREE',NULL,'yuroyuro'),(19,'2024-02-15 04:46:11.365262',_binary '\0','2024-02-15 04:46:11.365262','TIP','다음에 팀장하고 싶은 사람 있냐고 하면 화장실 다녀오셈',_binary '',0,'개꿀팁 공유','FREE',NULL,'benny'),(20,'2024-02-15 04:46:11.377411',_binary '\0','2024-02-15 04:46:11.377411','TIP','나만의 리눅스 명령어를 alias 로 등록하여 빠르고 쉽게 배포하세요!',_binary '',0,'아직도 명령어를 전부 다 치고 있으신가요?','FREE',NULL,'movinggun'),(21,'2024-02-15 04:46:11.391908',_binary '\0','2024-02-15 04:46:11.391908','TIP','알고 계셨나요? 코밋에는 공유 채팅 기능이 있다는 걸! 알고리즘 스터디에서 특히 유용하게 쓸 수 있아요 ㅎㅎ',_binary '',0,'공유채팅으로 알고리즘 스터디하기','FREE',NULL,'hyeonah'),(22,'2024-02-15 04:46:11.406882',_binary '\0','2024-02-15 04:46:11.406882','TIP','내가 트윗하면 코인 사셈. ㄹㅇ 개꿀팁임',_binary '',0,'진짜 개꿀팁 공유','FREE',NULL,'iammusk'),(23,'2024-02-15 04:46:11.420210',_binary '\0','2024-02-15 04:46:11.420210','TIP','첫 한달은 무료로 사용할 수 있어요! GPT 4 뿐만 아니라 DALLE-3도 쉽게 사용 가능하다고요~ API는 별도 요금이니 참고하세요!',_binary '',0,'챗지피티 요금','FREE',NULL,'iamaltman'),(24,'2024-02-15 04:46:11.433223',_binary '\0','2024-02-15 04:46:11.433223','TIP','화면 공유시 얼굴에 다양한 필터를 적용할 수 있어요. 이번 스터디 때 해보니까 재밌더라고요 ㅋㅋ',_binary '',0,'화면공유 필터 쓰기','FREE',NULL,'yuroyuro'),(25,'2024-02-15 04:46:11.448790',_binary '\0','2024-02-15 04:46:11.448790','QUESTION','read-only 트랜잭션 범위를 어디까지 잡아야 할 지 모르겠습니다. 컨트롤러에서 직접 사용하는 퍼블릭 서비스 메소드 기준으로 트랜잭션을 나눠야 할까요, 아니면 protected로 꼭 필요한 부분만 @Transactional을 사용하고 나머지는 read-only로 진행해도 되는걸까요?',_binary '',0,'JPA 질문','FREE',NULL,'hyeeyon'),(26,'2024-02-15 04:46:11.461413',_binary '\0','2024-02-15 04:46:11.461413','QUESTION','쿠버네티스를 많이 사용해보신 분들 있으실까요? 설치 방법이 궁금합니다!',_binary '',0,'쿠버네티스 분석 질문','FREE',NULL,'movinggun'),(27,'2024-02-15 04:46:11.475053',_binary '\0','2024-02-15 04:46:11.475053','QUESTION','Referer 검증 외에 CSRF 공격을 막을 수 있는 방법이 무엇이 있을까요?',_binary '',0,'CSRF 공격 질문','FREE',NULL,'damongsanga'),(28,'2024-02-15 04:46:11.487930',_binary '\0','2024-02-15 04:46:11.487930','QUESTION','백과 연동하면서 계속 CORS 에러가 발생합니다.. Access-Control-Allow-Origin 설정을 해야된다고 하는데 어떻게 해야 할까요?',_binary '',0,'CORS 에러..','FREE',NULL,'hyeonah'),(29,'2024-02-15 04:46:11.501507',_binary '\0','2024-02-15 04:46:11.501507','QUESTION','이번 프로젝트 때 RDBMS를 MySQL로 할지 PostgreSQL을 사용할지 모르겠어요.. 둘 다 사용해 보신분들 혹시 어떤 DB가 좋을까요?',_binary '',0,'DB 선택에 고민이 있습니다.','FREE',NULL,'iammusk'),(30,'2024-02-15 04:46:11.515127',_binary '\0','2024-02-15 04:46:11.515127','QUESTION','애자일한 git 전략에는 어떤 것들이 있고, 실무에서는 어떤 git 전략을 많이 사용하나요? 현직자분들의 조언이 필요합니다!',_binary '',0,'git 전략','FREE',NULL,'benny'),(31,'2024-02-15 04:46:11.535360',_binary '\0','2024-02-15 04:46:11.535360',NULL,'이더리움 기반의 스마트 컨트랙트 개발 프로젝트입니다. 관심있는 분들의 많은 참여 바랍니다.',_binary '',0,'블록체인 프로젝트 참여자','RECRUIT',7,'damongsanga'),(32,'2024-02-15 04:46:11.551686',_binary '\0','2024-02-15 04:46:11.551686',NULL,'자바스크립트 프로그래밍의 고급 개념을 탐구할 팀원을 모집합니다.',_binary '',0,'자바스크립트 고급 기술 탐구','RECRUIT',8,'movinggun'),(33,'2024-02-15 04:46:11.568698',_binary '\0','2024-02-15 04:46:11.568698',NULL,'HTML, CSS, 자바스크립트를 이용한 웹 개발 초보자들 함께해요!.',_binary '',0,'웹 개발 입문','RECRUIT',9,'hyeeyon'),(34,'2024-02-15 04:46:11.585601',_binary '\0','2024-02-15 04:46:11.585601',NULL,'아마존 웹 서비스를 이용한 클라우드 컴퓨팅 서비스에 대한 토론할 팀원을 모집합니다.',_binary '',0,'AWS 클라우드 컴퓨팅','RECRUIT',10,'yuroyuro'),(35,'2024-02-15 04:46:11.601736',_binary '\0','2024-02-15 04:46:11.601736',NULL,'사이버 보안의 기초와 온라인 존재를 보호하는 방법을 같이 배워봐요.',_binary '',0,'사이버 보안 기초','RECRUIT',11,'benny'),(36,'2024-02-15 04:46:11.619345',_binary '\0','2024-02-15 04:46:11.619345',NULL,'비전공자들을 위한 기초 운영체제, 네트워크 CS 스터디 팀원을 모집합니다!',_binary '',0,'비전공자 기본 CS 모집','RECRUIT',12,'hyeonah'),(37,'2024-02-15 04:46:11.636165',_binary '\0','2024-02-15 04:46:11.636165',NULL,'Unity를 이용한 모바일 게임 개발에 참여할 분을 모집합니다. 게임에 열정적인 분 환영!',_binary '',0,'모바일 게임 개발 프로젝트','RECRUIT',13,'hyeonah'),(38,'2024-02-15 04:46:11.653927',_binary '\0','2024-02-15 04:46:11.653927',NULL,'IT 업계 기획으로 준비하시는분! 함께해요!',_binary '',0,'IT 기획 모집','RECRUIT',14,'iammusk'),(39,'2024-02-15 04:46:11.669190',_binary '\0','2024-02-15 04:46:11.669190',NULL,'저와 함께라면 한달만에 RTC 마스터 쌉가능입니다',_binary '',0,'WEB RTC 1달 마스터 모집합니다','RECRUIT',15,'yuroyuro'),(40,'2024-02-15 04:46:11.699759',_binary '\0','2024-02-15 04:46:11.699759',NULL,'13반 이제는 코밋에서 모여',_binary '',0,'13반 여기로 신청 ㄱㄱ','RECRUIT',16,'benny'),(41,'2024-02-15 04:46:11.718078',_binary '\0','2024-02-15 04:46:11.718078',NULL,'스프링 진득하게 파볼분! 토비와 김영한님의 가호를 받아 레츠고!!!',_binary '',0,'스프링 딥다이브 모집!!','RECRUIT',17,'damongsanga'),(42,'2024-02-15 04:46:11.735791',_binary '\0','2024-02-15 04:46:11.735791',NULL,'솔직히 1주일에 1개 논문 쌉 EZ 인정??',_binary '',0,'LLM 논문 읽기 모임','RECRUIT',18,'iamaltman'),(43,'2024-02-15 04:46:11.752053',_binary '\0','2024-02-15 11:38:15.611123',NULL,'@@@@@프론트마스터가 될꺼에요 함께하실분???@@@@@',_binary '',2,'@@@@@프론트 스터디@@@@@','RECRUIT',19,'hyeonah'),(44,'2024-02-15 04:46:11.767118',_binary '\0','2024-02-15 04:46:11.767118',NULL,'여자 개발자분들도 환영합니다',_binary '',0,'마 남자 아이가, 남자라면 땀내나는 C를!','RECRUIT',20,'iammusk'),(45,'2024-02-15 06:27:14.669216',_binary '\0','2024-02-15 06:27:14.669216',NULL,'# 어린이 친구들 안녕\n\n싸피 입학하고 싶죠??\n싸피에 입학하기 위해서는 많은 준비가 필요합니다.\n기본적인 코딩 실력은 물론이고 산업 지식, 영어 성적은 물론이고 중국어, 일본어, 독일어 등등..\n그러나 가장 중요한 것은 역시 취업하기 위한 열망이라고 할 수 있겠죠!\n\n의지를 가지고 있다면 얼마든지 해낼 수 있습니다!!\n저와 함께 싸피 56기에 들어갈 동무들을 구합니다.\n \n제한 조건은 딱히 없습니다.',_binary '',0,'유치원생 모여라','RECRUIT',31,'donggun1000'),(46,'2024-02-15 07:17:44.872117',_binary '\0','2024-02-15 07:17:44.872117',NULL,'모집해요!!',_binary '',0,'스터디원 모집','RECRUIT',32,'110401199GITHUB'),(47,'2024-02-15 07:19:26.318775',_binary '\0','2024-02-15 07:19:26.318775',NULL,'유니유니유니티',_binary '',0,'유니티다 유니티','RECRUIT',33,'movinggun');
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `channel`
--

DROP TABLE IF EXISTS `channel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `channel` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `room_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdq85klwk80gensppfpqs4qr87` (`room_id`),
  CONSTRAINT `FKdq85klwk80gensppfpqs4qr87` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `channel`
--

LOCK TABLES `channel` WRITE;
/*!40000 ALTER TABLE `channel` DISABLE KEYS */;
INSERT INTO `channel` VALUES (1,'2024-02-15 04:46:10.124388',_binary '\0','2024-02-15 04:46:10.124388','기본 채널',1),(2,'2024-02-15 04:46:10.158537',_binary '\0','2024-02-15 04:46:10.158537','기본 채널',2),(3,'2024-02-15 04:46:10.186554',_binary '\0','2024-02-15 04:46:10.186554','기본 채널',3),(4,'2024-02-15 04:46:10.219840',_binary '\0','2024-02-15 04:46:10.219840','기본 채널',4),(5,'2024-02-15 04:46:10.264375',_binary '\0','2024-02-15 04:46:10.264375','기본 채널',5),(6,'2024-02-15 04:46:10.296822',_binary '\0','2024-02-15 04:46:10.296822','기본 채널',6),(7,'2024-02-15 04:46:10.321861',_binary '\0','2024-02-15 04:46:10.321861','기본 채널',7),(8,'2024-02-15 04:46:10.384472',_binary '\0','2024-02-15 04:46:10.384472','기본 채널',8),(9,'2024-02-15 04:46:10.420255',_binary '\0','2024-02-15 04:46:10.420255','기본 채널',9),(10,'2024-02-15 04:46:10.460305',_binary '\0','2024-02-15 04:46:10.460305','기본 채널',10),(11,'2024-02-15 04:46:10.508614',_binary '\0','2024-02-15 04:46:10.508614','기본 채널',11),(12,'2024-02-15 04:46:10.547663',_binary '\0','2024-02-15 04:46:10.547663','기본 채널',12),(13,'2024-02-15 04:46:10.577247',_binary '\0','2024-02-15 04:46:10.577247','기본 채널',13),(14,'2024-02-15 04:46:10.602441',_binary '\0','2024-02-15 04:46:10.602441','기본 채널',14),(15,'2024-02-15 04:46:10.632233',_binary '\0','2024-02-15 04:46:10.632233','기본 채널',15),(16,'2024-02-15 04:46:10.678634',_binary '\0','2024-02-15 04:46:10.678634','기본 채널',16),(17,'2024-02-15 04:46:10.713327',_binary '\0','2024-02-15 04:46:10.713327','기본 채널',17),(18,'2024-02-15 04:46:10.745204',_binary '\0','2024-02-15 04:46:10.745204','기본 채널',18),(19,'2024-02-15 04:46:10.782974',_binary '\0','2024-02-15 04:46:10.782974','기본 채널',19),(20,'2024-02-15 04:46:10.816463',_binary '\0','2024-02-15 04:46:10.816463','기본 채널',20),(21,'2024-02-15 04:46:10.861943',_binary '\0','2024-02-15 04:46:10.861943','기본 채널',21),(22,'2024-02-15 04:46:10.894212',_binary '\0','2024-02-15 04:46:10.894212','기본 채널',22),(23,'2024-02-15 04:46:10.921704',_binary '\0','2024-02-15 04:46:10.921704','기본 채널',23),(24,'2024-02-15 04:46:10.948345',_binary '\0','2024-02-15 04:46:10.948345','기본 채널',24),(25,'2024-02-15 04:46:10.978413',_binary '\0','2024-02-15 04:46:10.978413','기본 채널',25),(26,'2024-02-15 04:46:11.000623',_binary '\0','2024-02-15 04:46:11.000623','기본 채널',26),(27,'2024-02-15 04:46:11.032555',_binary '\0','2024-02-15 04:46:11.032555','기본 채널',27),(28,'2024-02-15 04:46:11.062975',_binary '\0','2024-02-15 04:46:11.062975','기본 채널',28),(29,'2024-02-15 04:46:11.080429',_binary '\0','2024-02-15 04:46:11.080429','기본 채널',29),(30,'2024-02-15 05:03:48.062224',_binary '\0','2024-02-15 05:03:48.062224','기본 채널',30),(31,'2024-02-15 06:12:50.663790',_binary '\0','2024-02-15 06:12:50.663790','기본 채널',31),(32,'2024-02-15 07:17:15.408199',_binary '\0','2024-02-15 07:17:15.408199','기본 채널',32),(33,'2024-02-15 07:18:32.469077',_binary '\0','2024-02-15 07:18:32.469077','기본 채널',33),(34,'2024-02-15 07:50:33.287715',_binary '\0','2024-02-15 07:50:33.287715','기본 채널',34);
/*!40000 ALTER TABLE `channel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `board_id` bigint DEFAULT NULL,
  `writer_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKlij9oor1nav89jeat35s6kbp1` (`board_id`),
  KEY `FKjfdaen6h2c8o1axvh7j6go3rq` (`writer_id`),
  CONSTRAINT `FKjfdaen6h2c8o1axvh7j6go3rq` FOREIGN KEY (`writer_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKlij9oor1nav89jeat35s6kbp1` FOREIGN KEY (`board_id`) REFERENCES `board` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'2024-02-15 04:46:11.807357',_binary '\0','2024-02-15 04:46:11.807357','자바는 정말 다재다능한 언어인 것 같아요.',1,'movinggun'),(2,'2024-02-15 04:46:11.842326',_binary '\0','2024-02-15 04:46:11.842326','제네릭스 부분이 아직 어려운데, 누군가 설명해 줄 수 있나요?',1,'hyeeyon'),(3,'2024-02-15 04:46:11.862578',_binary '\0','2024-02-15 04:46:11.862578','자바의 가비지 컬렉션에 대해 알게 되어 유익했어요.',1,'movinggun'),(4,'2024-02-15 04:46:11.884198',_binary '\0','2024-02-15 04:46:11.884198','예외 처리 방법에 대한 세션도 추가되면 좋을 것 같아요.',1,'yuroyuro'),(5,'2024-02-15 04:46:11.901194',_binary '\0','2024-02-15 04:46:11.901194','JVM이 실제로 어떻게 작동하는지 궁금했는데, 설명해주셔서 감사합니다!',1,'damongsanga'),(6,'2024-02-15 04:46:11.919346',_binary '\0','2024-02-15 04:46:11.919346','다음 스터디 모임은 언제인가요? 참여하고 싶습니다.',1,'benny'),(7,'2024-02-15 04:46:11.936197',_binary '\0','2024-02-15 04:46:11.936197','컴포넌트 라이프사이클에 대해 배울 수 있어서 좋았어요.',10,'damongsanga'),(8,'2024-02-15 04:46:11.953536',_binary '\0','2024-02-15 04:46:11.953536','Hook을 사용한 상태 관리 예제가 정말 도움이 되었습니다.',10,'benny'),(9,'2024-02-15 04:46:11.971120',_binary '\0','2024-02-15 04:46:11.971120','리액트 라우터를 사용한 SPA 구현 부분이 인상적이었어요.',10,'hyeonah'),(10,'2024-02-15 04:46:11.989004',_binary '\0','2024-02-15 04:46:11.989004','Context API 사용 방법을 자세히 알게 되어서 유익했습니다.',10,'movinggun'),(11,'2024-02-15 04:46:12.007271',_binary '\0','2024-02-15 04:46:12.007271','다음 워크샵도 기대되네요. 언제 열리나요?',10,'yuroyuro'),(12,'2024-02-15 08:15:22.668286',_binary '','2024-02-15 08:15:27.957449','우와!',12,'coach'),(13,'2024-02-15 08:15:32.588416',_binary '\0','2024-02-15 08:15:32.588416','우와!',12,'coach'),(14,'2024-02-15 08:44:56.801706',_binary '\0','2024-02-15 08:44:56.801706','설명 좀..',12,'consultant'),(15,'2024-02-15 08:45:10.927981',_binary '\0','2024-02-15 08:45:10.927981','하이\n',12,'consultant'),(16,'2024-02-15 08:45:54.156891',_binary '\0','2024-02-15 08:45:54.156891','무빙건.. 🤣',8,'consultant'),(17,'2024-02-15 08:58:43.829493',_binary '\0','2024-02-15 08:58:43.829493','저 들어갈래요\n',47,'83561356GITHUB'),(18,'2024-02-15 08:58:54.829963',_binary '\0','2024-02-15 08:58:54.829963','저 할래요\n',43,'83561356GITHUB');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `from_member_id` varchar(255) DEFAULT NULL,
  `to_member_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKihjspg8lwuxxwo2lyjupy01wh` (`from_member_id`),
  KEY `FKr3ok8t5vaple10dt0ufw9bmj0` (`to_member_id`),
  CONSTRAINT `FKihjspg8lwuxxwo2lyjupy01wh` FOREIGN KEY (`from_member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKr3ok8t5vaple10dt0ufw9bmj0` FOREIGN KEY (`to_member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
INSERT INTO `follow` VALUES (1,'110401199GITHUB','hyeonah'),(2,'coach','movinggun'),(3,'83561356GITHUB','hyeonah'),(4,'139304856GITHUB','hyeonah'),(5,'139304856GITHUB','110401199GITHUB'),(7,'hyeonah','139304856GITHUB');
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keyword`
--

DROP TABLE IF EXISTS `keyword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `keyword` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_hvq9bm3mbguqoicyv02g5crjs` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keyword`
--

LOCK TABLES `keyword` WRITE;
/*!40000 ALTER TABLE `keyword` DISABLE KEYS */;
INSERT INTO `keyword` VALUES (1,'2024-02-15 04:46:09.886363',_binary '\0','2024-02-15 04:46:09.886363','Java'),(2,'2024-02-15 04:46:09.908380',_binary '\0','2024-02-15 04:46:09.908380','Node.js'),(3,'2024-02-15 04:46:09.920301',_binary '\0','2024-02-15 04:46:09.920301','React'),(4,'2024-02-15 04:46:09.931896',_binary '\0','2024-02-15 04:46:09.931896','Python'),(5,'2024-02-15 04:46:09.942865',_binary '\0','2024-02-15 04:46:09.942865','Javascript'),(6,'2024-02-15 04:46:09.955376',_binary '\0','2024-02-15 04:46:09.955376','Unity'),(7,'2024-02-15 04:46:09.966965',_binary '\0','2024-02-15 04:46:09.966965','BlockChain'),(8,'2024-02-15 04:46:09.978047',_binary '\0','2024-02-15 04:46:09.978047','Algorithm'),(9,'2024-02-15 04:46:09.991057',_binary '\0','2024-02-15 04:46:09.991057','AWS'),(10,'2024-02-15 04:46:10.001964',_binary '\0','2024-02-15 04:46:10.001964','DOCKER'),(11,'2024-02-15 04:46:10.013832',_binary '\0','2024-02-15 04:46:10.013832','AI'),(12,'2024-02-15 04:46:10.028700',_binary '\0','2024-02-15 04:46:10.028700','C'),(13,'2024-02-15 04:46:10.040523',_binary '\0','2024-02-15 04:46:10.040523','Vue.js'),(14,'2024-02-15 04:46:10.053981',_binary '\0','2024-02-15 04:46:10.053981','Spring'),(15,'2024-02-15 04:46:10.068537',_binary '\0','2024-02-15 04:46:10.068537','Typescript');
/*!40000 ALTER TABLE `keyword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `like_id` bigint NOT NULL AUTO_INCREMENT,
  `board_id` bigint DEFAULT NULL,
  `member_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`like_id`),
  KEY `FK5cq36196j3ww17d7r95qdm4td` (`board_id`),
  KEY `FKa4vkf1skcfu5r6o5gfb5jf295` (`member_id`),
  CONSTRAINT `FK5cq36196j3ww17d7r95qdm4td` FOREIGN KEY (`board_id`) REFERENCES `board` (`id`),
  CONSTRAINT `FKa4vkf1skcfu5r6o5gfb5jf295` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (1,12,'coach'),(2,12,'consultant'),(3,43,'83561356GITHUB'),(4,43,'139304856GITHUB');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lounge`
--

DROP TABLE IF EXISTS `lounge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lounge` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `room_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKn2qdv2ndyp2psbgj6f6indlp` (`room_id`),
  CONSTRAINT `FKn2qdv2ndyp2psbgj6f6indlp` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lounge`
--

LOCK TABLES `lounge` WRITE;
/*!40000 ALTER TABLE `lounge` DISABLE KEYS */;
INSERT INTO `lounge` VALUES (1,'2024-02-15 04:46:10.117714',_binary '\0','2024-02-15 04:46:10.117714','기본 라운지',1),(2,'2024-02-15 04:46:10.156327',_binary '\0','2024-02-15 04:46:10.156327','기본 라운지',2),(3,'2024-02-15 04:46:10.184264',_binary '\0','2024-02-15 04:46:10.184264','기본 라운지',3),(4,'2024-02-15 04:46:10.217432',_binary '\0','2024-02-15 04:46:10.217432','기본 라운지',4),(5,'2024-02-15 04:46:10.262110',_binary '\0','2024-02-15 04:46:10.262110','기본 라운지',5),(6,'2024-02-15 04:46:10.294625',_binary '\0','2024-02-15 04:46:10.294625','기본 라운지',6),(7,'2024-02-15 04:46:10.318709',_binary '\0','2024-02-15 04:46:10.318709','기본 라운지',7),(8,'2024-02-15 04:46:10.382026',_binary '\0','2024-02-15 04:46:10.382026','기본 라운지',8),(9,'2024-02-15 04:46:10.417706',_binary '\0','2024-02-15 04:46:10.417706','기본 라운지',9),(10,'2024-02-15 04:46:10.458007',_binary '\0','2024-02-15 04:46:10.458007','기본 라운지',10),(11,'2024-02-15 04:46:10.506560',_binary '\0','2024-02-15 04:46:10.506560','기본 라운지',11),(12,'2024-02-15 04:46:10.545385',_binary '\0','2024-02-15 04:46:10.545385','기본 라운지',12),(13,'2024-02-15 04:46:10.574783',_binary '\0','2024-02-15 04:46:10.574783','기본 라운지',13),(14,'2024-02-15 04:46:10.600260',_binary '\0','2024-02-15 04:46:10.600260','기본 라운지',14),(15,'2024-02-15 04:46:10.630068',_binary '\0','2024-02-15 04:46:10.630068','기본 라운지',15),(16,'2024-02-15 04:46:10.676690',_binary '\0','2024-02-15 04:46:10.676690','기본 라운지',16),(17,'2024-02-15 04:46:10.711439',_binary '\0','2024-02-15 04:46:10.711439','기본 라운지',17),(18,'2024-02-15 04:46:10.743218',_binary '\0','2024-02-15 04:46:10.743218','기본 라운지',18),(19,'2024-02-15 04:46:10.780397',_binary '\0','2024-02-15 04:46:10.780397','기본 라운지',19),(20,'2024-02-15 04:46:10.814325',_binary '\0','2024-02-15 04:46:10.814325','기본 라운지',20),(21,'2024-02-15 04:46:10.859904',_binary '\0','2024-02-15 04:46:10.859904','기본 라운지',21),(22,'2024-02-15 04:46:10.891980',_binary '\0','2024-02-15 04:46:10.891980','기본 라운지',22),(23,'2024-02-15 04:46:10.919165',_binary '\0','2024-02-15 04:46:10.919165','기본 라운지',23),(24,'2024-02-15 04:46:10.945837',_binary '\0','2024-02-15 04:46:10.945837','기본 라운지',24),(25,'2024-02-15 04:46:10.976416',_binary '\0','2024-02-15 04:46:10.976416','기본 라운지',25),(26,'2024-02-15 04:46:10.998249',_binary '\0','2024-02-15 04:46:10.998249','기본 라운지',26),(27,'2024-02-15 04:46:11.030642',_binary '\0','2024-02-15 04:46:11.030642','기본 라운지',27),(28,'2024-02-15 04:46:11.061131',_binary '\0','2024-02-15 04:46:11.061131','기본 라운지',28),(29,'2024-02-15 04:46:11.078633',_binary '\0','2024-02-15 04:46:11.078633','기본 라운지',29),(30,'2024-02-15 05:03:48.060482',_binary '\0','2024-02-15 05:03:48.060482','기본 라운지',30),(31,'2024-02-15 06:12:50.661993',_binary '\0','2024-02-15 06:12:50.661993','기본 라운지',31),(32,'2024-02-15 07:17:15.401865',_binary '\0','2024-02-15 07:17:15.401865','기본 라운지',32),(33,'2024-02-15 07:18:32.462332',_binary '\0','2024-02-15 07:18:32.462332','기본 라운지',33),(34,'2024-02-15 07:50:33.285488',_binary '\0','2024-02-15 07:50:33.285488','기본 라운지',34);
/*!40000 ALTER TABLE `lounge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member_id` varchar(255) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `feature` enum('EARTH','PROBE','BLACKHOLE','SUN','MOON','GALAXY') DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `UK_hh9kg6jti4n1eoiertn2k6qsc` (`nickname`),
  UNIQUE KEY `UK_mbmcqelty0fbrvxp1q58dn57t` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES ('110401199GITHUB','2024-02-15 04:49:13.352377',_binary '\0','2024-02-15 13:44:16.775856','레츠고!!',NULL,'BLACKHOLE','https://github.com/Damongsanga','Damongsanga','다몽다몽상가','{bcrypt}$2a$10$FuFvdsJ.O7E5y7bfhwnVuOO7w39N44dXc5HeCy.m/uN9XxCLT9qNm','https://avatars.githubusercontent.com/u/110401199?v=4'),('139304856GITHUB','2024-02-15 08:56:50.775173',_binary '\0','2024-02-15 11:37:57.175527','',NULL,'BLACKHOLE','','JHyeon-a','UserLrk4wsac','{bcrypt}$2a$10$CRi07QSmTjpNjyzgyfcxweJDzH9pXGTb2g.6wWFKjQu22Jp.c8eky','https://avatars.githubusercontent.com/u/139304856?v=4'),('83561356GITHUB','2024-02-15 08:56:25.963876',_binary '\0','2024-02-15 08:58:09.188999','',NULL,'PROBE','','YuKyung-Chung','정현아','{bcrypt}$2a$10$BmLDOJ.cB1Kc7DpfvnJvaeGBW5ZAqQuSyLuSJHpNeKMuwOqpDXmpy',''),('asd123456','2024-02-15 07:48:51.605110',_binary '\0','2024-02-15 07:51:53.626288','','asd123@naver.com','EARTH','','dasdads','asdasdasdad','{bcrypt}$2a$10$PVqa2EpuzejGG6cWtDI5puqUuBYRLy4yaBSbr9MKNBv17TXvkutsW','https://s3.ap-northeast-2.amazonaws.com/comeet-a506/profileImage/rubber-man-walking2024-02-15T16%3A51%3A53.326738968.gif'),('benny','2024-02-15 04:46:08.826544',_binary '\0','2024-02-15 04:46:08.826544','','benny@naver.com','EARTH','','태수','커피마니아','{bcrypt}$2a$10$FCQpgK9iEGxpMmy1h.hl5eanNzmS/V1TvtjPGePhEnF34MPaRB8dO',''),('benyy0101','2024-02-15 05:04:32.560450',_binary '\0','2024-02-15 05:05:07.171953','','benyy0101@naver.com','EARTH','','김태수','코밋코밋코밋','{bcrypt}$2a$10$iAgEL39Xq3/5A3pat1x7ee57NlmrIZkNtWp/RCkFG4a2V7TKFvnJe',''),('coach','2024-02-15 08:14:42.609166',_binary '\0','2024-02-15 08:14:42.609166','','example@naver.com','EARTH','','코치','코치','{bcrypt}$2a$10$FCISq99aaMSB/leT5RtPVOikrlvsfeVDkYMW8rApkRnVilqKxYRMa',''),('consultant','2024-02-15 08:27:48.967788',_binary '\0','2024-02-15 08:37:04.847736','그컨입니다.','example@hanmail.net','PROBE','','컨설턴트','컨님','{bcrypt}$2a$10$dDZvwKWcBkKHXU54Ih5b8eNCJwgn2PgzceqffSNOOin3AgMnjjut2',''),('damongsanga','2024-02-15 04:46:08.274686',_binary '\0','2024-02-15 04:46:08.274686','','damongsanga@naver.com','EARTH','','덕주','다몽상가','{bcrypt}$2a$10$g/77TxnJqvUbJssD3pOYiukUYXW9XO79BqsasruxkuwZuek6H.oCu',''),('donggun1000','2024-02-15 06:10:25.764361',_binary '\0','2024-02-15 06:10:25.764361','','donggun1000@naver.com','EARTH','','제로타이','제로타이','{bcrypt}$2a$10$dbbtBXGZoJfpbnBh5jTE8OYahfmuGkpxK28ygJdy7JPWSwRux1HZC',''),('hello','2024-02-15 10:31:19.361158',_binary '\0','2024-02-15 10:31:19.361158','','hihi@naver.com','EARTH','','hi','hi','{bcrypt}$2a$10$FuBC3TJXErCJ3eeRFUgKfeWKcfvWbiE.JNIfbGTzbjKZGt9c7FQ3O',''),('hihihi','2024-02-15 08:55:36.115443',_binary '\0','2024-02-15 08:55:36.115443','','hihihi@naver.com','EARTH','','김하이','하잇','{bcrypt}$2a$10$EsefZ3U6UXMA/VMXvOZCKObaFu9ISpkNzy10J4ttdYc8N4Yk4YsFG',''),('hyeeyon','2024-02-15 04:46:08.592165',_binary '\0','2024-02-15 12:45:59.180955','','hyeeyon@naver.com','SUN','','희연','희여니','{bcrypt}$2a$10$ze04Jd9eRi89KXdHRUunY.DBSgBDfKu4HSZG8hOivl9yRUGeFhSDa',''),('hyeonah','2024-02-15 04:46:08.943600',_binary '\0','2024-02-15 04:54:09.149696','','hyeonah@naver.com','MOON','','현아','혀나혀나','{bcrypt}$2a$10$GbLW0X2OKoaBfmYOIMosYeQKnRqYCUuv0F5U.XRaVk8otz7kX/tVa','https://s3.ap-northeast-2.amazonaws.com/comeet-a506/profileImage/679142024-02-15T13%3A53%3A54.975652801.jfif'),('iamaltman','2024-02-15 04:46:09.175797',_binary '\0','2024-02-15 04:46:09.175797','','iamaltman@naver.com','EARTH','','샘알트먼','샘알트먼','{bcrypt}$2a$10$Isp8ftxxoMTEnDn.BDmU8Ot9/O4Vfh/2sj72KcrBqqZ2TxXerNbwy',''),('iambeenzino','2024-02-15 04:46:09.514792',_binary '\0','2024-02-15 04:46:09.514792','','iambeenzino@naver.com','EARTH','','빈지노','빈쥐노','{bcrypt}$2a$10$bEsuVPShk/1QkGmfNYWEH.g3HyUukPuS3dMszB8l9hcV6XdwR2kpK',''),('iameminem','2024-02-15 04:46:09.402347',_binary '\0','2024-02-15 04:46:09.402347','','iameminem@naver.com','EARTH','','에미넴','할미넴','{bcrypt}$2a$10$ylZJdn0MbPvY2LW2OSzU5uI3pF3xmrjk3NvUzwET.LPwuuixIr32C',''),('iamjohnlennon','2024-02-15 04:46:09.628190',_binary '\0','2024-02-15 04:46:09.628190','','iamjohnlennon@naver.com','EARTH','','존레논','요코팬','{bcrypt}$2a$10$RwA9/quRUfKolDlZz1O/Y.Pt4y1adxBJmNsy3qhd9eoQCYZM6dndW',''),('iamkimyoungha','2024-02-15 04:46:09.742155',_binary '\0','2024-02-15 04:46:09.742155','','iamkimyoungha@naver.com','EARTH','','손흥민','김영하작가','{bcrypt}$2a$10$NqaIGV.Kop.sceKlnEVlaegmpplkeUgrpV..DbK9glGp2t4JYLRmm',''),('iammusk','2024-02-15 04:46:09.062790',_binary '\0','2024-02-15 04:46:09.062790','','iammusk@naver.com','EARTH','','일론머스크','일롱므스큼다','{bcrypt}$2a$10$DkXzXenn.F4orEjAZve.SexsnV2W.Z1EHD6Q8H.6RXjirRpOgU7Em',''),('iamson','2024-02-15 04:46:09.289942',_binary '\0','2024-02-15 04:46:09.289942','','iamson@naver.com','EARTH','','손흥민','SONNY','{bcrypt}$2a$10$Hl2YcWF6pwAuZ1NWAzUva.oUFsv.ijMqmaXfuTVOzVZwNNjSXhumq',''),('iamsuka','2024-02-15 04:46:09.856031',_binary '\0','2024-02-15 04:46:09.856031','','iamsuka@naver.com','EARTH','','슈카','슈카코믹스','{bcrypt}$2a$10$hDoSyIF0tty/j5DlCrlfgeCS7GK9S/RQDoYzBQVnjbRjhGkBvQP1y',''),('movinggun','2024-02-15 04:46:08.465970',_binary '\0','2024-02-15 04:46:08.465970','','movinggun@naver.com','EARTH','','동건','무빙건','{bcrypt}$2a$10$FgjLwpSxv5Y1LdyblTHPn.k7Agv.rzVhGq.sA2VDSvutHmXm8ipS2',''),('shinhyeongman','2024-02-15 05:02:48.565055',_binary '','2024-02-15 05:04:23.719983','','psnew14@gmail.com','EARTH','','신형만','신형만','{bcrypt}$2a$10$MAXhibqNQVq1mX9/KHu8J.C57mBc5strsfgSIy7DqgkJ6UFMMymta',''),('smilingCheetah','2024-02-15 05:02:41.645998',_binary '\0','2024-02-15 05:02:41.645998','','cheetah@naver.com','EARTH','','김치타','치타는웃고있다','{bcrypt}$2a$10$IwXvjOrkL25d1kC4.FADjOP1bAId2v.w8USvmQxXPo39hbXi/6MCu',''),('yuroyuro','2024-02-15 04:46:08.711301',_binary '\0','2024-02-15 04:46:08.711301','','yuroyuro@naver.com','EARTH','','유로','너는무료나는유로','{bcrypt}$2a$10$DgY2QNIwiaXwF6mQ3vCT9OfBFEoeOwLeR2bz5RNS8vHjWMoEDAVfu','');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_roles`
--

DROP TABLE IF EXISTS `member_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_roles` (
  `member_member_id` varchar(255) NOT NULL,
  `roles` varchar(255) DEFAULT NULL,
  KEY `FKruptm2dtwl95mfks4bnhv828k` (`member_member_id`),
  CONSTRAINT `FKruptm2dtwl95mfks4bnhv828k` FOREIGN KEY (`member_member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_roles`
--

LOCK TABLES `member_roles` WRITE;
/*!40000 ALTER TABLE `member_roles` DISABLE KEYS */;
INSERT INTO `member_roles` VALUES ('damongsanga','USER'),('hyeeyon','USER'),('yuroyuro','USER'),('benny','USER'),('hyeonah','USER'),('iammusk','USER'),('iamaltman','USER'),('iamson','USER'),('iameminem','USER'),('iambeenzino','USER'),('iamjohnlennon','USER'),('iamkimyoungha','USER'),('iamsuka','USER'),('110401199GITHUB','SOCIAL'),('smilingCheetah','USER'),('shinhyeongman','USER'),('benyy0101','USER'),('donggun1000','USER'),('movingGun','USER'),('asd123456','USER'),('coach','USER'),('consultant','USER'),('hihihi','USER'),('83561356GITHUB','SOCIAL'),('139304856GITHUB','SOCIAL'),('hello','USER');
/*!40000 ALTER TABLE `member_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `note`
--

DROP TABLE IF EXISTS `note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `note` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `context` varchar(255) DEFAULT NULL,
  `is_read` bit(1) DEFAULT NULL,
  `receiver_member_id` varchar(255) DEFAULT NULL,
  `writer_member_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7fcbjv4gl03jal1epegfx8vk` (`receiver_member_id`),
  KEY `FKlxpkswwegbrea48ivtbl4fmb8` (`writer_member_id`),
  CONSTRAINT `FK7fcbjv4gl03jal1epegfx8vk` FOREIGN KEY (`receiver_member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKlxpkswwegbrea48ivtbl4fmb8` FOREIGN KEY (`writer_member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `note`
--

LOCK TABLES `note` WRITE;
/*!40000 ALTER TABLE `note` DISABLE KEYS */;
INSERT INTO `note` VALUES (1,'2024-02-15 05:59:10.253427',_binary '\0','2024-02-15 11:42:48.928447','$*&SYSTEM&*$희여니님이 모바일 게임 개발 방에 가입 요청을 보냈습니다! 13',_binary '','hyeonah','hyeeyon'),(2,'2024-02-15 06:11:50.065539',_binary '','2024-02-15 06:28:47.282813','$*&SYSTEM&*$무빙건님이 웹 개발 입문 방에 가입 요청을 보냈습니다! 9',_binary '\0','hyeeyon','movingGun'),(3,'2024-02-15 06:28:27.230696',_binary '\0','2024-02-15 06:28:33.083494','$*&SYSTEM&*$무빙건님이 웹 개발 입문 방에 가입 요청을 보냈습니다! 9',_binary '','hyeeyon','movinggun'),(4,'2024-02-15 06:31:01.372077',_binary '\0','2024-02-15 06:31:08.191653','$*&SYSTEM&*$커피마니아님이 웹 개발 입문 방에 가입 요청을 보냈습니다! 9',_binary '','hyeeyon','benny'),(5,'2024-02-15 07:19:21.093249',_binary '\0','2024-02-15 07:19:49.820204','$*&SYSTEM&*$무빙건님이 자유롭게 스터디해요! 방에 가입 요청을 보냈습니다! 32',_binary '','110401199GITHUB','movinggun'),(6,'2024-02-15 07:19:37.027588',_binary '\0','2024-02-15 07:19:43.665392','$*&SYSTEM&*$희여니님이 유니티 스터디 방에 가입 요청을 보냈습니다! 33',_binary '','movinggun','hyeeyon'),(7,'2024-02-15 08:15:49.846406',_binary '\0','2024-02-15 08:15:49.846406','$*&SYSTEM&*$코치님이 싸피 56기 유치원 반 방에 가입 요청을 보냈습니다! 31',_binary '\0','donggun1000','coach'),(8,'2024-02-15 08:22:19.624422',_binary '\0','2024-02-15 08:22:19.624422','이렇게 하면 메시지가 가나요?',_binary '\0','movinggun','coach'),(9,'2024-02-15 08:22:38.422448',_binary '','2024-02-15 08:22:47.023044','나에게쓰는편지',_binary '','coach','coach'),(10,'2024-02-15 08:58:30.672219',_binary '\0','2024-02-15 08:58:30.672219','$*&SYSTEM&*$정현아님이 유니티 스터디 방에 가입 요청을 보냈습니다! 33',_binary '\0','movinggun','83561356GITHUB');
/*!40000 ALTER TABLE `note` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `capacity` int NOT NULL,
  `constraints` enum('VIDEOONMICOFF','VIDEOON','MICOFF','FREE') DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_locked` bit(1) DEFAULT NULL,
  `mcount` int NOT NULL,
  `notice` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `room_image` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type` enum('DISPOSABLE','PERMANENT') DEFAULT NULL,
  `manager_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_bwtkrldtq09e4rghbofc1a3q` (`title`),
  KEY `FKpvhnbiktirkkch8yudyjv2gi6` (`manager_id`),
  CONSTRAINT `FKpvhnbiktirkkch8yudyjv2gi6` FOREIGN KEY (`manager_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,'2024-02-15 04:46:10.099234',_binary '\0','2024-02-15 04:46:10.099234',5,'VIDEOONMICOFF','자바 프로그래밍을 처음 배우는 사람들을 위한 스터디방입니다.',_binary '\0',0,NULL,NULL,'','자바 기초 스터디','DISPOSABLE','damongsanga'),(2,'2024-02-15 04:46:10.143493',_binary '\0','2024-02-15 04:46:10.143493',6,'VIDEOON','Node.js 개발 논의를 위한 전용 공간입니다.',_binary '\0',0,NULL,NULL,'','Node.js 개발자 모임','DISPOSABLE','movinggun'),(3,'2024-02-15 04:46:10.173027',_binary '\0','2024-02-15 04:46:10.173027',10,'MICOFF','중급 학습자를 위한 인터랙티브 리액트 워크샵입니다.',_binary '\0',0,NULL,NULL,'','리액트 인터랙티브 워크샵','DISPOSABLE','hyeeyon'),(4,'2024-02-15 04:46:10.201126',_binary '\0','2024-02-15 04:46:10.201126',9,'FREE','풀스택을 사용한 풀스택 개발에 대해 토론하는 장소입니다.',_binary '\0',0,NULL,NULL,'','풀스택 개발 토론','DISPOSABLE','yuroyuro'),(5,'2024-02-15 04:46:10.234310',_binary '\0','2024-02-15 04:46:10.234310',8,'FREE','파이썬을 사용한 데이터 사이언스 프로젝트에 대해 배우고 경험을 공유합니다.',_binary '\0',0,NULL,NULL,'','파이썬 데이터 사이언스 학습','DISPOSABLE','benny'),(6,'2024-02-15 04:46:10.278314',_binary '\0','2024-02-15 04:46:10.278314',10,'FREE','자바, 파이썬을 사용한 알고리즘 문제 풀이방입니다',_binary '\0',0,NULL,NULL,'','알고리즘 스터디','DISPOSABLE','hyeonah'),(7,'2024-02-15 04:46:10.310617',_binary '\0','2024-02-15 04:46:10.340074',5,'VIDEOONMICOFF','블록체인 개념과 암호화 알고리즘에 대한 초보자 친화적 논의입니다.',_binary '\0',1,NULL,NULL,'','블록체인 기초','PERMANENT','damongsanga'),(8,'2024-02-15 04:46:10.365689',_binary '\0','2024-02-15 04:46:10.392913',6,'VIDEOON','자바스크립트 프로그래밍의 고급 개념을 탐구합니다.',_binary '\0',1,NULL,NULL,'','자바스크립트 고급 기술 탐구','PERMANENT','movinggun'),(9,'2024-02-15 04:46:10.406397',_binary '\0','2024-02-15 06:31:09.908766',10,'MICOFF','HTML, CSS, 자바스크립트를 이용한 웹 개발 초보자 가이드입니다.',_binary '\0',3,NULL,NULL,'','웹 개발 입문','PERMANENT','hyeeyon'),(10,'2024-02-15 04:46:10.442567',_binary '\0','2024-02-15 04:46:10.468276',9,'FREE','아마존 웹 서비스를 이용한 클라우드 컴퓨팅 서비스에 대한 토론입니다.',_binary '\0',1,NULL,NULL,'','AWS 클라우드 컴퓨팅','PERMANENT','yuroyuro'),(11,'2024-02-15 04:46:10.482485',_binary '\0','2024-02-15 04:46:10.516958',8,'FREE','사이버 보안의 기초와 온라인 존재를 보호하는 방법을 배웁니다.',_binary '\0',1,NULL,NULL,'','사이버 보안 기초','PERMANENT','benny'),(12,'2024-02-15 04:46:10.530994',_binary '\0','2024-02-15 04:46:10.555481',8,'FREE','비전공자들을 위한 기초 운영체제, 네트워크 CS 스터디 방입니다.',_binary '\0',1,NULL,NULL,'','비전공자 기본 CS','PERMANENT','hyeonah'),(13,'2024-02-15 04:46:10.568561',_binary '\0','2024-02-15 11:42:52.734585',10,'FREE','Unity를 이용한 모바일 게임 개발방입니다',_binary '\0',2,NULL,NULL,'','모바일 게임 개발','PERMANENT','hyeonah'),(14,'2024-02-15 04:46:10.598077',_binary '\0','2024-02-15 04:46:10.610005',4,'VIDEOONMICOFF','기획자들을 위한 스터디입니다',_binary '\0',1,NULL,NULL,'','IT 기획','PERMANENT','iammusk'),(15,'2024-02-15 04:46:10.623441',_binary '\0','2024-02-15 04:46:10.639303',6,'VIDEOON','3월 1달간 운영되는 스터디로, WEB RTC 기술을 깊게 파봅니다!',_binary '\0',1,NULL,NULL,'','WEB RTC 1달 마스터','PERMANENT','yuroyuro'),(16,'2024-02-15 04:46:10.654277',_binary '\0','2024-02-15 04:46:10.686838',20,'FREE','주말마다 진행하는 13반 스터디! 싸탈 레츠고!',_binary '\0',1,NULL,NULL,'','13반 모여라','PERMANENT','benny'),(17,'2024-02-15 04:46:10.701636',_binary '\0','2024-02-15 04:46:10.721412',10,'FREE','스프링을 깊게 파보는 스터디입니다',_binary '\0',1,NULL,NULL,'','스프링 딥다이브','PERMANENT','damongsanga'),(18,'2024-02-15 04:46:10.736698',_binary '\0','2024-02-15 04:46:10.752560',4,'FREE','매주 수요일, 1개 신규로 발행된 LLM 관련 논문을 읽고 내용을 공유합니다',_binary '\0',1,NULL,NULL,'','LLM 논문 읽기','PERMANENT','iamaltman'),(19,'2024-02-15 04:46:10.765367',_binary '\0','2024-02-15 04:46:10.791294',10,'MICOFF','프레임워크에 한정되지 않은 프론트 스터디입니다',_binary '\0',1,NULL,NULL,'','프론트 스터디','PERMANENT','hyeonah'),(20,'2024-02-15 04:46:10.807057',_binary '\0','2024-02-15 04:46:10.824761',10,'VIDEOON','진득하게 C 부터 다시 시작해보는 스터디입니다',_binary '\0',1,NULL,NULL,'','남자라면 땀내나는 C를!','PERMANENT','iammusk'),(21,'2024-02-15 04:46:10.842712',_binary '\0','2024-02-15 04:46:10.870627',10,'FREE','토요일 오전마다 운영되는 인프라 스터디입니다',_binary '\0',1,NULL,NULL,'','[데브옵스] 주말 인프라 스터디','PERMANENT','movinggun'),(22,'2024-02-15 04:46:10.885385',_binary '\0','2024-02-15 04:46:10.885385',6,'FREE','내 손을 java바~',_binary '\0',0,NULL,NULL,'','자바 스터디','DISPOSABLE','iammusk'),(23,'2024-02-15 04:46:10.909030',_binary '\0','2024-02-15 04:46:10.909030',7,'VIDEOONMICOFF','솔직히 리액트보다 좋음 인정?',_binary '\0',0,NULL,NULL,'','vue 스터디','DISPOSABLE','iamaltman'),(24,'2024-02-15 04:46:10.939212',_binary '\0','2024-02-15 04:46:10.939212',10,'VIDEOON','오늘 불태운다 AWS!',_binary '\0',0,NULL,NULL,'','AWS 달려!','DISPOSABLE','iamson'),(25,'2024-02-15 04:46:10.961689',_binary '\0','2024-02-15 04:46:10.961689',8,'FREE','남자는 C다. 마치 내 학점처럼',_binary '\0',0,NULL,NULL,'','쌍남자 C 레츠고','DISPOSABLE','iameminem'),(26,'2024-02-15 04:46:10.992379',_binary '\0','2024-02-15 04:46:10.992379',10,'VIDEOONMICOFF','난 AI 보다 랩을 잘해요 ㅋㅋ',_binary '\0',0,NULL,NULL,'','AI 스터디','DISPOSABLE','iambeenzino'),(27,'2024-02-15 04:46:11.013733',_binary '\0','2024-02-15 04:46:11.013733',6,'VIDEOONMICOFF','타입세이프한 개발로!',_binary '\0',0,NULL,NULL,'','자바스크립트 vs 타입스크립트','DISPOSABLE','iamjohnlennon'),(28,'2024-02-15 04:46:11.046941',_binary '\0','2024-02-15 04:46:11.046941',12,'FREE','낭독회 만큼이나 알고리즘 풀이도 잘한답니다',_binary '\0',0,NULL,NULL,'','알고리즘 설명회','DISPOSABLE','iamkimyoungha'),(29,'2024-02-15 04:46:11.076499',_binary '\0','2024-02-15 04:46:11.076499',10,'VIDEOON','코딩을 주식처럼 쉽게!',_binary '\0',0,NULL,NULL,'','코딩 초보자를 위한 CS 입문 특장','DISPOSABLE','iamsuka'),(30,'2024-02-15 05:03:48.058141',_binary '\0','2024-02-15 05:03:48.058141',10,'FREE','잘 만드셨군요.',_binary '\0',0,NULL,NULL,'','반갑습니다.','DISPOSABLE','shinhyeongman'),(31,'2024-02-15 06:12:50.659631',_binary '\0','2024-02-15 06:12:50.670105',10,'FREE','선행 학습은 꾸준히',_binary '\0',1,NULL,NULL,'','싸피 56기 유치원 반','PERMANENT','donggun1000'),(32,'2024-02-15 07:17:15.359654',_binary '\0','2024-02-15 13:58:42.289357',7,'FREE','레츠고!! 고고!!',_binary '\0',2,'공지가 있다네!',NULL,'https://s3.ap-northeast-2.amazonaws.com/comeet-a506/roomImage/4883e040295db3cd0326076c7dd9a54a2024-02-15T22%3A56%3A46.639265724.jpg','자유롭게 스터디해요!','PERMANENT','110401199GITHUB'),(33,'2024-02-15 07:18:32.415386',_binary '\0','2024-02-15 07:19:45.526843',10,'FREE','유니티 초보자부터 고수까지 다 와서 공부하세요!',_binary '\0',2,NULL,NULL,'','유니티 스터디','PERMANENT','movinggun'),(34,'2024-02-15 07:50:33.282222',_binary '\0','2024-02-15 07:50:33.296313',10,'FREE','안녕하세요',_binary '\0',1,NULL,NULL,'','화성 갈끄니까','PERMANENT','asd123456');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_keyword`
--

DROP TABLE IF EXISTS `room_keyword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_keyword` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `keyword_id` bigint DEFAULT NULL,
  `room_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKclq9twrry2ak9kb7cypmllitd` (`keyword_id`),
  KEY `FK2vqa92r7px5kur3nr8twyw64j` (`room_id`),
  CONSTRAINT `FK2vqa92r7px5kur3nr8twyw64j` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`),
  CONSTRAINT `FKclq9twrry2ak9kb7cypmllitd` FOREIGN KEY (`keyword_id`) REFERENCES `keyword` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_keyword`
--

LOCK TABLES `room_keyword` WRITE;
/*!40000 ALTER TABLE `room_keyword` DISABLE KEYS */;
INSERT INTO `room_keyword` VALUES (1,'2024-02-15 04:46:10.110921',_binary '\0','2024-02-15 04:46:10.110921',1,1),(2,'2024-02-15 04:46:10.148777',_binary '\0','2024-02-15 04:46:10.148777',2,2),(3,'2024-02-15 04:46:10.154013',_binary '\0','2024-02-15 04:46:10.154013',3,2),(4,'2024-02-15 04:46:10.177769',_binary '\0','2024-02-15 04:46:10.177769',4,3),(5,'2024-02-15 04:46:10.182135',_binary '\0','2024-02-15 04:46:10.182135',5,3),(6,'2024-02-15 04:46:10.206202',_binary '\0','2024-02-15 04:46:10.206202',1,4),(7,'2024-02-15 04:46:10.210406',_binary '\0','2024-02-15 04:46:10.210406',2,4),(8,'2024-02-15 04:46:10.214631',_binary '\0','2024-02-15 04:46:10.214631',3,4),(9,'2024-02-15 04:46:10.239973',_binary '\0','2024-02-15 04:46:10.239973',1,5),(10,'2024-02-15 04:46:10.244730',_binary '\0','2024-02-15 04:46:10.244730',2,5),(11,'2024-02-15 04:46:10.250525',_binary '\0','2024-02-15 04:46:10.250525',3,5),(12,'2024-02-15 04:46:10.255357',_binary '\0','2024-02-15 04:46:10.255357',4,5),(13,'2024-02-15 04:46:10.259823',_binary '\0','2024-02-15 04:46:10.259823',5,5),(14,'2024-02-15 04:46:10.283082',_binary '\0','2024-02-15 04:46:10.283082',1,6),(15,'2024-02-15 04:46:10.288051',_binary '\0','2024-02-15 04:46:10.288051',4,6),(16,'2024-02-15 04:46:10.292314',_binary '\0','2024-02-15 04:46:10.292314',8,6),(17,'2024-02-15 04:46:10.316482',_binary '\0','2024-02-15 04:46:10.316482',7,7),(18,'2024-02-15 04:46:10.371475',_binary '\0','2024-02-15 04:46:10.371475',2,8),(19,'2024-02-15 04:46:10.375517',_binary '\0','2024-02-15 04:46:10.375517',3,8),(20,'2024-02-15 04:46:10.379862',_binary '\0','2024-02-15 04:46:10.379862',5,8),(21,'2024-02-15 04:46:10.411451',_binary '\0','2024-02-15 04:46:10.411451',4,9),(22,'2024-02-15 04:46:10.415496',_binary '\0','2024-02-15 04:46:10.415496',5,9),(23,'2024-02-15 04:46:10.447811',_binary '\0','2024-02-15 04:46:10.447811',1,10),(24,'2024-02-15 04:46:10.451826',_binary '\0','2024-02-15 04:46:10.451826',2,10),(25,'2024-02-15 04:46:10.455961',_binary '\0','2024-02-15 04:46:10.455961',3,10),(26,'2024-02-15 04:46:10.487128',_binary '\0','2024-02-15 04:46:10.487128',1,11),(27,'2024-02-15 04:46:10.491198',_binary '\0','2024-02-15 04:46:10.491198',2,11),(28,'2024-02-15 04:46:10.495634',_binary '\0','2024-02-15 04:46:10.495634',3,11),(29,'2024-02-15 04:46:10.499981',_binary '\0','2024-02-15 04:46:10.499981',4,11),(30,'2024-02-15 04:46:10.504314',_binary '\0','2024-02-15 04:46:10.504314',5,11),(31,'2024-02-15 04:46:10.535184',_binary '\0','2024-02-15 04:46:10.535184',1,12),(32,'2024-02-15 04:46:10.539421',_binary '\0','2024-02-15 04:46:10.539421',4,12),(33,'2024-02-15 04:46:10.543279',_binary '\0','2024-02-15 04:46:10.543279',5,12),(34,'2024-02-15 04:46:10.572583',_binary '\0','2024-02-15 04:46:10.572583',6,13),(35,'2024-02-15 04:46:10.627840',_binary '\0','2024-02-15 04:46:10.627840',6,15),(36,'2024-02-15 04:46:10.658742',_binary '\0','2024-02-15 04:46:10.658742',1,16),(37,'2024-02-15 04:46:10.662459',_binary '\0','2024-02-15 04:46:10.662459',2,16),(38,'2024-02-15 04:46:10.666391',_binary '\0','2024-02-15 04:46:10.666391',3,16),(39,'2024-02-15 04:46:10.670682',_binary '\0','2024-02-15 04:46:10.670682',4,16),(40,'2024-02-15 04:46:10.674506',_binary '\0','2024-02-15 04:46:10.674506',6,16),(41,'2024-02-15 04:46:10.705706',_binary '\0','2024-02-15 04:46:10.705706',1,17),(42,'2024-02-15 04:46:10.709530',_binary '\0','2024-02-15 04:46:10.709530',14,17),(43,'2024-02-15 04:46:10.740964',_binary '\0','2024-02-15 04:46:10.740964',11,18),(44,'2024-02-15 04:46:10.769385',_binary '\0','2024-02-15 04:46:10.769385',3,19),(45,'2024-02-15 04:46:10.773411',_binary '\0','2024-02-15 04:46:10.773411',5,19),(46,'2024-02-15 04:46:10.777726',_binary '\0','2024-02-15 04:46:10.777726',13,19),(47,'2024-02-15 04:46:10.812244',_binary '\0','2024-02-15 04:46:10.812244',12,20),(48,'2024-02-15 04:46:10.849132',_binary '\0','2024-02-15 04:46:10.849132',9,21),(49,'2024-02-15 04:46:10.854750',_binary '\0','2024-02-15 04:46:10.854750',10,21),(50,'2024-02-15 04:46:10.889921',_binary '\0','2024-02-15 04:46:10.889921',1,22),(51,'2024-02-15 04:46:10.913186',_binary '\0','2024-02-15 04:46:10.913186',5,23),(52,'2024-02-15 04:46:10.917165',_binary '\0','2024-02-15 04:46:10.917165',13,23),(53,'2024-02-15 04:46:10.943801',_binary '\0','2024-02-15 04:46:10.943801',9,24),(54,'2024-02-15 04:46:10.965799',_binary '\0','2024-02-15 04:46:10.965799',1,25),(55,'2024-02-15 04:46:10.970754',_binary '\0','2024-02-15 04:46:10.970754',4,25),(56,'2024-02-15 04:46:10.974560',_binary '\0','2024-02-15 04:46:10.974560',8,25),(57,'2024-02-15 04:46:10.996327',_binary '\0','2024-02-15 04:46:10.996327',11,26),(58,'2024-02-15 04:46:11.017738',_binary '\0','2024-02-15 04:46:11.017738',5,27),(59,'2024-02-15 04:46:11.028481',_binary '\0','2024-02-15 04:46:11.028481',15,27),(60,'2024-02-15 04:46:11.051290',_binary '\0','2024-02-15 04:46:11.051290',1,28),(61,'2024-02-15 04:46:11.054898',_binary '\0','2024-02-15 04:46:11.054898',4,28),(62,'2024-02-15 04:46:11.059280',_binary '\0','2024-02-15 04:46:11.059280',8,28);
/*!40000 ALTER TABLE `room_keyword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_member`
--

DROP TABLE IF EXISTS `room_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_member` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `member_id` varchar(255) DEFAULT NULL,
  `room_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKav1svcloqr7ue4dhsgkj5t4a5` (`member_id`),
  KEY `FKlmp67erahqx7u5shbkc12p0lw` (`room_id`),
  CONSTRAINT `FKav1svcloqr7ue4dhsgkj5t4a5` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKlmp67erahqx7u5shbkc12p0lw` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_member`
--

LOCK TABLES `room_member` WRITE;
/*!40000 ALTER TABLE `room_member` DISABLE KEYS */;
INSERT INTO `room_member` VALUES (1,'2024-02-15 04:46:10.333608',_binary '\0','2024-02-15 04:46:10.333608','damongsanga',7),(2,'2024-02-15 04:46:10.390381',_binary '\0','2024-02-15 04:46:10.390381','movinggun',8),(3,'2024-02-15 04:46:10.426648',_binary '\0','2024-02-15 04:46:10.426648','hyeeyon',9),(4,'2024-02-15 04:46:10.465865',_binary '\0','2024-02-15 04:46:10.465865','yuroyuro',10),(5,'2024-02-15 04:46:10.514301',_binary '\0','2024-02-15 04:46:10.514301','benny',11),(6,'2024-02-15 04:46:10.552773',_binary '\0','2024-02-15 04:46:10.552773','hyeonah',12),(7,'2024-02-15 04:46:10.582965',_binary '\0','2024-02-15 04:46:10.582965','hyeonah',13),(8,'2024-02-15 04:46:10.607322',_binary '\0','2024-02-15 04:46:10.607322','iammusk',14),(9,'2024-02-15 04:46:10.637096',_binary '\0','2024-02-15 04:46:10.637096','yuroyuro',15),(10,'2024-02-15 04:46:10.684373',_binary '\0','2024-02-15 04:46:10.684373','benny',16),(11,'2024-02-15 04:46:10.718969',_binary '\0','2024-02-15 04:46:10.718969','damongsanga',17),(12,'2024-02-15 04:46:10.750429',_binary '\0','2024-02-15 04:46:10.750429','iamaltman',18),(13,'2024-02-15 04:46:10.788912',_binary '\0','2024-02-15 04:46:10.788912','hyeonah',19),(14,'2024-02-15 04:46:10.822477',_binary '\0','2024-02-15 04:46:10.822477','iammusk',20),(15,'2024-02-15 04:46:10.867815',_binary '\0','2024-02-15 04:46:10.867815','movinggun',21),(16,'2024-02-15 06:12:50.668295',_binary '\0','2024-02-15 06:12:50.668295','donggun1000',31),(17,'2024-02-15 06:29:08.518625',_binary '\0','2024-02-15 06:29:08.518625','movinggun',9),(18,'2024-02-15 06:31:09.905339',_binary '\0','2024-02-15 06:31:09.905339','benny',9),(19,'2024-02-15 07:17:15.425929',_binary '\0','2024-02-15 07:17:15.425929','110401199GITHUB',32),(20,'2024-02-15 07:18:32.496704',_binary '\0','2024-02-15 07:18:32.496704','movinggun',33),(21,'2024-02-15 07:19:45.521900',_binary '\0','2024-02-15 07:19:45.521900','hyeeyon',33),(22,'2024-02-15 07:19:52.200069',_binary '\0','2024-02-15 07:19:52.200069','movinggun',32),(23,'2024-02-15 07:50:33.293764',_binary '\0','2024-02-15 07:50:33.293764','asd123456',34),(24,'2024-02-15 11:42:52.730921',_binary '\0','2024-02-15 11:42:52.730921','hyeeyon',13);
/*!40000 ALTER TABLE `room_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `til`
--

DROP TABLE IF EXISTS `til`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `til` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `context` varchar(5000) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `member_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhqplspmrtufissl3ubjhcyo65` (`member_id`),
  CONSTRAINT `FKhqplspmrtufissl3ubjhcyo65` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `til`
--

LOCK TABLES `til` WRITE;
/*!40000 ALTER TABLE `til` DISABLE KEYS */;
INSERT INTO `til` VALUES (1,'2024-02-15 04:56:42.814381',_binary '\0','2024-02-15 05:49:10.330474','[오늘의 한 마디]\n내 장래희망은 에프킬라.. 몽키 D 버깅...\n\n😃 What I Learned\n공부한 내용\nOAuth2\n\nEffective Java\n49. 매개변수가 유효한지 검사하라\n\n😜 Today’s Small Happiness\nOAuth2 뭔가 엉성하지만 쨌든 성공!\n\n🧐 Let’s Think About It\nSpring Security를 조금 더 공부해봐야하나..?!\n도커, 쿠버네티스 관련 설치 강의 들어보자','2024-02-15','110401199GITHUB'),(2,'2024-02-15 05:05:39.019962',_binary '\0','2024-02-15 05:05:39.019962','ㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋ\n','2024-02-15','benyy0101'),(3,'2024-02-15 07:29:16.143141',_binary '','2024-02-15 07:29:18.639452','오늘 난 공부를 해따. 재미있어따.','2024-02-14','110401199GITHUB'),(4,'2024-02-15 08:21:58.847207',_binary '','2024-02-15 08:22:02.041143','미리공부해도되는건가요','2024-02-16','coach'),(5,'2024-02-15 08:37:33.854918',_binary '\0','2024-02-15 08:37:33.854918','내일도 공부할 것입니다.','2024-02-16','consultant');
/*!40000 ALTER TABLE `til` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-15 14:02:42
