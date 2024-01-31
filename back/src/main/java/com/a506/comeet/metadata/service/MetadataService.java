package com.a506.comeet.metadata.service;

import com.a506.comeet.app.member.controller.dto.MemberDetailResponseDto;
import com.a506.comeet.app.member.controller.dto.MemberKeywordResponseDto;
import com.a506.comeet.metadata.entity.Metadata;
import com.a506.comeet.metadata.repository.MetadataRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.time.Duration.between;
import static com.a506.comeet.metadata.entity.QMetadata.metadata;

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
        List<Metadata> metadatas = (List<Metadata>) metadataRepository.findAll(metadata.memberId.eq(memberId).and(metadata.leaveTime.gt(LocalDateTime.now().minusMonths(1).with(LocalDateTime.MIN))));

        // 오늘 공부 시간
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime todayStart = LocalDateTime.now().with(LocalTime.MIN);
        Double day = 0.0;
        List<Metadata> todaysMetadatas = metadatas.stream()
                .filter(metadata -> metadata.getLeaveTime().isAfter(todayStart))
                .collect(Collectors.toList());

        for (Metadata todaysMetadata : todaysMetadatas) {
            long minutes = between(todaysMetadata.getEnterTime(), todaysMetadata.getLeaveTime()).toMinutes();
            day += minutes;
        }
        day /= (double) todaysMetadatas.size() * 60;

        // 주 공부시간
        Double week = 0.0;
        LocalDateTime thisweekStart = LocalDateTime.now().minusWeeks(1).with(LocalTime.MIN);
        List<Metadata> thisweekMetadatas = metadatas.stream()
                .filter(metadata -> metadata.getLeaveTime().isAfter(thisweekStart))
                .collect(Collectors.toList());
        for (Metadata thisweekMetadata : thisweekMetadatas) {
            long minutes = between(thisweekMetadata.getEnterTime(), thisweekMetadata.getLeaveTime()).toMinutes();
            week += minutes;
        }
        week /= (double) thisweekMetadatas.size() * 60;

        // 월 공부시간
        Double month = 0.0;
        for (Metadata metadata : metadatas) {
            long minutes = between(metadata.getEnterTime(), metadata.getLeaveTime()).toMinutes();
            month += minutes;
        }
        month /= (double) metadatas.size() * 60;


        // 주요 공부 시간대 작성 필요


        // 핵심 키워드 가중치 부여하여 전달
        Map<String, Integer> keywordMap = new HashMap<>();
        for (Metadata metadata : metadatas) {
            int minute = (int) between(metadata.getEnterTime(), metadata.getLeaveTime()).toMinutes();
            for (String keyword : metadata.getKeywords().split(" ")) {
                keywordMap.putIfAbsent(keyword, 0);
                keywordMap.put(keyword, keywordMap.get(keyword) + minute);
            }
        }

        List<MemberKeywordResponseDto> keywords = keywordMap.entrySet()
                .stream()
                .map(entry -> new MemberKeywordResponseDto(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());

        log.info("keywords size : {}", keywords.size());

        res.setDayStudyHour(day);
        res.setWeekStudyHour(week);
        res.setMonthStudyHour(month);
        res.setKeywords(keywords);
//        res.setStudyHour();

    }

}
