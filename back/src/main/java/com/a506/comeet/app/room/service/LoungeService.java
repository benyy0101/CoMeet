package com.a506.comeet.app.room.service;

import com.a506.comeet.app.room.controller.dto.LoungeCreateRequestDto;
import com.a506.comeet.app.room.controller.dto.LoungeUpdateRequestDto;
import com.a506.comeet.app.room.entity.Lounge;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.app.room.repository.LoungeRepository;
import com.a506.comeet.app.room.repository.RoomRepository;
import com.a506.comeet.error.errorcode.CommonErrorCode;
import com.a506.comeet.error.errorcode.CustomErrorCode;
import com.a506.comeet.error.exception.RestApiException;
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
        Room room = roomRepository.findById(req.getRoomId()).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_ROOM));

        managerAuthorization(memberId, room);
        loungeNameValidation(room, req.getName());

        Lounge lounge = loungeRepository.save(Lounge.builder().name(req.getName()).room(room).build());
        room.addLounge(lounge);
        return lounge;
    }


    @Transactional
    public void update(LoungeUpdateRequestDto req, Long loungeId, String memberId) {
        Lounge lounge = loungeRepository.findById(loungeId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_LOUNGE));

        managerAuthorization(memberId, lounge.getRoom());
        loungeNameValidation(lounge.getRoom(), req.getName());

        lounge.update(req);
        loungeRepository.save(lounge);
    }

    @Transactional
    public void delete(Long loungeId, String memberId) {
        Lounge lounge = loungeRepository.findById(loungeId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_LOUNGE));

        managerAuthorization(memberId, lounge.getRoom());
        atLeastOneLoungeValitadion(lounge.getRoom());

        lounge.delete();
    }

    private static void loungeNameValidation(Room room, String name) {
        for (Lounge l : room.getLounges()) {
            if (l.getName().equals(name)) throw new RestApiException(CustomErrorCode.DUPLICATE_VALUE, "방 내의 라운지명이 중복됩니다");
        }
    }

    private void atLeastOneLoungeValitadion(Room room) {
        if (loungeRepository.countByRoom(room) <= 1)
            throw new RestApiException(CommonErrorCode.WRONG_REQUEST, "최소 1개의 라운지가 필요합니다");
    }

    private void managerAuthorization(String memberId, Room room){
        if (!memberId.equals(room.getManager().getMemberId()))
            throw new RestApiException(CustomErrorCode.NO_AUTHORIZATION, "방장이 아닙니다");
    }
}
