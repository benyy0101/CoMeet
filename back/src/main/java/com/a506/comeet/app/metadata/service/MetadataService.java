package com.a506.comeet.app.metadata.service;

import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.member.repository.MemberRepository;
import com.a506.comeet.app.metadata.entity.Metadata;
import com.a506.comeet.app.metadata.repository.MetadataDto;
import com.a506.comeet.app.metadata.repository.MetadataRepository;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.app.room.repository.RoomRepository;
import com.a506.comeet.error.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import static com.a506.comeet.error.errorcode.CommonErrorCode.RESOURCE_NOT_FOUND;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class MetadataService {

    private final MetadataRepository metadataRepository;
    private final MemberRepository memberRepository;
    private final RoomRepository roomRepository;

    @Transactional
    public Long create(MetadataCreateDto dto) {
        log.info("메타데이터 생성");
        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new RestApiException(RESOURCE_NOT_FOUND));

        Member member = memberRepository.findById(dto.getMemberId())
                .orElseThrow(() -> new RestApiException(RESOURCE_NOT_FOUND));

        Metadata metadata = Metadata.builder()
                .member(member)
                .room(room)
                .enterTime(dto.getEnterTime())
                .leaveTime(dto.getLeaveTime())
                .keywords(dto.getKeywords())
                .build();

        return metadataRepository.save(metadata).getId();
    }

    // 유저 아이디를 받아서 유저의 메타데이터 중 최근 1달 데이터를 가져오고
    public void calculate(String memberId) {
        // 메타데이터 가져오는 쿼리
        List<MetadataDto> metadatas = metadataRepository.findByMemberIdForOneMonth(memberId);

        // 오늘 공부 시간
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime todayStart = LocalDateTime.of(now.toLocalDate(), LocalTime.MIN);
        LocalDateTime todayEnd = LocalDateTime.of(now.toLocalDate(), LocalTime.MAX);
        Double day = 0.0;
        List<MetadataDto> todaysMetadatas = metadatas.stream()
                .filter(metadata -> metadata.getLeaveTime().isAfter(todayStart))
                .collect(Collectors.toList());
        for (MetadataDto todaysMetadata : todaysMetadatas) {
            long minutes = java.time.Duration.between(todaysMetadata.getEnterTime(), todaysMetadata.getLeaveTime()).toMinutes();
            day += minutes;
        }
        day /= (double) todaysMetadatas.size() * 60;

        // 주 공부시간
        Double week = 0.0;
        LocalDateTime thisweekStart = LocalDateTime.of(now.minusWeeks(1).toLocalDate(), LocalTime.MIN);
        List<MetadataDto> thisweekMetadatas = metadatas.stream()
                .filter(metadata -> metadata.getLeaveTime().isAfter(thisweekStart))
                .collect(Collectors.toList());
        for (MetadataDto thisweekMetadata : thisweekMetadatas) {
            long minutes = java.time.Duration.between(thisweekMetadata.getEnterTime(), thisweekMetadata.getLeaveTime()).toMinutes();
            week += minutes;
        }
        week /= (double) thisweekMetadatas.size() * 60;

        // 월 공부시간
        Double month = 0.0;
        for (MetadataDto metadata : metadatas) {
            long minutes = java.time.Duration.between(metadata.getEnterTime(), metadata.getLeaveTime()).toMinutes();
            month += minutes;
        }
        month /= (double) metadatas.size() * 60;

        // 주요 공부 시간대
        // 핵심 키워드 가중치 부여하여 전달
    }

}
