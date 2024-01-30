package com.a506.comeet.app.metadata.service;

import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.member.repository.MemberRepository;
import com.a506.comeet.app.metadata.entity.Metadata;
import com.a506.comeet.app.metadata.repository.MetadataRepository;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.app.room.repository.RoomRepository;
import com.a506.comeet.error.errorcode.CommonErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public Long create(Long roomId, String memberId, String context){
        log.info("메타데이터 생성");
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RestApiException(RESOURCE_NOT_FOUND));

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RestApiException(RESOURCE_NOT_FOUND));

        Metadata metadata = Metadata.builder()
                .member(member)
                .room(room)
                .context(context).build();

        return metadataRepository.save(metadata).getId();
    }

}
