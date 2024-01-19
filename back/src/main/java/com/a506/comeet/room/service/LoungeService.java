package com.a506.comeet.room.service;

import com.a506.comeet.room.controller.dto.LoungeCreateRequestDto;
import com.a506.comeet.room.controller.dto.LoungeUpdateRequestDto;
import com.a506.comeet.room.entity.Lounge;
import com.a506.comeet.room.entity.Room;
import com.a506.comeet.room.repository.LoungeRepository;
import com.a506.comeet.room.repository.RoomRepository;
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
    public Lounge createLounge(LoungeCreateRequestDto req) {
        // 사용자가 방장인지 확인하는 로직 필요
        Room room = roomRepository.findByIdAndIsDeletedFalse(req.getRoomId()).get();

        // 이름 중복 확인 로직
        for(Lounge l : room.getLounges()){
            if (l.getName().equals(req.getName())) return null;
        }

        Lounge lounge = Lounge.builder().name(req.getName()).room(room).build();
        room.addLounge(lounge);
        return loungeRepository.save(lounge);
    }


    @Transactional
    public boolean updateLounge(LoungeUpdateRequestDto req, Long loungeId) {
        // 사용자가 방장인지 확인하는 로직 필요
        Lounge lounge = loungeRepository.findById(loungeId).orElseThrow(() -> new RuntimeException("Lounge not found with id: " + loungeId));
        // 이름 중복 확인 로직
        for(Lounge l : lounge.getRoom().getLounges()){
            if (l.getName().equals(req.getName())) return false;
        }
        lounge.update(req);
        loungeRepository.save(lounge);
        return true;
    }

    @Transactional
    public boolean deleteLounge(long loungeId) {
        // 사용자가 방장인지 확인하는 로직 필요
        Lounge lounge = loungeRepository.findByIdAndIsDeletedFalse(loungeId).orElseThrow(() -> new RuntimeException("Lounge not found with id: " + loungeId));
        lounge.delete();
        return true;
    }
}
