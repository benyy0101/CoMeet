package com.a506.comeet.metadata.service;

import com.a506.comeet.common.enums.MostStudyTime;
import com.a506.comeet.app.member.controller.dto.MemberDetailResponseDto;
import com.a506.comeet.app.member.controller.dto.MemberKeywordResponseDto;
import com.a506.comeet.metadata.entity.Metadata;
import com.a506.comeet.metadata.repository.MetadataRepository;
import com.a506.comeet.metadata.service.dto.MetadataCreateDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.a506.comeet.metadata.entity.QMetadata.metadata;
import static java.time.Duration.between;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class MetadataService {

    private final MetadataRepository metadataRepository;

    @Transactional
    public String create(MetadataCreateDto dto) {
        log.info("메타데이터 생성");
        Metadata metadata = Metadata.builder()
                .memberId(dto.getMemberId())
                .roomId(dto.getRoomId())
                .enterTime(dto.getEnterTime())
                .leaveTime(dto.getLeaveTime())
                .keywords(dto.getKeywords())
                .build();

        String id = metadataRepository.save(metadata).getId();
        metadataRepository.findById(id);
        return id;
    }

    // 유저 아이디를 받아서 유저의 메타데이터 중 최근 1달 데이터를 가져오고
    public void calculate(MemberDetailResponseDto res, String memberId) {
        // 메타데이터 가져오는 쿼리
        List<Metadata> metadatas = (List<Metadata>) metadataRepository.findAll(metadata.memberId.eq(memberId).and(metadata.leaveTime.gt(LocalDateTime.now().minusMonths(1))));
        if (metadatas.isEmpty()) {
            res.setDayStudyHour(0.0);
            res.setWeekStudyHour(0.0);
            res.setMonthStudyHour(0.0);
            res.setKeywords(List.of());
            return;
        }

        LocalDateTime now = LocalDateTime.ofInstant(Instant.ofEpochMilli(System.currentTimeMillis()), ZoneId.systemDefault());

        double dayInMinutes = 0.0;
        LocalDateTime todayStart = LocalDateTime.now().with(LocalTime.MIN);
        double weekInMinutes = 0.0;
        LocalDateTime thisweekStart = LocalDateTime.now().minusWeeks(1).with(LocalTime.MIN);
        double monthInMinutes = 0.0;

        Map<String, Integer> keywordMap = new HashMap<>();

        Map<Integer, Duration> studyTimeMap = new HashMap<>();
        for (int i = 0; i < 24; i+=2) {
            studyTimeMap.put(i, Duration.ZERO);
        }

        // 주요 공부 시간대 작성 필요
        for (Metadata metadata : metadatas) {
            long minutes = between(metadata.getEnterTime(), metadata.getLeaveTime()).toMinutes();

            // 일/주/월별 공부 시간 계산
            if (metadata.getLeaveTime().isAfter(todayStart))
                dayInMinutes += minutes;
            if (metadata.getLeaveTime().isAfter(thisweekStart))
                weekInMinutes += minutes;
            monthInMinutes += minutes;

            // 키워드 가중치 부여
            for (String keyword : metadata.getKeywords().split(" ")) {
                if (keyword.isBlank()) continue;
                keywordMap.putIfAbsent(keyword, 0);
                keywordMap.put(keyword, keywordMap.get(keyword) + (int) minutes);
            }

            // 스터디 시간대 계산
            getStudyData(metadata, studyTimeMap);
        }

        res.setDayStudyHour(dayInMinutes/60);
        res.setWeekStudyHour(weekInMinutes/60);
        res.setMonthStudyHour(monthInMinutes/60);
        res.setKeywords(keywordMap.entrySet()
                .stream()
                .map(entry -> new MemberKeywordResponseDto(entry.getKey(), entry.getValue()))
                .toList());
        res.setMostStudyTime(MostStudyTime.of(getMostStudyTime(studyTimeMap)));

    }

    private void getStudyData(Metadata metadata, Map<Integer, Duration> studyTimeMap) {
        LocalDateTime currentTime = metadata.getEnterTime();
        while(currentTime.isBefore(metadata.getLeaveTime())){
            int hour = currentTime.getHour()/2*2;
            Duration duration = studyTimeMap.get(hour);
            studyTimeMap.put(hour, duration.plusMinutes(30));
            currentTime = currentTime.plusMinutes(30);
        }
    }

    private int getMostStudyTime(Map<Integer, Duration> studyTimeMap){
        int maxStudyHour = -1;
        Duration maxStudyDuration = Duration.ZERO;

        for (Map.Entry<Integer, Duration> entry : studyTimeMap.entrySet()) {
            if (entry.getValue().compareTo(maxStudyDuration) > 0) {
                maxStudyHour = entry.getKey();
                maxStudyDuration = entry.getValue();
            }
        }

        return maxStudyHour;
    }

}
