package com.a506.comeet.room.repository;

import com.a506.comeet.room.entity.Lounge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LoungeRepository extends JpaRepository<Lounge, Long> {
    Optional<Lounge> findByIdAndIsDeletedFalse(Long id);
}
