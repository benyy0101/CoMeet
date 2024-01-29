package com.a506.comeet.app.room.service;

import com.a506.comeet.app.room.controller.dto.LoungeCreateRequestDto;
import com.a506.comeet.app.room.controller.dto.LoungeUpdateRequestDto;
import com.a506.comeet.app.room.repository.LoungeRepository;
import com.a506.comeet.app.room.repository.RoomRepository;
import com.a506.comeet.error.errorcode.CommonErrorCode;
import com.a506.comeet.error.errorcode.CustomErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import com.a506.comeet.app.room.entity.Lounge;
import com.a506.comeet.app.room.entity.Room;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class LoungeService {

    private final LoungeRepository loungeRepository;

    private final RoomRepository roomRepository;


    @Transactional
    public Lounge create(LoungeCreateRequestDto req, String memberId) {
        Room room = roomRepository.findByIdAndIsDeletedFalse(req.getRoomId()).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        // 사용자가 방장인지 확인
        managerAuthorization(memberId, room);

        // 이름 중복 확인 로직
        for(Lounge l : room.getLounges()){
            if (l.getName().equals(req.getName())) throw new RestApiException(CustomErrorCode.DUPLICATE_VALUE);
        }

        Lounge lounge = loungeRepository.save(Lounge.builder().name(req.getName()).room(room).build());
        room.addLounge(lounge);
        return lounge;
    }


    @Transactional
    public void update(LoungeUpdateRequestDto req, Long loungeId, String memberId) {
        Lounge lounge = loungeRepository.findById(loungeId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        Room room = lounge.getRoom(); // 프록시
        // 사용자가 방장인지 확인
        managerAuthorization(memberId, room);

        // 이름 중복 확인 로직
        for(Lounge l : room.getLounges()){
            if (l.getName().equals(req.getName())) throw new RestApiException(CustomErrorCode.DUPLICATE_VALUE);
        }
        lounge.update(req);
        loungeRepository.save(lounge);
    }

    @Transactional
    public void delete(Long loungeId, String memberId) {
        Lounge lounge = loungeRepository.findByIdAndIsDeletedFalse(loungeId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        // 사용자가 방장인지 확인
        managerAuthorization(memberId, lounge.getRoom());

        lounge.delete();
    }

    private void managerAuthorization(String memberId, Room room){
        if (!memberId.equals(room.getManager().getMemberId()))
            throw new RestApiException(CustomErrorCode.NO_AUTHORIZATION);
    }
}
